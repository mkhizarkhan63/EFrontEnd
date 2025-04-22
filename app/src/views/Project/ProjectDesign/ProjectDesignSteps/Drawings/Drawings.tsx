import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Icons } from '~/bits';
import type { ProjectDesignVm } from '../../ProjectDesign.vm';

type Props = {
    vm: ProjectDesignVm;
};

export const Drawings = observer((props: Props) => (
    <div className="design-flow__box drawing">
        <div className="drawing__icon">
            <Icons icon="drawing" />
        </div>
        <h2 className="design-flow__box-title">{lang.dict.get('yourProjectDesignStarted')}</h2>
        <p className="design-flow__box-text">{lang.dict.get('consultantIsPreparing')}</p>
        <Button
            color="white"
            value={lang.dict.get('viewProjectDetails')}
            onClick={props.vm.viewDetails}
        />
    </div>
));
