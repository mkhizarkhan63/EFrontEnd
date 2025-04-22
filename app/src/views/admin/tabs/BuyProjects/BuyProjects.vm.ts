import type { MenuButton } from '~/bits';
import { LazyModelList, E, lang, restQuery, LazyModelScroller, utils, ErrorListHolder, type Id, T } from '~/api';
import { action, computed, observable } from 'mobx';
import { stores } from '~/stores';
import { FileDataType } from '~/models/FileData';
import { RightSidePanel } from '~/views/PmModule/RightSidePanel';

export class BuyProjectsVm {

    //#region  Objects
    filter = {
        basement: 0,
        additionalFloors: 0,
        outerBlocks: 0,
        isArchitect: true,
        isDeveloper: false,
        isGroundFloor: false,
        isLevellingFloor: false,
        isPentHourFloor: false,
        isPool: false,
    };
    // cardTitle: string = "";
    companySelect: string = "";
    byDefaultCurrentTab = true;
    // isClosed = false;
    projectInfoBoxSelected = E.BuyProject_ProjectType.architecture;
    currentTab: E.BuyProjectMenu = E.BuyProjectMenu.project_information;
    tabTitle: string = lang.dict.get('projectInformation');
    projectFeaturesName: string = "";
    projectFeaturesNameArabic: string = "";
    projectFeaturesList: string[] = [];
    // totalArea: number;

    chipdropdown = [
        { value: 1, name: "1" },
        { value: 2, name: "2" },
        { value: 3, name: "3" },
        { value: 4, name: "4" },
        { value: 5, name: "5" },
        { value: 6, name: "6" }
    ];

    groundFloorOptions =
        [
            { value: 1, name: 'Majlis' },
            { value: 2, name: 'Dining' },
            { value: 3, name: 'Tiolet' },
        ];
    pentHouseOptions = [
        { value: 4, name: "Penthouse 1" },
        { value: 5, name: "Penthouse 2" },
        { value: 6, name: "Penthouse 3" },
        { value: 7, name: "Penthouse 3" },
        { value: 8, name: "Penthouse 3" },
        { value: 9, name: "Penthouse 3" },
    ];
    levellingFloorOptions = [
        { value: 4, name: "levelling 1" },
        { value: 5, name: "levelling 2" },
        { value: 6, name: "levelling 3" },
    ];
    poolOptions = [
        { value: 4, name: "Pool 1" },
        { value: 5, name: "Pool 2" },
        { value: 6, name: "Pool 3" },
    ];

    basementOptions = [
        { value: 1, name: "Basement 1" },
        { value: 2, name: "Basement 2" },
        { value: 3, name: "Basement 3" },

    ]

    additionalFloorOptions = [
        { value: 1, name: "Additional 1" },
        { value: 2, name: "Additional 2" },
        { value: 3, name: "Additional 3" },
    ]

    outerBlockOptions = [
        { value: 1, name: "OuterBlocks 1" },
        { value: 2, name: "OuterBlocks 2" },
        { value: 3, name: "OuterBlocks 3" },
    ]




    selectedGroundFloor: number[] = [];
    selectedPool: number[] = [];
    selectedPentHouse: number[] = [];
    selectedLevellingFloor: number[] = [];


    filesToRemove: string[] = [];
    exteriorFiles: FileDataType[] = [];
    interiorFiles: FileDataType[] = [];
    layoutFiles: FileDataType[] = [];

    projectDrawingFile: FileDataType[] = [];
    projectDocumentFile: FileDataType[] = [];
    marketingBroucherFile: FileDataType[] = [];

    // selectedExteriorTags: number[] = [];
    // selectedInteriorTags: number[] = [];
    // selectedLayoutTags: number[] = [];
    exteriorTagsOptions =
        [
            { value: 1, name: 'Exterior1' },
            { value: 2, name: 'Exterior2' },
            { value: 3, name: 'Exterior3' },
        ];
    interiorTagsoptions =
        [
            { value: 1, name: 'Interior1' },
            { value: 2, name: 'Interior2' },
            { value: 3, name: 'Interior3' },
        ];

    layoutTagsOptions =
        [
            { value: 1, name: 'Layout1' },
            { value: 2, name: 'Layout2' },
            { value: 3, name: 'Layout3' },
        ];
    stepsOrder = [
        E.BuyProjectMenu.project_information,
        E.BuyProjectMenu.project_levels,
        E.BuyProjectMenu.project_images_and_tags,
        // E.BuyProjectMenu.project_features,
        E.BuyProjectMenu.project_documents
    ];
    tabStates: Record<E.BuyProjectMenu, boolean> = {
        [E.BuyProjectMenu.project_information]: false,
        [E.BuyProjectMenu.project_levels]: false,
        [E.BuyProjectMenu.project_images_and_tags]: false,
        // [E.BuyProjectMenu.project_features]: false,
        [E.BuyProjectMenu.project_documents]: false,
    };
    completedTabs: E.BuyProjectMenu[] = [];



    selectedBasement: number[][];
    selectedAdditionalFloor: number[][];
    selectedOuterBlocks: number[][];
    //#endregion


    //#region Constructor
    constructor() {
        this.currentTab = E.BuyProjectMenu.project_information;
        this.selectedBasement = [];
        this.filter.basement = 0;
        this.selectedAdditionalFloor = [];
        this.selectedOuterBlocks = [];
        makeSafeObservable(this, {
            currentTab: observable,
            switchIsClosed: action,
            addProjectFeature: action,
            goToNextStep: action,
            goToBackStep: action,
            goToTab: action,
            companySelectOnchange: action,
            selectProjectType: action,
            setGroundFloorOnChange: action,
            setPentHouseOnChange: action,
            setMultiLevellingOnChange: action,
            setPoolOnChange: action,
            deleteSelectedBasement: action,

            setBasementArea: action,
            setAdditionalFloorArea: action,
            setOuterBlockArea: action,
            setGroundFloorArea: action,
            setPentHouseArea: action,
            setLevellingFloorArea: action,
            setPoolArea: action,
            setExteriorOnChange: action,
            setInteriorOnChange: action,
            setLayoutOnChange: action,
            totalArea: computed
        });
    }

    //#endregion

    //#region  Settings
    goToTab = (tab: E.BuyProjectMenu) => {
        this.currentTab = tab;
        if (tab === E.BuyProjectMenu.project_information)
            this.tabTitle = lang.dict.get('projectInformation')
        if (tab === E.BuyProjectMenu.project_levels)
            this.tabTitle = lang.dict.get('projectLevel')
        if (tab === E.BuyProjectMenu.project_images_and_tags)
            this.tabTitle = lang.dict.get('projectsImagesAndTages')
        // if (tab === E.BuyProjectMenu.project_features)
        //     this.tabTitle = lang.dict.get('projectFeatures')
        if (tab === E.BuyProjectMenu.project_documents)
            this.tabTitle = lang.dict.get('projectDocument')
    };

    goBack = () => stores.display.router.goBack();

    get menuItems(): Array<MenuButton<E.BuyProjectMenu>> {
        return [
            {
                value: E.BuyProjectMenu.project_information,
                name: lang.dict.enum('buyProjectMenu', E.BuyProjectMenu.project_information),
                onClick: () => this.goToTab(E.BuyProjectMenu.project_information),
            },
            {
                value: E.BuyProjectMenu.project_levels,
                name: lang.dict.enum('buyProjectMenu', E.BuyProjectMenu.project_levels),
                onClick: () => this.goToTab(E.BuyProjectMenu.project_levels),
            },
            {
                value: E.BuyProjectMenu.project_images_and_tags,
                name: lang.dict.enum('buyProjectMenu', E.BuyProjectMenu.project_images_and_tags),
                onClick: () => this.goToTab(E.BuyProjectMenu.project_images_and_tags),
            },
            // {
            //     value: E.BuyProjectMenu.project_features,
            //     name: lang.dict.enum('buyProjectMenu', E.BuyProjectMenu.project_features),
            //     onClick: () => this.goToTab(E.BuyProjectMenu.project_features),
            // },
            {
                value: E.BuyProjectMenu.project_documents,
                name: lang.dict.enum('buyProjectMenu', E.BuyProjectMenu.project_documents),
                onClick: () => this.goToTab(E.BuyProjectMenu.project_documents),
            },

        ];
    }


    goToNextStep = () => {
        const currentIndex = this.stepsOrder.indexOf(this.currentTab);
        if (currentIndex < this.stepsOrder.length - 1) {
            if (!this.completedTabs.includes(this.currentTab)) {
                this.completedTabs.push(this.currentTab);
            }
            this.tabStates[this.currentTab] = true;
            this.currentTab = this.stepsOrder[currentIndex + 1];
            this.tabStates[this.currentTab] = false;
            this.goToTab(this.currentTab)
        }
    }

    goToBackStep = () => {
        const currentIndex = this.stepsOrder.indexOf(this.currentTab);
        if (currentIndex <= this.stepsOrder.length - 1) {
            // if (!this.completedTabs.includes(this.currentTab)) {
            //     this.completedTabs.push(this.currentTab);
            // }
            // this.tabStates[this.currentTab] = true;
            this.currentTab = this.stepsOrder[currentIndex - 1];
            // this.tabStates[this.currentTab] = false;
            this.goToTab(this.currentTab)
        }
    }

    isMenuItemActive = (page: E.BuyProjectMenu) => {
        return page === this.currentTab

    };
    isMenuItemCompleted = (page: E.BuyProjectMenu) => {

        return this.completedTabs.includes(page);

    }

    isTabOpen(tab: E.BuyProjectMenu): boolean {
        return this.completedTabs.includes(tab) || this.currentTab === tab;
    }


    // Method to check if a specific tab is closed
    isTabClosed(tab: E.BuyProjectMenu): boolean {
        return this.tabStates[tab];
    }

    switchIsClosed = (tab: E.BuyProjectMenu) => {

        if (tab === E.BuyProjectMenu.project_information) {
            if (this.tabStates[tab]) {

                this.tabStates[tab] = false

            }
            else
                this.tabStates[tab] = true
        }
        if (tab === E.BuyProjectMenu.project_levels) {
            if (this.tabStates[tab])
                this.tabStates[tab] = false
            else
                this.tabStates[tab] = true
        }
        if (tab === E.BuyProjectMenu.project_images_and_tags) {
            if (this.tabStates[tab])
                this.tabStates[tab] = false
            else
                this.tabStates[tab] = true
        }
        // if (tab === E.BuyProjectMenu.project_features) {
        //     if (this.tabStates[tab])
        //         this.tabStates[tab] = false
        //     else
        //         this.tabStates[tab] = true
        // }
        if (tab === E.BuyProjectMenu.project_documents) {
            if (this.tabStates[tab])
                this.tabStates[tab] = false
            else
                this.tabStates[tab] = true
        }


        const tabIndex = this.stepsOrder.indexOf(tab);

        for (let index = this.stepsOrder.length - 1; index >= tabIndex; index--) {

            // const value = this.completedTabs.indexOf(this.stepsOrder[index])
            const value = this.stepsOrder.indexOf(this.stepsOrder[index])
            this.completedTabs.splice(value, 1);
        }
        // const tabIndex = this.completedTabs.indexOf(tab)
        // if (tabIndex !== -1) {
        //     for (let index = 0; index <= tabIndex; index++) {

        //         this.completedTabs = this.completedTabs.filter(x => this.stepsOrder.indexOf(x) !== index);
        //     }
        //     //   const index = this.stepsOrder.indexOf(tab);
        //     //  this.completedTabs = this.completedTabs.filter(x => x !== tab);
        // }
        this.goToTab(tab);
        return this.tabStates[tab]
    };

    isMenuItemChosen = (page: E.BuyProjectMenu) => {

        if (page === E.BuyProjectMenu.project_information) {

            return this.byDefaultCurrentTab;

        } else {
            this.byDefaultCurrentTab = false;
            return this.byDefaultCurrentTab;
        }

    };


    // setCardTitle = (val: string) => {
    //     this.cardTitle = val;
    // }

    //#endregion

    //#region Project Info
    companySelectOnchange = (type: string) => {
        this.companySelect = type;
    }
    selectProjectType = (val: number) => {

        if (val == E.BuyProject_ProjectType.architecture) {
            this.projectInfoBoxSelected = val;
            this.filter.isDeveloper = false;
            this.filter.isArchitect = true;

        }
        else {
            this.projectInfoBoxSelected = val;
            this.filter.isArchitect = false;
            this.filter.isDeveloper = true;
        }
    };
    //#endregion

    //#region Project Level

    setBasement = (val: number) => {
        this.filter.basement = val;
    }

    setOuterBlocks = (val: number) => {
        this.filter.outerBlocks = val;
    }

    setAdditionalFloors = (val: number) => {
        this.filter.additionalFloors = val;
    }
    setGroundFloor = (val: boolean) => {
        this.filter.isGroundFloor = val;
        this.setGroundFloorArea(0)
    }

    setLevellingFloor = (val: boolean) => {
        this.filter.isLevellingFloor = val;
        this.setLevellingFloorArea(0)
    }

    setPentHouseFloor = (val: boolean) => {
        this.filter.isPentHourFloor = val;
        this.setPentHouseArea(0)
    }

    setPool = (val: boolean) => {
        this.filter.isPool = val;
        this.setPoolArea(0)
    }

    // setBasementOnChange = (level: number, val: number[]) => {
    //     this.selectedBasement = [
    //         ...this.selectedBasement.slice(0, level), // Keep items before the index
    //         val,                                     // Replace the item at the index
    //         ...this.selectedBasement.slice(level + 1), // Keep items after the index
    //     ];
    // }
    // setBasementOnChange = (level: number, val: number[]) => {
    //     // Ensure the array has enough slots for the specified level
    //     if (level >= this.selectedBasement.length) {
    //         // Expand the array by filling the gap with empty arrays or default values
    //         this.selectedBasement = [
    //             ...this.selectedBasement,
    //             ...Array(level - this.selectedBasement.length + 1).fill([]),
    //         ];
    //     }

    //     // Now update the selectedBasement at the specified level
    //     this.selectedBasement = [
    //         ...this.selectedBasement.slice(0, level),  // Keep items before the index
    //         val,                                       // Replace the item at the index
    //         ...this.selectedBasement.slice(level + 1), // Keep items after the index
    //     ];
    // };


    setBasementOnChange = (level: number, val: number[]) => {
        if (this.selectedBasement.length <= level) {
            this.selectedBasement = [
                ...this.selectedBasement,
                ...Array(level - this.selectedBasement.length + 1).fill([]),
            ];
        }

        this.selectedBasement[level] = val;
    };

    deleteSelectedBasement = (index: number) => {

        this.selectedBasement.splice(index, 1);
        this.basementAreas.splice(index, 1);

        const count = this.filter.basement > 0 ? this.filter.basement - 1 : 0;
        this.setBasement(count);
    }

    deletedSelectedAdditionalFloor = (index: number) => {
        // const additionalFloor = this.filter.additionalFloors ? this.filter.additionalFloors - 1 : this.filter.additionalFloors;
        // this.setAdditionalFloors(additionalFloor);
        this.selectedAdditionalFloor.splice(index, 1);
        this.additionalFloorAreas.splice(index, 1);

        const count = this.filter.additionalFloors > 0 ? this.filter.additionalFloors - 1 : 0;
        this.setAdditionalFloors(count);

    }

    deletedSelectedOuterBlocks = (index: number) => {
        // const outerBlocks = this.filter.outerBlocks ? this.filter.outerBlocks - 1 : this.filter.outerBlocks;
        // this.setOuterBlocks(outerBlocks);

        this.selectedOuterBlocks.splice(index, 1);
        this.outerBlockAreas.splice(index, 1);

        const count = this.filter.outerBlocks > 0 ? this.filter.outerBlocks - 1 : 0;
        this.setOuterBlocks(count);
    }


    setAdditionalFloorsOnChange = (level: number, val: number[]) => {

        if (this.selectedAdditionalFloor.length <= level) {
            this.selectedAdditionalFloor = [
                ...this.selectedAdditionalFloor,
                ...Array(level - this.selectedAdditionalFloor.length + 1).fill([]),
            ];
        }

        this.selectedAdditionalFloor[level] = val;
    }

    setouterBlocksOnChange = (level: number, val: number[]) => {
        if (this.selectedOuterBlocks.length <= level) {
            this.selectedOuterBlocks = [
                ...this.selectedOuterBlocks,
                ...Array(level - this.selectedOuterBlocks.length + 1).fill([]),
            ];
        }

        this.selectedOuterBlocks[level] = val;
    }

    setGroundFloorOnChange = (val: number[]) => {
        this.selectedGroundFloor = val;
    }

    setPentHouseOnChange = (val: number[]) => {
        this.selectedPentHouse = val;
    }

    setMultiLevellingOnChange = (val: number[]) => {
        this.selectedLevellingFloor = val;
    }

    setPoolOnChange = (val: number[]) => {
        this.selectedPool = val;
    }


    //#endregion

    //#region ProjectImages

    exteriorTagName: string = "";
    exteriorTagNameArabic: string = "";
    exteriorTagList: string[] = []
    setExteriorOnChange = () => {
        if (this.exteriorTagName && this.exteriorTagNameArabic) {

            const modifiedData = `${this.exteriorTagName} | ${this.exteriorTagNameArabic}`;
            if (!this.exteriorTagList.includes(modifiedData))
                this.exteriorTagList.push(modifiedData);
        }
        this.exteriorTagName = "";
        this.exteriorTagNameArabic = "";
    }

    interiorTagName: string = "";
    interiorTagNameArabic: string = "";
    interiorTagList: string[] = [];
    setInteriorOnChange = () => {
        if (this.interiorTagName && this.interiorTagNameArabic) {

            const modifiedData = `${this.interiorTagName} | ${this.interiorTagNameArabic}`;
            if (!this.interiorTagList.includes(modifiedData))
                this.interiorTagList.push(modifiedData);
        }
        this.interiorTagName = "";
        this.interiorTagNameArabic = "";
    }


    layoutTagName: string = "";
    layoutTagNameArabic: string = "";
    layoutTagList: string[] = [];

    setLayoutOnChange = () => {
        if (this.layoutTagName && this.layoutTagNameArabic) {

            const modifiedData = `${this.layoutTagName} | ${this.layoutTagNameArabic}`;
            if (!this.layoutTagList.includes(modifiedData))
                this.layoutTagList.push(modifiedData);
        }
        this.layoutTagName = "";
        this.layoutTagNameArabic = "";

    }


    uploadLayoutFile = (file: FileDataType) => {
        file.loadImg();
        this.layoutFiles.push(file)
    }

    removingLayoutFile = (file: FileDataType) => {
        this.layoutFiles = this.layoutFiles.filter(x => x.id !== file.id);
        if (file.isExternal) {
            this.filesToRemove.push(file.fileId);
        }
    }

    uploadExteriorFile = (file: FileDataType) => {
        file.loadImg();
        this.exteriorFiles.push(file)
    }
    removingExteriorFile = (file: FileDataType) => {
        this.exteriorFiles = this.exteriorFiles.filter(x => x.id !== file.id);
        if (file.isExternal) {
            this.filesToRemove.push(file.fileId);
        }
    }


    uploadInteriorFile = (file: FileDataType) => {
        file.loadImg();
        this.interiorFiles.push(file);

    }
    removingInteriorFile = (file: FileDataType) => {
        this.interiorFiles = this.interiorFiles.filter(x => x.id !== file.id);
        if (file.isExternal) {
            this.filesToRemove.push(file.fileId);
        }
    }
    //#endregion

    //#region Project Features

    addProjectFeature = () => {
        if (this.projectFeaturesName && this.projectFeaturesNameArabic) {

            const modifiedData = `${this.projectFeaturesName} | ${this.projectFeaturesNameArabic}`;
            if (!this.projectFeaturesList.includes(modifiedData))
                this.projectFeaturesList.push(modifiedData);
        }
        this.projectFeaturesName = "";
        this.projectFeaturesNameArabic = "";
    }

    //#endregion

    //#region Project Documents
    uploadProjectDrawing = (file: FileDataType) => {
        file.loadImg();
        this.projectDrawingFile.push(file)
    }

    removingProjectDrawing = (file: FileDataType) => {
        this.projectDrawingFile = this.projectDrawingFile.filter(x => x.id !== file.id);
        if (file.isExternal) {
            this.filesToRemove.push(file.fileId);
        }
    }


    uploadProjectDocuments = (file: FileDataType) => {
        file.loadImg();
        this.projectDocumentFile.push(file)
    }

    removingProjectDocuments = (file: FileDataType) => {
        this.projectDocumentFile = this.projectDocumentFile.filter(x => x.id !== file.id);
        if (file.isExternal) {
            this.filesToRemove.push(file.fileId);
        }
    }

    uploadMarketingBroucher = (file: FileDataType) => {
        file.loadImg();
        this.marketingBroucherFile.push(file)
    }

    removingMarketingBroucher = (file: FileDataType) => {
        this.marketingBroucherFile = this.marketingBroucherFile.filter(x => x.id !== file.id);
        if (file.isExternal) {
            this.filesToRemove.push(file.fileId);
        }
    }
    //#endregion



    basementAreas: number[] = [];
    additionalFloorAreas: number[] = [];
    outerBlockAreas: number[] = [];
    groundFloorArea: number = 0;
    pentHouseArea: number = 0;
    poolArea: number = 0;
    levellingFloorArea: number = 0;

    setBasementArea(index: number, value: number) {
        this.basementAreas[index] = value;
    }

    setAdditionalFloorArea(index: number, value: number) {
        this.additionalFloorAreas[index] = value;
    }

    setOuterBlockArea(index: number, value: number) {
        this.outerBlockAreas[index] = value;
    }

    setGroundFloorArea(value: number) {
        this.groundFloorArea = value;
    }

    setPentHouseArea(value: number) {
        this.pentHouseArea = value;
    }

    setPoolArea(value: number) {
        this.poolArea = value;
    }

    setLevellingFloorArea(value: number) {
        this.levellingFloorArea = value;
    }

    get totalArea(): number {

        const totalBasementArea = this.basementAreas.reduce((acc, area) => acc + area, 0);
        const totalAdditionalFloorArea = this.additionalFloorAreas.reduce((acc, area) => acc + area, 0);
        const totalOuterBlockArea = this.outerBlockAreas.reduce((acc, area) => acc + area, 0);

        return (
            totalBasementArea +
            totalAdditionalFloorArea +
            totalOuterBlockArea +
            this.groundFloorArea +
            this.pentHouseArea +
            this.poolArea +
            this.levellingFloorArea
        );
    }


}