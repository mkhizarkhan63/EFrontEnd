import { makeAutoObservable, runInAction } from 'mobx';

export class SowWorkflow {
    id = '';

    workflowType = '';

    workEnglishTitle = '';

    workArabictitle = '';

    englishDescription = '';

    arabicDescription = '';

    clientEnglishTitle = '';

    clientArabicTitle = '';

    contractorEnglishTitle = '';

    contractorArabictitle = '';

    constructor() {
        makeAutoObservable(this);
    }

    setWorkFlowType = (txt: string) => {
        this.workflowType = txt;
    };

    setWorkEnglishTitle = (txt: string) => {
        this.workEnglishTitle = txt;
    };

    setWorkArabictitle = (txt: string) => {
        this.workArabictitle = txt;
    };

    setEnglishDescription = (txt: string) => {
        this.englishDescription = txt;
    };

    setArabicDescription = (txt: string) => {
        this.arabicDescription = txt;
    };

    setClientEnglishTitle = (txt: string) => {
        this.clientEnglishTitle = txt;
    };

    setClientArabicTitle = (txt: string) => {
        this.clientArabicTitle = txt;
    };

    setContractorEnglishTitle = (txt: string) => {
        this.contractorEnglishTitle = txt;
    };

    setContractorArabictitle = (txt: string) => {
        this.contractorArabictitle = txt;
    };

    get workflow() {
        return [
            {
                name: 'Type 1',
                value: 'Type 1',
            },
            {
                name: 'Type 2',
                value: 'Type 2',
            },
            {
                name: 'Type 3',
                value: 'Type 3',
            },
            {
                name: 'Type 4',
                value: 'Type 4',
            },
        ];
    }

    setWorkflowType = (el: string) => {
        this.workflowType = el;
    };

    static createMock(i = 0) {
        const item = new SowWorkflow();

        runInAction(() => {
            item.id = String(i);
            item.workflowType = '';
            item.workEnglishTitle = '';
            item.workArabictitle = '';
            item.englishDescription = '';
            item.arabicDescription = '';
            item.clientEnglishTitle = '';
            item.clientArabicTitle = '';
            item.contractorEnglishTitle = '';
            item.contractorArabictitle = '';
        });

        return item;
    }
}
