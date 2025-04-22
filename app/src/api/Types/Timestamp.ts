import * as T from 'superstruct';
import moment from 'moment';

const RawTimestamp = T.coerce<moment.Moment, null, string>(
    T.refine(T.any(), 'moment', value => moment.isMoment(value)),
    T.refine(T.string(), 'timestamp', value => moment(value).isValid()),
    value => moment.utc(value).local(),
);

export const Timestamp = T.defaulted(RawTimestamp, moment());

export const MaybeTimestamp = T.optional(RawTimestamp);
