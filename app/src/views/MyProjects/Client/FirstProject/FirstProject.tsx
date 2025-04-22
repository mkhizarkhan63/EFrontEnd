import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button } from '~/bits';

export const CreateProjectButton = observer((props: { onClick: () => void }) => (
    <Button
        value={lang.dict.get('createProjectButton')}
        color="blue"
        onClick={props.onClick}
        leftImg="add"
    />
));

export const FirstProject = observer((props: { goToCreator: () => void }) => (
    <div className="first-project">
        <div className="picture" />
        <div className="first-project__tip-primary">
            {lang.dict.get('firstProjectTipPrimary')}
        </div>
        <div className="first-project__tip-secondary">
            {lang.dict.get('firstProjectTipSecondary')}
        </div>
        <CreateProjectButton
            onClick={props.goToCreator}
        />
    </div>
));
