import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { stores } from '~/stores';
import { Button } from '~/bits';

type Props = {
    status: E.ProjectStatus;
    active: E.AdminProjectsPages;
    id: number;
};

type MenuButtonProps = {
    value: string;
    isActive: boolean;
    onClick?: () => void;
};

const MenuButton = (props: MenuButtonProps) => {
    const params = props.isActive
        ? {
            color: 'white' as const,
        }
        : {
            color: 'gray' as const,
            onClick: props.onClick,
        };

    return (
        <Button
            {...params}
            value={props.value}
        />
    );
};

export const Menu = observer((props: Props) => {
    const r = stores.display.router.$.admin.$.projects.$.sub;

    const postReviewItems = ![
        E.ProjectStatus.none,
        E.ProjectStatus.draft,
        E.ProjectStatus.reviewing,
    ].includes(props.status)
        ? [
            <MenuButton
                key="contractorBids"
                isActive={props.active === E.AdminProjectsPages.bids}
                value={lang.dict.get('contractorBids')}
                onClick={() => r.$.bids.go({ id: props.id })}
            />,
            <MenuButton
                key="bidQuestions"
                isActive={props.active === E.AdminProjectsPages.bidsQuestions}
                value={lang.dict.get('bidQuestions')}
                onClick={() => r.$.bidsQuestions.go({ id: props.id })}
            />,
        ]
        : [];

    const postBiddingItems = ![
        E.ProjectStatus.none,
        E.ProjectStatus.draft,
        E.ProjectStatus.openBids,
        E.ProjectStatus.reviewing,
        E.ProjectStatus.chooseContractor,
        E.ProjectStatus.rejected,
        E.ProjectStatus.uploadDrawings,
    ].includes(props.status)
        ? [
            <MenuButton
                key="contractorBids"
                isActive={props.active === E.AdminProjectsPages.contract}
                value={lang.dict.get('contract')}
                onClick={() => r.$.contract.go({ id: props.id })}
            />,
        ]
        : [];

    const items = [
        <MenuButton
            key="projectDetail"
            isActive={props.active === E.AdminProjectsPages.details}
            value={lang.dict.get('projectDetail')}
            onClick={() => r.$.details.go({ id: props.id })}
        />,
        ...postReviewItems,
        ...postBiddingItems,
        <MenuButton
            key="notesTasks"
            isActive={props.active === E.AdminProjectsPages.notes}
            value={lang.dict.get('notesTasks')}
            onClick={() => r.$.notesTasks.go({ id: props.id })}
        />,
        <MenuButton
            key="historyLog"
            isActive={props.active === E.AdminProjectsPages.log}
            value={lang.dict.get('historyLog')}
            onClick={() => r.$.log.go({ id: props.id })}
        />,
    ];

    return (
        <div className="buttons-menu">
            {items}
        </div>
    );
});
