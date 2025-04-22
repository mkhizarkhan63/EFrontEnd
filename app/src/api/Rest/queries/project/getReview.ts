import { Img, T } from '~/api';
import { ProjectReview } from '~/models';
import { dtos, enums } from '../..';
import { getUserInfo } from '../getUserInfo';

export const getReview = async (projectId: number) => {
    const data = await dtos.construction.execGetConstructionProjectReviewsQuery({ projectId });

    if (!data || !data.result) {
        return;
    }

    return Promise.all(data.result.filter(item => !item.isApproved).map(toInternalReview));
};

const toInternalReview = async (external: dtos.construction.ConstructionProjectReviewDto) => {
    const reviewerData = await getUserInfo(external.reviewerId);

    return ProjectReview.create({
        reviewerName: reviewerData?.name,
        reviewerRole: T.create(
            external.reviewerType,
            enums.ActorType.castToInternal,
        ),
        reviewerAvatar: Img.tryCreate(reviewerData?.profilePicture),
        reason: external.comment,
    });
};
