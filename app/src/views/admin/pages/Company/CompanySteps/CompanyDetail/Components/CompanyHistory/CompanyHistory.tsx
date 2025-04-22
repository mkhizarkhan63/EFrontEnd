import { observer } from 'mobx-react';
import { E, lang, utils } from '~/api';
import { Button, Icons, If, Switch, NoData } from '~/bits';
import type { ContractorType } from '~/models';
import { utilsString } from '~/utils';
import type { CompanyDetailVm } from '../../CompanyDetail.vm';

type Props = {
    vm: CompanyDetailVm;
};

type ForContractorProps = {
    contractor?: ContractorType;
};

const ForContractor = observer(({ contractor }: ForContractorProps) => {
    if (!contractor) {
        return null;
    }

    return (
        <>
            <div className="company-history__item">
                <p className="company-history__title">{lang.dict.get('averageChargeBlackBuilding')}</p>
                <p className="company-history__value">
                    {contractor.chargeBlackProjects} {lang.dict.get('omrM2')}
                </p>
            </div>
            <div className="company-history__item">
                <p className="company-history__title">{lang.dict.get('averageChargeTurnkey')}</p>
                <p className="company-history__value">
                    {contractor.chargeTurnkeyProjects} {lang.dict.get('omrM2')}
                </p>
            </div>
        </>
    );
});

export const CompanyHistory = observer(({ vm }: Props) => {
    const socials = vm.company.socialMedia.map((item, index) => (
        <a
            href={utilsString.toExternalUrl(item.url)}
            target="_blank"
            className="company-socials__item"
            key={`social-${item.name}-${index}`}
        >
            <Icons icon={item.name} />
        </a>
    ));

    return (
        <div className="company-detail-box company-detail-box--history">
            <div className="company-detail-box__edit-btn">
                <Button
                    color="white"
                    isCircle={true}
                    centerImg="edit"
                    onClick={() => vm.openSection(E.CompanySteps.companyHistory)}
                />
            </div>
            <p className="title">{lang.dict.get('companyHistory')}</p>
            <Switch
                state={() => vm.hasHistory}
                alt={() => <NoData />}
            >
                <div className="company-history-container">
                    <div className="company-history">
                        <div className="company-history__item">
                            <p className="company-history__title">{lang.dict.get('projectsDelivered')}</p>
                            <p className="company-history__value">
                                {utilsString.toTwoDigitNumber(vm.company.projectsDelivered)}
                            </p>
                        </div>
                        <div className="company-history__item">
                            <p className="company-history__title">{lang.dict.get('projectsWorkedOnAtOnce')}</p>
                            <p className="company-history__value">
                                {utilsString.toTwoDigitNumber(vm.company.projectsWorkedAtOnce)}
                            </p>
                        </div>
                        <div className="company-history__item">
                            <p className="company-history__title">{lang.dict.format('largestProjectAwardedTo', [utilsString.capitalize(vm.company.type)])} </p>
                            <p className="company-history__value">
                                {vm.company.largestProjectAwarded} {lang.dict.get('fieldOmr')}
                            </p>
                        </div>
                        <div className="company-history__item">
                            <p className="company-history__title">{lang.dict.get('yearsOfExperience')}</p>
                            <p className="company-history__value">
                                {utilsString.toTwoDigitNumber(vm.company.yoursYearsOfExperience)}
                            </p>
                        </div>
                        <If condition={() => Boolean(vm.contractor)}>
                            <ForContractor contractor={vm.contractor} />
                        </If>
                        <div className="company-history__item">
                            <p className="company-history__title">{lang.dict.get('organizationFailed')}</p>
                            <p className="company-history__value">
                                {utils.toStrBool(vm.company.failedCompleteAwardedWork)}
                            </p>
                        </div>
                        <div className="company-history__item">
                            <p className="company-history__title">{lang.dict.get('areTheyAnyJudgements')}</p>
                            <p className="company-history__value">
                                {utils.toStrBool(vm.company.anyJudgmentsPendingOrOutstanding)}
                            </p>
                        </div>
                    </div>
                </div>
                <p className="title">{lang.dict.get('marketingInformation')}</p>
                <div className="company-socials">
                    {socials}
                </div>
            </Switch>
        </div>
    );
});
