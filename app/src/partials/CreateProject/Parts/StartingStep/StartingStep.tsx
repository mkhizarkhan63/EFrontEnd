import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Input } from '~/bits';
import { stores } from '~/stores';

export const StartingStep = observer((props: { isEdit: boolean }) => {
    const { draft } = stores.projects;

    return (
        <>
            <div className="form__section-header">
                {lang.dict.get('chooseStartingStep')}
            </div>
            <Input.Checkbox
                type="toggleText"
                text={{ first: lang.dict.get('design'), second: lang.dict.get('build') }}
                isChecked={draft.startingStep === E.ProjectStartingStep.build}
                onChange={draft.toggleProjectStartingStep}
                isDisabled={!props.isEdit}
            />
        </>
    );
});
