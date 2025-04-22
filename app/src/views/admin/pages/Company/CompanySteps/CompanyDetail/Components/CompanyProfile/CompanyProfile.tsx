import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, DetailList, Icons, If } from '~/bits';
import type { CompanyDetailVm } from '../../CompanyDetail.vm';

type Props = {
    vm: CompanyDetailVm;
};

export const CompanyProfile = observer(({ vm }: Props) => (
    <div className="company-detail-box">
        <div className="company-detail-box__edit-btn">
            <Button
                color="white"
                isCircle={true}
                centerImg="edit"
                onClick={() => vm.openSection(E.CompanySteps.companyInfo)}
            />
        </div>
        <p className="title">{lang.dict.get('pageCompanyProfile')}</p>
        <div className="company-detail-profile">
            <img src={vm.company.logoUrl} className="company-detail-profile__img" alt=" " />
            <div className="company-detail-profile__desc">
                <h2 className="company-detail-profile__header">
                    {vm.company.name}
                </h2>
                <div className="company-detail-profile__contact">
                    <div className="company-detail-profile__contact-item">
                        <a className="company-detail-profile__contact-link" href={`tel:${vm.company.phone}`}>
                            <Icons icon="phone" />
                            {vm.company.phone}
                        </a>
                    </div>
                    <div className="company-detail-profile__contact-item">
                        <a className="company-detail-profile__contact-link" href={`mailto:${vm.company.email}`}>
                            <Icons icon="email" />
                            {vm.company.email}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="company-detail-desc">
            <div className="company-detail-desc__col">
                <p className="company-detail-desc__title">{lang.dict.get('headOffice')}</p>
                <p className="company-detail-desc__value">{vm.company.headOffice}</p>
                <p className="company-detail-desc__title company-detail-desc__title--mb">{lang.dict.get('crNumber')}</p>
                <p className="company-detail-desc__value">{vm.company.crNumber}</p>
                <p className="company-detail-desc__title company-detail-desc__title--mb">{lang.dict.get('crDate')}</p>
                <p className="company-detail-desc__value">{vm.company.crStartDate?.format('ll')} - {vm.company.crExpirationDate?.format('ll')} </p>
                <If condition={() => Boolean(vm.contractor)}>
                    <p className="company-detail-desc__title company-detail-desc__title--mb">{lang.dict.get('minimumBiddingProject')}</p>
                    <p className="company-detail-desc__value">{vm.contractor?.minimumProjectSize}</p>
                </If>
            </div>
            <div className="company-detail-desc__col company-detail-desc__col--detail">
                <DetailList
                    title={lang.dict.get('organizationRegisteredAt')}
                    list={vm.company.namesOfRegisteredAt}
                />
                <If condition={() => Boolean(vm.contractor)}>
                    <DetailList
                        title={lang.dict.get('workingGovernorate')}
                        list={vm.contractor?.namesOfGovernorates ?? []}
                    />
                </If>
            </div>
        </div>
    </div>
));
