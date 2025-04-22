import { action } from 'mobx';
import moment from 'moment';
import type { MouseEvent } from 'react';
import { E, Id, lang, LazyDataList, LazyModelList, restClient, restQuery, utils } from '~/api';
import { stores } from '~/stores';
import { downloadFile } from '~/utils';
import type { SubjectInformationType } from '../Company';
import type { FileDataType } from '../FileData';
import type { StageUnit } from '../StageUnit';
import { ProjectAdmin } from './ProjectAdmin';
import { ProjectConsultant } from './ProjectConsultant';
import { ProjectContractor } from './ProjectContractor';

export class Project {
    id = Id.init();

    clientId?: Id;

    wilayatId?: Id;

    contractId?: Id;

    stagePlanId?: Id;

    designSowId?: Id;

    contractorId?: Id;

    projectBidId?: Id;

    consultantId?: Id;

    governorateId?: Id;

    contractProjectId?: Id;

    designConsultantId?: Id;

    designStageTemplateId?: Id;

    designId?: Id;

    governorateDisplayName = '';

    wilayatDisplayName = '';

    landArea = 0;

    projectNumber = '';

    addedBuiltUpArea = 0;

    additionalComment = '';

    buildingAllAreaInTheDrawings = false;

    modifiedDate = moment();

    bidClosingDate = moment();

    designStatus = E.DesignProjectStatus.noneDesign;

    landType?: E.ConstructionLand;

    projectStatus?: E.ProjectStatus;

    constructionType?: E.ConstructionType;

    startingStep = E.ProjectStartingStep.build;

    forAdmin = new ProjectAdmin(this);

    forContractor = new ProjectContractor(this);

    forConsultant = new ProjectConsultant(this);

    drawingsFiles: FileDataType[] = [];

    krookieFiles: FileDataType[] = [];

    filesToRemove: string[] = [];

    floorLevels = '';

    bidList = new LazyDataList(
        'Bids',
        () => restQuery.project.getProjectBids(this),
    );

    invitedContractorList = new LazyModelList(
        'InvitedContractorBids',
        () => restQuery.getInvitedCompanies(this.id.asNumber(), E.RoleInCompany.contractor),
    );

    invitedConsultantList = new LazyModelList(
        'InvitedConsultantBids',
        () => restQuery.getInvitedCompanies(this.id.asNumber(), E.RoleInCompany.consultant),
    );

    client?: SubjectInformationType;

    consultant?: SubjectInformationType;

    contractor?: SubjectInformationType;

    designConsultant?: SubjectInformationType;

    stageTemplateId?: Id;

    approverId?: Id;

    // For local use
    consultantStatus = E.ProjectStatusConsultant.invited;

    numberOfTimeExtension = 0;

    totalVisitsForBid = 0;

    contractorInvitationCount?: number;

    consultantInvitationCount?: number;

    constructor() {
        makeSafeObservable(this, {
            setGovernorate: action,
            setWilayat: action,
            setProjectBidId: action,
            clearProjectBidId: action,
            setConsultantId: action,
            decraseInvitationCount: action,
        });
    }

    get bids() {
        return this.bidList.data;
    }

    get invitedContractors() {
        return this.invitedContractorList.data;
    }

    get invitedConsultants() {
        return this.invitedConsultantList.data;
    }

    get governorates() {
        return stores.locations.governorates
            .map(item => ({
                name: item.displayName,
                value: item.id.asNumber(),
            }));
    }

    get governorate() {
        if (!this.governorateId) {
            return undefined;
        }

        return stores.locations.governorates
            .find(x => x.id.isEqual(this.governorateId));
    }

    get wilayats() {
        const governorate = this.governorate;

        if (!governorate) {
            return [];
        }

        return governorate.wilayats.map(item => ({
            name: item.displayName,
            value: item.id.asNumber(),
        }));
    }

    get wilayat() {
        if (!this.wilayatId) {
            return undefined;
        }

        return stores.locations.wilayats
            .find(x => x.id.isEqual(this.wilayatId));
    }

    get wilayatName() {
        if (!this.wilayatId) {
            return undefined;
        }

        return this.wilayat?.displayName;
    }

    get stage() {
        const { stagePlanId, stageTemplateId } = this;
        const { stagePlanList, stageTemplateList } = stores.stages;

        if (stagePlanId) {
            return stagePlanList.get(stagePlanId);
        }

        if (stageTemplateId) {
            return stageTemplateList.get(stageTemplateId, true);
        }

        return undefined;
    }

    get sow() {
        if (this.stage?.sowId) {
            return stores.sows.sows.get(this.stage.sowId);
        }

        if (this.designSowId) {
            return stores.sows.sows.get(this.designSowId);
        }

        return undefined;
    }

    get isEditable() {
        return (
            this.projectStatus === E.ProjectStatus.draft ||
            this.projectStatus === E.ProjectStatus.reviewing
        );
    }

    get isEditableDesign() {
        return (
            [
                E.DesignProjectStatus.noneDesign,
                E.DesignProjectStatus.adminReviewDesign,
            ].includes(this.designStatus)
        );
    }

    get isDesignStartingStep() {
        return this.startingStep === E.ProjectStartingStep.design;
    }

    get clientName() {
        return this.client?.name ?? lang.dict.get('none');
    }

    get contractorName() {
        return this.contractor?.name ?? lang.dict.get('none');
    }

    get consultantName() {
        return this.consultant?.name ?? lang.dict.get('none');
    }

    get consultantDesignName() {
        return this.designConsultant?.name ?? lang.dict.get('none');
    }

    get files() {
        return this.krookieFiles.concat(this.drawingsFiles);
    }

    get generalStatus() {
        if (this.consultantId?.isEqual(restClient.getContextId())) {
            return this.projectStatus;
        }

        switch (this.designStatus) {
            case E.DesignProjectStatus.completedDesign:
                return E.ProjectStatus.archived;
            case E.DesignProjectStatus.rejectedDesign:
                return E.ProjectStatus.rejected;
            case E.DesignProjectStatus.advancePaymentDesign:
            case E.DesignProjectStatus.finalPaymentDesign:
                return E.ProjectStatus.chooseContractor;
            case E.DesignProjectStatus.uploadDrawingsDesign:
                return E.ProjectStatus.uploadDrawings;
            default:
                return this.projectStatus;
        }
    }

    get generalStatusClient() {
        if ([
            E.DesignProjectStatus.completedDesign,
            E.DesignProjectStatus.noneDesign,
        ].includes(this.designStatus)) {
            return this.projectStatus;
        }

        return this.designStatus;
    }

    get stageDesign() {
        if (!this.designStageTemplateId) {
            return [];
        }

        const stage = stores.stages.stagePlanList.get(this.designStageTemplateId);

        if (!stage) {
            return [];
        }

        const units: StageUnit[] = [];

        for (const stagePart of stage.parts) {
            for (const stageUnit of stagePart.units) {
                units.push(stageUnit);
            }
        }

        return units;
    }

    get isOpenToBid() {
        return moment().isBefore(this.bidClosingDate);
    }

    setProjectBidId = (projectBidId: Id) => {
        if (projectBidId.isType('internal')) {
            return;
        }

        this.projectBidId = projectBidId;
    };

    clearProjectBidId = () => {
        this.projectBidId = undefined;
    };

    setConsultantId = (consultantId: Id) => {
        if (consultantId.isType('internal')) {
            return;
        }

        this.consultantId = consultantId;
    };

    setGovernorate = (id: number) => {
        if (!this.isEditable) {
            return;
        }

        this.wilayatId = undefined;
        this.governorateId = Id.init(id, 'external');
    };

    areYouWinner = (profile?: E.ProfileType) => {
        if (profile === E.ProfileType.contractor && !this.isWaitingForClient) {
            return Boolean(this.projectBidId?.isEqual(this.forContractor.bidId));
        }
        return true;
    };

    get isWaitingForClient() {
        return (
            this.projectStatus === E.ProjectStatus.openBids ||
            this.projectStatus === E.ProjectStatus.chooseContractor
        );
    }

    setWilayat = (id: number) => {
        if (!this.isEditable) {
            return;
        }

        this.wilayatId = Id.init(id, 'external');
    };

    setProjectUse = (value: E.ConstructionLand) => {
        if (!this.isEditable) {
            return;
        }

        this.landType = value;
    };

    setProjectType = (value: E.ConstructionType) => {
        if (!this.isEditable) {
            return;
        }

        this.constructionType = value;
    };

    setAdditionalComment = (txt: string) => {
        if (!this.isEditable) {
            return;
        }

        this.additionalComment = txt;
    };

    setPlotArea = (value: string) => {
        if (!this.isEditable) {
            return;
        }

        this.landArea = utils.fromInputNumber(value);
    };

    setBuildingAllFloors = () => {
        if (!this.isEditable) {
            return;
        }

        this.buildingAllAreaInTheDrawings = !this.buildingAllAreaInTheDrawings;
    };

    setBuildUpArea = (value: string) => {
        if (!this.isEditable) {
            return;
        }

        this.addedBuiltUpArea = utils.fromInputNumber(value);
    };

    uploadDrawingFile = (file: FileDataType, isAdmin = false) => {
        file.loadImg();
        this.drawingsFiles.push(file);

        if (isAdmin) {
            stores.projects.update(this);
        }
    };

    removeDrawingFile = (file: FileDataType) => {
        this.drawingsFiles = this.drawingsFiles.filter(x => x.id !== file.id);

        if (file.isExternal) {
            this.filesToRemove.push(file.fileId);
        }
    };

    uploadKrookieFile = (file: FileDataType, isAdmin = false) => {
        file.loadImg();
        this.krookieFiles.push(file);

        if (isAdmin) {
            stores.projects.update(this);
        }
    };

    removeKrookieFile = (file: FileDataType) => {
        this.krookieFiles = this.krookieFiles.filter(x => x.id !== file.id);

        if (file.isExternal) {
            this.filesToRemove.push(file.fileId);
        }
    };

    downloadKrookieFiles = (e: MouseEvent<HTMLImageElement>) => {
        this.krookieFiles.map(item => downloadFile(item, e));
    };

    decraseInvitationCount = (type: E.RoleInCompany) => {
        if (type === E.RoleInCompany.contractor) {
            this.contractorInvitationCount = (this.contractorInvitationCount ?? 0) + 1;
            return;
        }

        this.consultantInvitationCount = (this.consultantInvitationCount ?? 0) + 1;
    };
}
