import moment from 'moment';

type TimeLeftResult = {
    amount: number;
    unit: 'day' | 'hour';
};

export const timeLeft = (date: moment.Moment): TimeLeftResult => {
    const days = Math.max(moment(date).diff(Date.now(), 'day'), 0);

    if (days < 2) {
        return {
            amount: Math.max(moment(date).diff(Date.now(), 'hours'), 0),
            unit: 'hour',
        };
    }

    return {
        amount: days,
        unit: 'day',
    };
};
