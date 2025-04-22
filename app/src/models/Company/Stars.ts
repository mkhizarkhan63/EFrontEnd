import { types, type Instance } from 'mobx-state-tree';
import { E, lang, MstType } from '~/api';

export class Stars {
    skills?: number;

    qualityOfRequirements?: number;

    availability?: number;

    setReasonableDeadlines?: number;

    communication?: number;

    cooperation?: number;

    overallAverageGrade?: number;

    constructor() {
        makeSafeObservable(this, {});
    }

    static get starsLabels() {
        return {
            qualityOfWorks: lang.dict.enum(
                'starsLabel', E.StarsLabel.qualityOfWorks,
            ),
            recommendation: lang.dict.enum(
                'starsLabel', E.StarsLabel.recommendation,
            ),
            speedOfWorks: lang.dict.enum(
                'starsLabel', E.StarsLabel.speedOfWorks,
            ),
            management: lang.dict.enum(
                'starsLabel', E.StarsLabel.management,
            ),
            communication: lang.dict.enum(
                'starsLabel', E.StarsLabel.communication,
            ),
            cooperation: lang.dict.enum(
                'starsLabel', E.StarsLabel.cooperation)
            ,
        };
    }
}

export type StarsMstType = Instance<typeof StarsBase>;

const StarsBase = types
    .model({
        qualityOfWorks: MstType.number,

        recommendation: MstType.number,

        speedOfWorks: MstType.number,

        management: MstType.number,

        communication: MstType.number,

        cooperation: MstType.number,
    });

export const StarsMst = Object.assign(
    StarsBase,
    {
        starsLabels: () => ({
            qualityOfWorks: lang.dict.enum(
                'starsLabel', E.StarsLabel.qualityOfWorks,
            ),
            recommendation: lang.dict.enum(
                'starsLabel', E.StarsLabel.recommendation,
            ),
            speedOfWorks: lang.dict.enum(
                'starsLabel', E.StarsLabel.speedOfWorks,
            ),
            management: lang.dict.enum(
                'starsLabel', E.StarsLabel.management,
            ),
            communication: lang.dict.enum(
                'starsLabel', E.StarsLabel.communication,
            ),
            cooperation: lang.dict.enum(
                'starsLabel', E.StarsLabel.cooperation)
            ,
        }),
    },
);
