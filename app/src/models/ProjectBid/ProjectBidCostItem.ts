import { action } from 'mobx';
import { E, Id, lang, utils } from '~/api';
import type { ProjectBidCost } from './ProjectBidCost';

export class ProjectBidCostItem {
    id = Id.init();

    name = '';

    translationKey = '';

    quantity = 0;

    quantityUnit = E.QuantityUnits.m2; // TODO this is string in api

    price = 0;

    bidCostId?: Id;

    constructor(readonly projectBidCost: ProjectBidCost) {
        makeSafeObservable(this, {
            changeName: action,
            setPrice: action,
            setQuantity: action,
            setQuantityUnit: action,
        });

        this.bidCostId = projectBidCost.id;
    }

    get quantityUnits() {
        return [
            {
                value: E.QuantityUnits.m2,
                name: lang.dict.get('m2'),
            },
            {
                value: E.QuantityUnits.tons,
                name: lang.dict.get('tons'),
            },
        ];
    }

    changeName = (value: string) => {
        this.name = value;
    };

    setPrice = (value: string) => {
        this.price = utils.fromInputNumber(value);
    };

    setQuantity = (value: string) => {
        this.quantity = utils.fromInputNumber(value);
    };

    setQuantityUnit = (value: E.QuantityUnits) => {
        this.quantityUnit = value;
    };
}
