import { action } from 'mobx';
import { Id, Mobx } from '~/api';
import { TextNumber } from '~/utils';
import type { SowItem } from '../Sow';
import type { StagePart } from '../StagePart';
import { StageUnitPlan } from './StageUnitPlan';
import { StageUnitPlanContract } from './StageUnitPlanContract';
import { StageUnitProjectBid } from './StageUnitProjectBid';
import { StageUnitTemplate } from './StageUnitTemplate';

export class StageUnit {
    id = Id.init();

    sowItems: Id[] = [];

    orderNumber = 0;

    stageName = '';

    suggestedPercentage = new TextNumber(undefined, 2);

    suggestedTime = new TextNumber(undefined, 8);

    description = '';

    stageNameArabic = '';

    descriptionArabic = '';

    forPlan = new StageUnitPlan(this);

    forTemplate = new StageUnitTemplate(this);

    forContract = new StageUnitPlanContract(this);

    forProjectBid = new StageUnitProjectBid(this);

    consultantVisits = 0;

    // For local use

    isOpen = false;

    constructor(readonly stagePart: StagePart) {
        makeSafeObservable(this, {
            toggleOpen: action,
            removeItem: action,
            setDescription: action,
            setDescriptionArabic: action,
            setName: action,
            setSuggested: action,
            setNameArabic: action,
            addSowItem: action,
            clone: action,
            setConsultantVisits: action,
            calculatePerVisits: action,
            setSuggestedTime: action,
        });
    }

    toggleOpen = () => {
        this.isOpen = !this.isOpen;
    };

    removeItem = (id: Id, isEditable: boolean) => {
        if (!isEditable) {
            return;
        }

        this.sowItems = this.sowItems.filter(item => !item.isEqual(id));
    };

    setName = (value: string, isEditable: boolean) => {
        if (!isEditable) {
            return;
        }

        this.stageName = value;
    };

    setSuggested = (value: string, isEditable: boolean) => {
        if (!isEditable) {
            return;
        }

        this.suggestedPercentage.setText(value);
    };

    setSuggestedTime = (value: string, isEditable: boolean) => {
        if (!isEditable) {
            return;
        }

        this.suggestedTime.setText(value);
    };

    setDescription = (value: string, isEditable: boolean) => {
        if (!isEditable) {
            return;
        }

        this.description = value;
    };

    setDescriptionArabic = (value: string, isEditable: boolean) => {
        if (!isEditable) {
            return;
        }

        this.descriptionArabic = value;
    };

    setNameArabic = (value: string, isEditable: boolean) => {
        if (!isEditable) {
            return;
        }

        this.stageNameArabic = value;
    };

    addSowItem = (item: SowItem, isEditable: boolean) => {
        if (!isEditable) {
            return;
        }

        for (const sowItem of this.sowItems) {
            if (sowItem.isEqual(item.id)) {
                return;
            }
        }

        item.setUseTimes(item.sowItemUseTimes + 1);

        this.sowItems.push(item.id);
    };

    clone = () => {
        const cloneUnit = new StageUnit(this.stagePart);

        const cloneForPlan = this.forPlan.clone();
        const cloneForTemplate = this.forTemplate.clone();
        const cloneForProjectBid = this.forProjectBid.clone();

        return Mobx.extendsObservable(cloneUnit, {
            stageName: this.stageName,
            description: this.description,
            descriptionArabic: this.descriptionArabic,
            stageNameArabic: this.stageNameArabic,
            suggestedPercentage: new TextNumber(this.suggestedPercentage.value, 2),
            suggestedTime: new TextNumber(this.suggestedTime.value, 8),
            sowItems: Array.from(this.sowItems),
            forPlan: cloneForPlan,
            forTemplate: cloneForTemplate,
            forProjectBid: cloneForProjectBid,
        });
    };

    setConsultantVisits = (visits: number) => {
        this.consultantVisits = visits;
    };

    calculatePerVisits = (price?: number) => {
        if (!price) {
            return 0;
        }

        return this.consultantVisits * price;
    };
}
