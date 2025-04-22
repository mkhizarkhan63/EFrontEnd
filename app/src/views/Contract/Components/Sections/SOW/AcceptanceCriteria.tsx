import moment from 'moment';
import { lang } from '~/api';
import type { WorkflowType, WorkflowTypeTask } from '~/models';
import { Table } from '../../Customs';

type Props = {
    workflows?: WorkflowType[];
    tasks: WorkflowTypeTask[];
    name: string;
    order: number;
};

const WorkflowTasks = ({ tasks, name, order }: Omit<Props, 'workflows'>) => {
    const taskList = tasks.map((task, i) => [
        `${i === 0 ? name : ''}`,
        `${i+1}`,
        `${task.nameEn}`,
        `${lang.dict.enum('workflowTaskActor', task.actorType)}`,
        `${moment.duration(task.defaultTaskTime).asDays()}`,
    ]);

    const header = order === 0 ? ['Acceptance Criteria', 'Task No', 'Task', 'Party', 'Duration (Days)'] : undefined;

    return (
        <div className="pdf-acceptance-table">
            <Table
                header={header}
                isHideBorders={true}
                spacing={[20, 10, 20, 20, 30]}
                alignments={['left', 'left', 'right', 'right', 'right']}
                rows={taskList}
            />
        </div>
    );
};

export const AcceptanceCriteria = ({ workflows }: Pick<Props, 'workflows'>) => {
    if (!workflows) {
        return null;
    }

    const work = workflows.map((item, i) => (
        <WorkflowTasks
            key={item.id.asStr()}
            tasks={item.tasks} // @FIXME item.workflowTasks
            name={item.nameEn}
            order={i}
        />
    ));

    return <>{work}</>;
};
