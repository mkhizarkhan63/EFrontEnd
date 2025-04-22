import { observer } from 'mobx-react';
import moment from 'moment';
import { lang, type E } from '~/api';
import { Button, Icons, Input } from '~/bits';
import { Note, Task } from '~/models';
import { hook, preventDefault } from '~/utils';
import { NotesAndTasksVm } from './NotesAndTasks.vm';

type Props = {
    type: E.NoteTaskAffiliationType;
    id?: number;
};

type PropsTask = {
    date: moment.Moment;
    deadline: moment.Moment;
    title: string;
    text: string;
    isCompleted?: boolean;
    completedDate?: moment.Moment;
    onChangeIsCompleted?: (value: boolean) => void;
};

type PropsNote = {
    date: moment.Moment;
    text: string;
    isEditing: boolean;
    onEditNote?: () => void;
    onChangeNote?: (value: string) => void;
    onSubmitNoteEdit?: () => void;
};

type PropsAdd = {
    current: Task | Note;
    onChangeType?: (value: boolean) => void;
    isCheckedNoteOrTask: boolean;
    onChangeDeadline?: (date: moment.Moment) => void;
    onChangeText?: (text: string) => void;
    onSubmit?: () => void;
};

const TaskItem = observer((props: PropsTask) => {
    const completedCheckbox = (
        <div
            className="notes-tasks__item-completed-checkbox"
            data-completed={props.isCompleted ? 'true' : 'false'}
        >
            <p className="notes-tasks__item-completed-mark">
                {props.isCompleted ? 'Mark as completed' : 'Mark as complete'}
            </p>
            <Input.Checkbox
                isChecked={props.isCompleted !== false}
                type="check"
                onChange={value => props.onChangeIsCompleted?.(value)}
            />
        </div>
    );

    const completedBlock = props.isCompleted ?
        (
            <p className="notes-tasks__item-complete-info">
                <div className="notes-tasks__item-completed">
                    <span>Completed on: </span>
                    {props.completedDate?.format('DD/MM/yyyy h:mm A')}
                </div>
                {completedCheckbox}
            </p>
        ) :
        completedCheckbox;

    return (
        <div className="notes-tasks__item notes-tasks__item--task">
            <div className="notes-tasks__main-icon  notes-tasks__main-icon--task" >
                <Icons icon="task" />
            </div>
            <div className="notes-tasks__item-right">
                <div className="notes-tasks__item-header">
                    <p className="notes-tasks__item-title">
                        {props.title}
                    </p>
                    <p className="notes-tasks__item-deadline">
                        {props.deadline.format('dddd, DD/MM/yyyy')}
                    </p>
                </div>
                <p className="notes-tasks__item-text">
                    {props.text}
                </p>
                <div className="notes-tasks__item-info">
                    <p className="notes-tasks__item-date">
                        {props.date.format('DD/MM/yyyy h:mm A')}
                    </p>
                    {completedBlock}
                </div>
            </div>
        </div>
    );
});

const NoteItem = observer((props: PropsNote) => {
    const editNote = (
        <form className="notes-tasks__item notes-tasks__item--edit-note">
            <div className="notes-tasks__main-icon">
                <Icons icon="note" />
            </div>
            <div className="notes-tasks__item-right">
                <Input.Text
                    data-test="input-edit-note"
                    value={props.text}
                    placeHolder={lang.dict.get('writeNotes')}
                    onChange={value => props.onChangeNote?.(value)}
                />
                <div className="notes-tasks__btn notes-tasks__btn--send">
                    <Button
                        color="transparent"
                        centerImg="send"
                        onClick={props.onSubmitNoteEdit}
                    />
                </div>
            </div>
        </form>
    );

    const showNote = (
        <div
            className="notes-tasks__item notes-tasks__item--note"
            data-test="note"
        >
            <div className="notes-tasks__main-icon">
                <Icons icon="note" />
            </div>
            <div className="notes-tasks__item-right">
                <div className="notes-tasks__item-header">
                    <p className="notes-tasks__item-text">
                        {props.text}
                    </p>
                    <p className="notes-tasks__item-date">
                        {props.date.format('DD/MM/yyyy h:mm A')}
                    </p>
                </div>
            </div>
            <div className="notes-tasks__btn notes-tasks__btn--edit">
                <Button
                    color="transparent"
                    centerImg="edit"
                    onClick={props.onEditNote}
                />
            </div>
        </div>
    );

    return props.isEditing ? editNote : showNote;
});

const FormToAddNotesAndTasks = observer((props: PropsAdd) => {
    const additionalForTasks = props.current instanceof Task
        ? (
            <div className="notes-task-form__additional">
                <Input.DateSelect
                    onChange={value => props.onChangeDeadline?.(value)}
                    value={props.current.deadline}
                    max={moment().add(5, 'year')}
                    min={moment()}
                />
            </div>
        )
        : null;

    const placeholderText = props.current instanceof Note
        ? lang.dict.get('writeNotes')
        : lang.dict.get('writeTasks');

    return (
        <form
            className="notes-task-form"
            data-selected={props.current instanceof Note ? 'note' : 'task'}
            onSubmit={preventDefault(props.onSubmit)}
        >
            <Input.Checkbox
                type="toggleText"
                isChecked={props.isCheckedNoteOrTask}
                onChange={value => props.onChangeType?.(value)}
                text={{ first: 'Note', second: 'Task' }}
            />
            <Input.Text
                value={props.current.text}
                onChange={value => props.onChangeText?.(value)}
                placeHolder={placeholderText}
            />
            {props.current instanceof Task ? additionalForTasks : null}
            <div className="notes-tasks__btn notes-tasks__btn--send">
                <Button
                    onClick={props.onSubmit}
                    color="transparent"
                    centerImg="send"
                    isSubmit={true}
                />
            </div>
        </form>
    );
});

export const NotesAndTasks = observer(({ type, id }: Props) => {
    const vm = hook.useVm(() => new NotesAndTasksVm(type, id));

    const notes = vm.notes.map(item => ({
        type: 'note',
        date: item.date,
        key: `note-${item.id.asStr()}`,
        render: observer(() => (
            <NoteItem
                key={`note-${item.id.asStr()}`}
                text={item.text}
                date={item.date}
                isEditing={item.isEditing}
                onEditNote={() => vm.setEditNote(item.id)}
                onChangeNote={value => vm.setChangeNote(item.id, value)}
                onSubmitNoteEdit={vm.setSubmitNoteEdit}
            />
        )),
    }));

    const tasks = vm.tasks.map(item => ({
        type: 'task',
        date: item.date,
        key: `task-${item.id.asStr()}`,
        render: observer(() => (
            <TaskItem
                key={`task-${item.id.asStr()}`}
                date={item.date}
                deadline={item.deadline}
                title={item.title}
                text={item.text}
                isCompleted={item.isCompleted}
                completedDate={item.completedDate}
                onChangeIsCompleted={value => vm.setTaskCompleted(item.id, value)}
            />
        )),
    }));

    let items = notes.concat(tasks).sort((a, b) => b.date.diff(a.date));

    if (vm.filterBy !== false) {
        items = items.filter(item => item.type === vm.filterBy);
    }

    const itemsEls = items.map(item => {
        const Comp = item.render;

        return <Comp key={item.key} />;
    });

    return (
        <div className="notes-tasks">
            <FormToAddNotesAndTasks
                current={vm.currentTaskOrNote}
                onSubmit={vm.submitCurrent}
                onChangeType={vm.setType}
                onChangeDeadline={vm.setCurrentDeadline}
                onChangeText={vm.setCurrentText}
                isCheckedNoteOrTask={vm.noteOrTask}
            />
            <div className="notes-tasks-header">
                <div
                    className="notes-tasks-header__item"
                    onClick={() => vm.setFilterBy(false)}
                    data-active={vm.filterBy === false}
                >
                    {lang.dict.get('all')}&nbsp;
                    {lang.dict.format('parentheses', [vm.notesAndTasks.data.length])}
                </div>
                <div
                    className="notes-tasks-header__item"
                    onClick={() => vm.setFilterBy('note')}
                    data-active={vm.filterBy === 'note'}
                >
                    {vm.notes.length} {lang.dict.get('notes')}
                </div>
                <div
                    className="notes-tasks-header__item"
                    onClick={() => vm.setFilterBy('task')}
                    data-active={vm.filterBy === 'task'}
                >
                    {vm.tasks.length} {lang.dict.get('tasks')}
                </div>
            </div>
            <div>{itemsEls}</div>
        </div>
    );
});
