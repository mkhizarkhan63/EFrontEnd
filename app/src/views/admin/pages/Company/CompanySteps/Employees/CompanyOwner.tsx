import { observer } from 'mobx-react-lite';
import { E, lang } from '~/api';
import { Button, Icons, If } from '~/bits';
import { type CompanyType } from '~/models';
import type { EmployeesVm } from './Employees.vm';
import { DeleteModal } from '~/bits/DeleteModal';

type Props = {
    vm: EmployeesVm;
    setCompany: (company: CompanyType) => void;
};

export const CompanyOwner = observer(({ vm }: Props) => {
    const partners = vm.employees.filter(item => item.affiliationType === E.AffiliationType.partner)
        .map(partner => {
            const isPending = vm.invites.data.some(item => item.phone === partner.phone);

            const buttonValue = isPending
                ? lang.dict.get('pending')
                : lang.dict.get('makeOwner');

            return (
                <div
                    className="company-employees__tile"
                    key={partner.id}
                >
                    <div className="company-employees__tile-avatar">
                        <img
                            src={partner.avatar?.url}
                            alt="avatar"
                        />
                    </div>
                    <div className="company-employees__tile-name">
                        {partner.name}
                    </div>
                    <a
                        className="company-employees__tile-phone"
                        href={`tel:${vm.draft.ownerPhone}`}
                    >
                        {partner.phone}
                    </a>
                    <p className="company-employees__tile-title">
                        {lang.dict.get('partner')}
                    </p>
                    <Button
                        color="white"
                        isDisabled={isPending}
                        value={buttonValue}
                        onClick={() => vm.openOwnerModal(partner.userId ?? 0)}
                    />
                </div>
            );
        });

    if (vm.isOwnerEdited) {
        return (
            <div className="company-employees__owner-form">
                <div className="company-employees__edit-btn">
                    <Button
                        color="white"
                        isCircle={true}
                        centerImg="edit"
                        onClick={vm.switchIsOwnerEdited}
                    />
                </div>
                <div className="company-employees__tiles">
                    <div
                        className="company-employees__tile"
                        data-is-red={vm.draft.ownerId === 0}
                    >
                        <div className="company-employees__tile-avatar">
                            <img
                                src={vm.draft.logo?.img?.url}
                                alt="avatar"
                            />
                        </div>
                        <div className="company-employees__tile-name">
                            {vm.draft.ownerName}
                        </div>
                        <a
                            className="company-employees__tile-phone"
                            href={`tel:${vm.draft.ownerPhone}`}
                        >
                            {vm.draft.ownerPhone}
                        </a>
                        <p className="company-employees__tile-title">
                            {lang.dict.get('owner')}
                        </p>
                        <Button
                            color="blue"
                            value={lang.dict.get('owner')}
                        />
                    </div>
                    {partners}
                </div>
                <If condition={vm.isOwnerModalOpened}>
                    <DeleteModal
                        onCancel={vm.closeOwnerModal}
                        onBlur={vm.closeOwnerModal}
                        onDelete={vm.makeOwner}
                        buttonTitle={lang.dict.get('makeOwner')}
                        title={lang.dict.get('makeOwner')}
                        description={lang.dict.get('makeOwnerDesc')}
                        isAccept={true}
                    />
                </If>
            </div>
        );
    }

    return (
        <div className="company-employees__owner">
            <div className="company-employees__owner-header">
                <p className="company-employees__owner-title">{lang.dict.get('ownerInfo')}</p>
                <Button
                    color="white"
                    isCircle={true}
                    centerImg="edit"
                    onClick={vm.switchIsOwnerEdited}
                />
            </div>
            <p className="company-employees__owner-name">{vm.draft.ownerName}</p>
            <div className="company-employees__owner-contact">
                <div className="company-employees__owner-contact-item">
                    <a className="company-employees__owner-contact-link" href={`tel:${vm.company.ownerPhone}`}>
                        <Icons icon="phone" />
                        {vm.draft.ownerPhone}
                    </a>
                </div>
                <div className="company-employees__owner-contact-item">
                    <a className="company-employees__owner-contact-link" href={`mailto:${vm.company.ownerEmail}`}>
                        <Icons icon="email" />
                        {vm.draft.ownerEmail}
                    </a>
                </div>
            </div>
        </div>
    );
});
