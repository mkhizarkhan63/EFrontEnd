import { observer } from 'mobx-react';
import { lang, type E } from '~/api';

type Props = {
    title: string;
    desc: string;
    status: E.SubmitStatus;
};

export const Date = observer((props: Props) => (
    <div className="action-block-summary" data-is-status={props.status}>
        <div className="action-block-summary__title">{props.title}</div>
        <div className="action-block-summary__desc">
            {lang.dict.enum('submitStatus', props.status)} {props.desc}
        </div>
    </div>
));
