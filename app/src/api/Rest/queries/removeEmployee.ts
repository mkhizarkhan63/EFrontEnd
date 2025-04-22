import { E } from '~/api';
import type { CompanyType } from '~/models';
import { dtos } from '..';

type Action = 'reject' | 'remove';

export const removeEmployee = async (id: number, company: CompanyType, action: Action) => {
    const query = company.type === E.ProfileType.consultant
        ? dtos.contractor.execDeleteConsultantLinkedProfileCommand
        : dtos.contractor.execDeleteContractorLinkedProfilerCommand;

    const deletionType = action === 'reject'
        ? dtos.contractor.LinkedProfileDeletionType.rejectAffiliation
        : dtos.contractor.LinkedProfileDeletionType.deleteLink;

    await query({ id, deletionType });
    company.removeEmployee(id);
};
