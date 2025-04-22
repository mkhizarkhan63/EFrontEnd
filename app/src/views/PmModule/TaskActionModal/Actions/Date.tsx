import { observer } from 'mobx-react';
import moment, { type Moment } from 'moment';
import { lang } from '~/api';
import { Icons, Input } from '~/bits';

type Props = {
    title: string;
    desc: string;
    dateAndTime?: Moment;
    onChangeDate: (date: Moment) => void;
    onChangeTime: (time: Moment) => void;
    max?: Moment;
    excludeDate?: Moment;
};

export const Date = observer((props: Props) => (
    <div className="action-block">
        <div className="action-block__title">{props.title}</div>
        <div className="action-block__desc">{props.desc}</div>
        <div className="action-block__inputs">
            <div className="action-block__input action-block__input--date">
                <Input.DateSelect
                    type="date"
                    value={props.dateAndTime}
                    onChange={props.onChangeDate}
                    placeHolder={lang.dict.get('chooseDate')}
                    min={moment().add(1, 'days')}
                    max={props.max}
                    excludeDate={props.excludeDate}
                />
                <Icons icon="calendar" />
            </div>
            <div className="action-block__input action-block__input--time">
                <Input.DateSelect
                    type="time"
                    value={props.dateAndTime}
                    onChange={props.onChangeTime}
                    placeHolder={lang.dict.get('chooseTime')}
                    min={moment().hours(7).minutes(55)}
                    max={moment().hours(20).minutes(5)}
                />
                <Icons icon="clock" />
            </div>
        </div>
    </div>
));
