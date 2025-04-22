import { observer } from 'mobx-react';
import { lang } from '~/api';
import { hook } from '~/utils';
import { Button, If } from '~/bits';
import { CreateProjectAdmin } from '~/partials';
import type { ProjectAdmin } from '~/models';
import { DraftDetailsVm } from './DraftDetails.vm';

type Props = {
    projectAdmin: ProjectAdmin;
};

export const DraftDetails = observer(({ projectAdmin }: Props) => {
    const vm = hook.useVm(() => new DraftDetailsVm(projectAdmin), [projectAdmin.project.id.asStr()]);

    return (
        <>
            <If condition={() => !vm.isEditing}>
                <div className="draft-details">
                    <p className="draft-details__title">
                        {lang.dict.get('constructionProjectDetail')}
                    </p>
                    <div className="draft-details__info">
                        <span className="draft-details__info-value">
                            {projectAdmin.project.governorate?.displayName}
                        </span>
                        <p className="draft-details__info-label">
                            {lang.dict.get('projectCreatorGovernorate')}
                        </p>
                    </div>
                    <div className="draft-details__info">
                        <span className="draft-details__info-value">
                            {projectAdmin.project.wilayat?.displayName}
                        </span>
                        <p className="draft-details__info-label">
                            {lang.dict.get('projectCreatorWilayat')}
                        </p>
                    </div>
                    <div className="draft-details__info">
                        <span className="draft-details__info-value">
                            {projectAdmin.project.landType}
                        </span>
                        <p className="draft-details__info-label">
                            {lang.dict.get('projectUse')}
                        </p>
                    </div>
                    <div className="draft-details__info">
                        <span className="draft-details__info-value">
                            {projectAdmin.project.landArea}
                        </span>
                        <p className="draft-details__info-label">
                            {lang.dict.get('plotArea')}
                        </p>
                    </div>
                    <Button
                        color="white"
                        value={lang.dict.get('edit')}
                        onClick={vm.toggleEdit}
                    />
                </div>
            </If>
            <If condition={() => vm.isEditing}>
                <CreateProjectAdmin renderWithPage={false} />
            </If>
        </>
    );
});
