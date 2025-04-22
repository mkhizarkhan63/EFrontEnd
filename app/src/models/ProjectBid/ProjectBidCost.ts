import { action } from 'mobx';
import { E, Id, utils } from '~/api';
import type { ProjectBid } from './ProjectBid';
import { ProjectBidCostItem } from './ProjectBidCostItem';

export class ProjectBidCost {
    id = Id.init();

    constructionType?: E.ConstructionType;

    isRawValueView = false;

    totalPrice = 0;

    bidId?: Id;

    costItems: ProjectBidCostItem[] = [];

    constructor(readonly projectBid: ProjectBid) {
        makeSafeObservable(this, {
            toggleRawValueView: action,
            setPrice: action,
            removeItem: action,
            addItem: action,
        });
    }

    get itemTotalPrice() {
        if (this.costItems.length === 0) {
            return 0;
        }

        return this.costItems.reduce((sum, current) => sum + current.price, 0);
    }

    toggleRawValueView = () => {
        this.isRawValueView = !this.isRawValueView;
    };

    get totalPricePerMeter() {
        return this.totalPrice / this.projectBid.project.addedBuiltUpArea;
    }

    setPrice = (price: string) => {
        const inputValue = utils.fromInputNumber(price);

        const newTotalPrice = this.isRawValueView
            ? inputValue
            : inputValue * this.projectBid.project.addedBuiltUpArea;

        this.totalPrice = newTotalPrice;

        if (this.constructionType === E.ConstructionType.turnKey) {
            this.projectBid.setTotalPrice(newTotalPrice);
        }
    };

    removeItem = (id: Id) => () => {
        this.costItems = this.costItems.filter(item => !item.id.isEqual(id));
    };

    addItem = () => {
        if (this.id.isType('internal')) {
            return;
        }

        this.costItems.push(new ProjectBidCostItem(this));
    };
}
