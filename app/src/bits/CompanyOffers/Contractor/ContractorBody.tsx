import { observer } from 'mobx-react';
import { useState } from 'react';
import { lang, type Id } from '~/api';
import type { InvitedCompanyType, ProjectBid } from '~/models';
import { ContractorElement } from './ContractorElement';
import { Button } from '~/bits/Button';
import Carousel from 'nuka-carousel/lib/carousel';
import { If } from '~/bits/If';
import type { Moment } from 'moment';

type Props = {
    bids: ProjectBid[];
    invitedCompanies: InvitedCompanyType[];
    isTotalPrice: boolean;
    onSelectContractor: (id: Id, isSelected: boolean) => void;
    onInvite: VoidFunction;
    isPreviewed: boolean;
    invitationCount?: number;
};

type Bid = {
    isInvitation: boolean;
    bid?: ProjectBid | undefined;
    companyName?: string;
    companyNumber?: string;
    invitationDate?: Moment;
    ownerName?: string;
};

type LeftButtonProps = {
    previousSlide: () => void;
};

type RightButtonProps = {
    nextSlide: () => void;
};

const ButtonRight = ({ nextSlide }: RightButtonProps) => (
    <div className="slider-btn slider-btn--right">
        <Button
            centerImg="arrow-right"
            color="white"
            isCircle={true}
            onClick={() => nextSlide()}
        />
    </div>
);

const ButtonLeft = ({ previousSlide }: LeftButtonProps) => (
    <div className="slider-btn slider-btn--left" >
        <Button
            centerImg="arrow-right"
            color="white"
            isCircle={true}
            onClick={() => previousSlide()}
        />
    </div>
);

export const ContractorBody = observer((props: Props) => {
    const [openModalBidId, setOpenModalBidId] = useState<Id>();

    const closeModal = () => {
        setOpenModalBidId(undefined);
    };

    const openModal = (id: Id) => {
        closeModal();
        setOpenModalBidId(id);
    };

    const SeeMore = () => (
        <div className="see-more">
            <p className="see-more__text">{lang.dict.get('seeMoreContractors')}</p>
            <p className="see-more__text see-more__text--remain">
                {lang.dict.format('contractorInvitesRemainingFormat', [6 - (props.invitationCount ?? 0)])}
            </p>
            <If condition={props.invitationCount !== 6}>
                <Button
                    color="white"
                    value={lang.dict.get('invite')}
                    onClick={props.onInvite}
                />
            </If>
        </div>
    );

    const invitations: Bid[] = props.invitedCompanies.filter(company => !props.bids.some(item => item.contractorId?.asNumber() === company.companyId)).map(invitation => ({
        companyName: invitation.companyName,
        companyNumber: invitation.companyNumber,
        ownerName: invitation.ownerName,
        invitationDate: invitation.invitationDate,
        isInvitation: true,
        bid: undefined,
    }));

    const bids: Bid[] = props.bids.map(bid => ({
        isInvitation: false,
        bid: bid,
    }));

    const newBids = invitations.concat(bids);

    if (newBids.length === 0) {
        return <SeeMore />;
    }

    const chunkArray = () => {
        const numberOfChunks = Math.ceil(newBids.length / 6);

        return Array.from(Array(numberOfChunks))
            .map((value, index) => newBids.slice(index * 6, (index + 1) * 6));
    };

    const contractorSlides = chunkArray().map((array, i) => {
        const slide = array.map((bid, index) => {
            if (!bid.isInvitation) {
                return (
                    <ContractorElement
                        key={bid.bid?.id.asStr()}
                        bid={bid.bid}
                        openModalBidId={openModalBidId}
                        isTotalPrice={props.isTotalPrice}
                        openModal={openModal}
                        closeModal={closeModal}
                        onSelectContractor={props.onSelectContractor}
                        isPreviewed={props.isPreviewed}
                    />
                );
            }

            return (
                <div className="invited" key={`${bid.companyName}-${index}`}>
                    <div className="invited__row">
                        <p className="invited__status">{lang.dict.get('invited')}</p>
                        <p className="invited__date">
                            {lang.dict.format('invitedOn', [bid.invitationDate?.format('DD/MM/YYYY')])}
                        </p>
                    </div>
                    <div className="invited__content">
                        <div className="invited__section invited__section--company">
                            <div className="invited__company">
                                <p className="invited__company-title">{lang.dict.get('contractorCompany')}</p>
                                <p className="invited__company-name">{bid.companyName}</p>
                            </div>
                        </div>
                        <If condition={() => Boolean(bid.ownerName)}>
                            <div className="invited__section">
                                <p className="invited__title">{lang.dict.get('engineersName')}</p>
                                <p className="invited__text">{bid.ownerName}</p>
                            </div>
                        </If>
                        <div className="invited__section invited__section--phone">
                            <p className="invited__title">{lang.dict.get('projectCreatorConsultantMobile')}</p>
                            <a href={`tel:${bid.companyNumber}`} className="invited__text invited__text--phone">
                                {bid.companyNumber}
                            </a>
                        </div>
                    </div>
                </div>
            );
        });

        if (slide.length < 6) {
            slide.push(<SeeMore />);
        }

        return (
            <div key={i} className="table-body-content">
                {slide}
            </div>
        );
    });

    return (
        <Carousel
            slidesToShow={1}
            slidesToScroll={1}
            renderBottomCenterControls={null}
            renderCenterLeftControls={ButtonLeft}
            renderCenterRightControls={ButtonRight}
        >
            {contractorSlides}
        </Carousel>
    );
});
