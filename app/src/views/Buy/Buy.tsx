import { observer } from 'mobx-react';
import { useState } from 'react';
import { lang } from '~/api';
import { Button, Close, Icons, If, SideModal } from '~/bits';
import { ClientNav, ClientNavBanner, DesignListings, Page } from '~/partials';

const Menu = () => (
    <div className="client-nav-banner__right">
        <div className="client-nav-banner__right-icon">
            <Icons icon="price-loan" />
        </div>
        <p className="client-nav-banner__right-title">
            {lang.dict.get('lookingForLoan')}
        </p>
        <p className="client-nav-banner__right-text">
            {lang.dict.get('lookingForLoanDesc')}
        </p>
        <Button
            color="gray"
            isDisabled={true}
            rightImg="next"
            value={lang.dict.get('comingSoon')}
        />
        <div className="client-nav-banner__right-bank">
            <img
                src="/assets/graphics/oman_bank.png"
                className="client-nav-banner__right-bank-img"
            />
            <div className="client-nav-banner__right-bank-info">
                <p className="client-nav-banner__right-bank-title">
                    Powered by
                </p>
                <p className="client-nav-banner__right-bank-text">
                    Oman Housing Bank
                </p>
            </div>
        </div>
    </div>
);

export const Buy = observer(() => {
    const [isSideModalOpened, setSideModalOpened] = useState(false);

    return (
        <Page name="client buy-tab">
            <ClientNav />
            <ClientNavBanner
                title={lang.dict.get('buyProject')}
                description={lang.dict.get('customizeProject')}
                onClick={() => setSideModalOpened(true)}
                menu={<Menu />}
            />
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
                            {lang.dict.get('buyJourney')}
                        </div>
                        <div className="side-modal__steps">
                            <div className="side-modal__step" data-status="inProgress">
                                <div className="side-modal__step-status" />
                                <div>
                                    <p className="side-modal__step-title">
                                        {lang.dict.get('selectProject')}
                                    </p>
                                    <p className="side-modal__step-desc">
                                        {lang.dict.get('selectProjectDesc')}
                                    </p>
                                    <div className="side-modal__step-tick">
                                        <div className="side-modal__step-tick-icon">
                                            <Icons icon="tick-gray" />
                                        </div>
                                        <div>
                                            <p className="side-modal__step-tick-title">
                                                {lang.dict.get('architectProjects')}
                                            </p>
                                            <p className="side-modal__step-tick-desc">
                                                {lang.dict.get('architectProjectsDesc')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="side-modal__step-tick">
                                        <div className="side-modal__step-tick-icon">
                                            <Icons icon="tick-gray" />
                                        </div>
                                        <div>
                                            <p className="side-modal__step-tick-title">
                                                {lang.dict.get('developerProjects')}
                                            </p>
                                            <p className="side-modal__step-tick-desc">
                                                {lang.dict.get('developerProjectsDesc')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="side-modal__step">
                                <div className="side-modal__step-status" />
                                <div>
                                    <p className="side-modal__step-title">
                                        {lang.dict.get('modifyProject')}
                                    </p>
                                    <p className="side-modal__step-desc">
                                        {lang.dict.get('modifyProjectDesc')}
                                    </p>
                                </div>
                            </div>
                            <div className="side-modal__step">
                                <div className="side-modal__step-status" />
                                <div>
                                    <p className="side-modal__step-title">
                                        {lang.dict.get('finalizeBudget')}
                                    </p>
                                    <p className="side-modal__step-desc">
                                        {lang.dict.get('finalizeBudgetDesc')}
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
                                        {lang.dict.get('startConstructionnDesc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="side-modal__notice">
                            <div className="side-modal__notice-title">{lang.dict.get('priceNotice')}</div>
                            <div className="side-modal__notice-desc">{lang.dict.get('priceNoticeDesc')}</div>
                        </div>
                    </div>
                </SideModal>
            </If>
            <div className="client-tab-content">
                <div className="client-tab-content__left">
                    <DesignListings />
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
        </Page>
    );
});
