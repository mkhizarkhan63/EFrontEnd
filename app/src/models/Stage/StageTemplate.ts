import { action } from 'mobx';
import { E } from '~/api';
import type { Stage } from '.';
import { StagePart } from '..';

export class StageTemplate {
    status = E.SowAndStageStatus.drafted;

    templateParts: StagePart[] = [];

    constructor(readonly stage: Stage) {
        makeSafeObservable(this, {
            setupTemplatePart: action,
        });
    }

    get isEditable() {
        return (
            this.status === E.SowAndStageStatus.drafted
        );
    }

    setupTemplatePart = () => {
        for (const name of Object.values(E.StageTableNames)) {
            if (name === 'none') {
                continue;
            }

            const template = new StagePart();
            template.planStage = name;

            this.templateParts.push(template);
        }
    };
}
