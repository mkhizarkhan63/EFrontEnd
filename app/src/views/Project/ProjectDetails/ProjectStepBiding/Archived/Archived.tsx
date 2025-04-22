import { observer } from 'mobx-react';
import { lang } from '~/api';

export const Archived = observer(() => (
    <div className="project-step-biding">
        <div className="what-will-happen">
            {lang.dict.get('reviewProjectArchived')}
        </div>
    </div>
));
