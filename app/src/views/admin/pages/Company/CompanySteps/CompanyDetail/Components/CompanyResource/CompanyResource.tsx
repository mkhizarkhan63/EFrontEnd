import { observer } from 'mobx-react';
import { E, lang, utils } from '~/api';
import { Button, DetailList, If, Switch, NoData } from '~/bits';
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

    const companies = contractor.companies.map(item => (
        <div key={item.id} className="companies__item">
            <h1 className="companies__item-header">{item.companyName}</h1>
            <div className="companies__item-desc">
                <div className="companies__item-col">
                    <p className="companies__item-title">{lang.dict.get('crNumber')}</p>
                    <p className="companies__item-text">{item.crNumber}</p>
                </div>
                <div className="companies__item-col">
                    <p className="companies__item-title">{lang.dict.get('manpower')}</p>
                    <p className="companies__item-text">{item.manPower}</p>
                </div>
                <div className="companies__item-col">
                    <p className="companies__item-title">{lang.dict.get('typeOfServicesAndProductManagement')}</p>
                    <p className="companies__item-text">{item.typeOfServiceOrProduct}</p>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="companies">
            <p className="title">
                {lang.dict.get('companies')}
                <span className="optional-text">
                    {lang.dict.format('parentheses', [contractor.companies.length])}
                </span>
            </p>
            <div className="companies__container">
                {companies}
            </div>
        </div>
    );
});

export const CompanyResource = observer(({ vm }: Props) => {
    const resourcesList = vm.contractor
        ? [
            E.ResourceType.engineer,
            E.ResourceType.labors,
            E.ResourceType.administration,
            E.ResourceType.machinery,
        ]
        : [
            E.ResourceType.engineer,
            E.ResourceType.administration,
        ];

    const resources = resourcesList.map(item => {
        const list = vm.getNamesOfResources(item);

        const total = list.reduce(
            (sum, { toHighlight }) => sum + utils.fromInputNumber(toHighlight),
            0,
        );

        return (
            <div
                key={item}
                className="company-resources__item"
            >
                <DetailList
                    title={lang.dict.enum('resourceType', item)}
                    count={total}
                    list={list}
                />
            </div>
        );
    });

    return (
        <div className="company-detail-box company-detail-box--resource">
            <div className="company-detail-box__edit-btn">
                <Button
                    color="white"
                    isCircle={true}
                    centerImg="edit"
                    onClick={() => vm.openSection(E.CompanySteps.companyResource)}
                />
            </div>
            <p className="title">{lang.dict.format('companyResources', [utilsString.capitalize(vm.company.type)])}</p>
            <Switch
                state={() => vm.hasResources}
                alt={() => <NoData />}
            >
                <div className="company-desc">
                    <div className="company-desc__item">
                        <p className="company-desc__title">{lang.dict.get('whatMeasuresDoYouUse')}</p>
                        <p className="company-desc__value">{vm.company.measuresToMaintainQuality}</p>
                    </div>
                    <div className="company-desc__item">
                        <DetailList
                            title={lang.dict.get('planningSoftware')}
                            list={vm.company.namesOfPlanningSoftware}
                        />
                    </div>
                </div>
                <If condition={() => Boolean(vm.contractor)}>
                    <ForContractor />
                </If>
                <div className="company-resources">
                    <p className="title">{lang.dict.get('resources')}</p>
                    <div className="company-resources__container">
                        {resources}
                    </div>
                </div>
            </Switch>
        </div>
    );
});
