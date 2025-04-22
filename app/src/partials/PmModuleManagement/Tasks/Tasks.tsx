import { observer } from 'mobx-react';
import { E } from '~/api';
import { If } from '~/bits';
import { ProjectStatistics } from '~/partials/ProjectStatistics';
import type { PmModuleVm } from '~/views/PmModule/PmModule.vm';
import { PmFilter, PmTable, StageViewModal } from './components';

type Props = {
    vm: PmModuleVm;
};

export const Tasks = observer(({ vm }: Props) => (
    <>
        <ProjectStatistics
            parentVm={vm}
            type={E.ProjectStatisticsType.histogram}
        />
        <PmFilter parentVm={vm} />
        <PmTable parentVm={vm} />
        <If condition={() => vm.isStageViewModalOpened}>
            <StageViewModal
                stageProgress={vm.currentStageForModal}
                onBlur={vm.closeStageViewModal}
            />
        </If>
    </>
));
