import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { stores } from '~/stores';
import { Button } from '~/bits';

type Props = {
    status: E.DesignProjectStatus;
    active: E.AdminProjectsDesignPages;
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
    const r = stores.display.router.$.admin.$.projects.$.sub.$.design;

    const postReviewItems = ![
        E.DesignProjectStatus.rejectedDesign,
        E.DesignProjectStatus.noneDesign,
    ].includes(props.status)
        ? [
            <MenuButton
                key="documents"
                isActive={props.active === E.AdminProjectsDesignPages.documents}
                value={lang.dict.get('documents')}
                onClick={() => r.$.designDocuments.go({ id: props.id })}
            />,
        ]
        : [];

    const items = [
        <MenuButton
            key="projectDetail"
            isActive={props.active === E.AdminProjectsDesignPages.details}
            value={lang.dict.get('projectDetail')}
            onClick={() => r.$.designDetails.go({ id: props.id })}
        />,
        <MenuButton
            key="notesTasks"
            isActive={props.active === E.AdminProjectsDesignPages.notes}
            value={lang.dict.get('notesTasks')}
            onClick={() => r.$.designNotesTasks.go({ id: props.id })}
        />,
        <MenuButton
            key="historyLog"
            isActive={props.active === E.AdminProjectsDesignPages.log}
            value={lang.dict.get('historyLog')}
            onClick={() => r.$.designLog.go({ id: props.id })}
        />,
        ...postReviewItems,
    ];

    return (
        <div className="buttons-menu">
            {items}
        </div>
    );
});
