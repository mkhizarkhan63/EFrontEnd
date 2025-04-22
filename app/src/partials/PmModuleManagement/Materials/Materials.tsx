import { observer } from 'mobx-react';
import { hook } from '~/utils';
import { ItemModal } from '~/views/PmModule/TaskActionModal/ItemModal';
import { MaterialComponents } from './Components';
import { MaterialsVm } from './Materials.vm';
import type { Moment } from 'moment';
import type { PmModuleVm } from '~/views';

type Props = {
    projectId: number;
    startDate?: Moment;
    parentVm: PmModuleVm;
};

export const Materials = observer(({ projectId, startDate, parentVm }: Props) => {
    const vm = hook.useVm(() => new MaterialsVm(projectId, startDate, parentVm), [projectId]);

    if (!vm.pmMaterial) {
        return null;
    }

    const componentOrderByContext = vm.orderByContext
        .map((name, i) => (
            <MaterialComponents
                key={`${name}-${i}`}
                type={name}
                parentVm={vm}
            />
        ));

    return (
        <div className="pm-materials">
            {componentOrderByContext}
            <ItemModal
                sowItem={vm.currentSowItem}
                onBlur={vm.closeSowItemModal}
            />
        </div>
    );
});
