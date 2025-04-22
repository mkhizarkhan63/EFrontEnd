import { action } from 'mobx';
import { Id } from '~/api';
import type { SowItem } from './SowItem';
import type { SowSubitem } from './SowSubitem';

export class SowItemConstruction {
    sowId = Id.none();

    showItemInFrontend = true;

    isMandatory = true;

    sowSubItems: SowSubitem[] = [];

    constructor(readonly sowItem: SowItem) {
        makeSafeObservable(this, {
            toggleShowItemInFrontend: action,
            toggleIsMandatory: action,
            addSubitem: false,
            copySubitem: false,
            moveSubitem: false,
            removeSubitem: false,
            refreshSowSubItemList: false,
        });
    }

    toggleShowItemInFrontend = () => {
        this.showItemInFrontend = !this.showItemInFrontend;
    };

    toggleIsMandatory = () => {
        this.isMandatory = !this.isMandatory;
    };

    addSubitem = (newSubitem: SowSubitem) => {
        newSubitem.orderNumber = this.sowSubItems.length;
        this.sowSubItems.push(newSubitem);
    };

    removeSubitem = (id: Id) => {
        this.sowSubItems = this.sowSubItems.filter(item => !item.id.isEqual(id));
        this.refreshSowSubItemList();
    };

    copySubitem = (subitem: SowSubitem) => {
        const index = this.sowSubItems.findIndex(x => x.id.isEqual(subitem.id));

        if (index < 0) {
            return;
        }

        const newSubItem = subitem.clone();

        const items = Array.from(this.sowSubItems);
        items.splice(index + 1, 0, newSubItem);
        this.refreshSowSubItemList(items);

        return newSubItem;
    };

    moveSubitem = (a: number, b: number) => {
        const items = Array.from(this.sowSubItems);
        const item = items.splice(a, 1).find(() => true);

        if (!item) {
            return;
        }

        items.splice(b, 0, item);
        this.refreshSowSubItemList(items);
    };

    refreshSowSubItemList = (items?: SowSubitem[]) => {
        if (items) {
            this.sowSubItems = items.map((el, i) => {
                el.orderNumber = i;
                el.isChanged = true;
                return el;
            });

            return;
        }

        this.sowSubItems = this.sowSubItems.map((el, i) => {
            el.orderNumber = i;
            el.isChanged = true;
            return el;
        });
    };
}
