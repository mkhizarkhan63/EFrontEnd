import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { NotesAndTasks } from '~/partials';
import type { CompanyVm } from '../../Company.vm';

type Props = {
    parentVm: CompanyVm;
};

export const NotesTasks = observer(({ parentVm }: Props) => (
    <div className="company-notes-task">
        <h2 className="company-notes-task__header">
            {lang.dict.get('notesTasks')}
        </h2>
        <NotesAndTasks
            id={parentVm.company?.externalId}
            type={E.NoteTaskAffiliationType.company}
        />
    </div>
));
