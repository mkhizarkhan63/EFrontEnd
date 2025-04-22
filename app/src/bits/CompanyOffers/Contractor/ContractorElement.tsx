import { observer } from 'mobx-react';
import { E, lang, Id } from '~/api';
import { Button, Hide, Icons, If } from '~/bits';
import type { ProjectBid } from '~/models';
import { stores } from '~/stores';
import { Price } from '../Price';
import { ContractorModal } from './ContractorModal';

type ContractorElementProps = {
    bid?: ProjectBid;
    openModalBidId?: Id;
    isTotalPrice: boolean;
    closeModal: () => void;
    openModal: (bidId: Id) => void;
    onSelectContractor: (id: Id, isSelected: boolean) => void;
    isPreviewed: boolean;
};

const goToProfile = (contractorId?: Id) => {
    if (!contractorId || contractorId.isType('internal')) {
        return;
    }

    stores.display.router.$.context.$.details.go({
        type: E.RoleInCompany.contractor,
        id: contractorId.asNumber(),
    });
};

export const ContractorElement = observer((props: ContractorElementProps) => {
    if (!props.bid) {
        return null;
    }

    const isModalOpen = props.bid.id.isEqual(props.openModalBidId);
    const isSelected = props.bid.id.isEqual(props.bid.project.projectBidId);

    const avatar = isSelected
        ? (
            <img
                className="selected-company"
                src="/assets/graphics/green_tick.svg"
                alt="selected"
            />
        )
        : (
            <img
                className="avatar-company"
                src={props.bid.contractor.logo?.url ?? ''}
                alt=""
            />
        );

    return (
        <div
            className="company"
            data-is-selected={isSelected}
        >
            <div
                className="company__row company__row--price"
            >
                <div className="company__image">{avatar}</div>
                <If condition={Boolean(props.bid.message)}>
                    <ContractorModal
                        bidId={props.bid.id}
                        text={props.bid.message}
                        isModalOpen={isModalOpen}
                        phone={props.bid.contractor.phone}
                        openModal={props.openModal}
                        closeModal={props.closeModal}
                    />
                </If>
                <p className="company__text company__text--company-name">
                    {props.bid.contractor.name}
                </p>
                <Button
                    color="transparent"
                    value={lang.dict.get('viewProfile')}
                    onClick={() => goToProfile(props.bid?.contractorId)}
                    hasStopPropagation={true}
                />
                <Price
                    totalPrice={props.bid.totalPrice}
                    projectSize={props.bid.project.addedBuiltUpArea}
                    isTotalPrice={props.isTotalPrice}
                    className="company__text company__text--total-price"
                />
                <p className="only-on-closed company__text">
                    {props.bid.totalDays}
                </p>
                <Price
                    totalPrice={props.bid.structureItemsTotalPrice}
                    projectSize={props.bid.project.addedBuiltUpArea}
                    isTotalPrice={props.isTotalPrice}
                    className="company__text only-on-opened"
                />
                <Price
                    totalPrice={props.bid.turnkeyItemsTotalPrice}
                    projectSize={props.bid.project.addedBuiltUpArea}
                    isTotalPrice={props.isTotalPrice}
                    className="company__text only-on-opened"
                />
            </div>
            <div className="company__row company__row--project">
                <p className="company__text">{props.bid.totalDays}</p>
                <p className="company__text">
                    {String(props.bid.numberOfCurrentProjects).padStart(2, '0')}
                </p>
            </div>
            <div className="company__row company__row--about">
                <p className="company__text">
                    {String(props.bid.contractor.yearsOfExperience).padStart(2, '0')}
                </p>
                <p className="company__text">
                    {String(props.bid.contractor.numberOfEngineers).padStart(2, '0')}
                </p>
                <p className="company__text">
                    {String(props.bid.contractor.numberOfLabors).padStart(2, '0')}
                </p>
            </div>
            <div className="company__row company__row--select contractor">
                <If condition={!props.isPreviewed}>
                    <Button
                        color="blue"
                        hasOutline={!isSelected}
                        value={isSelected ? lang.dict.get('selected') : lang.dict.get('selectContractor')}
                        onClick={() => props.onSelectContractor(props.bid?.id ?? new Id(0, 'internal'), isSelected)}
                    />
                </If>
            </div>
            <Hide reason="moved-to-phase-2" >
                <div className="company__row company__row--badges">
                    <If condition={Boolean(props.bid.badgesType)}>
                        <div className="badges">
                            <Icons icon="badge" />
                            {lang.dict.enum(
                                'topContractorsTypes',
                                props.bid.badgesType,
                            )}
                        </div>
                    </If>
                </div>
            </Hide>
        </div>
    );
});
