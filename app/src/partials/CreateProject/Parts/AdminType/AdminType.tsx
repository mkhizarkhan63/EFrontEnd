import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Input } from '~/bits';
import { stores } from '~/stores';

export const ProjectType = observer(() => {
    const { draft } = stores.projects;

    return (
        <>
            <div className="form__section-header form__section-header--proj-type">
                {lang.dict.get('projectCreatorProjectType')}
            </div>
            <Input.Checkbox
                type="toggleText"
                text={{
                    first: lang.dict.get('constReqStructure'),
                    second: lang.dict.get('constReqTurnKey'),
                }}
                isChecked={draft.forAdmin.type}
                onChange={draft.forAdmin.setType}
            />
        </>
    );
});
