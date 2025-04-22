import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Icons } from '~/bits';
import type { ProjectDesignVm } from '../../ProjectDesign.vm';

type Props = {
    vm: ProjectDesignVm;
};

export const Approved = observer(({ vm }: Props) => (
    <div className="design-flow__box approved">
        <div className="approved__icon">
            <Icons icon="tick" />
        </div>
        <h2 className="design-flow__box-title">{lang.dict.get('yourProjectIsApproved')}</h2>
        <p className="approved__text">{lang.dict.get('makeAdvancePayment')}</p>
        <div className="payment">
            <div className="payment-top">
                <p className="payment-title">{lang.dict.get('advancePayment')}</p>
                <p className="payment-value">500 {lang.dict.get('fieldOmr')}</p>
            </div>
            <p className="payment-text">{lang.dict.get('consultantWillPrepareDrawings')}</p>
            <div className="payment__btns-row">
                <Button
                    color="white"
                    value={lang.dict.get('goBack')}
                    leftImg="back"
                    onClick={vm.goBack}
                />
                <Button
                    color="green"
                    value={lang.dict.get('payNow')}
                    rightImg="next"
                    onClick={vm.pay}
                />
            </div>
        </div>
    </div>
));
