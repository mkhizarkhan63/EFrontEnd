import { observer } from 'mobx-react';
import { Hide, Input } from '~/bits';
import { lang } from '~/api';

type Props = {
    isTotalPrice: boolean;
    togglePriceType: () => void;
};

export const ContractorHeader = observer((props: Props) => (
    <>
        <div className="table__row table__row--price">
            <div className="table__row-toggle">
                {lang.dict.get('rials')}
                <Input.Checkbox
                    type="toggle"
                    isChecked={!props.isTotalPrice}
                    onChange={props.togglePriceType}
                />
                {lang.dict.get('roM2')}
            </div>
            <p>{lang.dict.get('viewProfile')}</p>
            <p>{lang.dict.get('totalPrice')}</p>
            <p className="only-on-opened">{lang.dict.get('structuralPrice')}</p>
            <p className="only-on-closed">{lang.dict.get('projectTime')}</p>
            <p className="only-on-opened">{lang.dict.get('additionalPrice')}</p>
        </div>
        <div className="table__row table__row--project">
            <p>{lang.dict.get('projectTime')}</p>
            <p>{lang.dict.get('ongoingProjects')}</p>
        </div>
        <div className="table__row table__row--about">
            <p>{lang.dict.get('yearsOfExperience')}</p>
            <p>{lang.dict.get('numberOfEngineers')}</p>
            <p>{lang.dict.get('numberOfLabors')}</p>
        </div>
        <div className="table__row table__row--select" />
        <Hide reason="moved-to-phase-2">
            <div className="table__row table__row--badges">
                <p>{lang.dict.get('badges')}</p>
            </div>
        </Hide>
    </>
));
