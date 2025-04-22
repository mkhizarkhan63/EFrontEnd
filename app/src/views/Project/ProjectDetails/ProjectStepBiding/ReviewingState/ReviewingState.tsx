import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button } from '~/bits';

type Props = {
    onClick: VoidFunction;
};

export const ReviewingState = observer(({ onClick }: Props) => (
    <div className="project-step-biding reviewing-state">
        <img className="tick" alt="" src="/assets/graphics/status_reviewing.svg" />
        <div className="what-will-happen">
            {lang.dict.get('reviewingWhatWillHappen')}
        </div>
        <div className="what-happened">
            {lang.dict.get('reviewingWhatHappened')}
        </div>
        <div className="what-happened">
            {lang.dict.get('reviewingWhatHappened2')}
        </div>
        <div className="buttons">
            <Button
                color="white"
                value={lang.dict.get('viewProjectDetails')}
                onClick={onClick}
            />
        </div>
    </div>
));
