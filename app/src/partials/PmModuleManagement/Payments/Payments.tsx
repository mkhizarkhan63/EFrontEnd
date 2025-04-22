import { observer } from 'mobx-react';
import { E } from '~/api';
import { If, Loading } from '~/bits';
import { ProjectStatistics } from '~/partials/ProjectStatistics';
import { hook } from '~/utils';
import type { PmModuleVm } from '~/views/PmModule/PmModule.vm';
import { StageViewModal } from '../Tasks/components';
import { ClientMaterialPayments, ConsultantPayments, ContractorPayments } from './Components';
import { PaymentsVm } from './Payments.vm';

type Props = {
    parentVm: PmModuleVm;
};

export const Payments = observer(({ parentVm }: Props) => {
    const vm = hook.useVm(
        () => new PaymentsVm(parentVm, parentVm.budget),
        [parentVm.project?.id, parentVm.budget],
    );

    return (
        <div className="pm-payments">
            <ProjectStatistics
                parentVm={parentVm}
                type={E.ProjectStatisticsType.budget}
            />
            <div className="payments-list">
                <If condition={() => parentVm.isLoadingBudget}>
                    <div
                        className="project-statistics project-statistics--loading"
                    >
                        <Loading isEnabled={true} />
                    </div>
                </If>
                <If condition={() => !parentVm.isLoadingBudget}>
                    <ContractorPayments vm={vm} />
                    <If condition={() => !vm.isContractorContext}>
                        <ConsultantPayments vm={vm} />
                    </If>
                    <If condition={() => vm.isClientContext}>
                        <ClientMaterialPayments vm={vm} />
                    </If>
                </If>
            </div>
            <If condition={() => vm.isStageViewModalOpened}>
                <StageViewModal
                    stageProgress={vm.currentStageForModal}
                    onBlur={vm.closeStageViewModal}
                />
            </If>
        </div>
    );
});
