import { action, observable, reaction, runInAction } from 'mobx';
import { E, DndPort, Id, lang, restQuery, ErrorListHolder, T } from '~/api';
import type { StageTemplateValidationErrors } from '~/api/Rest/dtos/workflow';

import { type StageUnit, Stage, type SowItem } from '~/models';
import { stores } from '~/stores';

type ConstructParams = {
    isCreating: boolean;
};

const struct = () => T.type({
    firstStageHasAdvancePayment: T.literal(true),
    lastSowItemHasItemUnits: T.literal(true),
    lastWorkflowHasMinimumTasks: T.literal(true),
});

export class StageVm {
    dndPort = new DndPort<SowItem>({
        onDrop: item => item,
    });

    stage = new Stage();

    isMovable = true;

    isLoading = false;

    isCreating = false;

    isSaving = false;

    isSowItemModal = false;

    isDeleteModalOpened = false;

    messages: string[] = [];

    openTables = new Set<E.StageTableNames>();

    itemsWithUseTimes?: SowItem[];

    currentSowItem?: SowItem;

    stageTemplateValidationErrors?: {
        firstStageHasAdvancePayment?: boolean;
        lastSowItemHasItemUnits?: boolean;
        lastWorkflowHasMinimumTasks?: boolean;
    };

    errorListHolder = new ErrorListHolder(
        () => this.stageTemplateValidationErrors,
        () => struct(),
    );

    constructor(params: ConstructParams) {
        this.isCreating = params.isCreating;

        makeSafeObservable(this, {
            openTables: observable.deep,
            goBack: action,
            toggleTable: action,
            load: action,
            openDeleteModal: action,
            closeDeleteModal: action,
            makeInactive: action,
        });

        reaction(() => {
            const stageUnits = this.stage.parts.flatMap(item => item.forTemplate
                .templateUnits.map(el => el));

            return {
                stageUnits,
                ordersNumber: stageUnits.map(order => order.orderNumber)
                    .join(','),
            };
        }, ({ stageUnits }) => {
            stageUnits.forEach((el, i) => {
                if (el.orderNumber === i + 1) {
                    return;
                }

                runInAction(() => {
                    el.orderNumber = i + 1;
                });
            });
        });
    }

    fetchItemsWithUseTimes = async (sowId?: number) => {
        if (!sowId) {
            return;
        }

        const items = await restQuery.sow.getSowItemsWithUseTimes(sowId);

        const addedItems = this.stage.parts
            .flatMap(part => part.forTemplate.templateUnits.flatMap(unit => unit.sowItems));

        items.forEach(item => {
            item.setUseTimes(0);

            addedItems.forEach(addedItem => {
                if (addedItem.isEqual(item.id)) {
                    item.setUseTimes(item.sowItemUseTimes + 1);

                    if (
                        item.sowItemVisibility === E.SowItemVisibility.hidden
                        && item.sowItemChangeStatus === E.SowItemChangeStatus.unchanged
                    ) {
                        const sowItem = items.find(x => x.sowItemVisibility === E.SowItemVisibility.masterItem && x.englishName === item.englishName);

                        if (sowItem) {
                            sowItem.setUseTimes(sowItem.sowItemUseTimes + 1);
                        }
                    }
                }
            });
        });

        runInAction(() => {
            this.itemsWithUseTimes = items;
        });
    };

    mount = () => {
        (async () => {
            if (!this.isCreating) {
                this.load(this.stageId);
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            await this.stage.setupMasterSow();

            if (typeof this.stage.sowId === 'undefined') {
                this.goBack();
                return;
            }

            this.fetchItemsWithUseTimes(this.stage.sowId.asNumber());

            this.stage.forTemplate.setupTemplatePart();

            runInAction(() => {
                this.isLoading = false;
            });
        })();
    };

    goBack = () => {
        stores.display.router.goBack();
    };

    get router() {
        return stores.display.router;
    }

    get stageId() {
        return this.router.$.admin.$.stage.$.details.params.stageId
            ?? this.router.$.admin.$.projects.$.sub.$.details.$.stageList.$.details.params.stageId;
    }

    get projectId() {
        return this.router.$.admin.$.projects.$.sub.params.id;
    }

    get project() {
        return stores.projects.adminProjectsConstruction.data
            .find(item => item.externalId === this.projectId);
    }

    get publishText() {
        return this.projectId
            ? lang.dict.get('publishAndAssign')
            : lang.dict.get('publish');
    }

    get tables() {
        return this.stage.parts.map(item => ({
            id: item.id,
            value: item.planStage,
        }));
    }

    get masterSowItems() {
        if (!this.itemsWithUseTimes) {
            return [];
        }

        return this.itemsWithUseTimes.filter(x => x.sowItemVisibility === E.SowItemVisibility.masterItem);
    }

    getSowItems = (ids: Id[]) => {
        const { sow } = this.stage;

        if (!sow) {
            return;
        }

        const filteredItems = sow.sowItems
            .filter(x => ids.find(i => i.isEqual(x.id)));

        if (filteredItems.length === 0) {
            return [];
        }

        return filteredItems.sort((a, b) => {
            const indexA = ids.findIndex(id => id.isEqual(a.id));
            const indexB = ids.findIndex(id => id.isEqual(b.id));
            return indexA - indexB;
        });
    };

    getColor = (id: Id) => {
        if (!this.itemsWithUseTimes) {
            return;
        }

        const item = this.itemsWithUseTimes.find(x => x.id.isEqual(id));

        if (!item) {
            return;
        }

        return item?.sowItemChangeStatus;
    };

    toggleTable = (value: E.StageTableNames) => {
        if (this.openTables.has(value)) {
            this.openTables.delete(value);
            return;
        }

        this.openTables.add(value);
    };

    load = (stageId: number) => {
        (async () => {
            this.isLoading = true;

            const stage = await stores.stages.stageTemplateList.getSingle(
                Id.init(stageId, 'external'),
            );

            if (!stage) {
                this.goBack();
                return;
            }

            this.stage = stage;
            this.isLoading = false;
            this.fetchItemsWithUseTimes(this.stage.sowId?.asNumber());
        })();
    };

    publish = () => {
        (async () => {
            if (this.isSaving || !this.stage.errorListHolder.test()) {
                return;
            }

            const templateName = await restQuery.stage
                .getStageTemplateNameQuery(this.stage.templateName);

            if (templateName) {
                alert(lang.dict.get('stageNameExists'));
                return;
            }

            this.isSaving = true;

            const validateStage = await restQuery.stage.validateStageTemplate(this.stage);

            if (!validateStage) {
                this.isSaving = false;
                return;
            }

            this.stageTemplateValidationErrors = validateStage;

            if (!this.errorListHolder.test()) {
                Object.keys(validateStage).forEach(key => {
                    if (!validateStage[key as keyof StageTemplateValidationErrors]) {
                        runInAction(() => {
                            this.stage.errorListHolder.add({
                                value: key,
                                key: key,
                                type: key,
                                refinement: undefined,
                                message: key,
                                branch: [''],
                                path: [key],
                            });
                        });
                    }
                });

                this.stage.errorListHolder.clearListTimeout = setTimeout(() => {
                    this.stage.errorListHolder.clear();
                    this.stage.errorListHolder.clearListTimeout = undefined;
                }, 5000);

                this.isSaving = false;
                return;
            }

            const updateResponse = await stores.stages
                .updateStageTemplate(this.stage, true);

            if (!updateResponse) {
                this.isSaving = false;
                return;
            }

            if (this.projectId && this.project) {
                const project = await this.project.getProject(this.projectId);

                if (!project) {
                    return;
                }

                project.stageTemplateId = Id.tryInit(this.stageId);

                const res = await stores.projects
                    .update(project, false);

                if (!res) {
                    return;
                }

                stores.display.router
                    .$.admin
                    .$.projects
                    .$.sub
                    .$.details.go({ id: this.projectId });
                stores.display.router.reload();
                return;
            }

            this.isSaving = false;
            stores.display.router.reload();
        })();
    };

    save = () => {
        (async () => {
            if (this.isSaving) {
                return;
            }

            if (this.stage.templateName.length === 0) {
                this.messages = [lang.dict.get('emptyStageName')];
                return;
            }

            this.isSaving = true;

            if (!this.isCreating) {
                await stores.stages.updateStageTemplate(this.stage);

                this.isSaving = false;
                stores.display.router.reload();
                return;
            }

            const externalStageId = await stores.stages
                .createStageTemplate(this.stage);

            if (externalStageId === false) {
                this.goBack();
                return;
            }

            this.stage.id = externalStageId;
            stores.stages.stageTemplateList.data.push(this.stage);

            this.isSaving = false;
            stores.display.router.$.admin.$.stage.$.details.go({
                stageId: externalStageId.asNumber(),
            });
        })();
    };

    remove = (item: StageUnit, id: Id) => {
        this.incrementUseTime(id, true);
        item.removeItem(id, this.stage.forTemplate.isEditable);
    };

    copy = (item: StageUnit) => {
        const sowItem = item.sowItems.find(itemId => itemId);

        if (sowItem) {
            this.incrementUseTime(sowItem);
        }

        this.stage.copyTemplateRow(item, item.forTemplate.templatePartId);
    };

    removeRow = (item: StageUnit) => {
        const sowItem = item.sowItems.find(itemId => itemId);

        if (sowItem) {
            this.incrementUseTime(sowItem, true);
        }

        this.stage.removeTemplateRow(item.id, item.forTemplate.templatePartId);
    };

    incrementUseTime = (id: Id, decrement = false) => {
        if (!this.itemsWithUseTimes) {
            return;
        }

        const sowItem = this.itemsWithUseTimes.find(x => x.id.isEqual(id));

        if (!sowItem) {
            return;
        }

        const increment = decrement? -1 : +1;

        sowItem.setUseTimes(sowItem.sowItemUseTimes + increment);
    };

    openSowItemModal = (id: Id) => {
        (async () => {
            const sowItem = await restQuery.sow.getSowItem(id.asNumber());

            if (!sowItem) {
                return;
            }

            this.currentSowItem = sowItem;
            this.isSowItemModal = true;
        })();
    };

    closeSowItemModal = () => {
        this.currentSowItem = undefined;
        this.isSowItemModal = false;
    };

    openDeleteModal = () => {
        this.isDeleteModalOpened = true;
    };

    closeDeleteModal = () => {
        this.isDeleteModalOpened = false;
    };

    makeInactive = () => {
        (async () => {
            const res = await restQuery.stage.makeStageInactive(this.stageId);

            if (!res) {
                return;
            }

            this.closeDeleteModal();

            stores.display.router.reload();
        })();
    };
}
