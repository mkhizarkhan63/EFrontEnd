import { observer } from 'mobx-react';
import { lang } from '~/api';
import {
    Button,
    DetailList,
    ProfileCompany,
    ResourcesBlock,
    PersonsCard,
    EngineeringServicesBlock,
    If,
} from '~/bits';
import { Consultant, Contractor, Stars } from '~/models';
import { hook, utilsString } from '~/utils';
import { CompanyProfileVm } from './CompanyProfile.vm';

type InformationProps = {
    title: string;
    answer: string | number;
};

const Information = (props: InformationProps) => {
    const text = typeof props.answer === 'string' ?
        props.answer
        : utilsString.toTwoDigitNumber(props.answer);

    return (
        <div className="info-additional__item">
            <p className="info-additional__item-title">{props.title}</p>
            <p className="info-additional__item-answer">{text}</p>
        </div>
    );
};

export const CompanyProfile = observer(() => {
    const vm = hook.useVm(() => new CompanyProfileVm());

    if (!vm.profile) {
        return null;
    }

    const forConsultant = Consultant.is(vm.profile)
        ? (
            <>
                <EngineeringServicesBlock
                    services={vm.profile.namesAndIconsOfServices}
                    products={vm.profile.namesAndIconsOfProducts}
                    servicesPrice={vm.profile.servicesPrice}
                    supervisionPrice={vm.profile.supervisionServicePrice}
                    isProvidingSupervision={vm.profile.isProvideSupervision}
                    everyPrice={vm.profile.everyDesignPackagePrice}
                    everySize={vm.profile.everyDesignPackageSize}
                    upTo={vm.profile.landTo}
                    isProvidingDesign={vm.profile.isProvideDesign}
                />
                <PersonsCard persons={vm.profile.employees.data} />
            </>
        )
        : null;

    const forContractor = Contractor.is(vm.profile)
        ? (
            <>
                <div className="contractor-settings__info">
                    <div className="governates two-columns">
                        <DetailList
                            title={lang.dict.get('companyWorksInGovernorates')}
                            list={vm.workingGovernorates}
                            headOffice={vm.profile?.headOffice}
                        />
                        <If condition={vm.profile.namesOfRegisteredAt.length > 0}>
                            <DetailList
                                title={lang.dict.get('companyRegistredAt')}
                                list={vm.profile.namesOfRegisteredAt}
                            />
                        </If>
                    </div>
                    <ResourcesBlock data={vm.profile.resourcesList} />
                    <p className="contractor-settings__subheader">
                        {lang.dict.get('companyProductsAndServices')}
                    </p>
                    <div className="products two-columns">
                        <DetailList
                            title={lang.dict.get('products')}
                            list={vm.profile.namesOfProducts}
                        />
                        <DetailList
                            title={lang.dict.get('services')}
                            list={vm.profile.namesOfServices}
                        />
                    </div>
                </div>
                <div className="info-additional">
                    <p className="contractor-settings__subheader">
                        {lang.dict.get('companyAdditionalInformation')}
                    </p>
                    <div className="info-additional__items">
                        <Information
                            title={lang.dict.get('companyYearsOfExperience')}
                            answer={vm.profile.yoursYearsOfExperience}
                        />
                        <Information
                            title={lang.dict.get('companyProjectDelivered')}
                            answer={vm.profile.projectsDelivered}
                        />
                        <Information
                            title={lang.dict.get('companyLargestProject')}
                            answer={vm.profile.largestProjectAwarded}
                        />
                        <Information
                            title={lang.dict.get('companyProjectsWorked')}
                            answer={vm.profile.projectsWorkedAtOnce}
                        />
                        <Information
                            title={lang.dict.get('companyWhatProjectPlanning')}
                            answer={vm.planningSoftware}
                        />
                        <Information
                            title={lang.dict.get('companyWhatMeasures')}
                            answer={vm.profile.measuresToMaintainQuality}
                        />
                    </div>
                </div>
            </>
        )
        : null;

    return (
        <div className="contractor-settings contractor-settings--company-profile">
            <div className="contractor-settings__top">
                <h2 className="contractor-settings__header">
                    {lang.dict.get('pageCompanyProfile')}
                </h2>
                <div className="contractor-settings__top-btns">
                    <Button
                        color="white"
                        leftImg="edit"
                        value={lang.dict.get('profileEditProfile')}
                        onClick={vm.goToEditProfile}
                    />
                    <Button
                        color="white"
                        rightImg="next"
                        value={lang.dict.get('profileSeePublicProfile')}
                        onClick={vm.goToPublicProfile}
                    />
                </div>
            </div>
            <ProfileCompany
                name={vm.profile.nameTranslated}
                stars={{ labels: Stars.starsLabels, values: vm.profile.starsValues }}
                dateSince={vm.profile.crStartDate}
                avatar={vm.profile.logo?.img}
                contact={vm.contact}
                socialMedia={vm.socialMedia}
                isProfileSettings={true}
            />
            {forContractor}
            {forConsultant}
        </div>
    );
});
