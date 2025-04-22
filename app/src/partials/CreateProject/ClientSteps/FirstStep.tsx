import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button } from '~/bits';
import type { CreateProjectClientVm } from '../CreateProjectClient.vm';

export const FirstStep = observer(({ vm }: { vm: CreateProjectClientVm }) => (
    <div className="first-step">
        <div className="first-step__tiles">
            <div
                className="first-step__tile"
                data-is-active={vm.draft.startingStep === E.ProjectStartingStep.design}
                data-is-disabled={vm.draft.id.isType('external')}
                onClick={() => vm.draft.setProjectStartingStep(E.ProjectStartingStep.design)}
            >
                <p className="first-step__tile-title">{lang.dict.get('designMyHouse')}</p>
                <img className="first-step__tile-img" src="/assets/graphics/first_step_1.svg" alt="" />
            </div>
            <div
                className="first-step__tile"
                data-is-active={vm.draft.startingStep === E.ProjectStartingStep.build}
                data-is-disabled={vm.draft.id.isType('external')}
                onClick={() => vm.draft.setProjectStartingStep(E.ProjectStartingStep.build)}
            >
                <p className="first-step__tile-title">{lang.dict.get('buildMyHouse')}</p>
                <img className="first-step__tile-img" src="/assets/graphics/first_step_2.svg" alt="" />
            </div>
        </div>
        <Button
            color="blue"
            value={lang.dict.get('goNext')}
            rightImg="next"
            onClick={() => vm.goNext(E.ProjectStep.second)}
            isLoading={vm.isSaving}
            isSubmit={true}
        />
    </div>
));
