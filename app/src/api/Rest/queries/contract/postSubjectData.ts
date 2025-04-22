import { E, Img } from '~/api';
import type { Contract } from '~/models';
import { dtos } from '../..';

export const postSubjectData = async (contract: Contract) => {
    const subject = contract.getSubject();

    if (contract.subject === E.ContractSubjects.client) {
        return await dtos.contract.execUpdateContractClientCommand({
            contractClientName: subject?.ownerName,
            contractId: contract.id.asNumber(),
            contractClientNameArabic: subject?.ownerNameInArabic,
            nationalId: subject?.idNumber,
        });
    }

    const company = contract.company;
    const employee = company?.employees.data.find(x => x.externalId === subject?.employeeId);

    return await dtos.contract.execUpdateContractCompanyDetailsCommand({
        accountHolderName: subject?.accountName,
        accountNumber: subject?.accountNumber,
        bankName: subject?.bankName,
        companyId: company?.externalId,
        companyIdNumber: subject?.idNumber,
        companyOwnerName: subject?.ownerName,
        companyOwnerNameInArabic: subject?.ownerNameInArabic,
        contractId: contract.id.asNumber(),
        workerId: subject?.employeeId,
        workerName: employee?.name,
        workerPictureId: Img.extractFileId(employee?.avatar?.url) ?? 'img',
        workerEmail: employee?.email,
        workerPhoneNumber: employee?.phone,
    });
};
