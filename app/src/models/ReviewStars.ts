import { getParent, types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { stores } from '~/stores';

export type ReviewStarsType = Instance<typeof ReviewStars>;

export const ReviewStars = types
    .model({
        averageGrade: types.optional(types.number, 1),

        createdDate: MstType.Moment,

        id: stores.idCollection.getIdentifier('reviewStars'),

        recommendation: MstType.StarsAmount,

        communication: MstType.StarsAmount,

        qualityOfWork: MstType.StarsAmount,

        speedOfWork: MstType.StarsAmount,

        management: MstType.StarsAmount,

        cooperation: MstType.StarsAmount,

        feedBack: types.optional(types.string, ''),
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal(
                'reviewStars',
                self.id,
            );
        },

        get review() {
            return getParent(self);
        },
    }))
    .actions(self => ({
        setStars: (value: number, type: E.ReviewStars) => {
            switch (type) {
                case E.ReviewStars.communication:
                    self.communication = value;
                    break;
                case E.ReviewStars.qualityOfWorks:
                    self.qualityOfWork = value;
                    break;
                case E.ReviewStars.speedOfWorks:
                    self.speedOfWork = value;
                    break;
                case E.ReviewStars.management:
                    self.management = value;
                    break;
                case E.ReviewStars.cooperation:
                    self.cooperation = value;
                    break;
                case E.ReviewStars.recommendation:
                    self.recommendation = value;
            }

            self.averageGrade = [
                self.communication,
                self.qualityOfWork,
                self.speedOfWork,
                self.management,
                self.cooperation,
                self.recommendation,
            ].reduce((pre, curr) => pre + curr) / 6;
        },

        setFeedBack: (text: string) => {
            self.feedBack = text;
        },

        connect: (externalId: number) => {
            stores.idCollection.connect(
                'reviewStars',
                self.id,
                externalId,
            );
        },
    }));
