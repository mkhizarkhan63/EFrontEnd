import type moment from 'moment';
import { lang, type restQuery } from '~/api';

type TooltipData = {
    completionDate?: moment.Moment;
    startDate?: moment.Moment;
    statistics: restQuery.project.PmProjectStatistic;
    color: string;
    position: {
        top: number;
        left: number;
    };
};

type Props = {
    data: TooltipData;
};

const tooltip = (data: TooltipData) => {
    if (data.color === '#05d94e') {
        return (
            <div className="tooltip">
                <div className="tooltip__top">
                    <p className="tooltip__text">
                        {lang.dict.get('timePassed')}
                    </p>
                    <p className="tooltip__text tooltip__text--date">
                        {data.statistics.totalTimeElapsed} {lang.dict.get('days')}
                    </p>
                </div>
                <div className="tooltip__bottom">
                    <div className="tooltip__col">
                        <p className="tooltip__text tooltip__text--subtitle">
                            {lang.dict.get('clientReviewsProjectStartDate')}
                        </p>
                        <p className="tooltip__text">
                            {data.startDate?.format('dddd, D MMM YYYY')}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (data.color === '#ec5469') {
        return (
            <div className="tooltip tooltip--delay" data-type={data.color}>
                <div className="tooltip__top">
                    <p className="tooltip__text">{lang.dict.get('projectDelays')}</p>
                    <p className="tooltip__text tooltip__text--date" data-type={data.color}>
                        {data.statistics.totalDelay} {lang.dict.get('days')}
                    </p>
                </div>
                <div className="tooltip__bottom">
                    <div className="tooltip__row">
                        <p className="tooltip__text tooltip__text--subtitle">
                            {lang.dict.get('contractor')}
                        </p>
                        <p className="tooltip__text">
                            {data.statistics.contractorDelay}
                        </p>
                    </div>
                    <div className="tooltip__row">
                        <p className="tooltip__text tooltip__text--subtitle">
                            {lang.dict.get('client')}
                        </p>
                        <p className="tooltip__text">
                            {data.statistics.clientDelay}
                        </p>
                    </div>
                    <div className="tooltip__row">
                        <p className="tooltip__text tooltip__text--subtitle">
                            {lang.dict.get('consultant')}
                        </p>
                        <p className="tooltip__text">
                            {data.statistics.consultantDelay}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (data.color === '#eeeeee') {
        const forecastedFinishDate = data.completionDate?.clone()
            .add(data.statistics.totalDelay, 'days');

        return (
            <div className="tooltip tooltip--remaining" data-type={data.color}>
                <div className="tooltip__top">
                    <p className="tooltip__text">
                        {lang.dict.get('timeRemaining')}
                    </p>
                    <p className="tooltip__text tooltip__text--date">
                        {data.statistics.timeRemaining} {lang.dict.get('days')}
                    </p>
                </div>
                <div className="tooltip__bottom">
                    <div className="tooltip__col">
                        <p className="tooltip__text tooltip__text--subtitle">
                            {lang.dict.get('forecastedDate')}
                        </p>
                        <p className="tooltip__text">
                            {forecastedFinishDate?.format('dddd, D MMM YYYY')}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export const CustomTooltip = ({ data }: Props) => (
    <div
        className="tooltip-container"
        style={data.position}
    >
        {tooltip(data)}
    </div>
);
