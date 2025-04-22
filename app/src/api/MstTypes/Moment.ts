import { types } from 'mobx-state-tree';
import moment from 'moment';

const MomentBase = types.custom<string, moment.Moment>({
    name: 'Moment',
    fromSnapshot: date => moment.utc(date).local(),
    toSnapshot: date => date.toISOString(),
    isTargetType: value => moment.isMoment(value),
    getValidationMessage: value => (typeof value === 'string' ? '' : `${value} doesn't look like a valid Moment`),
});

export const Moment = types.optional(
    MomentBase,
    moment(),
);

export const MaybeMoment = types.maybe(MomentBase);
