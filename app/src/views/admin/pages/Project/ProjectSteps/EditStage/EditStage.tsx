import { observer } from 'mobx-react';
import { Button } from '~/bits';
import { Page } from '~/partials';
import { hook } from '~/utils';
import { StageManagement } from '~/views/admin/tabs';
import { Stage } from '../../../Stage';
import { EditStageVm } from './EditStage.vm';

export const EditStage = observer(() => {
    const vm = hook.useVm(() => new EditStageVm());

    if (vm.isDetails) {
        return <Stage key="stage" />;
    }

    return (
        <Page>
            <div className="edit-stage-management">
                <div className="edit-stage-management__back">
                    <Button
                        color="white"
                        leftImg="back"
                        onClick={vm.goBack}
                    />
                </div>
                <StageManagement fromProject={true} />
            </div>
        </Page>
    );
});
