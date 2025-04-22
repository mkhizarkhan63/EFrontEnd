import { E, enums, lang, T } from '~/api';
import type { Notification } from '~/models';

type Props = {
    notification: Notification;
};

type ProjectChangeData = {
    projectId: number;
    projectSignStage: number;
};

const ProjectChange = ({ notification }: Props) => {
    const isProjectChange = (data: unknown): data is ProjectChangeData => typeof data === 'object'
        && data !== null
        && 'projectId' in data
        && 'projectSignStage' in data;

    if (!isProjectChange(notification.data)) {
        return null;
    }

    const projectStage = T.create(
        notification.data.projectSignStage,
        enums.ProjectStatus.castToInternal,
    );

    return (
        <>
            <span className="notification__message-id">#{notification.data.projectId}&nbsp;</span>
            {lang.dict.get('projectIs')}
            <span className="notification__message-status">
                &nbsp;{lang.dict.enum('projectStatus', projectStage)}
            </span>
        </>
    );
};

// TODO more components when we'll know all notification types and data
const System = () => <p className="notification__message-id">#123</p>;

const UpdateEmail = () => <p className="notification__message-id">#123</p>;

const Mail = ({ notification }: Props) => <p>{notification.emailContent}</p>;

const getMessage = (notification: Notification) => {
    switch (notification.messageType) {
        case E.MessageType.projectChange:
            return <ProjectChange notification={notification} />;
        case E.MessageType.system:
            return <System />;
        case E.MessageType.updateEmail:
            return <UpdateEmail />;
        default:
            return <Mail notification={notification} />;
    }
};

export const NotificationItem = (props: Props) => (
    props.notification.messageType
        ? (
            <div className="notification">
                <div
                    className="notification__dot"
                    data-status={props.notification.status}
                />
                <div className="notification__text">
                    <p className="notification__message" data-highlight={props.notification.messageType}>
                        {getMessage(props.notification)}
                    </p>
                    <div className="notification__time">
                        {props.notification.printDate}
                    </div>
                </div>
            </div>
        )
        : null
);
