import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Input } from '~/bits';

type Props = {
    isTotalPrice: boolean;
    togglePriceType: () => void;
};

export const ConsultantHeader = observer((props: Props) => (
    <>
        <div className="table__row table__row--top">
            <div className="table__row-toggle">
                {lang.dict.get('rials')}
                <Input.Checkbox
                    type="toggle"
                    isChecked={!props.isTotalPrice}
                    onChange={props.togglePriceType}
                />
                {lang.dict.get('roVisit')}
            </div>
            <p>{lang.dict.get('viewProfile')}</p>
            <p>{lang.dict.get('totalPrice')}</p>
            <p>{lang.dict.get('totalVisits')}</p>
        </div>
        <div className="table__row table__row--about">
            <p>{lang.dict.get('yearsOfExperience')}</p>
            <p>{lang.dict.get('numberOfEngineers')}</p>
            <p>{lang.dict.get('numberOfServices')}</p>
        </div>
        <div className="table__row table__row--select" />
    </>
));
