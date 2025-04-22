import { observer } from 'mobx-react';
import { useState } from 'react';
import { type Id } from '~/api';
import type { ConsultantType, InvitedCompanyType, Project, ProjectBid } from '~/models';
import { ConsultantBody, ConsultantHeader } from './Consultant';
import { ContractorBody, ContractorHeader } from './Contractor';
import { Header } from './Header';

type ConsultantOffers = {
    consultants: ConsultantType[];
    invitedCompanies: InvitedCompanyType[];
    project: Project;
    onInviteConsultant: (consultant: ConsultantType) => void;
    isPreviewed: boolean;
    onInvite: VoidFunction;
    invitationCount?: number;
};

type ContractorOffers = {
    bids: ProjectBid[];
    invitedCompanies: InvitedCompanyType[];
    onSelectContractor: (id: Id, isSelected: boolean) => void;
    onInvite: VoidFunction;
    isPreviewed: boolean;
    invitationCount?: number;
};

type CompanyOffersProps = ConsultantOffers | ContractorOffers;

export const CompanyOffers = observer((props: CompanyOffersProps) => {
    const [isTotalPrice, setIsTotalPrice] = useState(true);

    const togglePriceType = () => setIsTotalPrice(x => !x);

    const headerContent =
        'bids' in props
            ? (
                <ContractorHeader
                    isTotalPrice={isTotalPrice}
                    togglePriceType={togglePriceType}
                />
            )
            : (
                <ConsultantHeader
                    isTotalPrice={isTotalPrice}
                    togglePriceType={togglePriceType}
                />
            );

    const bodyContent =
        'bids' in props
            ? (
                <ContractorBody
                    bids={props.bids}
                    invitedCompanies={props.invitedCompanies}
                    isTotalPrice={isTotalPrice}
                    onSelectContractor={props.onSelectContractor}
                    onInvite={props.onInvite}
                    isPreviewed={props.isPreviewed}
                    invitationCount={props.invitationCount}
                />
            )
            : (
                <ConsultantBody
                    project={props.project}
                    isTotalPrice={isTotalPrice}
                    consultants={props.consultants}
                    onInviteConsultant={props.onInviteConsultant}
                    isPreviewed={props.isPreviewed}
                    onInvite={props.onInvite}
                    invitationCount={props.invitationCount}
                    invitedCompanies={props.invitedCompanies}
                />
            );

    return (
        <div className="table table--company" data-type={'bids' in props ? 'contractor' : 'consultant'}>
            <Header
                isTotalPrice={isTotalPrice}
                headerContent={headerContent}
                togglePriceType={togglePriceType}
            />
            <div className="table__body" >
                <div className="companies">
                    <div className="companies-list">{bodyContent}</div>
                </div>
            </div>
        </div>
    );
});
