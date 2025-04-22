import { observer } from 'mobx-react';
import type { Moment } from 'moment';
import { E, lang } from '~/api';
import { type WorkflowSequenceType, type UserTaskType } from '~/models';

type Props = {
    workflows: WorkflowSequenceType[];
    setTaskId: (task?: UserTaskType, date?: Moment) => void;
    stageDueDate: Moment;
};

type ContainerItemsProps = {
    workflow: WorkflowSequenceType;
    setTaskId: (task?: UserTaskType, date?: Moment) => void;
    isLastWorkflow: boolean;
    stageDueDate: Moment;
};

type ItemProps = {
    userTask: UserTaskType;
    setTaskId: (task?: UserTaskType, date?: Moment) => void;
    date?: Moment;
};

const Item = observer(({ userTask, setTaskId, date }: ItemProps) => {
    const dueDate = userTask.dueDate
        ? userTask.dueDate.format('D MMM YYYY')
        : `+ ${userTask.defaultTaskTime} ${lang.dict.get('days')}`;

    const finalDate = date ? date.format('D MMM YYYY') : dueDate;

    const completionDate = userTask.status === E.TaskStatus.completed ? userTask.completionDate?.format('D MMM YYYY') : '--';

    const langVersion = lang.current === 'en' ? 'En' : 'Ar';

    return (
        <div
            className="list__item-row"
            onClick={() => setTaskId(userTask, date)}
            data-hover-color={userTask.status}
        >
            <div className="list__item-cell list__item-cell--task">
                <span className="title">
                    {lang.dict.get('step')} {userTask.order}&nbsp;&nbsp;-&nbsp;
                </span>
                <span className="desc">{userTask[`name${langVersion}`]}</span>
            </div>
            <div className="list__item-cell list__item-cell--action">
                <p className="title">{lang.dict.get('actionBy')}</p>
                <img src={userTask.avatar} alt="avatar" className="avatar" />
                <span className="name">
                    {lang.dict.enum('workflowTaskActor', userTask.actor.actorType)}
                </span>
            </div>
            <div className="list__item-cell list__item-cell--completed">
                <p className="title">{lang.dict.get('completedOn')}</p>
                {completionDate}
            </div>
            <div className="list__item-cell list__item-cell--date">
                <p className="title">{lang.dict.get('dueDate')}</p>
                {finalDate}
            </div>
            <div className="list__item-cell list__item-cell--status">
                <p
                    className="status"
                    data-status={userTask.status}
                    data-is-actionable={userTask.isActionable}
                >
                    {lang.dict.enum('taskStatus', userTask.status)}
                </p>
            </div>
        </div>
    );
});

const ContainerItems = observer(({ workflow, setTaskId, isLastWorkflow, stageDueDate }: ContainerItemsProps) => {
    const langVersion = lang.current === 'en' ? 'En' : 'Ar';

    const secondTask = workflow.userTasks.find(task => task.order === 2);

    const date = stageDueDate.clone().subtract(secondTask?.defaultTaskTime, 'days');

    const items = workflow.userTasks.map(task => (
        <Item
            key={`${task.id}${task.order}`}
            userTask={task}
            setTaskId={setTaskId}
            date={isLastWorkflow && task.order === 1 ? date : undefined}
        />
    ));

    return (
        <div className="list__item" data-border-color={workflow.statusBorder}>
            <div className="list__item-header">
                <p className="list__item-name">
                    {workflow[`name${langVersion}`]}
                </p>
                <p className="list__item-desc">

                    {workflow[`subItemName${langVersion}`]}
                </p>
            </div>
            {items}
        </div>
    );
});

export const List = observer(({ workflows, setTaskId, stageDueDate }: Props) => {
    if (workflows.length === 0) {
        return null;
    }

    const content = workflows
        .map((workflow, i) => (
            <ContainerItems
                workflow={workflow}
                setTaskId={setTaskId}
                key={workflow.id}
                isLastWorkflow={workflows.length - 1 === i}
                stageDueDate={stageDueDate}
            />
        ));

    return (
        <div className="list">
            {content}
        </div>
    );
});
