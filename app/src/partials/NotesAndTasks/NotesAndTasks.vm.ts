import { action } from 'mobx';
import moment from 'moment';
import { E, Id, LazyDataList, restQuery } from '~/api';
import { Note, Task } from '~/models';

export type NotesAndTasksFilter = false | 'task' | 'note';

export class NotesAndTasksVm {
    filterBy: NotesAndTasksFilter = 'note';

    currentTaskOrNote: Task | Note = new Note();

    isSaving = false;

    editedNote: Note = new Note();

    notesAndTasks = new LazyDataList(
        'Notes and Tasks',
        () => restQuery.notesAndTasks.get({ id: this.id, type: this.type }),
        undefined,
        false,
    );

    constructor(readonly type: E.NoteTaskAffiliationType, readonly id?: number) {
        makeSafeObservable(this, {
            setType: action,
            setChangeNote: action,
            setCurrentDeadline: action,
            setCurrentText: action,
            setEditNote: action,
            setFilterBy: action,
            setSubmitNoteEdit: action,
            setTaskCompleted: action,
            submitCurrent: action,
        });
    }

    get notes() {
        return this.notesAndTasks.data
            .filter((item): item is Note => item instanceof Note);
    }

    get tasks() {
        return this.notesAndTasks.data
            .filter((item): item is Task => item instanceof Task);
    }

    get noteOrTask() {
        return !(this.currentTaskOrNote instanceof Note);
    }

    setType = (value: boolean) => {
        if (!value) {
            this.currentTaskOrNote = new Note();
            this.filterBy = 'note';
            return;
        }

        this.currentTaskOrNote = new Task();
        this.filterBy = 'task';
    };

    setCurrentDeadline = (date: moment.Moment) => {
        if (this.currentTaskOrNote instanceof Task) {
            this.currentTaskOrNote.deadline = date;
        }
    };

    setCurrentText = (text: string) => {
        this.currentTaskOrNote.text = text;
    };

    setTaskCompleted = (id: Id, value: boolean) => {
        (async () => {
            if (this.isSaving) {
                return;
            }

            const task = this.tasks.find(item => item.id.isEqual(id));

            if (!task) {
                return;
            }

            task.completedDate = moment();
            task.isCompleted = value;

            this.isSaving = true;

            await restQuery.notesAndTasks.update(task);

            this.isSaving = false;
        })();
    };

    setEditNote = (id: Id) => {
        const note = this.notes
            .find(item => item.id.isEqual(id));

        if (!note) {
            return;
        }

        note.isEditing = true;

        this.editedNote = note;
    };

    setChangeNote = (id: Id, value: string) => {
        const note = this.notes
            .find(item => item.id.isEqual(id));

        if (!note) {
            return;
        }

        note.text = value;
    };

    setSubmitNoteEdit = () => {
        (async () => {
            this.editedNote.isEditing = false;

            if (this.isSaving) {
                return;
            }

            this.isSaving = true;

            await restQuery.notesAndTasks.update(this.editedNote);

            this.isSaving = false;
        })();
    };

    setFilterBy = (filterBy: NotesAndTasksFilter) => {
        if (!filterBy) {
            this.filterBy = filterBy;
            return;
        }
        this.filterBy = filterBy;
        this.setType(filterBy === 'task');
    };

    submitCurrent = () => {
        (async () => {
            if (this.isSaving || this.currentTaskOrNote.text === '') {
                return;
            }

            this.isSaving = true;

            const id = Id.init(this.id, 'external');

            switch (this.type) {
                case E.NoteTaskAffiliationType.company:
                    this.currentTaskOrNote.companyId = id;
                    break;
                case E.NoteTaskAffiliationType.project:
                    this.currentTaskOrNote.projectId = id;
                    break;
                case E.NoteTaskAffiliationType.user:
                    this.currentTaskOrNote.userId = id;
                    break;
            }

            const externalId = await restQuery.notesAndTasks.create(this.currentTaskOrNote);

            if (!externalId) {
                this.isSaving = false;
                return;
            }

            this.currentTaskOrNote.id = externalId;
            this.notesAndTasks.add(this.currentTaskOrNote);

            const newItem = this.currentTaskOrNote instanceof Note
                ? new Note()
                : new Task();

            this.currentTaskOrNote = newItem;
            this.isSaving = false;
        })();
    };
}
