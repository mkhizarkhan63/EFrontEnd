import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, ErrorList, If, Input } from '~/bits';
import { preventDefault } from '~/utils';
import type { ProjectInvitationsVm } from '../ProjectInvitations.vm';
import { stores } from '~/stores';

type Props = {
    vm: ProjectInvitationsVm;
};

export const ShortRegistration = observer(({ vm }: Props) => {
    const governorates = vm.projectGovernorates.map((item, index) => {
        const govName = stores.locations.governorates.find(gov => gov.id.isEqual(item))?.displayName ?? '';

        const rows = vm.projectWilayats.map((projectWilayat, i) => {
            const wilayat = stores.locations.wilayats.find(wil => wil.id.isEqual(projectWilayat));

            const input = vm.wilayatPrices.find(price => price.id?.isEqual(projectWilayat));

            if (wilayat?.governorateId.isEqual(item)) {
                return (
                    <div key={i} className="governorate__row">
                        <Input.Checkbox
                            type="check"
                            isChecked={true}
                        />
                        <Input.Select
                            values={[{ value: projectWilayat, name: wilayat.displayName }]}
                            value={projectWilayat}
                            isDisabled={true}
                        />
                        <Input.Text
                            placeHolder={lang.dict.get('writeOmrVisit')}
                            onChange={value => input?.setValue(value)}
                            value={input?.value}
                        />
                    </div>
                );
            }

            return undefined;
        });

        return (
            <div className="governorate" key={`${item}-${index}`}>
                <p className="governorate__title">
                    {lang.dict.get('governate')} {index + 1}
                </p>
                <Input.Select
                    values={[{ value: item, name: govName }]}
                    value={item}
                    isDisabled={true}
                />
                <div className="governorate__title-row">
                    <p>{lang.dict.get('projectCreatorWilayat')}</p>
                    <p>{lang.dict.get('pricePerVisitOmr')}</p>
                </div>
                {rows}
            </div>
        );
    });

    return (
        <div className="short-registration">
            <form
                className="form"
                onSubmit={preventDefault(() => vm.createCompany())}
            >
                <h2 className="form__header">{lang.dict.get('pageCompanyProfile')}
                </h2>
                <div className="form-info">
                    <div className="input-container-flex">
                        <Input.Text
                            name={lang.dict.get('fieldCompanyName')}
                            value={vm.company.companyName}
                            onChange={vm.company.setCompanyName}
                            placeHolder={lang.dict.get('fieldWriteNamePlaceholder')}
                        />
                        <Input.Text
                            name={lang.dict.get('fieldCompanyNameInArabic')}
                            isArabic={true}
                            value={vm.company.companyNameAr}
                            onChange={vm.company.setCompanyNameAr}
                            description={lang.dict.get('fieldOptional')}
                            placeHolder={lang.dict.get('fieldWriteNamePlaceholder')}
                        />
                        <Input.Select
                            name={lang.dict.get('headOfficeGovernorate')}
                            values={vm.governoratesList}
                            value={vm.company.headOfficeGovernorateId}
                            onChange={vm.company.setHeadGovernorate}
                        />
                        <Input.Select
                            name={lang.dict.get('headOfficeWilayat')}
                            values={vm.wilayatsList}
                            value={vm.company.headOfficeWilayatId}
                            onChange={vm.company.setHeadWilayat}
                        />
                        <Input.Text
                            name={lang.dict.get('crNumber')}
                            value={vm.company.crNumber}
                            onChange={vm.company.setCrNumber}
                            placeHolder={lang.dict.get('fieldCompanyCrNumber')}
                        />
                    </div>
                </div>
                <If condition={vm.currentProfileType === E.RoleInCompany.consultant}>
                    <h2 className="form__header">
                        {lang.dict.get('supervisionServices')}
                    </h2>
                    <div className="governorates">
                        {governorates}
                    </div>
                </If>
                <div className="form__btns">
                    <Button
                        color="white"
                        value={lang.dict.get('cancel')}
                        onClick={vm.closeRegistration}
                    />
                    <Button
                        color="green"
                        value={lang.dict.get('createCompany')}
                        rightImg="next"
                        onClick={() => vm.createCompany()}
                        isLoading={vm.isLoading}
                    />
                </div>
            </form>
            <ErrorList errors={vm.errorListHolder} />
        </div>
    );
});
