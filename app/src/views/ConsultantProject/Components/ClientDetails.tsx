import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Icons } from '~/bits';
import type { ConsultantProjectVm } from '../ConsultantProject.vm';

type Props = {
    vm: ConsultantProjectVm;
};

export const ClientDetails = observer(({ vm }: Props) => (
    <div className="client-details">
        <p className="client-details__title">
            {lang.dict.get('clientDetails')}
        </p>
        <img
            src={vm.project.forConsultant.clientAvatar?.url}
            alt="avatar"
            className="client-details__img"
        />
        <p className="client-details__name">
            {vm.project.forConsultant.clientName}
        </p>
        <div className="client-details__contact">
            <a
                href={`mailto:${vm.project.forConsultant.clientEmail}`}
                className="client-details__contact-link"
            >
                <Icons icon="email" />
                {vm.project.forConsultant.clientEmail}
            </a>
        </div>
        <div className="client-details__contact">
            <a
                href={`tel:${vm.project.forConsultant.clientContact}`}
                className="client-details__contact-link"
            >
                <Icons icon="phone" />
                {vm.project.forConsultant.clientContact}
            </a>
        </div>
    </div>
));
