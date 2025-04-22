import { action } from 'mobx';
import { E, Id, lang, utils } from '~/api';
import { stores } from '~/stores';
import { utilsNumber } from '~/utils';
import { type FileDataType } from '../FileData';
import { ProjectDraftAdmin } from './ProjectDraftAdmin';

export class ProjectDraft {
    id = Id.init();

    clientId?: Id;

    designId?: Id;

    governorateId?: Id;

    wilayatId?: Id;

    landArea = 0;

    addedBuiltUpArea = 0;

    landType = E.ConstructionLand.residential;

    constructionType = E.ConstructionType.structureOnly;

    buildingAllAreaInTheDrawings = true;

    startingStep = E.ProjectStartingStep.design;

    drawingsFiles: FileDataType[] = [];

    krookieFiles: FileDataType[] = [];

    filesToRemove: string[] = [];

    additionalComment = '';

    stageTemplateId?: Id;

    forAdmin = new ProjectDraftAdmin(this);

    constructor() {
        makeSafeObservable(this, {
            setGovernorate: action,
            setWilayat: action,
            setArea: action,
            setLandType: action,
            uploadDrawingFile: action,
            removeDrawingFile: action,
            setBuildingAllFloors: action,
            setBuiltUpArea: action,
            setAdditionalComment: action,
            uploadKrookieFile: action,
            removeKrookieFile: action,
            setConstructionType: action,
            toggleProjectStartingStep: action,
            setProjectStartingStep: action,
        });
    }

    get files() {
        return this.krookieFiles.concat(this.drawingsFiles);
    }

    get governorate() {
        return stores.locations.governorates
            .find(item => item.id.isEqual(this.governorateId));
    }

    get governorates() {
        return stores.locations.governorates
            .map(item => ({
                value: item.id,
                name: item.displayName,
            }));
    }

    get wilayat() {
        if (!this.wilayatId) {
            return undefined;
        }

        return stores.locations.wilayats
            .find(item => this.wilayatId?.isEqual(item.id));
    }

    get wilayats() {
        const governorate = this.governorate;

        if (!governorate) {
            return [];
        }

        return governorate.wilayats
            .map(item => ({
                value: item.id,
                name: item.displayName,
            }));
    }

    get landTypes() {
        return [
            {
                value: E.ConstructionLand.residential,
                name: lang.dict.get('landTypeResidential'),
            },
            {
                value: E.ConstructionLand.commercial,
                name: lang.dict.get('landTypeCommercial'),
            },
        ];
    }

    setGovernorate = (id: Id) => {
        this.wilayatId = undefined;
        this.governorateId = id;
    };

    setWilayat = (id: Id) => {
        this.wilayatId = id;
    };

    setArea = (value: string) => {
        this.landArea = utilsNumber.toRange(utils.fromInputNumber(value), 0, 100_000);
    };

    setBuiltUpArea = (value: string) => {
        this.addedBuiltUpArea = utilsNumber.toRange(utils.fromInputNumber(value), 0, 100_000);
    };

    setLandType = (type: E.ConstructionLand) => {
        this.landType = type;
    };

    setBuildingAllFloors = (value: boolean) => {
        this.buildingAllAreaInTheDrawings = value;
    };

    setAdditionalComment = (value: string) => {
        this.additionalComment = value;
    };

    setConstructionType = (type: E.ConstructionType) => {
        this.constructionType = type;
    };

    setProjectStartingStep = (type: E.ProjectStartingStep) => {
        if (this.id.isType('external')) {
            return;
        }

        this.startingStep = type;
    };

    toggleProjectStartingStep = () => {
        this.startingStep === E.ProjectStartingStep.build
            ? this.startingStep = E.ProjectStartingStep.design
            : this.startingStep = E.ProjectStartingStep.build;
    };

    uploadDrawingFile = (file: FileDataType) => {
        file.loadImg();
        this.drawingsFiles.push(file);
    };

    removeDrawingFile = (file: FileDataType) => {
        this.drawingsFiles = this.drawingsFiles.filter(x => x.id !== file.id);
        if (file.isExternal) {
            this.filesToRemove.push(file.fileId);
        }
    };

    uploadKrookieFile = (file: FileDataType) => {
        file.loadImg();
        this.krookieFiles.push(file);
    };

    removeKrookieFile = (file: FileDataType) => {
        this.krookieFiles = this.krookieFiles.filter(x => x.id !== file.id);
        if (file.isExternal) {
            this.filesToRemove.push(file.fileId);
        }
    };
}
