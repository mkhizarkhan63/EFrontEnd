import { observer } from 'mobx-react';
import { lang } from '~/api';
import type { StagePart } from '~/models';

type Props = {
    bids?: StagePart[];
    total?: number;
    maintenance?: StagePart;
};

export const Days = observer(({ bids, maintenance, total }: Props) => {
    if (!bids || !maintenance) {
        return null;
    }

    const bidParts = bids.map(item => (
        <div key={item.id.asStr()} className="project-right__item-row">
            <p className="project-right__item-title">
                {lang.dict.enum('planStage', item.planStage)}
            </p>
            <span>{item.totalDays}</span>
        </div>
    ));

    return (
        <div className="project-right__item">
            <p className="project__title">{lang.dict.get('plan')}</p>
            {bidParts}
            <div className="project-right__item-row project-right__item-row--total">
                <p className="project-right__item-title">
                    {lang.dict.get('totalDays')}
                </p>
                <span>
                    {(total ?? 0) - maintenance?.totalDays} {lang.dict.get('days')}
                </span>
            </div>
            <div className="project-right__item-row project-right__item-row--total">
                <p className="project-right__item-title">
                    {lang.dict.get('maintenance')}
                </p>
                <span>
                    {maintenance?.totalDays} {lang.dict.get('days')}
                </span>
            </div>
        </div>
    );
});
