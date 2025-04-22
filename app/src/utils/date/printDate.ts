import type { Moment } from 'moment';

export const printDate = (date?: Moment) => (!date || date.get('year') <= 1970 ? '-' : date.format('L'));

export const dateValidation = (date?: Moment) => (!date || date.get('year') <= 1970 ? undefined : date);

export const displayDefaultDate = (date?: Moment, format = 'LL') => (!date || date.get('year') <= 1970 ? '--' : date.format(format));

export const isDateValid = (date?: Moment) => Boolean(date && date.get('year') > 1970);
