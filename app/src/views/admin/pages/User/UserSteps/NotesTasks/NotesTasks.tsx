import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { NotesAndTasks } from '~/partials';
import type { UserVm } from '../../User.vm';

type Props = {
    parentVm: UserVm;
};

export const NotesTasks = observer(({ parentVm }: Props) => (
    <div className="user-notes-task">
        <h2 className="user-notes-task__header">{lang.dict.get('notesTasks')}</h2>
        <NotesAndTasks
            id={parentVm.user.externalId}
            type={E.NoteTaskAffiliationType.user}
        />
    </div>
));
