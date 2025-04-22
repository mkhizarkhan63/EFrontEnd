import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, Close, ErrorList, If, Input, SideModal } from '~/bits';
import { SearchBox } from '~/bits/Input';
import type { FileDataType } from '~/models';
import { hook } from '~/utils';
import type { UserVm } from '../../User.vm';
import { CompanyAssociationsVm } from './CompanyAssociations.vm';

type Props = {
    parentVm: UserVm;
};

type CompanyItemProps = {
    companyLogo?: FileDataType;
    name: string;
    companyRelationship: E.AffiliationType;
    profileType: E.ProfileType;
    status: E.CompaniesStatus;
};

const CompanyItem = observer((props: CompanyItemProps) => (
    <div className="companies__item">
        <img src={props.companyLogo?.img?.url} alt="avatar" className="companies__item-img" />
        <div className="companies__item-desc">
            <p className="companies__item-title">{props.name}</p>
            <p className="companies__item-role">
                {lang.dict.enum('affiliationType', props.companyRelationship)}
            </p>
            <div className="companies__item-labels">
                <p className="companies__item-label" data-role={props.profileType}>
                    {lang.dict.enum('profileType', props.profileType)}
                </p>
                <If condition={props.status !== E.CompaniesStatus.approved} >
                    <p className="companies__item-label companies__item-label--gray">
                        {lang.dict.get('waitingForApproval')}
                    </p>
                </If>
            </div>
        </div>
    </div>
));

export const CompanyAssociations = observer(({ parentVm }: Props) => {
    const vm = hook.useVm(() => new CompanyAssociationsVm(parentVm));

    const companies = parentVm.companyAssociations.data.map((item, index) => (
        <CompanyItem
            key={`${index}-${item.name}`}
            name={item.name}
            companyRelationship={item.affiliationType}
            profileType={item.profileType}
            status={item.status}
        />
    ));

    const chooseCategory = (() => {
        if (!vm.company) {
            return null;
        }

        return (
            <Input.Multiple
                type="radio"
                onChange={vm.company.setCategory}
                values={vm.company?.companyCategory ?? []}
            />
        );
    })();

    return (
        <div className="company-associations">
            <div className="company-associations__top">
                <div className="company-associations__header">
                    {lang.dict.get('companyAssociations')}&nbsp;
                    <span className="company-associations__header-num">
                        ({parentVm.user.companyAssociations})
                    </span>
                </div>
                <Button
                    color="blue"
                    leftImg="add"
                    value={lang.dict.get('addCompanyAssociation')}
                    onClick={vm.toggleModalOpen}
                />
            </div>
            <If condition={() => vm.isOpen} >
                <SideModal
                    variant="company-association"
                    onBlur={vm.toggleModalOpen}
                >
                    <div className="side-modal__header">
                        <Close onClick={vm.toggleModalOpen} />
                        <p className="side-modal__header-title">{lang.dict.get('addCompanyAssociation')}</p>
                    </div>
                    <div className="side-modal__content">
                        <SearchBox
                            options={vm.proposedCompanies}
                            textValue={vm.searchText}
                            onChange={vm.onSearch}
                            precisionVisible={0}
                            onVisibilityChange={vm.onVisibilityChange}
                        />
                        {chooseCategory}
                        <Button
                            onClick={vm.addCompany}
                            color="blue"
                            value={lang.dict.get('addCompanyAssociation')}
                            rightImg="arrow-right"
                            isLoading={vm.isLoading}
                            isDisabled={!vm.company}
                        />
                    </div>
                </SideModal>
            </If>
            <div className="companies">
                {companies}
            </div>
            <ErrorList
                errors={vm.errorListHolder}
            />
        </div>
    );
});
