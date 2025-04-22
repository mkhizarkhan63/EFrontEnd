import { observer } from 'mobx-react';
import { lang } from '~/api';
import type { ConsultantType, InvitedCompanyType, Project } from '~/models';
import { ConsultantElement } from './ConsultantElement';
import { Button } from '~/bits/Button';
import Carousel from 'nuka-carousel/lib/carousel';
import { If } from '~/bits/If';
import type { Moment } from 'moment';

type Props = {
    project: Project;
    isTotalPrice: boolean;
    consultants: ConsultantType[];
    onInviteConsultant: (consultant: ConsultantType) => void;
    isPreviewed: boolean;
    onInvite: VoidFunction;
    invitationCount?: number;
    invitedCompanies: InvitedCompanyType[];
};

type LeftButtonProps = {
    previousSlide: () => void;
};

type RightButtonProps = {
    nextSlide: () => void;
};

type Consultant = {
    isInvitation: boolean;
    consultant?: ConsultantType | undefined;
    companyName?: string;
    companyNumber?: string;
    ownerName?: string;
    invitationDate?: Moment;
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

export const ConsultantBody = observer((props: Props) => {
    const seeMore = () => (
        <div className="see-more">
            <p className="see-more__text">{lang.dict.get('seeMoreConsultants')}</p>
            <p className="see-more__text see-more__text--remain">
                {lang.dict.format('consultantInvitesRemainingFormat', [3 - (props.invitationCount ?? 0)])}
            </p>
            <If condition={props.invitationCount !== 3}>
                <Button
                    color="white"
                    value={lang.dict.get('invite')}
                    onClick={props.onInvite}
                />
            </If>
        </div>
    );

    const invitations: Consultant[] = props.invitedCompanies.filter(company => !props.consultants.some(item => item.externalId === company.companyId)).map(invitation => ({
        companyName: invitation.companyName,
        companyNumber: invitation.companyNumber,
        ownerName: invitation.ownerName,
        invitationDate: invitation.invitationDate,
        isInvitation: true,
        consultant: undefined,
    }));

    const consultants: Consultant[] = props.consultants.map(consultant => ({
        isInvitation: false,
        consultant: consultant,
    }));

    const newConsultants = invitations.concat(consultants);

    if (newConsultants.length === 0) {
        return seeMore();
    }

    const chunkArray = () => {
        const numberOfChunks = Math.ceil(newConsultants.length / 6);

        return Array.from(Array(numberOfChunks))
            .map((value, index) => newConsultants.slice(index * 6, (index + 1) * 6));
    };

    const consultantSlides = chunkArray().map((array, i) => {
        const slide = array.map((consultant, index) => {
            if (!consultant.isInvitation && consultant.consultant) {
                return (
                    <ConsultantElement
                        key={String(consultant.consultant?.id)}
                        project={props.project}
                        consultant={consultant.consultant}
                        isTotalPrice={props.isTotalPrice}
                        onInviteConsultant={props.onInviteConsultant}
                        isPreviewed={props.isPreviewed}
                    />
                );
            }

            return (
                <div className="invited" key={`${consultant.companyName}-${index}`}>
                    <div className="invited__row">
                        <p className="invited__status">{lang.dict.get('invited')}</p>
                        <p className="invited__date">
                            {lang.dict.format('invitedOn', [consultant.invitationDate?.format('DD/MM/YYYY')])}
                        </p>
                    </div>
                    <div className="invited__content">
                        <div className="invited__section invited__section--company">
                            <div className="invited__company">
                                <p className="invited__company-title">{lang.dict.get('consultantCompany')}</p>
                                <p className="invited__company-name">{consultant.companyName}</p>
                            </div>
                        </div>
                        <If condition={() => Boolean(consultant.ownerName)}>
                            <div className="invited__section">
                                <p className="invited__title">{lang.dict.get('engineersName')}</p>
                                <p className="invited__text">{consultant.ownerName}</p>
                            </div>
                        </If>
                        <div className="invited__section invited__section--phone">
                            <p className="invited__title">{lang.dict.get('projectCreatorConsultantMobile')}</p>
                            <a href={`tel:${consultant.companyNumber}`} className="invited__text invited__text--phone">
                                {consultant.companyNumber}
                            </a>
                        </div>
                    </div>
                </div>
            );
        });

        if (slide.length < 6) {
            slide.push(seeMore());
        }

        return (
            <div className="table-body-content" key={i}>
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
            {consultantSlides}
        </Carousel>
    );
});
