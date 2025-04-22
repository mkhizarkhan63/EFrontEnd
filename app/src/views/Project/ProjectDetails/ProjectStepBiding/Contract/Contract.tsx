import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button } from '~/bits';
import type { ProjectDetailsVm } from '../../ProjectDetails.vm';

type Props = {
    vm: ProjectDetailsVm;
};

export const Contract = observer(({ vm }: Props) => (
    <div className="project-step-biding">
        <div className="what-will-happen">
            {lang.dict.get('reviewProjectContractReady')}
        </div>
        <div className="buttons">
            <Button
                color="green"
                value={lang.dict.get('subscriptionSignContract')}
                onClick={vm.goToContract}
            />
        </div>
    </div>
));
