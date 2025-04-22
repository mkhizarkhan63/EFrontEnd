import { observer } from 'mobx-react';
import { lang } from '~/api';
import { ReviewFileList } from '~/bits';
import type { ConsultantProjectVm } from '../ConsultantProject.vm';

type Props = {
    vm: ConsultantProjectVm;
};

export const ProjectDocuments = observer(({ vm }: Props) => (
    <div className="project-documents">
        <p className="project-documents__title">
            {lang.dict.get('projectDocuments')}&nbsp;
            <span className="project-documents__title-num">({vm.project?.files.length})</span>
        </p>
        <ReviewFileList
            krookies={vm.project?.krookieFiles ?? []}
            drawingsFiles={vm.project?.drawingsFiles}
            onDelete={vm.removeDrawing}
        />
    </div>
));
