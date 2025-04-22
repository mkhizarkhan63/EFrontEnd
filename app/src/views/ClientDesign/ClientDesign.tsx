import { observer } from 'mobx-react';
import { useState } from 'react';
import { lang } from '~/api';
import { Button, Close, Icons, If, SideModal } from '~/bits';
import { ArchitectListings, ClientNav, ClientNavBanner, Page } from '~/partials';

const Menu = () => (
    <div className="client-nav-banner__right">
        <div className="client-nav-banner__right-icon">
            <Icons icon="upload" />
        </div>
        <p className="client-nav-banner__right-title">
            {lang.dict.get('craftingPerfectHome')}
        </p>
        <p className="client-nav-banner__right-text">
            {lang.dict.get('shareDesign')}
        </p>
        <Button
            isDisabled={true}
            color="gray"
            leftImg="upload"
            value={lang.dict.get('comingSoon')}
        />
    </div>
);

export const ClientDesign = observer(() => {
    const [isSideModalOpened, setSideModalOpened] = useState(false);

    return (
        <Page name="client">
            <ClientNav />
            <ClientNavBanner
                title={lang.dict.get('designWithBest')}
                description={lang.dict.get('viewTheBest')}
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
                            {lang.dict.get('designJourney')}
                        </div>
                        <div className="side-modal__steps">
                            <div className="side-modal__step" data-status="inProgress">
                                <div className="side-modal__step-status" />
                                <div>
                                    <p className="side-modal__step-title">
                                        {lang.dict.get('selectArchitect')}
                                    </p>
                                    <p className="side-modal__step-desc">
                                        {lang.dict.get('selectArchitectDesc')}
                                    </p>
                                </div>
                            </div>
                            <div className="side-modal__step">
                                <div className="side-modal__step-status" />
                                <div>
                                    <p className="side-modal__step-title">
                                        {lang.dict.get('sendMessage')}
                                    </p>
                                    <p className="side-modal__step-desc">
                                        {lang.dict.get('sendMessageDesc')}
                                    </p>
                                </div>
                            </div>
                            <div className="side-modal__step">
                                <div className="side-modal__step-status" />
                                <div>
                                    <p className="side-modal__step-title">
                                        {lang.dict.get('designProject')}
                                    </p>
                                    <p className="side-modal__step-desc">
                                        {lang.dict.get('designProjectDesc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SideModal>
            </If>
            <div className="client-tab-content">
                <div className="client-tab-content__left">
                    <ArchitectListings />
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
