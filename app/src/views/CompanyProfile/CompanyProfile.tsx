import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import {
    Button,
    Comment,
    DetailList,
    If,
    ProfileCompany,
    ResourcesBlock,
    SliderMulti,
    EngineeringServicesBlock,
    PersonsCard,
    Switch,
    NoData,
    Icons,
} from '~/bits';
import { Stars } from '~/models';
import { PageLayout21 } from '~/partials';
import { hook } from '~/utils';
import { LoadingPage } from '~/views';
import { CompanyProfileVm } from './CompanyProfile.vm';

type Props = {
    vm: CompanyProfileVm;
};

const LeftSide = observer(({ vm }: Props) => (
    <div className="left-content">
        <Switch
            state={() => !vm.hasNoData}
            alt={() => (
                <div className="no-data-container">
                    <NoData forReview={true} />
                </div>
            )}
        >
            <SliderMulti
                list={vm.sliderData}
                onBack={vm.goBack}
                current={vm.sliderCurrent}
                setCurrent={vm.setSliderCurrent}
            />
        </Switch>
    </div>
));

const MoreDetail = observer(({ vm }: Props) => (
    <>
        <p className="details__header">
            {lang.dict.get('companyAdditionalInformation')}
        </p>
        <div className="toggle-content__items">
            <div className="toggle-content__item">
                <p className="toggle-content__desc">
                    {lang.dict.get('ownersYearsOfExperience')}
                </p>
                {vm.company?.yoursYearsOfExperience ?? 0}
            </div>
            <div className="toggle-content__item">
                <p className="toggle-content__desc">
                    {lang.dict.get('projectsDeliveredByTheContractor')}
                </p>
                {vm.company?.projectsDelivered ?? 0}
            </div>
            <div className="toggle-content__item">
                <p className="toggle-content__desc">
                    {lang.dict.get('projectsWorkedOnAtOnceInThePast')}
                </p>
                {vm.company?.projectsWorkedAtOnce ?? 0}
            </div>
            <div className="toggle-content__item">
                <p className="toggle-content__desc">
                    {lang.dict.get('largestProjectValue')}
                </p>
                {vm.company?.largestProjectAwarded ?? 0}
            </div>
        </div>
    </>
));

const Comments = observer(({ vm }: Props) => {
    const comments = vm.reviewComments?.map(item => {
        const starsValues = Object.entries(item.abilties)
            .map(key => ({
                key: key[0],
                value: key[1],
            }));

        return (
            <Comment
                key={item.name}
                name={item.name}
                labels={Stars.starsLabels}
                values={starsValues}
                date={item.date}
                avatar={item.avatar}
                text={item.comment}
            />
        );
    });

    return <>{comments}</>;
});

const PreviousProjects = observer(({ vm }: Props) => {
    const projects = vm.references
        ?.map(item => (
            <div
                key={item.id}
                onClick={() => vm.setPreviousProjectId(item.id)}
                data-is-active={item.id === vm.currentPreviousProjectId}
                className="previous-projects__item"
            >
                {item.wilayatName}, {item.governorateName}
                <Icons icon="next-sign" />
            </div>
        ));

    return (
        <div className="previous-projects">
            <p className="previous-projects__title">
                {lang.dict.get('previousProjects')}
            </p>
            {projects}
        </div>
    );
});

export const CompanyProfile = observer(({ type }: { type: E.RoleInCompany }) => {
    const vm = hook.useVm(() => new CompanyProfileVm(type), [type]);

    if (vm.isLoading) {
        return <LoadingPage />;
    }

    if (!vm.company) {
        vm.goBack();
        return null;
    }

    return (
        <PageLayout21 content={<LeftSide vm={vm} />}>
            <section className="details">
                <ProfileCompany
                    name={vm.company.nameTranslated}
                    stars={{ labels: Stars.starsLabels, values: vm.company.starsValues }}
                    avatar={vm.avatar}
                    contact={vm.contact}
                    socialMedia={vm.socialMedia}
                    headOffice={vm.company.headOffice}
                    estabilished={vm.company.crStartDate?.format('YYYY')}
                    isPublicProfile={true}
                >
                    <If condition={() => vm.status === E.ContractorStatus.invited}>
                        <div className="profile-details__btn-with-text">
                            <Button
                                leftImg="tick-btn"
                                color="gray"
                                onClick={vm.changeStatus}
                                value={lang.dict.get('invited')}
                            />
                            <span className="profile-details__btn-desc">
                                {lang.dict.get('waitingForContractorToAcceptProject')}
                            </span>
                        </div>
                    </If>
                </ProfileCompany>
                <Switch state={!vm.isPreviousProjects} alt={() => <PreviousProjects vm={vm} />}>
                    <If condition={() => type === E.RoleInCompany.contractor}>
                        <div className="details__section details__section--informations">
                            <div className="one-columns">
                                <DetailList
                                    title={vm.worksInGovernorates.title}
                                    list={vm.worksInGovernorates.list}
                                    headOffice={vm.company?.headOffice}
                                />
                                <If condition={vm.registeredAt.list.length > 0} >
                                    <DetailList
                                        title={vm.registeredAt.title}
                                        list={vm.registeredAt.list}
                                    />
                                </If>
                            </div>
                            <ResourcesBlock data={vm.company.resourcesList} />
                        </div>
                        <div className="details__section details__section--products">
                            <div className="one-columns">
                                <DetailList
                                    title={vm.products.title}
                                    list={vm.products.list}
                                />
                                <DetailList
                                    title={vm.services.title}
                                    list={vm.services.list}
                                />
                            </div>
                            <div className="details__section details__section--toggle">
                                <div className="toggle-content" data-opened={vm.isShowingDetails}>
                                    <MoreDetail vm={vm} />
                                </div>
                                <div className="toggle-btn">
                                    <Button
                                        color="gray"
                                        onClick={vm.openMoreDetail}
                                        value={lang.dict.get(vm.isShowingDetails ? 'hideDetails' : 'viewMoreDetails')}
                                    />
                                </div>
                            </div>
                        </div>
                    </If>
                    <If condition={() => type === E.RoleInCompany.consultant}>
                        <EngineeringServicesBlock
                            services={vm.namesAndIconsOfServices}
                            products={vm.namesAndIconsOfProducts}
                            servicesPrice={vm.servicesPrice}
                            supervisionPrice={vm.supervisionPrice}
                            isProvidingSupervision={vm.isProvidingSupervision}
                            isProvidingDesign={vm.isProvidingDesign}
                            everyPrice={vm.everyPrice}
                            everySize={vm.everySize}
                            upTo={vm.upTo}
                        />
                        <PersonsCard persons={vm.company.employees.data} />
                    </If>
                    <div className="details__section details__section--reviews">
                        <p className="details__header">
                            {lang.dict.get('reviews')}
                            <span className="details__header-value">
                                {`(${vm.reviewComments?.length ?? 0})`}
                            </span>
                        </p>
                        <Comments vm={vm} />
                    </div>
                </Switch>
                <div className="details__bottom-btn">
                    <Button
                        color="white"
                        value={vm.isPreviousProjects ? lang.dict.get('viewCompanyProfile') : lang.dict.get('viewPreviousProjects')}
                        rightImg="next"
                        onClick={vm.switchPreviousProjects}
                    />
                </div>
            </section>
        </PageLayout21>
    );
});
