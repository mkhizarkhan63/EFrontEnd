import { types } from 'mobx-state-tree';
import moment, { type Moment } from 'moment';
import { MstType } from '~/api';

export const DatePicker = types
    .model({
        type: types.optional(types.literal('datePicker'), 'datePicker'),
        date: MstType.MaybeMoment,
    }).actions(self => ({
        setData: (data: Moment) => {
            self.date = data.clone().set({
                hour: 8,
                minute: 0,
                second: 0,
            });
        },

        setTime: (time: Moment) => {
            if (!self.date) {
                return;
            }

            self.date = self.date.clone().set({
                hour: time.hour(),
                minute: time.minute(),
                second: time.second(),
            });
        },
    })).views(() => ({
        getMax() {
            const minimum = moment().add(1, 'days').day();

            const maximum = moment().add(5, 'days').day();

            if ((5-minimum)*(5-maximum) <= 0) {
                return moment().add(5, 'days');
            }

            return moment().add(4, 'days');
        },

        getExcluded() {
            const current = moment().day();
            const days = (7 + 5 - current) % 7;
            return moment().clone().add(days, 'd');
        },
    }));
