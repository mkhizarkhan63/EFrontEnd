import { LazyData, restQuery, type E } from '~/api';
import { type SowItem, SowItemByProjectType } from '~/models';

export class SowItemsByProjectTypeVm {
    projectSowItems: LazyData<SowItemByProjectType>;

    // isSowItemUnitModalOpened = false;

    currentSowItem?: SowItem;

    constructor(
        private type: E.ConstructionType,
        private sowId?: number,
    ) {
        makeSafeObservable(this, {
            // openSowItemUnitsModal: action,
        });

        this.projectSowItems = new LazyData(
            'sowItemByProject',
            () => restQuery.sow.getSowItemsByTypeProject(type, sowId),
            new SowItemByProjectType(),
        );
    }

    get projectItemsData() {
        return this.projectSowItems.data;
    }

    // openSowItemUnitsModal = (sowItemId: number) => {
    //     (async () => {
    //         const sowItem = await restQuery.sow.getSowItem(sowItemId);

    //         if (!sowItem) {
    //             return;
    //         }

    //         this.currentSowItem = sowItem;
    //         this.isSowItemUnitModalOpened = true;
    //     })();
    // };

    // closeSowItemUnitsModal = () => {
    //     this.isSowItemUnitModalOpened = false;
    //     this.currentSowItem = undefined;
    // };
}
