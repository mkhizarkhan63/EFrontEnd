import { ErrorListHolder, Id, Sorter, T } from '~/api';
import { Sow } from '~/models';
import { stores } from '~/stores';

const struct = () => T.type({
    name: T.name(),
});

export class SowVm {
    sorter = new Sorter(
        () => this.sow.sowItems,
        by => ({
            orderNumber: by.number('orderNumber'),
            englishName: by.string('englishName'),
            numberOfSpecs: by.number('numberOfSpecs'),
            numberOfWorkflows: by.number('numberOfWorkflows'),
            consultantVisits: by.number('consultantVisits'),
        }),
        'orderNumber',
        'asc',
        () => this.isMovable,
    );

    localSowName = '';

    isLoading = true;

    isMovable = false;

    isSaving = false;

    isCreating = false;

    isDeleteItemModal = false;

    sow = new Sow();

    itemToDeleteId?: Id;

    errorListHolder = new ErrorListHolder(() => this.validation, struct);

    constructor(isCreating?: boolean) {
        this.isCreating = isCreating === true;

        makeSafeObservable(this, {
            test: false,
            save: false,
            mount: false,
            isSaving: false,
            loadById: false,
            saveName: false,
            saveOrder: false,
            startReorder: false,
            setLocalSowName: false,
        });
    }

    get isShownSaveButton() {
        return (
            this.localSowName.length > 0 &&
            this.localSowName !== this.sow.contractName
        );
    }

    get validation() {
        return {
            name: this.localSowName,
        };
    }

    mount = () => {
        if (this.isCreating) {
            this.isLoading = false;
        } else {
            const id = stores.display.router.$.admin.$.sow.$.details.params.sowId;
            this.loadById(id);
        }
    };

    setLocalSowName = (name: string) => {
        if (!this.sow.isEditable) {
            return;
        }

        if (this.isCreating) {
            this.sow.setName(name);
        }

        this.localSowName = name;
    };

    openDeleteItemModal = (id: Id) => () => {
        this.isDeleteItemModal = true;
        this.itemToDeleteId = id;
    };

    closeDeleteItemModal = () => {
        this.isDeleteItemModal = false;
        this.itemToDeleteId = undefined;
    };

    deleteSowItem = () => {
        (async () => {
            if (this.itemToDeleteId?.isType('internal') || !this.itemToDeleteId) {
                return;
            }

            const response = await stores.sows.deleteSowItem(this.itemToDeleteId);

            if (!response) {
                return;
            }

            const remainingSowItems = Array.from(this.sow.sowItemList.data)
                .filter(sowItem => !sowItem.id.isEqual(this.itemToDeleteId));

            const updatedOrderSowItems = remainingSowItems.map((sowItem, i) => {
                sowItem.orderNumber = i + 1;
                return sowItem;
            });

            this.sow.sowItemList.set(
                updatedOrderSowItems,
            );

            await stores.sows.updateItemsOrder(this.sow);

            this.closeDeleteItemModal();
        })();
    };

    startReorder = () => {
        this.sorter.sortBy('orderNumber', 'asc');
        this.isMovable = true;
    };

    goBack = () => {
        stores.display.router.$.admin.$.sow.go({});
    };

    saveName = () => {
        (async () => {
            if (this.isSaving || !this.test() || this.isCreating) {
                return;
            }

            this.sow.setName(this.localSowName);

            this.isSaving = true;

            await stores.sows.update(this.sow);

            this.isSaving = false;
        })();
    };

    saveOrder = () => {
        this.isMovable = false;
        stores.sows.updateItemsOrder(this.sow);
    };

    save = () => {
        (async () => {
            if (this.isSaving || !this.test()) {
                return;
            }

            this.isSaving = true;

            if (!this.isCreating) {
                this.sow.setName(this.localSowName);

                await stores.sows.updateSowToMasterSow(this.sow);
                this.loadById(this.sow.id.asNumber());

                this.isSaving = false;
                return;
            }

            const externalSowId = await stores.sows.post(this.sow);

            if (externalSowId === false) {
                this.goBack();
                return;
            }

            this.sow.id.replaceWith(externalSowId);
            stores.sows.sows.data.push(this.sow);

            stores.display.router.$.admin.$.sow.$.details.go({
                sowId: externalSowId.asNumber(),
            });
        })();
    };

    test = () => this.errorListHolder.test();

    openDetails = (itemId: Id) => () => {
        if (!this.sow) {
            return;
        }

        stores.display.router.$.admin.$.sow.$.item.go({
            sowId: this.sow.id.asNumber(),
            itemId: itemId.asNumber(),
        });
    };

    createSowItem = () => {
        if (!this.sow) {
            return;
        }

        stores.display.router.$.admin.$.sow.$.createItem.go({
            sowId: this.sow.id.asNumber(),
        });
    };

    loadById = (id: number) => {
        this.isLoading = true;

        stores.sows.sows.asyncGet(
            Id.init(id, 'external'),
            sow => {
                this.sow = sow;
                this.localSowName = sow.contractName;
                this.isLoading = false;
            },
            this.goBack,
        );
    };
}
