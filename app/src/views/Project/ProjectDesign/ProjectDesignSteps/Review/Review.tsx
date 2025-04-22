import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Icons } from '~/bits';
import type { ProjectDesignVm } from '../../ProjectDesign.vm';

type Props = {
    vm: ProjectDesignVm;
};

export const Review = observer((props: Props) => (
    <div className="design-flow__box review">
        <div className="review__icon">
            <Icons icon="reviewing" />
        </div>
        <h2 className="design-flow__box-title">{lang.dict.get('projectUnderReview')}</h2>
        <p className="design-flow__box-text">{lang.dict.get('designReview')}</p>
        <Button
            color="white"
            value={lang.dict.get('viewProjectDetails')}
            onClick={props.vm.viewDetails}
        />
    </div>
));
