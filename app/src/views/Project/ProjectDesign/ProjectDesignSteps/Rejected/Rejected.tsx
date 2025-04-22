import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Icons } from '~/bits';
import type { ProjectDesignVm } from '../../ProjectDesign.vm';

type Props = {
    vm: ProjectDesignVm;
};

export const Rejected = observer(({ vm }: Props) => (
    <div className="design-flow__box rejected">
        <div className="rejected__icon">
            <Icons icon="rejected" />
        </div>
        <h2 className="design-flow__box-title">{lang.dict.get('yourProjectGotRejected')}</h2>
        <p className="design-flow__box-text">{vm.projectReview?.reason}</p>
        <div className="rejected__person">
            <p className="rejected__person-text">{lang.dict.get('rejectedBy')}</p>
            <img src={vm.projectReview?.reviewerAvatar?.url ?? ''} className="rejected__person-img" alt="" />
            <p className="rejected__person-name">{vm.projectReview?.reviewerName}</p>
            <p className="rejected__person-type">{lang.dict.enum('roleInCompany', vm.projectReview?.reviewerRole)}</p>
        </div>
    </div>
));
