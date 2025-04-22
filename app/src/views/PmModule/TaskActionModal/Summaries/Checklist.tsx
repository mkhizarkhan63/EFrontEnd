import { observer } from 'mobx-react';
import { useState } from 'react';
import { type E, lang } from '~/api';
import { Button, If } from '~/bits';
import type { ChecklistType } from '~/models';

type Props = {
    title: string;
    desc: string;
    list?: ChecklistType;
    status: E.SubmitStatus;
};

const valueToString = (value?: boolean) => {
    if (value === true) {
        return lang.dict.get('switchYes');
    }

    if (value === false) {
        return lang.dict.get('switchNo');
    }

    return '?';
};

export const Checklist = observer((props: Props) => {
    if (!props.list) {
        return null;
    }

    const [isExpanded, setIsExpanded] = useState(true);

    const langVersion = lang.current === 'en' ? 'en' : 'ar';

    const list = props.list.options.map(item => (
        <div
            className="checklist__item"
            key={`${item.order}-${item.en}`}
            data-is-checked={true}
        >
            <div className="no">#{item.order}</div>
            <div className="name">{item[`${langVersion}`]}</div>
            <div className="yes-no">{valueToString(item.isChecked)}</div>
        </div>
    ));

    return (
        <div
            data-is-expanded={isExpanded}
            className="checklist"
            data-is-status={props.status}
        >
            <Button
                color="blue"
                rightImg="dropdown-up"
                onClick={() => setIsExpanded(x => !x)}
                value={props.title}
            />
            <If condition={isExpanded}>
                <div className="checklist__list">{list}</div>
            </If>
            <p className="checklist__bottom">
                {lang.dict.enum('submitStatus', props.status)} {props.desc}
            </p>
        </div>
    );
});
