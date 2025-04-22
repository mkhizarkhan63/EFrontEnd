import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button } from '~/bits';
import { preventDefault } from '~/utils';
import type { CreateProjectClientVm } from '../CreateProjectClient.vm';
import { Krookie, Land } from '../Parts';

export const SecondStep = observer(({ vm }: { vm: CreateProjectClientVm }) => {
    const buttonValue = vm.draft.startingStep !== E.ProjectStartingStep.none
        ? lang.dict.get('createProject')
        : lang.dict.get('goNext');

    const handleClick = () => {
        if (vm.draft.startingStep === E.ProjectStartingStep.build) {
            vm.goNext(E.ProjectStep.third);
            return;
        }

        vm.save();
    };

    return (
        <div className="project-creator" data-is-admin="false">
            <form className="form" onSubmit={preventDefault(handleClick)}>
                <Land />
                <Krookie />
                <div className="form__bottom-buttons">
                    <Button
                        color="blue"
                        value={buttonValue}
                        rightImg="next"
                        onClick={handleClick}
                        isLoading={vm.isSaving}
                        isSubmit={true}
                    />
                </div>
            </form>
        </div>
    );
});
