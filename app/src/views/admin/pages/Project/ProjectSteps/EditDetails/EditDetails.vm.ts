import { action, runInAction } from 'mobx';
import { E, LazyDataScroller, lang, restQuery } from '~/api';
import type { Stage, StageUnit } from '~/models';
import { stores } from '~/stores';
import type { ProjectVm } from '../../Project.vm';

export class EditDetailsVm {
    isLoading = false;

    rejectReason = '';

    basement = 0;

    additionalFloors = 0;

    outerBlocks = 0;

    groundFloor = true;

    levellingFloor = false;

    penthouseFloor = false;

    pool = false;

    notFound = false;

    isRejectionModalOpened = false;

    stageTemplate?: Stage;

    floorLevels?: {
        basement: number;
        additionalFloors: number;
        outerBlocks: number;
        groundFloor: boolean;
        levellingFloor: boolean;
        penthouseFloor: boolean;
        pool: boolean;
    };

    stageTemplates = new LazyDataScroller(
        'Template list',
        paging => restQuery.stage.getStageTemplatesBySetup(
            this.floorLevels,
            paging,
        ),
        18,
    );

    constructor(readonly itemVm: ProjectVm) {
        makeSafeObservable(this, {
            isLoading: false,
            submitLevels: action,
            approve: false,
            save: false,
            goCopyStage: false,
            goEditStage: false,
            goCreateStage: false,
            goStageList: false,
            setStageTemplate: false,
            openRejectionModal: action,
            closeRejectionModal: action,
            changeReason: action,
            removeStageTemplate: action,
        });
    }

    get isEditable() {
        return (
            this.itemVm.project.projectStatus === E.ProjectStatus.draft ||
            this.itemVm.project.projectStatus === E.ProjectStatus.reviewing
        );
    }

    get stage() {
        return this.stageTemplate ?? this.itemVm.project.stage;
    }

    get stageUnits() {
        if (!this.stage) {
            return [];
        }

        const units: StageUnit[] = [];

        for (const stagePart of this.stage.parts) {
            for (const stageUnit of stagePart.units) {
                units.push(stageUnit);
            }
        }

        return units;
    }

    get projectUseList() {
        return [
            {
                name: lang.dict.get('projectTileResidential'),
                value: E.ConstructionLand.residential,
            },
            {
                name: lang.dict.get('landTypeCommercial'),
                value: E.ConstructionLand.commercial,
            },
        ];
    }

    get projectTypeList() {
        return [
            {
                name: lang.dict.get('turnkey'),
                value: E.ConstructionType.turnKey,
            },
            {
                name: lang.dict.get('projectTypeStructureOnly'),
                value: E.ConstructionType.structureOnly,
            },
        ];
    }

    setBasement = (value: number) => {
        if (!this.isEditable) {
            return;
        }

        this.basement = value;
    };

    setFloors = (value: number) => {
        if (!this.isEditable) {
            return;
        }

        this.additionalFloors = value;
    };

    setBlocks = (value: number) => {
        if (!this.isEditable) {
            return;
        }

        this.outerBlocks = value;
    };

    setGroundFloor = () => {
        if (!this.isEditable) {
            return;
        }

        this.groundFloor = true;
    };

    setLevellingFloor = () => {
        if (!this.isEditable) {
            return;
        }

        this.levellingFloor = !this.levellingFloor;
    };

    setPenthouseFloor = () => {
        if (!this.isEditable) {
            return;
        }

        this.penthouseFloor = !this.penthouseFloor;
    };

    setPool = () => {
        if (!this.isEditable) {
            return;
        }

        this.pool = !this.pool;
    };

    setStageTemplate = (stage?: Stage) => {
        (async () => {
            const id = stage?.id?.asNumber();

            if (!id) {
                return;
            }

            const res = await restQuery.stage.getStageTemplate(id);

            if (!res) {
                return;
            }

            this.stageTemplate = res;
        })();
    };

    removeStageTemplate = () => {
        this.stageTemplate = undefined;
    };

    goCopyStage = () => {
        const stageTemplateId = this.stageTemplate?.id ?? this.itemVm.project.stageTemplateId;

        if (!stageTemplateId || stageTemplateId.isType('internal') || !this.isEditable) {
            return;
        }

        (async () => {
            const externalStageId = await stores.stages.createDraftStage(stageTemplateId);

            if (!externalStageId) {
                return;
            }

            stores.display.registerBackFrom('stage', () => stores.display.router.$.admin
                .$.projects.$.sub.$.details
                .go({ id: this.itemVm.project.id.asNumber() }));

            stores.display.router
                .$.admin
                .$.projects
                .$.sub
                .$.details
                .$.stageList
                .$.details
                .go({
                    stageId: externalStageId.asNumber(),
                    id: this.itemVm.project.id.asNumber(),
                });
        })();
    };

    goEditStage = (stage: Stage) => {
        const stageTemplateId = stage?.id;

        if (!stageTemplateId || stageTemplateId.isType('internal') || !this.isEditable) {
            return;
        }

        (async () => {
            const externalStageId = await stores.stages.createDraftStage(stageTemplateId);

            if (!externalStageId) {
                return;
            }

            stores.display.registerBackFrom('stage', () => stores.display.router.$.admin
                .$.projects.$.sub.$.details
                .go({ id: this.itemVm.project.id.asNumber() }));

            stores.display.router
                .$.admin
                .$.projects
                .$.sub
                .$.details
                .$.stageList
                .$.details
                .go({
                    stageId: externalStageId.asNumber(),
                    id: this.itemVm.project.id.asNumber(),
                });
        })();
    };

    goCreateStage = () => {
        stores.display.router.$.admin.$.stage.$.create.go({});
    };

    goStageList = () => {
        stores.display.router
            .$.admin
            .$.projects
            .$.sub
            .$.details
            .$.stageList.go({ id: this.itemVm.project.id.asNumber() });
    };

    submitLevels = () => {
        (async () => {
            if (this.isLoading) {
                return;
            }

            this.isLoading = true;

            this.removeStageTemplate();

            const floorLevels = {
                basement: this.basement,
                additionalFloors: this.additionalFloors,
                outerBlocks: this.outerBlocks,
                groundFloor: this.groundFloor,
                levellingFloor: this.levellingFloor,
                penthouseFloor: this.penthouseFloor,
                pool: this.pool,
            };

            runInAction(() => {
                this.floorLevels = floorLevels;
            });

            await this.stageTemplates.reload();

            if (this.stageTemplates.data.length === 0) {
                this.notFound = true;
                this.isLoading = false;
                return;
            }

            if (this.stageTemplates.data.length > 0) {
                this.notFound = false;
                this.isLoading = false;
            }
        })();
    };

    approve = () => {
        (async () => {
            if (this.isLoading || !this.stage?.id) {
                return;
            }

            this.isLoading = true;

            const resultOfCreate = await stores.projects
                .createStagePlan(this.itemVm.project.id, this.stage.id);

            if (resultOfCreate === false) {
                this.isLoading = false;
                this.itemVm.goBack();
                return;
            }

            this.setStageTemplate();
            this.isLoading = false;
            stores.display.router.reload();
        })();
    };

    openRejectionModal = () => {
        this.isRejectionModalOpened = true;
    };

    closeRejectionModal = () => {
        this.isRejectionModalOpened = false;
        this.rejectReason = '';
    };

    changeReason = (text: string) => {
        this.rejectReason = text;
    };

    reject = () => {
        (async () => {
            if (this.isLoading) {
                return;
            }

            this.isLoading = true;

            const rejection = await restQuery.project.rejectConstructionProject(this.itemVm.project.id.asNumber(), this.rejectReason);

            if (!rejection) {
                this.isLoading = false;
                return;
            }

            this.closeRejectionModal();
            this.isLoading = false;
            stores.display.router.reload();
        })();
    };

    save = () => {
        (async () => {
            if (this.isLoading) {
                return;
            }

            this.isLoading = true;
            await stores.projects.update(this.itemVm.project);
            this.isLoading = false;

            stores.display.router.reload();
        })();
    };
}
