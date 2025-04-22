import moment from 'moment';
import type { ComponentProps } from 'react';
import DatePicker from 'react-datepicker';

type Props = {
    type?: 'date' | 'time';
    placeHolder?: string;
    isDisabled?: boolean;
    name?: string;
    description?: string;
    value?: moment.Moment;
    max?: moment.Moment;
    min?: moment.Moment;
    excludeDate?: moment.Moment;
    onChange: (value: moment.Moment) => void;
    error?: string;
};

const getDateOnly = (date: Date | [Date | null, Date | null] | null) => {
    if (!date) {
        return;
    }

    if (date instanceof Date) {
        return date;
    }

    return date.find(x => x instanceof Date) ?? undefined;
};

const getDatePickerProps = (props: Props): Partial<ComponentProps<typeof DatePicker>> => (props.type === 'time'
    ? { // time
        dateFormat: 'hh:mm aa',
        showTimeSelect: true,
        showTimeSelectOnly: true,
        timeIntervals: 15,
        maxTime: props.max?.toDate(),
        minTime: props.min?.toDate(),
    }
    : { // date
        dateFormat: 'dd/MM/yyyy',
        showYearDropdown: true,
        showMonthDropdown: true,
        yearDropdownItemNumber: 50,
        adjustDateOnChange: true,
        scrollableYearDropdown: true,
        maxDate: props.max?.toDate(),
        minDate: props.min?.toDate(),
        excludeDates: props.excludeDate ? [props.excludeDate?.toDate()] : [],
    });

export const InputDateSelect = (props: Props) => (
    <div className="input-text">
        <div className="input-text-header">
            <label>
                {props.name}
                {props.description ? <span className="description">{props.description}</span> : null}
                {props.error ? <span className="error">{props.error}</span> : null}
            </label>
        </div>
        <DatePicker
            selected={props.value?.isValid() ? props.value?.toDate() : undefined}
            onChange={date => props.onChange(moment(getDateOnly(date)))}
            placeholderText={props.placeHolder}
            disabled={props.isDisabled}
            {...getDatePickerProps(props)}
        />
    </div>
);
