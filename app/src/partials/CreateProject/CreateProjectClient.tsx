import { observer } from 'mobx-react';
import type { ReactElement } from 'react';
import { E, lang } from '~/api';
import {
    ErrorList,
    Loading,
    Subheader,
} from '~/bits';
import { Page } from '~/partials';
import { stores } from '~/stores';
import { hook } from '~/utils';
import { FirstStep, SecondStep, ThirdStep, FourthStep } from './ClientSteps';
import { CreateProjectClientVm } from './CreateProjectClient.vm';

export const CreateProjectClient = observer(() => {
    const vm = hook.useVm(() => new CreateProjectClientVm());

    let content: ReactElement | null = null;

    const pageName = lang.dict.get(
        vm.step === E.ProjectStep.first ? 'whatCanEbinaaHelp': 'createProject',
    );

    switch (vm.step) {
        case E.ProjectStep.first:
            content = <FirstStep vm={vm} />;
            break;
        case E.ProjectStep.second:
            content = <SecondStep vm={vm} />;
            break;
        case E.ProjectStep.third:
            content = <ThirdStep vm={vm} />;
            break;
        case E.ProjectStep.fourth:
            content = <FourthStep vm={vm} />;
            break;
    }

    return (
        <Page>
            <Loading isEnabled={stores.locations.dicts.status.isWorking} />
            <ErrorList errors={vm.errorListHolder} />
            <div className="subheader-project-creator">
                <Subheader
                    returnButton={vm.goBack}
                    hasReturnButton={true}
                    pageName={pageName}
                />
            </div>
            {content}
        </Page>
    );
});
