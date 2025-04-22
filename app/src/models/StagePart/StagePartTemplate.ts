import { action } from 'mobx';
import { type Id, Mobx } from '~/api';
import type { StagePart } from '.';
import { StageUnit } from '..';

export class StagePartTemplate {
    templateId?: Id;

    templateUnits: StageUnit[] = [];

    constructor(readonly stagePart: StagePart) {
        makeSafeObservable(this, {
            addNewRow: action,
            removeRow: action,
            copyRow: action,
            moveItem: action,
        });
    }

    addNewRow = () => {
        const newItem = new StageUnit(this.stagePart);
        newItem.forTemplate.templatePartId = this.stagePart.id;

        this.templateUnits.push(newItem);
    };

    removeRow = (id: Id) => {
        this.templateUnits = this.templateUnits.filter(
            item => !item.id.isEqual(id),
        );
    };

    copyRow = (item: StageUnit) => {
        this.templateUnits.push(item.clone());
    };

    moveItem = (a: number, b: number) => {
        const items = Array.from(this.templateUnits);
        const item = items.splice(a, 1)[0];
        items.splice(b, 0, item);

        items.forEach((el, i) => {
            Mobx.extendsObservable(el, {
                orderNumber: i + 1,
            });
        });

        this.templateUnits = items;
    };
}
