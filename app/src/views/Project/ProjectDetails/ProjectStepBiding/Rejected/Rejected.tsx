import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Icons } from '~/bits';
import type { ProjectDetailsVm } from '../../ProjectDetails.vm';

type Props = {
    vm: ProjectDetailsVm;
};

export const Rejected = observer(({ vm }: Props) => {
    if (!vm.projectReview) {
        return null;
    }

    return (
        <div className="project-step-biding rejected">
            <div className="rejected__icon">
                <Icons icon="rejected" />
            </div>
            <p className="what-will-happen">{lang.dict.get('yourProjectGotRejected')}</p>
            <p className="what-happened">{vm.projectReview?.reason}</p>
            <div className="rejected__person">
                <p className="rejected__person-text">{lang.dict.get('rejectedBy')}</p>
                <img src={vm.projectReview?.reviewerAvatar?.url ?? ''} className="rejected__person-img" alt="" />
                <p className="rejected__person-name">{vm.projectReview?.reviewerName}</p>
            </div>
        </div>
    );
});
