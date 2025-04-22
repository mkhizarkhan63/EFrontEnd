import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button } from '~/bits';

type Props = {
    goContract: () => void;
};

export const Live = observer((props: Props) => (
    <div className="project-step-biding">
        <div className="what-will-happen">
            {lang.dict.get('reviewProjectIsLive')}
        </div>
        <div className="buttons">
            <Button
                color="green"
                value={lang.dict.get('projectButtonPreview')}
                onClick={props.goContract}
            />
        </div>
    </div>
));
