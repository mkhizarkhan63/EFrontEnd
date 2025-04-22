import { dtos, E } from '~/api';
import type { CompanyType } from '~/models';

type Props = {
    id: number;
    company: CompanyType;
};

export const removeReview = async ({ id, company }: Props) => {
    const isConsultant = company.type === E.ProfileType.consultant;

    const response = await dtos.contractor[
        `execDelete${isConsultant ? 'Consultant' : 'Contractor'}ClientReferenceCommand`
    ]({ id });

    if (!response) {
        return;
    }

    return response.isSuccess;
};
