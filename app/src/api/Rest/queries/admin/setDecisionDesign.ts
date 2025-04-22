import { dtos, type Id } from '~/api';

export const setDecisionDesign = async (id: Id, isApproved: boolean, comment: string) => {
    if (id.isType('internal')) {
        return false;
    }

    return await dtos
        .construction
        .execCreateConstructionProjectReviewCommand({
            constructionProjectId: id.asNumber(),
            isApproved,
            comment,
        });
};
