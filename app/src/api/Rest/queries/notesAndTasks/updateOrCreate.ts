import { T, Id } from '~/api';
import { Note, type Task } from '~/models';
import { dtos, enums } from '../..';

type Action = 'Update' | 'Create';

export const update = async (item: Note | Task) => (
    item instanceof Note
        ? await noteAction(item, 'Update')
        : await taskAction(item, 'Update')
);

export const create = async (item: Note | Task) => (
    item instanceof Note
        ? await noteAction(item, 'Create')
        : await taskAction(item, 'Create')
);

const noteAction = async (note: Note, action: Action) => {
    const res = await dtos
        .profile[`exec${action}NoteCommand`]({
            id: note.id.asNumber(),
            companyId: note.companyId?.asNumber(),
            constructionProjectId: note.projectId?.asNumber(),
            userId: note.userId?.asNumber(),
            noteContent: note.text,
        });

    return res ? Id.init(res.id, 'external') : false;
};

const taskAction = async (task: Task, action: Action) => {
    const res = await dtos
        .profile[`exec${action}TaskCommand`]({
            id: task.id.asNumber(),
            companyId: task.companyId?.asNumber(),
            constructionProjectId: task.projectId?.asNumber(),
            userId: task.userId?.asNumber(),
            finishDate: task.deadline.toISOString(true),
            completedDate: task.completedDate?.toISOString(true),
            isCompleted: task.isCompleted,
            taskContent: task.text,
            taskCategory: T.create(
                task.category,
                enums.TaskCategory.castToExternal,
            ),
        });

    return res ? Id.init(res.id, 'external') : false;
};
