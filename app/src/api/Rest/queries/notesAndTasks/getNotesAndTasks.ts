import moment from 'moment';
import { dtos, Mobx, Id, T, type E } from '~/api';
import { Note, Task } from '~/models';
import { enums } from '../..';

type Params = {
    id?: number;
    type: E.NoteTaskAffiliationType;
};

export const get = async ({ id, type }: Params) => {
    if (!id) {
        return [];
    }

    const data = await dtos.profile.execListNotesAndTasksQuery({
        id,
        noteTaskAffilation: T.create(
            type,
            enums.NotesAndTasksAffiliationType.castToExternal,
        ),
    });

    if (!data || !data.result) {
        return [];
    }

    const notes: Array<Note | Task> = data.result
        .filter(item => item.noteTaskType === dtos.profile.NoteTaskType.note)
        .map(item => {
            const note = new Note();
            return Mobx.extendsObservable(note, {
                id: Id.tryInit(item.id, 'external'),
                projectId: Id.init(item.constructionProjectId, 'external'),
                userId: Id.init(item.userId, 'external'),
                companyId: Id.init(item.companyId, 'external'),
                date: moment.utc(item.createdDate).local(),
                text: item.content,
            });
        });

    const tasks = data.result
        .filter(item => item.noteTaskType === dtos.profile.NoteTaskType.task)
        .map(item => {
            const task = new Task();
            return Mobx.extendsObservable(task, {
                id: Id.tryInit(item.id, 'external'),
                projectId: Id.init(item.constructionProjectId, 'external'),
                userId: Id.init(item.userId, 'external'),
                companyId: Id.init(item.companyId, 'external'),
                category: T.create(
                    item.taskCategory,
                    enums.TaskCategory.castToInternal,
                ),
                date: moment.utc(item.createdDate).local(),
                deadline: moment.utc(item.finishDate).local(),
                text: item.content,
                isCompleted: item.isCompleted,
                completedDate: moment.utc(item.completedDate).local(),
            });
        });

    return notes.concat(tasks);
};
