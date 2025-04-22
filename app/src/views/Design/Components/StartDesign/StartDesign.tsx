import { observer } from 'mobx-react';
import { lang } from '~/api';
import { SideModal, Close, Stars, Input, Button, If } from '~/bits';
import type { DesignVm } from '../../Design.vm';
import { TermsAndConditions } from './TermsModal';
import { Krookie, Land } from '~/partials';

type Props = {
    vm: DesignVm;
};

export const StartDesign = observer(({ vm }: Props) => {
    const consultant = vm.consultant;

    if (!consultant) {
        return null;
    }

    if (vm.isKrookieModal) {
        return (
            <SideModal
                variant="start-design"
                onBlur={vm.closeStartDesign}
            >
                <div className="side-modal__header">
                    <Close onClick={vm.closeStartDesign} />
                    <p className="side-modal__header-title">
                        {lang.dict.get('startDesign')}
                    </p>
                </div>
                <div className="side-modal__content">
                    <form className="form">
                        <p className="form__title">
                            {lang.dict.get('addKrookieDetails')}
                        </p>
                        <Land isNewFlow={true} />
                        <p className="form__sub-title">
                            {lang.dict.get('uploadKrookie')}
                        </p>
                        <Krookie />
                        <Button
                            color="green"
                            rightImg="next"
                            value={lang.dict.get('goSubmit')}
                            onClick={() => vm.setIsKrookieModal(false)}
                        />
                    </form>
                </div>
            </SideModal>
        );
    }

    return (
        <SideModal
            variant="start-design"
            onBlur={vm.closeStartDesign}
        >
            <div className="side-modal__header">
                <Close onClick={vm.closeStartDesign} />
                <p className="side-modal__header-title">
                    {lang.dict.get('startDesign')}
                </p>
            </div>
            <div className="side-modal__content">
                <div className="side-modal__main">
                    <div className="side-modal__design">
                        <p className="side-modal__design-selected">
                            {lang.dict.get('selectedDesign')}
                        </p>
                        <p className="side-modal__design-title">
                            &quot;{vm.design?.title}&quot;
                        </p>
                        <img className="side-modal__design-img" src={vm.design?.mainImg} />
                    </div>
                    <div className="side-modal__company">
                        <img className="side-modal__company-img" src={vm.avatar?.url ?? ''} />
                        <p className="side-modal__company-name">
                            {vm.consultant?.name}
                        </p>
                        <div className="stars-container">
                            <Stars
                                values={consultant.starsValues}
                                labels={vm.starsLabels}
                            />
                            <p className="side-modal__company-since">
                                {lang.dict.get('since')}&nbsp;
                                <span className="side-modal__company-year">{vm.consultant?.crStartDate?.format('YYYY')}</span>
                            </p>
                        </div>
                        <div className="side-modal__prices">
                            <div className="side-modal__price">
                                <span className="side-modal__price-title">
                                    {lang.dict.get('designPrice')}
                                </span>
                                <span className="side-modal__price-value">
                                    {vm.design?.designPrice} {lang.dict.get('fieldOmr')}
                                </span>
                            </div>
                            <div className="side-modal__price">
                                <span className="side-modal__price-title">
                                    {lang.dict.get('municipalityFees')}
                                </span>
                                <span className="side-modal__price-value">
                                    {vm.design?.municipalityFees} {lang.dict.get('fieldOmr')}
                                </span>
                            </div>
                            <div className="side-modal__price side-modal__price--total">
                                <span className="side-modal__price-title">
                                    {lang.dict.get('totalPrice')}
                                </span>
                                <span className="side-modal__price-value">
                                    {vm.design?.totalPrice} {lang.dict.get('fieldOmr')}
                                </span>
                            </div>
                        </div>
                        <div className="side-modal__price-info">
                            <p className="side-modal__price-info-title">
                                {lang.dict.get('priceIncludes')}
                            </p>
                            <ul className="side-modal__price-info-list">
                                <li className="side-modal__price-info-item">
                                    {lang.dict.get('soilTest')}
                                </li>
                                <li className="side-modal__price-info-item">
                                    {lang.dict.get('landLevelsSurvey')}
                                </li>
                                <li className="side-modal__price-info-item">
                                    {lang.dict.get('changeInDesigns')}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="side-modal__terms">
                        <div className="side-modal__terms-check">
                            <Input.Checkbox
                                type="check"
                                isChecked={vm.isAcceptedTermsAndConditions}
                                onChange={vm.acceptTermsAndConditions}
                                name={lang.dict.get('accept')}
                            />
                            <a
                                className="side-modal__terms-link"
                                href="#"
                                onClick={vm.toggleIsTermsAndConditionModal}
                            >
                                {lang.dict.get('termsConditions')}
                            </a>
                        </div>
                        <Button
                            color="green"
                            value={lang.dict.get('goSubmit')}
                            rightImg="next"
                            onClick={() => vm.submitStartDesign()}
                            isDisabled={!vm.isAcceptedTermsAndConditions}
                        />
                    </div>
                </div>
            </div>
            <If condition={() => vm.isTermsAndConditionsModal}>
                <TermsAndConditions onClose={vm.toggleIsTermsAndConditionModal} />
            </If>
        </SideModal>
    );
});
