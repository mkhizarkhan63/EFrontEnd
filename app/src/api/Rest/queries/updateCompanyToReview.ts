import { E } from '~/api';
import { dtos } from '..';

export const updateCompanyToReview = async (type: E.ProfileType, id?: number) => {
    if (!id) {
        return;
    }

    if (type === E.ProfileType.consultant) {
        await dtos.contractor.execUpdateConsultantStatusToReviewCommand({ id });
        return;
    }

    await dtos.contractor.execUpdateContractorStatusToReviewCommand({ id });
};
