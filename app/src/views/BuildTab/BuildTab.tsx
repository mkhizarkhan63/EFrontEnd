import { observer } from 'mobx-react';
import { useState } from 'react';
import { lang } from '~/api';
import { Button, Close, ErrorList, Icons, If, SideModal } from '~/bits';
import { ClientNav, ClientNavBanner, ConstructionRequirements, Designs, Krookie, Land, Page } from '~/partials';
import { hook } from '~/utils';
import { BuildTabVm } from './BuildTab.vm';
import { EstimateModal } from './EstimateModal';

type MenuProps = {
    onClick: VoidFunction;
};

const Menu = ({ onClick }: MenuProps) => (
    <div className="client-nav-banner__right">
        <div className="client-nav-banner__right-icon">
            <Icons icon="calculator" />
        </div>
        <p className="client-nav-banner__right-title">
            {lang.dict.get('estimateBudget')}
        </p>
        <p className="client-nav-banner__right-text">
            {lang.dict.get('estimateBudgetDesc')}
        </p>
        <Button
            color="white"
            leftImg="calculator"
            value={lang.dict.get('getEstimate')}
            onClick={onClick}
        />
    </div>
);

export const BuildTab = observer(() => {
    const [isSideModalOpened, setSideModalOpened] = useState(false);
    const vm = hook.useVm(() => new BuildTabVm());

    return (
        <Page name="client build-tab">
            <ClientNav />
            <ClientNavBanner
                title={lang.dict.get('buildYourProject')}
                description={lang.dict.get('submitDetails')}
                onClick={() => setSideModalOpened(true)}
                menu={<Menu onClick={vm.switchIsEstimating} />}
            />
            <div className="client-tab-content">
                <div className="client-tab-content__left">
                    <div className="form">
                        <div className="form__section">
                            <p className="form__section-title">
                                {lang.dict.get('whereAreYouBuilding')}
                            </p>
                            <div className="form__section-box">
                                <div className="form__section-col land">
                                    <Land isNewFlow={true} />
                                </div>
                                <div className="form__section-col">
                                    <p className="form__section-col-title">
                                        {lang.dict.get('uploadKrookie')}
                                    </p>
                                    <Krookie />
                                </div>
                            </div>
                        </div>
                        <div className="form__section designs">
                            <p className="form__section-title">
                                {lang.dict.get('whatAreYouBuilding')}
                            </p>
                            <div className="form__section-box">
                                <Designs />
                            </div>
                        </div>
                        <div className="form__section construction">
                            <p className="form__section-title">
                                {lang.dict.get('constReqQuestion')}
                            </p>
                            <div className="form__section-box">
                                <ConstructionRequirements />
                            </div>
                        </div>
                        <Button
                            color="blue"
                            value={lang.dict.get('createProject')}
                            rightImg="next"
                            onClick={vm.submitProject}
                        />
                    </div>
                </div>
                <div className="client-tab-content__right">
                    <div className="client-tab-content__right-item">
                        <img
                            src="/assets/graphics/design_right_img_1.png"
                            alt="img"
                            className="client-tab-content__right-img"
                        />
                        <p className="client-tab-content__right-text">
                            Connect with Oman’s Top Architects and Bring Your Vision to Life!
                        </p>
                    </div>
                    <div className="client-tab-content__right-item">
                        <img
                            src="/assets/graphics/design_right_img_2.png"
                            alt="img"
                            className="client-tab-content__right-img"
                        />
                        <p className="client-tab-content__right-text">
                            Connect with Oman’s Top Architects and Bring Your Vision to Life!
                        </p>
                    </div>
                    <div className="client-tab-content__right-item">
                        <img
                            src="/assets/graphics/design_right_img_3.png"
                            alt="img"
                            className="client-tab-content__right-img"
                        />
                        <p className="client-tab-content__right-text">
                            Connect with Oman’s Top Architects and Bring Your Vision to Life!
                        </p>
                    </div>
                </div>
            </div>
            <If condition={isSideModalOpened}>
                <SideModal variant="how-it-works" onBlur={() => setSideModalOpened(false)} >
                    <div className="side-modal__header">
                        <Close onClick={() => setSideModalOpened(false)} />
                        <div className="side-modal__header-title">
                            {lang.dict.get('howItWorks')}
                        </div>
                    </div>
                    <div className="side-modal__content">
                        <div className="side-modal__title">
                            {lang.dict.get('buildJourney')}
                        </div>
                        <div className="side-modal__steps">
                            <div className="side-modal__step" data-status="inProgress">
                                <div className="side-modal__step-status" />
                                <div>
                                    <p className="side-modal__step-title">
                                        {lang.dict.get('submitForm')}
                                    </p>
                                    <p className="side-modal__step-desc">
                                        {lang.dict.get('submitFormDesc')}&nbsp;
                                        <a href="https://ebinaa.com/" target="_blank" className="link">
                                            ebinaa.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="side-modal__step">
                                <div className="side-modal__step-status" />
                                <div>
                                    <p className="side-modal__step-title">
                                        {lang.dict.get('receivePrices')}
                                    </p>
                                    <p className="side-modal__step-desc">
                                        {lang.dict.get('receivePricesDesc')}
                                    </p>
                                </div>
                            </div>
                            <div className="side-modal__step">
                                <div className="side-modal__step-status" />
                                <div>
                                    <p className="side-modal__step-title">
                                        {lang.dict.get('selectSupervision')}
                                    </p>
                                    <p className="side-modal__step-desc">
                                        {lang.dict.get('selectSupervisionDesc')}
                                    </p>
                                </div>
                            </div>
                            <div className="side-modal__step">
                                <div className="side-modal__step-status" />
                                <div>
                                    <p className="side-modal__step-title">
                                        {lang.dict.get('signDigital')}
                                    </p>
                                    <p className="side-modal__step-desc">
                                        {lang.dict.get('signDigitalDesc')}
                                    </p>
                                </div>
                            </div>
                            <div className="side-modal__step">
                                <div className="side-modal__step-status" />
                                <div>
                                    <p className="side-modal__step-title">
                                        {lang.dict.get('startConstruction')}
                                    </p>
                                    <p className="side-modal__step-desc">
                                        {lang.dict.get('startConstructionDesc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SideModal>
            </If>
            <ErrorList errors={vm.errorListHolder} />
            <If condition={vm.isEstimating}>
                <EstimateModal vm={vm} />
            </If>
        </Page>
    );
});
