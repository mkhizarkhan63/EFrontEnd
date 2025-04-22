import { default as m, type Moment } from 'moment';
import * as T from 'superstruct';

export const moment = () => T.define<Moment>(
    'moment',
    value => m.isMoment(value) && value.isValid(),
);
