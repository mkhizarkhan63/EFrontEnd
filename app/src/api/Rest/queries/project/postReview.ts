import { dtos } from '../..';

type Review = {
    constructionProjectId?: number;
    isApproved?: boolean;
    comment?: string;
};

export const postReview = async (review: Review) => await dtos.construction.execCreateConstructionProjectReviewCommand(review);
