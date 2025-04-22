import { observer } from 'mobx-react';
import { type E, lang } from '~/api';
import { ProgressBar } from '../ProgressBar';

type Props = {
    status: E.PmProjectStatus;
    percentage: number;
};

export const PmProjectStatus = observer(({ status, percentage }: Props) => {
    const progressData = [
        {
            value: percentage,
            color: 'green' as const,
        },
    ];

    return (
        <div className="pm-project-status" data-status={status}>
            <p className="pm-project-status__title">
                {lang.dict.get('status')}
            </p>
            <div className="pm-project-status__desc">
                <p className="pm-project-status__desc-title">
                    {lang.dict.enum('pmProjectStatus', status)}
                </p>
                <p className="pm-project-status__desc-value">
                    {percentage}%
                </p>
            </div>
            <ProgressBar values={progressData} />
        </div>
    );
});
