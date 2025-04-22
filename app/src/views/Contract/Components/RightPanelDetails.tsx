import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, If, Input } from '~/bits';
import type { ContractVm } from '../Contract.vm';

type Props = {
    vm: ContractVm;
};

const ProjectManagerDetails = observer(({ vm }: Props) => {
    const company = vm.contract.company;

    if (!company) {
        return null;
    }

    return (
        <div className="right-panel__detail-content">
            <Input.Select
                placeHolder={lang.dict.format('placeholder', [lang.dict.get('name')])}
                name={lang.dict.get('name')}
                values={company.allEmployees}
                value={company.contractSubject?.employeeId}
                onChange={company.contractSubject?.setEmployeeId}
                isDisabled={vm.contract.allSigned}
            />
        </div>
    );
});

const BankDetails = observer(({ vm }: Props) => {
    const subject = vm.contract.getSubject();

    if (!subject) {
        return null;
    }

    return (
        <div className="right-panel__detail-content">
            <Input.Text
                placeHolder={lang.dict.get('bankNamePlaceholder')}
                name={lang.dict.get('bankName')}
                value={subject.bankName}
                onChange={subject.setBankName}
                isDisabled={vm.contract.allSigned}
            />
            <Input.Text
                placeHolder={lang.dict.get('accountHolderNamePlaceholder')}
                name={lang.dict.get('accountHolderName')}
                value={subject.accountName}
                onChange={subject.setAccountName}
                isDisabled={vm.contract.allSigned}
            />
            <Input.Text
                placeHolder={lang.dict.get('accountNumberPlaceholder')}
                name={lang.dict.get('accountNumber')}
                value={subject.accountNumber}
                onChange={subject.setAccountNumber}
                isDisabled={vm.contract.allSigned}
            />
        </div>
    );
});

const OwnerDetails = observer(({ vm }: Props) => {
    const subject = vm.contract.getSubject();

    if (!subject) {
        return null;
    }

    const ownerName = vm.contract.isClient
        ? lang.dict.get('ownerName')
        : lang.dict.get('companyOwner');

    const ownerNameArabic = vm.contract.isClient
        ? lang.dict.get('ownerNameInArabic')
        : lang.dict.get('companyOwnerArabic');

    return (
        <div className="right-panel__detail-content">
            <Input.Text
                placeHolder={lang.dict.format('placeholder', [ownerName])}
                name={ownerName}
                value={subject.ownerName}
                onChange={subject.setOwnerName}
                isDisabled={vm.contract.allSigned}
            />
            <Input.Text
                isArabic={true}
                placeHolder={lang.dict.format('placeholder', [ownerNameArabic])}
                name={ownerNameArabic}
                value={subject.ownerNameInArabic}
                onChange={subject.setOwnerNameInArabic}
                isDisabled={vm.contract.allSigned}
            />
            <Input.Text
                placeHolder={lang.dict.get('idNumberPlaceholder')}
                name={lang.dict.get('idNumber')}
                value={subject.idNumber}
                onChange={subject.setIdNumber}
                isDisabled={vm.contract.allSigned}
            />
        </div>
    );
});

export const RightPanelDetails = observer(({ vm }: Props) => {
    const managerTitle = vm.contract.subject === E.ContractSubjects.contractor
        ? lang.dict.get('projectManagerDetails')
        : lang.dict.get('engineerDetails');

    return (
        <div className="right-panel-details">
            <div className="right-panel__back-btn">
                <Button
                    leftImg="back"
                    color="white"
                    value={lang.dict.get('enterContractInfo')}
                    onClick={vm.goToPricePlane}
                />
            </div>
            <div className="right-panel__content">
                <If condition={() => !vm.contract.isClient}>
                    <div className="right-panel__detail" data-is-opened={vm.isProjectManagerDetails}>
                        <div className="right-panel__detail-header">
                            <p className="right-panel__detail-title">
                                {managerTitle}
                            </p>
                            <div className="right-panel__dropdown-btn">
                                <Button
                                    color="transparent"
                                    isCircle={true}
                                    centerImg="dropdown-up"
                                    onClick={vm.toggleProjectManagerDetails}
                                />
                            </div>
                        </div>
                        <div className="right-panel__detail-container">
                            <ProjectManagerDetails vm={vm} />
                        </div>
                    </div>
                    <div className="right-panel__detail" data-is-opened={vm.isBankDetails}>
                        <div className="right-panel__detail-header">
                            <p className="right-panel__detail-title">
                                {lang.dict.get('bankDetails')}
                            </p>
                            <div className="right-panel__dropdown-btn">
                                <Button
                                    color="transparent"
                                    isCircle={true}
                                    centerImg="dropdown-up"
                                    onClick={vm.toggleBankDetails}
                                />
                            </div>
                        </div>
                        <div className="right-panel__detail-container">
                            <BankDetails vm={vm} />
                        </div>
                    </div>
                </If>
                <div className="right-panel__detail" data-is-opened={vm.isOwnerDetails}>
                    <div className="right-panel__detail-header">
                        <p className="right-panel__detail-title">
                            {lang.dict.get('ownerDetails')}
                        </p>
                        <div className="right-panel__dropdown-btn">
                            <Button
                                color="transparent"
                                isCircle={true}
                                centerImg="dropdown-up"
                                onClick={vm.toggleOwnerDetails}
                            />
                        </div>
                    </div>
                    <div className="right-panel__detail-container">
                        <OwnerDetails vm={vm} />
                    </div>
                </div>
            </div>
            <div className="right-panel__sign">
                <Button
                    color="green"
                    value={lang.dict.get('goSubmit')}
                    rightImg="next"
                    onClick={vm.submitSubjectData}
                    isLoading={vm.isUpdating}
                />
            </div>
        </div>
    );
});
