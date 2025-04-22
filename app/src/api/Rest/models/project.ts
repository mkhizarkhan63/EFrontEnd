import { type dtos, enums, Id, Mobx, T } from '~/api';
import { FileData, Project } from '~/models';
import { toInternalSubjectInformation } from './subjectInformation';

type ConstructionProject =
    | dtos.construction.ConstructionProjectDto
    | dtos.construction.ConstructionProjectWithBidDto
    | dtos.construction.ConstructionProjectExtendedDto
    | dtos.construction.ConstructionProjectWithInviteDto;

type InternalProjectProp =
    | dtos.contract.ContractProjectDto
    | ConstructionProject;

export const toInternalProject = (x: InternalProjectProp) => {
    const project = new Project();

    Mobx.extendsObservable(project, {
        id: Id.init(x.id, 'external'),
        designId: Id.tryInit(x.designId, 'external'),
        clientId: Id.tryInit(x.clientId, 'external'),
        wilayatId: Id.tryInit(x.wilayatId, 'external'),
        contractId: Id.tryInit(x.contractId, 'external'),
        designSowId: Id.tryInit(x.designSowId, 'external'),
        stagePlanId: Id.tryInit(x.stagePlanId, 'external'),
        projectBidId: Id.tryInit(x.projectBidId, 'external'),
        consultantId: Id.tryInit(x.consultantId, 'external'),
        governorateId: Id.tryInit(x.governorateId, 'external'),
        designConsultantId: Id.tryInit(x.designConsultantId, 'external'),
        designStageTemplateId: Id.tryInit(x.designStageTemplateId, 'external'),
        landArea: x.landArea,
        floorLevels: x.floorLevels,
        projectNumber: x.projectNumber,
        addedBuiltUpArea: x.addedBuiltUpArea,
        additionalComment: x.additionalComment,
        buildingAllAreaInTheDrawings: x.buildingAllAreaInTheDrawings,
        designStatus: T.create(
            x.designProjectStatus,
            enums.DesignStatus.castToInternal,
        ),
        landType: T.create(
            x.landType,
            enums.ConstructionLand.castToInternal,
        ),
        startingStep: T.create(
            x.startingStep,
            enums.ProjectStartingStep.castToInternal,
        ),
    });

    if ('contractorInvitationCount' in x) {
        Mobx.extendsObservable(project, {
            contractorInvitationCount: x.contractorInvitationCount,
            consultantInvitationCount: x.consultantInvitationCount,
        });
    }

    if ('projectDatesDto' in x) {
        const projectDate = x.projectDatesDto;

        Mobx.extendsObservable(project.forAdmin, {
            projectDates: {
                draft: T.create(projectDate?.draftDate, T.Timestamp),
                review: T.create(projectDate?.engineerReviewDate, T.Timestamp),
                biding: T.create(projectDate?.contractorsBiddingDate, T.Timestamp),
                chooseContractor: T.create(projectDate?.chooseContractorDate, T.Timestamp),
                readyToSign: T.create(projectDate?.contractReadyForSignatureDate, T.Timestamp),
                signed: T.create(projectDate?.contractSignedDate, T.Timestamp),
            },

            client: x.client ? toInternalSubjectInformation(x.client) : undefined,
        });
    }

    if ('approverId' in x) {
        Mobx.extendsObservable(project, {
            approverId: Id.tryInit(x.approverId, 'external'),
        });
    }

    if ('numberOfTimeExtension' in x) {
        Mobx.extendsObservable(project, {
            numberOfTimeExtension: x?.numberOfTimeExtension,
        });
    }

    if ('totalVisitsForBid' in x) {
        Mobx.extendsObservable(project, {
            totalVisitsForBid: x.totalVisitsForBid,
        });
    }

    if ('stageTemplateId' in x) {
        Mobx.extendsObservable(project, {
            stageTemplateId: Id.tryInit(x.stageTemplateId, 'external'),
        });
    }

    // Company
    if ('projectStatus' in x) {
        toInternalConstructionProject(project, x);
    }

    // Contractor
    if ('bidStatus' in x) {
        toInternalProjectWithBid(project, x);
    }

    // Consultant
    if ('invitationStatus' in x) {
        toInternalProjectWithInvite(project, x);
    }

    // Contract
    if ('constructionProjectId' in x) {
        toInternalContractProject(project, x);
    }

    // ConstructionProjectExtendedDto
    if ('client' in x) {
        toInternalProjectExtended(project, x);
    }

    return project;
};

const toInternalContractProject = (project: Project, x: dtos.contract.ContractProjectDto) => {
    Mobx.extendsObservable(project, {
        id: Id.tryInit(x.constructionProjectId, 'external'),
        contractProjectId: Id.tryInit(x.id, 'external'),
        wilayatDisplayName: x.wilayatDisplayName,
        governorateDisplayName: x.governorateDisplayName,
        constructionType: T.create(
            x.projectType,
            enums.ConstructionType.castToInternal,
        ),
    });
};

const toInternalConstructionProject = (project: Project, x: ConstructionProject) => {
    Mobx.extendsObservable(project, {
        contractorId: Id.tryInit(x.contractorId, 'external'),
        modifiedDate: T.create(x.modifiedDate, T.Timestamp),
        bidClosingDate: T.create(x.bidClosingDate, T.Timestamp),
        projectStatus: T.create(
            x.projectStatus,
            enums.ProjectStatus.castToInternal,
        ),
        constructionType: T.create(
            x.constructionType,
            enums.ConstructionType.castToInternal,
        ),
    });
};

const toInternalProjectWithBid = (project: Project, x: dtos.construction.ConstructionProjectWithBidDto) => {
    Mobx.extendsObservable(project.forContractor, {
        bidId: Id.tryInit(x.bidId, 'external'),
        bidStatus: T.create(
            x.bidStatus,
            enums.BidStatus.castToInternal,
        ),
        invitationType: T.create(
            x.invitationType,
            enums.InvitationType.castToInternal,
        ),
    });
};

const toInternalProjectWithInvite = (project: Project, x: dtos.construction.ConstructionProjectWithInviteDto) => {
    Mobx.extendsObservable(project.forConsultant, {
        invitationId: Id.tryInit(x.invitationId, 'external'),
        invitationConsultantId: Id.tryInit(x.invitationConsultantId, 'external'),
        invitationDate: T.create(x.invitationDate, T.Timestamp),
        invitationType: T.create(
            x.invitationType,
            enums.InvitationType.castToInternal,
        ),
        invitationStatus: T.create(
            x.invitationStatus,
            enums.InvitationStatus.castToInternal,
        ),
        /* TODO add client details - waiting for backend */
    });
};

const toInternalProjectExtended = (project: Project, x: dtos.construction.ConstructionProjectExtendedDto) => {
    Mobx.extendsObservable(project, {
        wilayatDisplayName: x.wilayatDisplayName,
        governorateDisplayName: x.governorateDisplayName,
        client: x.client ? toInternalSubjectInformation(x.client) : undefined,
        consultant: x.consultant ? toInternalSubjectInformation(x.consultant) : undefined,
        contractor: x.contractor ? toInternalSubjectInformation(x.contractor) : undefined,
        designConsultant: x.designConsultant ? toInternalSubjectInformation(x.designConsultant) : undefined,
    });
};

export const loadProjectFiles = async (item: InternalProjectProp, project: Project) => {
    const krookieFilesPromise = Promise.all((item.krookieFiles ?? [])
        .map(async fileId => {
            const fileData = await FileData.fromExternal(fileId);
            return project.uploadKrookieFile(fileData);
        }));

    const drawingFilesPromise = Promise.all((item.drawingFiles ?? [])
        .map(async fileId => {
            const fileData = await FileData.fromExternal(fileId);
            return project.uploadDrawingFile(fileData);
        }));

    await Promise.all([krookieFilesPromise, drawingFilesPromise]);
};
