import { observer } from 'mobx-react';
import { E } from '~/api';
import type { ProjectAdmin } from '~/models';
import { NotesAndTasks } from '~/partials';

type Props = {
    projectAdmin: ProjectAdmin;
};

export const NotesTasks = observer(({ projectAdmin }: Props) => (
    <div>
        <NotesAndTasks
            type={E.NoteTaskAffiliationType.project}
            id={projectAdmin.project.id.asNumber()}
        />
    </div>
));
