import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, DetailList, EngineeringServicesBlock, If, Switch, NoData } from '~/bits';
import type { ConsultantType, ContractorType } from '~/models';
import type { CompanyDetailVm } from '../../CompanyDetail.vm';

type Props = {
    vm: CompanyDetailVm;
};

type ForContractorProps = {
    contractor?: ContractorType;
};

type ForConsultantProps = {
    consultant?: ConsultantType;
};

const ForContractor = observer(({ contractor }: ForContractorProps) => {
    if (!contractor) {
        return null;
    }

    return (
        <>
            <div className="company-detail-services__col">
                <DetailList
                    title={lang.dict.get('products')}
                    list={contractor.namesOfProducts}
                />
            </div>
            <div className="company-detail-services__col">
                <DetailList
                    title={lang.dict.get('services')}
                    list={contractor.namesOfServices}
                />
            </div>
        </>
    );
});

const ForConsultant = observer(({ consultant }: ForConsultantProps) => {
    if (!consultant) {
        return null;
    }

    return (
        <EngineeringServicesBlock
            services={consultant.namesAndIconsOfServices}
            products={consultant.namesAndIconsOfProducts}
            servicesPrice={consultant.servicesPrice}
            supervisionPrice={consultant.supervisionServicePrice}
            isProvidingSupervision={consultant.isProvideSupervision}
            everyPrice={consultant.everyDesignPackagePrice}
            everySize={consultant.everyDesignPackageSize}
            upTo={consultant.landTo}
            isProvidingDesign={consultant.isProvideDesign}
        />
    );
});

export const CompanyServices = observer(({ vm }: Props) => (
    <div className="company-detail-box company-detail-box--services">
        <div className="company-detail-box__edit-btn">
            <Button
                color="white"
                isCircle={true}
                centerImg="edit"
                onClick={() => vm.openSection(E.CompanySteps.productsServices)}
            />
        </div>
        <p className="title">{lang.dict.get('productsServices')}</p>
        <div className="company-detail-services" data-is-empty={!vm.hasServices}>
            <Switch
                state={() => vm.hasServices}
                alt={() => <NoData />}
            >
                <If condition={() => Boolean(vm.contractor)}>
                    <ForContractor contractor={vm.contractor} />
                </If>
                <If condition={() => Boolean(vm.consultant)}>
                    <ForConsultant consultant={vm.consultant} />
                </If>
            </Switch>
        </div>
    </div>
));
