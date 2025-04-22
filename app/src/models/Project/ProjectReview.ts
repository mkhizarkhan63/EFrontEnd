import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';

export type ProjectReviewType = Instance<typeof ProjectReview>;

export const ProjectReview = types
    .model({
        reviewerName: MstType.string,

        reviewerAvatar: MstType.Img,

        reviewerRole: types.optional(
            types.enumeration<E.RoleInCompany>('ReviewerRole', Object.values(E.RoleInCompany)),
            E.RoleInCompany.admin,
        ),

        reason: MstType.string,
    });
