import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, If } from '~/bits';
import type { ConsultantType, Project } from '~/models';
import { stores } from '~/stores';
import { Price } from '../Price';

type ConsultantElementProps = {
    project: Project;
    isTotalPrice: boolean;
    consultant: ConsultantType;
    onInviteConsultant: (consultant: ConsultantType) => void;
    isPreviewed: boolean;
};

const goToProfile = (consultantId?: number) => {
    if (!consultantId) {
        return;
    }

    stores.display.router.$.context.$.details.go({
        type: E.RoleInCompany.consultant,
        id: consultantId,
    });
};

export const ConsultantElement = observer((props: ConsultantElementProps) => {
    const isSelected = props.project.consultantId
        ? props.project.consultantId.isEqual(props.consultant.externalId)
        : false;

    const buttonValue = () => {
        if (props.consultant.isInvited) {
            return lang.dict.get('invited');
        }

        return isSelected ? lang.dict.get('selected') : lang.dict.get('inviteConsultant');
    };

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
                src={props.consultant.logo?.img?.url ?? ''}
                alt=""
            />
        );

    return (
        <div
            className="company"
            data-is-selected={isSelected}
        >
            <div
                className="company__row company__row--top"
            >
                <div className="company__image">{avatar}</div>
                <p className="company__text company__text--company-name">
                    {props.consultant.name}
                </p>
                <Button
                    color="transparent"
                    value={lang.dict.get('viewProfile')}
                    onClick={() => goToProfile(props.consultant.externalId)}
                    hasStopPropagation={true}
                />
                <Price
                    totalPrice={props.consultant.pricePerSquareMeter}
                    projectSize={props.project.totalVisitsForBid}
                    isTotalPrice={props.isTotalPrice}
                    className="company__text company__text--total-price"
                    templateDuration={props.consultant.templateTimeOfProject}
                />
                <div className="company__text">
                    {props.project.totalVisitsForBid}
                </div>
            </div>
            <div className="company__row company__row--about">
                <p className="company__text">
                    {String(props.consultant.yoursYearsOfExperience).padStart(2, '0')}
                </p>
                <p className="company__text">
                    {String(props.consultant.numberOfEngineers).padStart(2, '0')}
                </p>
                <p className="company__text">
                    {String(props.consultant.numberOfServices).padStart(2, '0')}
                </p>
            </div>
            <div
                className="company__row company__row--select consultant"
                data-is-invited={props.consultant.isInvited}
            >
                <If condition={!props.isPreviewed}>
                    <Button
                        color="blue"
                        hasOutline={!isSelected}
                        value={buttonValue()}
                        onClick={() => props.onInviteConsultant(props.consultant)}
                        isDisabled={isSelected}
                    />
                </If>
            </div>
        </div>
    );
});
