import { observer } from 'mobx-react';
import { useVm } from '~/utils/hook';
import { CompanyInvitesVm } from './CompanyInvites.vm';
import { Page } from '~/partials';
import { lang } from '~/api';
import { Button, If } from '~/bits';
import { DeleteModal } from '~/bits/DeleteModal';

export const CompanyInvites = observer(() => {
    const vm = useVm(() => new CompanyInvitesVm());

    const invites = vm.invites.map(item => (
        <div
            key={item.companyId}
            className="company-invitations__company"
        >
            <div className="company-invitations__company-header">
                <div className="company-invitations__company-logo">
                    <img
                        src={item.avatar?.url}
                        alt="logo"
                    />
                </div>
                <p className="company-invitations__company-name">
                    {item.companyName}
                </p>
            </div>
            <p className="company-invitations__company-info">
                {lang.dict.get('invitedOwner')}
            </p>
            <div className="company-invitations__company-btns">
                <Button
                    color="blue"
                    value={lang.dict.get('accept')}
                    rightImg="next"
                    onClick={() => vm.openModal(item.companyId)}
                />
                <Button
                    color="white"
                    value={lang.dict.get('reject')}
                    leftImg="close-red"
                    onClick={() => vm.openModal(item.companyId, true)}
                />
            </div>
        </div>
    ));

    return (
        <Page>
            <div className="company-invitations">
                <p className="company-invitations__title">
                    {lang.dict.get('companyInvitations')}
                </p>
                <div className="company-invitations__grid">
                    {invites}
                </div>
            </div>
            <If condition={vm.isRejectionModalOpened}>
                <DeleteModal
                    onBlur={() => vm.closeModal(true)}
                    onCancel={() => vm.closeModal(true)}
                    onDelete={() => vm.decideInvite()}
                    title={lang.dict.get('rejectInvite')}
                    description={lang.dict.get('rejectConfirm')}
                    buttonTitle={lang.dict.get('reject')}
                />
            </If>
            <If condition={vm.isAcceptModalOpened}>
                <DeleteModal
                    onBlur={() => vm.closeModal()}
                    onCancel={() => vm.closeModal()}
                    onDelete={() => vm.decideInvite(true)}
                    title={lang.dict.get('acceptInvite')}
                    description={lang.dict.get('acceptConfirm')}
                    buttonTitle={lang.dict.get('accept')}
                    isAccept={true}
                />
            </If>
            <If condition={vm.isInfoOpened}>
                <div className="check-company-status">
                    <div className="check-company-status__box">
                        <p className="check-company-status__title">{lang.dict.get('checkCompanyStatus')}</p>
                        <Button
                            color="white"
                            onClick={vm.closeInfo}
                            value={lang.dict.get('close')}
                        />
                    </div>
                </div>
            </If>
        </Page>
    );
});
