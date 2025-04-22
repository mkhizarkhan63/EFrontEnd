import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, Icons, If, Switch, NoData } from '~/bits';
import type { CompanyDetailVm } from '../../CompanyDetail.vm';
import { utilsDate, utilsNumber } from '~/utils';

type Props = {
    vm: CompanyDetailVm;
};

export const CompanyReferences = observer(({ vm }: Props) => {
    const references = vm.company.references.map(item => (
        <div key={item.id} className="references__item">
            <p className="references__item-name">
                {item.clientName}
            </p>
            <div className="references__item-phone">
                <a href={`tel:${item.phoneNumber}`} className="references__item-phone-num">
                    <Icons icon="phone" />
                    {item.phoneNumber}
                </a>
            </div>
            <div className="references__item-info">
                <div className="references__item-col">
                    <p className="references__item-title">
                        {item.governorateName}
                    </p>
                    <p className="references__item-text">
                        {item.wilayatName}
                    </p>
                </div>
                <div className="references__item-col">
                    <p className="references__item-title">
                        {lang.dict.get('clientsProjectValue')}
                    </p>
                    <p className="references__item-text">
                        {utilsNumber.valueOrPlaceholder(
                            item.projectValue,
                            'fieldOmr',
                        )}
                    </p>
                </div>
                <div className="references__item-col">
                    <p className="references__item-title">
                        {lang.dict.get('clientsProjectType')}
                    </p>
                    <p className="references__item-text">
                        {lang.dict.enum('constructionType', item.projectType)}
                    </p>
                </div>
                <div className="references__item-col">
                    <p className="references__item-title">
                        {lang.dict.get('clientsProjectCompletionDate')}
                    </p>
                    <p className="references__item-text">
                        {utilsDate.displayDefaultDate(item.projectCompletionDate)}
                    </p>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="company-detail-box company-detail-box--references">
            <div className="company-detail-box__edit-btn">
                <Button
                    color="white"
                    isCircle={true}
                    centerImg="edit"
                    onClick={() => vm.openSection(E.CompanySteps.companyMarketing)}
                />
            </div>
            <p className="title">
                {lang.dict.get('clientReferences')}
                <If condition={() => vm.company.references.length > 0}>
                    <span className="optional-text">
                        {lang.dict.format('parentheses', [vm.company.references.length])}
                    </span>
                </If>
            </p>
            <div className="references" data-is-empty={!vm.hasReferences}>
                <Switch
                    state={() => vm.hasReferences}
                    alt={() => <NoData />}
                >
                    {references}
                </Switch>
            </div>
        </div>
    );
});
