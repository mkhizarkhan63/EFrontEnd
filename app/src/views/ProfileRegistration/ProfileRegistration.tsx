import { observer } from 'mobx-react';
import { useEffect, useRef, type ReactElement } from 'react';
import { E, lang, type ErrorListHolder } from '~/api';
import { Button, ErrorList, If, StepBar, Switch } from '~/bits';
import type { CompanyType, ContractorType } from '~/models';
import { CompanyForms, PageWithSidebar } from '~/partials';
import { stores } from '~/stores';
import { hook } from '~/utils';
import { LoadingPage } from '../LoadingPage';
import { ProfileRegistrationVm } from './ProfileRegistration.vm';
import { RegisterCompany } from './RegisterCompany';
import { SubmittedProfile } from './SubmittedProfile';

type Props = {
    isNew?: boolean;
};

const createViewMap = (
    props: {
        buttons: ReactElement;
        company: CompanyType;
        errorListHolder: ErrorListHolder;
        contractor?: ContractorType;
        submitAction: () => void;
        ProfileVm : ProfileRegistrationVm;
    },
    step: E.CompanySteps,
) => {
    switch (step) {
        // case E.CompanySteps.ownerInfo:
        //     return () => <CompanyForms.CompanyOwner {...props} />;
        case E.CompanySteps.companyInfo:
            return () => <CompanyForms.CompanyProfile {...props} />;
        case E.CompanySteps.productsServices:
            return () => <CompanyForms.CompanyServices {...props} />;
        case E.CompanySteps.companyHistory:
            return () => <CompanyForms.CompanyHistory {...props} />;
        case E.CompanySteps.companyResource:
            return () => <CompanyForms.CompanyResource {...props} />;
        case E.CompanySteps.companyMarketing:
            return () => <CompanyForms.CompanyMarketing {...props} />;
        case E.CompanySteps.documents:
            return () => <CompanyForms.CompanyDocuments {...props} />;
        default:
            return null;
    }
};

export const ProfileRegistration = observer((props: Props) => {
    const vm = hook.useVm(() => new ProfileRegistrationVm(props.isNew), [props.isNew]);

    const parent = useRef<HTMLDivElement>(null);

    stores.display.router.useBlockUnload(
        () => vm.changesKeeper.shouldBlock,
        lang.dict.get('unsavedChanges'),
        ['/company'],
    );

    useEffect(() => {
        parent.current?.scrollTo(0, 0);
    }, [vm.step]);

    if (!vm.isStarted) {
        return <RegisterCompany onSubmit={vm.start} />;

    }

    if (vm.isDone) {
        return <SubmittedProfile />;
    }

    if (!vm.draft || vm.isLoading) {
        return <LoadingPage />;
    }

    const  formButtons = (
        <>
            {/* <If condition={() => vm.step !== E.CompanySteps.ownerInfo}>
                <Button
                    color="white"
                    value={lang.dict.get('goBack')}
                    onClick={vm.goPrevStep}
                />
            </If> */}
            <If condition={() => vm.step !== E.CompanySteps.companyInfo}>
                <Button
                    color="white"
                    value={lang.dict.get('goBack')}
                    onClick={vm.goPrevStep}
                />
            </If>
            <If condition={() => vm.step === E.CompanySteps.companyInfo}>
                <Button
                    color="blue"
                    value={lang.dict.get('payAndRegister')}
                    rightImg="next"
                    onClick={vm.goServiceContract}
                    isLoading={vm.isUpdating}
                    isSubmit={true}
                />
            </If>
            <Switch
                state={() => vm.step !== E.CompanySteps.documents}
                alt={() => (
                    <Button
                        color="green"
                        value={lang.dict.get('goSubmit')}
                        rightImg="next"
                        onClick={vm.goNextStep}
                        isLoading={vm.isUpdating}
                        isSubmit={true}
                    />
                )}
            >
                <If condition={() => vm.step !== E.CompanySteps.companyInfo}>
                    <Button
                        color="blue"
                        value={lang.dict.get('goNext')}
                        rightImg="next"
                        onClick={vm.goNextStep}
                        isLoading={vm.isUpdating}
                        isSubmit={true}
                    />
                </If>
            </Switch>
        </>
    );

    const Component = createViewMap(
        {
            buttons: formButtons,
            company: vm.draft,
            errorListHolder: vm.errorListHolder,
            contractor: vm?.contractor,
            submitAction: vm.goNextStep,
            ProfileVm : vm
        },
        vm.step,
    );

    if (Component === null) {
        vm.goBack();
        return null;
    }

    const Sidebar = () => (
        <div onClick={() => vm.setMobileMenuIsVisible(false)}>
            <StepBar steps={vm.sidebarData} />
        </div>
    );

    return (
        <div
            className="registration-container"
            data-is-creating={vm.isCreating}
            data-mobile-menu-is-visible={vm.mobileMenuIsVisible}
        >
            <PageWithSidebar
                sidebar={Sidebar}
                pageName="page-registration"
                ref={parent}
            >
                <div className="registration" data-type={vm.draft.type}>
                    <div className="registration__mobile-back">
                        <Button
                            color="transparent"
                            leftImg="back"
                            value={lang.dict.get('goBack')}
                            onClick={() => vm.setMobileMenuIsVisible(true)}
                        />
                    </div>
                    <div className="registration__title">
                        <h1 className="registration__title-h1">
                            {vm.title}
                        </h1>
                        <p className="registration__title-p">
                            {lang.dict.get('contractorRegistrationDesc')}
                        </p>
                    </div>
                    <Component />
                </div>
                <ErrorList errors={vm.errorListHolder} />
            </PageWithSidebar>
        </div>
    );
});
