import { action, runInAction } from 'mobx';
import { ErrorListHolder, Id, T } from '~/api';
import { Workflow } from '../Workflow';
import { utilsString } from '~/utils';

const struct = (supplierName: string, rate: string) => T.type({
    titleEnglish: T.size(T.string(), 3, 64),
    englishDescription: T.size(T.string(), 3, 4000),
    titleArabic: T.size(T.string(), 3, 64),
    arabicDescription: T.size(T.string(), 3, 4000),
    ...supplierName.length > 0 ? { supplier: T.size(T.string(), 1, 64) } : {},
    ...rate.length > 0 ? { rate: T.size(T.string(), 1, 999) } : {},
});

export class SowSubitem {
    id = Id.init();

    sowItemId = Id.none();

    orderNumber = 0;

    englishDescription = '';

    arabicDescription = '';

    titleEnglish = '';

    titleArabic = '';

    supplier = '';

    rate = '';

    acceptanceWorkflowName = '';

    errorListHolder = new ErrorListHolder(
        () => this,
        () => struct(this.supplier, this.rate),
    );

    isChanged = false;

    workflow = new Workflow();

    constructor() {
        makeSafeObservable(this, {
            setDescArabic: action,
            setDescEnglish: action,
            setTitleArabic: action,
            setTitleEnglish: action,
            setSupplier: action,
            setRate: action,
            setWorkflow: action,
            clear: action,
            setIsChanged: false,
        });
    }

    get shownOrder() {
        return this.orderNumber !== Infinity ? this.orderNumber + 1 : null;
    }

    get hasWorkflow() {
        return this.workflow.typeId.isType('external');
    }

    clear = () => {
        this.workflow.clear();
        this.acceptanceWorkflowName = '';
    };

    setIsChanged = (isChanged: boolean) => {
        this.isChanged = isChanged;
    };

    setDescEnglish = (descEnglish: string) => {
        this.englishDescription = descEnglish;
    };

    setTitleEnglish = (titleEnglish: string) => {
        this.titleEnglish = titleEnglish;
    };

    setDescArabic = (descArabic: string) => {
        this.arabicDescription = descArabic;
    };

    setTitleArabic = (titleArabic: string) => {
        this.titleArabic = titleArabic;
    };

    setSupplier = (value: string) => {
        this.supplier = value;
    };

    setRate = (rate: string) => {
        this.rate = utilsString.toRates(rate);
    };

    setWorkflow = (workflow: Workflow) => {
        if (this.workflow.sowId.isType('external') && workflow.sowId.isType('internal')) {
            workflow.sowId.replaceWith(this.workflow.sowId);
        }

        this.workflow = workflow;
    };

    clone = () => {
        const newItem = new SowSubitem();

        runInAction(() => {
            newItem.titleEnglish = this.titleEnglish;
            newItem.englishDescription = this.englishDescription;
            newItem.arabicDescription = this.arabicDescription;
            newItem.titleArabic = this.titleArabic;
            newItem.sowItemId = this.sowItemId;
            newItem.supplier = this.supplier;
            newItem.rate = this.rate;
            newItem.workflow.setTypeId(this.workflow.typeId);
        });

        return newItem;
    };
}
