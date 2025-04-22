import { dtos, E, enums, Id, Img, Mobx, models, restQuery, T } from '~/api';
import {
    Consultant,
    Contract,
    Contractor,
    ContractSubject,
    FileData,
    Signature,
    type ConsultantType,
    type ContractorType,
} from '~/models';
import { stores } from '~/stores';
import { loadFileNames } from '~/utils';
import { getConsultantVisit } from './getConsultantVisit';

export const getContract = async (projectId: number) => {
    const data = await dtos.contract
        .execGetContractByProjectIdQuery({ projectId });

    if (!data) {
        return;
    }

    const { result } = data;
    const contract = new Contract();

    if (
        !result.bid ||
        !result.project ||
        !result.stagePlan
    ) {
        return;
    }

    const project = models.project.toInternalProject(result.project);
    const bid = models.projectBid.toInternalProjectBid(project, result.bid);
    const stage = models.stage.toInternalStage(result.stagePlan);
    const contractor = toInternalCompany(result.contractorCompany);
    const consultant = toInternalCompany(result.consultantCompany);
    const contractorMaterials = result.contractorMaterials?.map(models.sowItem.toInternalSowItem) ?? [];
    const clientMaterials = result.clientMaterials?.map(models.sowItem.toInternalSowItem) ?? [];
    const workflows = await restQuery.workflow.getWorkflowsById(result.workflowIds ?? []);
    const materialSpecifications = contractorMaterials?.concat(clientMaterials);

    const consultantVisits = await getConsultantVisit(stage.forPlanContract.units);

    stage.forPlanContract.units.forEach(unit => {
        const visit = consultantVisits.find(item => item.itemId.isEqual(unit.id));

        if (!visit) {
            return;
        }

        unit.setConsultantVisits(visit.visit);
    });

    const clientInformation = result.clientInformation;

    const clientSubject = clientInformation?.nationalId
        ? ContractSubject.create({
            type: E.ContractSubjects.client,
            accountName: clientInformation.clientName,
            email: clientInformation.clientEmail,
            phone: clientInformation.clientPhone,
            idNumber: clientInformation.nationalId,
            name: clientInformation.clientName,
            ownerName: clientInformation.contractClientName,
            ownerNameInArabic: clientInformation.contractClientNameArabic,
            isExternal: true,
            img: Img.tryCreate(clientInformation.clientProfilePicture),
        })
        : undefined;

    await models.project.loadProjectFiles(result.project, project);
    await loadFileNames(project.files);

    const filePath = await restQuery.file.getPath(result.fileId) ?? '';

    return Mobx.extendsObservable(contract, {
        id: Id.init(result.id, 'external'),
        constructionPrice: result.bid?.totalPrice ?? 0,
        templateId: Id.tryInit(result.templateId, 'external'),
        clientSignature: toInternalSignature(result.clientSignature),
        contractorSignature: toInternalSignature(result.contractorSignature),
        consultantSignature: toInternalSignature(result.consultantSignature),
        workflowIds: result.workflowIds,
        projectStartDate: T.tryCreate(result.projectStartDate, T.Timestamp),
        contractorMaterials,
        materialSpecifications,
        clientMaterials,
        bid,
        project,
        stage,
        workflows,
        contractor: contractor as ContractorType,
        consultant: consultant as ConsultantType,
        clientSubject,
        consultantVisits,
        status: T.create(
            result.status,
            enums.ContractStatus.castToInternal,
        ),
        filePath,
    });
};

const toInternalSignature = (external?: dtos.contract.ContractSignatureDto) => {
    if (!external) {
        return;
    }

    return Mobx.extendsObservable(new Signature(), {
        id: Id.init(external.id, 'external'),
        fileId: external.fileId,
        contractId: Id.tryInit(external.contractId, 'external'),
        createdDate: T.create(external.createdDate, T.Timestamp),
        subject: T.create(
            external.subject,
            enums.ContractSubject.castToInternal,
        ),
    });
};

const toInternalCompany = (external?: dtos.contract.ContractContractorDto | dtos.contract.ContractConsultantDto) => {
    if (!external) {
        return;
    }

    const isConsultant = external.companyType === dtos.contract.CompanyType.consultant;

    const subject = external.workerId
        ? ContractSubject.create({
            type: isConsultant ? E.ContractSubjects.consultant : E.ContractSubjects.contractor,
            accountName: external.accountHolderName,
            accountNumber: external.accountNumber,
            bankName: external.bankName,
            email: external.workerEmail,
            phone: external.workerPhoneNumber,
            employeeId: external.workerId,
            idNumber: external.companyIdNumber,
            name: external.workerName,
            ownerName: external.companyOwnerName,
            ownerNameInArabic: external.companyOwnerNameInArabic,
            isExternal: true,
        })
        : undefined;

    const toInternalFile = (fileId: string) => {
        const file = FileData.create({ fileId });

        file.connect();
        file.loadImgFromId(fileId);
        file.loadFileName();
        file.loadImgFromId(fileId);

        return file;
    };

    const data = {
        id: stores.idCollection.getInternal('company', external.companyId),
        type: isConsultant ? E.ProfileType.consultant : E.ProfileType.contractor,
        crNumber: external.crNumber,
        headOfficeGovernorateId: external.headOfficeGovernorateId,
        headOfficeWilayatId: external.headOfficeWilayatId,
        name: external.name,
        ownerName: external.companyOwnerName,
        contractSubject: subject,
        logo: toInternalFile(external.companyLogoId ?? ''),
        img: Img.tryCreate(external.workerPictureId),
    };

    if ('pricePerVisit' in external) {
        return Consultant.create({ ...data, pricePerVisits: external.pricePerVisit });
    }

    return Contractor.create(data);
};
