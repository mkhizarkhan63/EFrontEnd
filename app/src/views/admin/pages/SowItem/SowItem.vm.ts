import { action, observable, reaction } from 'mobx';
import { E, Id, lang, Mobx, Sorter } from '~/api';
import { Sow, SowItem, SowSubitem } from '~/models';
import { stores } from '~/stores';
import { WorkflowModalVm } from './WorkflowModal.vm';

type ConstructParams = {
    isCreating: boolean;
};

export class SowItemVm {
    sorter = new Sorter(
        () => this.sowItem.forConstruction.sowSubItems,
        by => ({
            orderNumber: by.number('orderNumber'),
            titleEnglish: by.string('titleEnglish'),
            titleArabic: by.string('titleArabic'),
        }),
        'orderNumber',
        'asc',
        () => this.isMovable,
    );

    isMovable = false;

    isCreating = false;

    isSaving = false;

    isLoading = false;

    isDeleteModal = false;

    currentSubitem?: SowSubitem = undefined;

    sow = new Sow();

    sowItem = new SowItem();

    workflowModalVm?: WorkflowModalVm = undefined;

    constructor(params: ConstructParams) {
        this.isCreating = params.isCreating;

        makeSafeObservable(this, {
            sowItem: observable.ref,
            save: false,
            isSaving: false,
            workflowModalVm: observable.ref,
            setName: action,
            loadById: action,
            saveOrder: action,
            addSubitem: action,
            copySubitem: action,
            loadSowById: action,
            startReorder: action,
            setArabicName: action,
            openWorkflowModal: action,
            closeWorkflowModal: action,
            setCategory: action,
            openWorkflowPreview: action,
        });

        reaction(
            () => ({
                items: this.sowItem.forConstruction.sowSubItems,
                thisIdIsInternal: this.sow.id.isType('internal'),
            }),
            ({ items, thisIdIsInternal }) => {
                if (thisIdIsInternal) {
                    return;
                }

                items.forEach(subItem => {
                    subItem.workflow.sowId.replaceWith(this.sow.id);
                });
            },
        );
    }

    get image() {
        return this.sowItem.logo?.img?.url ?? undefined;
    }

    get categories() {
        return Object.values(E.SowItemCategory)
            .filter(value => value !== E.SowItemCategory.none)
            .map(value => ({
                value,
                name: lang.dict.get(value),
            }));
    }

    get taskActions() {
        return Object.keys(E.WorkflowActionType)
            .filter(key => key !== 'none')
            .map((key, index) => ({
                value: index + 1,
                name: lang.dict.get(key),
            }));
    }

    get getAddingSubitem() {
        if (!this.currentSubitem || !this.isAddingSubitem) {
            return [];
        }

        return [this.currentSubitem];
    }

    get isAddingSubitem() {
        if (!this.currentSubitem) {
            return false;
        }

        return this.currentSubitem.orderNumber === Infinity;
    }

    get showAddRowButton() {
        if (this.sowItem.isCategoryPayment) {
            return this.sowItem.forConstruction.sowSubItems.length === 0 && !this.isAddingSubitem;
        }
        return this.sow.isEditable && (!this.currentSubitem || !this.isAddingSubitem);
    }

    get isHavingItem() {
        if (this.isCreating) {
            return true;
        }

        return this.sowItem.forConstruction.sowId.isEqual(this.sow.id);
    }

    mount = () => {
        if (!this.isCreating) {
            const sowId = stores.display.router
                .$.admin
                .$.sow
                .$.item
                .params
                .sowId;

            const itemId = stores.display.router
                .$.admin
                .$.sow
                .$.item
                .params
                .itemId;

            this.loadById(sowId, itemId);
            return;
        }

        const sowId = stores.display.router
            .$.admin
            .$.sow
            .$.createItem
            .params
            .sowId;

        this.loadSowById(sowId);
    };

    unmount = () => {
        this.closeWorkflowModal();
    };

    openWorkflowModal = () => {
        const item = this.currentSubitem;

        if (!item) {
            return;
        }

        item.workflow.markAsNeeded();
        this.workflowModalVm = new WorkflowModalVm({
            workflow: item.workflow,
            isPreview: false,
            onCancel: () => {
                this.closeWorkflowModal();
            },
            onApply: () => {
                item.workflow.markAsChanged();
                this.closeWorkflowModal();
            },
        });
    };

    openWorkflowPreview = (item: SowSubitem) => {
        item.workflow.markAsNeeded();
        this.workflowModalVm = new WorkflowModalVm({
            workflow: item.workflow,
            isPreview: true,
            onCancel: () => {
                this.closeWorkflowModal();
            },
        });
    };

    closeWorkflowModal = () => {
        this.workflowModalVm = undefined;
    };

    openDeleteModal = () => {
        this.isDeleteModal = true;
    };

    closeDeleteModal = () => {
        this.isDeleteModal = false;
    };

    setCategory = (category: E.SowItemCategory) => {
        this.sowItem.category = category;
    };

    isSelectedItem = (item: SowSubitem) => item.id.isEqual(this.currentSubitem?.id);

    setName = (name: string) => {
        if (!this.sow.isEditable) {
            return;
        }

        this.sowItem.setName(name);
    };

    setArabicName = (name: string) => {
        if (!this.sow.isEditable) {
            return;
        }

        this.sowItem.setArabicName(name);
    };

    addSubitem = () => {
        if (this.isMovable) {
            this.saveOrder();
        }

        this.currentSubitem = new SowSubitem();
        this.currentSubitem.workflow.sowId.replaceWith(this.sow.id);
        this.currentSubitem.orderNumber = Infinity;
    };

    editSubitem = (sowSubitem: SowSubitem) => {
        if (this.isMovable) {
            this.saveOrder();
        }

        this.currentSubitem = sowSubitem;
    };

    closeSubitem = () => {
        this.closeWorkflowModal();
        this.currentSubitem = undefined;
    };

    submitSubitem = () => {
        if (!this.currentSubitem) {
            return;
        }

        this.currentSubitem.errorListHolder.setParent(this.sowItem.errorListHolder);

        if (!this.currentSubitem.errorListHolder.test()) {
            return;
        }

        this.currentSubitem.setIsChanged(true);

        if (this.isAddingSubitem) {
            this.sowItem.forConstruction.addSubitem(this.currentSubitem);
        }

        this.closeSubitem();
    };

    startReorder = () => {
        if (this.currentSubitem) {
            this.closeSubitem();
        }

        this.sorter.sortBy('orderNumber', 'asc');
        this.isMovable = true;
    };

    saveOrder = () => {
        this.isMovable = false;
    };

    goBack = () => {
        const sow = this.sowItem;

        if (!sow) {
            return;
        }

        const sowId = stores.display.router.$.admin.$.sow.$.item.params.sowId;
        stores.display.router.$.admin.$.sow.$.details.go({ sowId });
    };

    removeSubitem = (subitemId: Id) => {
        if (this.currentSubitem?.id.isEqual(subitemId)) {
            this.closeSubitem();
            return;
        }

        this.sowItem.forConstruction.removeSubitem(subitemId);
    };

    copySubitem = (subitem: SowSubitem) => {
        this.currentSubitem = this.sowItem.forConstruction.copySubitem(subitem);
    };

    deleteSowItem = () => {
        (async () => {
            const response = await stores.sows.deleteSowItem(this.sowItem.id);

            if (!response) {
                return;
            }

            this.closeDeleteModal();
            stores.display.router.goBack();
        })();
    };

    save = () => {
        (async () => {
            if (this.isSaving || !this.sowItem.errorListHolder.test()) {
                return;
            }

            this.isSaving = true;
            this.isLoading = true;
            this.closeSubitem();

            if (!this.isCreating) {
                await stores.sows.updateItem(this.sowItem);

                this.isSaving = false;
                this.isLoading = false;
                stores.display.router.reload();
                return;
            }

            const externalSowId = await stores.sows.postItem(
                this.sowItem,
            );

            if (externalSowId === false) {
                this.goBack();
                return;
            }

            this.isLoading = false;
            stores.display.router.$.admin.$.sow.$.item.go({
                sowId: this.sow.id.asNumber(),
                itemId: externalSowId,
            });
        })();
    };

    loadSowById = (sowId: number) => {
        this.isLoading = true;

        stores.sows.sows.asyncGet(
            Id.init(sowId, 'external'),
            sow => {
                this.sow = sow;

                Mobx.extendsObservable(this.sowItem.forConstruction, {
                    sowId: sow.id,
                });

                this.isLoading = false;
            },
            this.goBack,
        );
    };

    loadById = (sowId: number, itemId: number) => {
        this.isLoading = true;

        stores.sows.sows.asyncGet(
            Id.init(sowId, 'external'),
            sow => {
                this.sow = sow;
                const id = Id.init(itemId, 'external');

                sow.sowItemList.removeId(id);
                sow.sowItemList.asyncGet(
                    id,
                    sowItem => {
                        this.sowItem = sowItem;
                        this.isLoading = false;
                    },
                    this.goBack,
                );
            },
            this.goBack,
        );
    };
}
