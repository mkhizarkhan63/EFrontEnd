import { action } from "mobx";
import { E, lang } from "~/api";
import { MenuButton } from "~/bits";
import { stores } from "~/stores";



// const TEMPLATE_SIZING_ORDER = [
//     E.CompanyManagementSizing.projectSizes,
//     E.CompanyManagementSizing.forConsultant,
//     E.CompanyManagementSizing.forContractor,
//     E.CompanyManagementSizing.forArchitect,
// ];

export class CompanyManagementVm {

    inputField: string = "";
    inputFieldArabic: string = "";
    documentInformation: string = "";
    documentInformationArabic: string = "";
    isSizingType: boolean = false;
    inputFieldTagList: string[] = [];
    documentSubmissionFieldTagList: string[] = [];

    constructor() {
        makeSafeObservable(this, {
            createBadge: false

        });

    }

    goBack = () => stores.display.router.goBack();

    addInputFieldTags = () => {
        if (this.inputField && this.inputFieldArabic) {

            const modifiedData = `${this.inputField} | ${this.inputFieldArabic}`;
            if (!this.inputFieldTagList.includes(modifiedData))
                this.inputFieldTagList = [...this.inputFieldTagList, modifiedData];
        }
        this.inputField = "";
        this.inputFieldArabic = "";
    }

    addDocumentSubmissionFieldTags = () => {
        if (this.documentInformation && this.documentInformationArabic) {

            const modifiedData = `${this.documentInformation} | ${this.documentInformationArabic}`;
            if (!this.documentSubmissionFieldTagList.includes(modifiedData))
                this.documentSubmissionFieldTagList = [...this.documentSubmissionFieldTagList, modifiedData];
        }
        this.documentInformation = "";
        this.documentInformationArabic = "";
    }

    deleteInputFieldTags = (value: string) => {
        this.inputFieldTagList = this.inputFieldTagList.filter(x => x !== value);
    }

    deleteDocumentSubmissionFieldTags = (value: string) => {
        this.documentSubmissionFieldTagList = this.documentSubmissionFieldTagList.filter(x => x !== value);
    }

    toggleProject = (type: E.CompanyManagementFilter) => () => {
        if (type === E.CompanyManagementFilter.badges) {
            this.setSizingType(true);
            return;
        }

        this.setSizingType(false);
    };

    get isSizing() {
        return !this.isSizingType;
    }

    setSizingType = (isSizing: boolean) => {
        this.isSizingType = isSizing;
    };

    private openAccordion: Set<E.CompanyManagementSizing> = new Set([
        E.CompanyManagementSizing.projectSizes,
        E.CompanyManagementSizing.forConsultant,
        E.CompanyManagementSizing.forContractor,
        E.CompanyManagementSizing.forArchitect,
    ]);

    get menuItems(): Array<MenuButton<E.CompanyManagementSizing>> {
        return [
            {
                value: E.CompanyManagementSizing.projectSizes,
                name: lang.dict.enum('companyManagementSizing', E.CompanyManagementSizing.projectSizes),
                //onClick: () => this.goToTab(E.BuyProjectMenu.project_information),
                isDisabled: this.openAccordion.has(E.CompanyManagementSizing.projectSizes) ? true : false
            },
            {
                value: E.CompanyManagementSizing.forConsultant,
                name: lang.dict.enum('companyManagementSizing', E.CompanyManagementSizing.forConsultant),
                //onClick: () => this.goToTab(E.BuyProjectMenu.project_levels),
                isDisabled: this.openAccordion.has(E.CompanyManagementSizing.forConsultant) ? true : false
            },
            {
                value: E.CompanyManagementSizing.forContractor,
                name: lang.dict.enum('companyManagementSizing', E.CompanyManagementSizing.forContractor),
                // onClick: () => this.goToTab(E.BuyProjectMenu.project_images_and_tags),
                isDisabled: this.openAccordion.has(E.CompanyManagementSizing.forContractor) ? true : false
            },

            {
                value: E.CompanyManagementSizing.forArchitect,
                name: lang.dict.enum('companyManagementSizing', E.CompanyManagementSizing.forArchitect),
                //onClick: () => this.goToTab(E.BuyProjectMenu.project_documents),
                isDisabled: this.openAccordion.has(E.CompanyManagementSizing.forArchitect) ? true : false
            },

        ];
    }


    accordionToggle = (accodionName: E.CompanyManagementSizing) => {
        if (this.openAccordion.has(accodionName))
            this.openAccordion.delete(accodionName);
        else
            this.openAccordion.add(accodionName);
    }

    get badgesList() {
        return stores.badges.badgesListing
    }

    get badgesListSorter() {
        return this.badgesList.paging.modifySorter;
    }

    createBadge = () => {
        stores.display.router.$.admin.$.company.$.createbadge.go({ adminView: true });
    }
}