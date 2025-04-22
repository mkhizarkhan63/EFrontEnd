import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Input } from '~/bits';
import type { ChecklistType } from '~/models';

type Props = {
    title: string;
    desc?: string;
    list?: ChecklistType;
    isReadonly?: boolean;
};

export const Checklist = observer((props: Props) => {
    if (!props.list) {
        return null;
    }

    const langVersion = lang.current === 'en' ? 'en' : 'ar';

    const radioList = props.list.options.map(item => (
        <div className="checklist__item" key={`${item.order}-${item.en}`}>
            <div className="no">#{item.order}</div>
            <div className="name">{item[`${langVersion}`]}</div>
            <div className="yes-no">
                <Input.Checkbox
                    onChange={v => item.setIsChecked(v)}
                    type="radio"
                    isOrderReversed={true}
                    isChecked={item.isChecked}
                    isDisabled={props.isReadonly}
                />
            </div>
        </div>
    ));

    const radioChecklist = (
        <div className="checklist checklist--btn">
            <p className="checklist__title">{props.title}</p>
            <div className="checklist__table">
                <div className="checklist__header">
                    <div>#</div>
                    <div>{lang.dict.get('checklist')}</div>
                    <div className="yes-no">
                        <p>{lang.dict.get('switchNo')}</p>
                        <p>{lang.dict.get('switchYes')}</p>
                    </div>
                </div>
                <div className="checklist__body">
                    {radioList}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {radioChecklist}
        </>
    );
});
