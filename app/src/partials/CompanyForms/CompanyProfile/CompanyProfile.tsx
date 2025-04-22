import { observer } from 'mobx-react';
import { useState, type ReactElement } from 'react';
import { E, lang, utils, type ErrorListHolder } from '~/api';
import { Button, Icons, If, Input, Uploader } from '~/bits';
import { type CompanyType, type ContractorType } from '~/models';
import { hook, preventDefault, utilsDate } from '~/utils';
import { CompanyProfileVm } from './CompanyProfile.vm';
import { ServicesAgreement } from './SignServicesAgreementModal/ServicesAgreement';
import { ProfileRegistrationVm } from '~/views/ProfileRegistration/ProfileRegistration.vm';

type Props = {
    company: CompanyType;
    contractor?: ContractorType;
    buttons: ReactElement;
    errorListHolder: ErrorListHolder;
    submitAction?: () => void;
    ProfileVm?: ProfileRegistrationVm
};

type ForContractorProps = {
    company: CompanyType;
    contractor?: ContractorType;
};

type CompanyTypeProps = {
    company: CompanyType
    profileVm?: ProfileRegistrationVm
}

const ForContractor = observer(({ contractor, company }: ForContractorProps) => {
    if (!contractor) {
        return null;
    }

    return (
        <div className="form-choices">
            <h2 className="form__header">
                {lang.dict.get('yourChoicesHere')}
            </h2>
            <p className="form-choices__desc form-choices__desc--light">
                {lang.dict.get('forExampleProjectSize')}
            </p>
            <p className="form-choices__desc form-choices__desc--small-margin">
                {lang.dict.get('pleaseCheckGovernorate')}
                <span className="form-choices__desc form-choices__desc--light">
                    {lang.dict.get('selectAtLeastGovernorate')}
                </span>
            </p>
            <Input.Multiple
                values={contractor.areYouAtGovernorate}
                onChange={contractor.toggleGovernorate}
                singleDisabledId={company.governorate?.id}
            />
            <div className="form-proj-size">
                <Input.Text
                    name={lang.dict.get('specifyMinimumProjectSize')}
                    description={lang.dict.get('fieldMin200')}
                    value={utils.toInputNumber(contractor.minimumProjectSize)}
                    onChange={contractor.setProjectSize}
                    placeHolder={lang.dict.get('fieldInM2')}
                />
                <span className="form-proj-size__unit">{lang.dict.get('m2')} </span>
            </div>
        </div>
    );
});


export const CompanyProfile = observer((props: Props) => {
    const {
        company,
        contractor,
        buttons,
        errorListHolder,
        submitAction,
        ProfileVm
    } = props;

    hook.useVm(() => new CompanyProfileVm(company, errorListHolder, contractor));

    hook.useAutoFocus();

    

    return (
        <>
            <div className="company-forms company-forms--owner">
                <form
                    className="form"
                >
                    <h2 className="form__header">{lang.dict.get('ownerInformation')}
                    </h2>
                    <p className="owner-field">
                        {lang.dict.get('fieldAreYouOwner')}&nbsp;
                    </p>
                    <Input.Checkbox
                        type="radio"
                        text={{
                            first: lang.dict.get('switchYes'),
                            second: lang.dict.get('switchNo'),
                        }}
                        onChange={() => { }}
                    />


                </form>
            </div>
            <div className="company-forms company-forms--profile">
                <form
                    className="form"
                >
                    <h2 className="form__header">{lang.dict.get('companyInformation')}
                    </h2>
                    <div className="form-info">
                        <div>
                            <p className="uploader__label">
                                {lang.dict.get('fieldCompanyLogo')}
                            </p>
                            <If condition={!company.logo?.hasImg}>
                                <Uploader
                                    description={lang.dict.get('fieldCompanyUploader')}
                                    acceptExtensions={['image/*']}
                                    fileList={[]}
                                    onUpload={company.uploadAvatar}
                                    onRemove={company.removeLogo}
                                />
                            </If>
                            <If condition={Boolean(company.logo?.hasImg)}>
                                <div className="uploader">
                                    <img
                                        className="uploader__uploaded-img"
                                        src={company.logoUrl}
                                        alt="Company Logo"
                                    />
                                    <div className="uploader__remove-img">
                                        <Button
                                            centerImg="close"
                                            onClick={company.removeLogo}
                                            color="gray"
                                            isCircle={true}
                                            hasOutline={true}
                                        />
                                    </div>
                                </div>
                            </If>
                        </div>

                        <div className='form-info-company-name'>
                            <Input.Text
                                name={lang.dict.get('fieldCompanyName')}
                                value={company.name}
                                onChange={company.setName}
                                placeHolder={lang.dict.get('fieldWriteNamePlaceholder')}
                            />
                            <div className="form-info-sub-fields">
                                <Input.Text
                                    name={lang.dict.get('email')}
                                    value={company.email}
                                    onChange={company.setEmail}
                                    placeHolder={lang.dict.get('fieldWriteEmailPlaceholder')}
                                />
                                <Input.Text
                                    name={lang.dict.get('phone')}
                                    value={company.phone}
                                    onChange={company.setPhone}
                                    placeHolder={lang.dict.get('fieldWritePhonePlaceholder')}
                                />

                            </div>
                            <div className='form-info-head-office'>
                                <h3 className='form-info-head-office-title'>{lang.dict.get('headOffice')}</h3>
                                <div className='form-info-head-office-sub-field-flex'>
                                    <Input.Select
                                        name={lang.dict.get('headOfficeGovernorate')}
                                        values={company.governoratesList}
                                        value={company.headOfficeGovernorateId}
                                        onChange={company.setHeadGovernorate}
                                    />
                                    <Input.Select
                                        name={lang.dict.get('headOfficeWilayat')}
                                        values={company.wilayatsList}
                                        value={company.headOfficeWilayatId}
                                        onChange={company.setHeadWilayat}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>


                </form>
            </div>
            <div className="company-forms company-forms--ohb">
                <form
                    className="form"
                >
                    <h2 className="form__header">{lang.dict.get('registeredCompaniesOHB')}
                    </h2>
                    <div className="form-info">
                        <div className="check-register-ohb">
                            <p className="check-register-ohb__title">
                                {lang.dict.get('registerAtOHB')}&nbsp;
                            </p>
                            <Input.Checkbox
                                type="radio"
                                text={{
                                    first: lang.dict.get('switchYes'),
                                    second: lang.dict.get('switchNo'),
                                }}
                                onChange={() => { }}
                            />
                        </div>
                        <div className="input-container-flex">
                            <Input.Text
                                name={lang.dict.get('accountNumber')}
                                placeHolder={lang.dict.get('accountNumberPlaceholder')}
                            />
                            <Input.Text
                                name={lang.dict.get('bankBranch')}
                                placeHolder={lang.dict.get('bankBranchPlaceholder')}
                            />


                        </div>
                    </div>

                </form>
            </div>

            <div className='company-forms company-forms-memberships'>
                {/* <MemberShipServices company={company} profileVm={ProfileVm} /> */}
                <form className="form">
                    <h2 className="form__header">{lang.dict.get('services')}</h2>
                    <p className="form__subheader">{lang.dict.get('proMemberShipSubHeader')}</p>
                    <div className="form-info">
                        {ProfileVm?.getSelectedService(company.type).map((service) => (
                            <div
                                key={service.id}
                                className='card'
                                card-selected={`${ProfileVm.selectedServices.includes(service.id) ? true : false}`}
                                onClick={() => ProfileVm.handleServiceSelect(service.id, company.type)}
                            >
                                <div className="card-header">
                                    <If condition={() => service.icon === E.MembershipServiceType.developer}>
                                        <Icons icon={E.MembershipServiceType.developer} />
                                    </If>
                                    <If condition={() => service.icon === E.MembershipServiceType.construction}>
                                        <Icons icon={'contractor'} />
                                    </If>
                                    <If condition={() => service.icon === E.MembershipServiceType.design}>
                                        <Icons icon={'consultant'} />
                                    </If>
                                    <If condition={() => service.icon === E.MembershipServiceType.supervision}>
                                        <Icons icon={'architect'} />
                                    </If>
                                    <h4 className="heading">{lang.dict.get(service.name)}</h4>
                                </div>
                                <div className="card-body">
                                    {service.description.map((line, index) => (
                                        <p key={index}>
                                            <Icons icon="tick-gray" /> {lang.dict.get(line)}
                                        </p>
                                    ))}
                                </div>
                                <div className="card-footer">
                                    <div className="price">
                                        <If condition={() => service.id === E.MembershipServiceType.design}>
                                            {lang.dict.get('free')} <span className="year">/{lang.dict.get('forFirstYear')}</span>
                                        </If>
                                        <If condition={() => service.id !== E.MembershipServiceType.design}>
                                            {service.price} {lang.dict.get('fieldOmr')} <span className="year">/{lang.dict.get('year')}</span>
                                        </If>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="form-footer">
                        <div className="total">
                            {lang.dict.get('total')}: <b>{ProfileVm?.getTotalPriceSelectedService(company.type)} {lang.dict.get('fieldOmr')}</b>
                        </div>
                    </div>
                </form>
            </div>
            {ProfileVm && ProfileVm.servicesContractAgreement && (
                <ServicesAgreement profileVm={ProfileVm} />
            )}

            <div className="company-forms-btns">
                {buttons}
            </div>
        </>
    );
});
