import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Close, ReviewFileList, SideModal } from '~/bits';
import type { BidingVm } from '../Biding.vm';

type Props = {
    vm: BidingVm;
};

export const ProjectDrawings = observer(({ vm }: Props) => {
    if (!vm.project) {
        return null;
    }

    const { drawingsFiles } = vm.project;

    return (
        <SideModal variant="project-drawings" onBlur={vm.toggleProjectDrawings}>
            <div className="side-modal__header">
                <Close onClick={vm.toggleProjectDrawings} />
                <p className="side-modal__header-title">
                    {lang.dict.get('projectDrawings')}
                </p>
            </div>
            <ReviewFileList krookies={drawingsFiles} />
        </SideModal >
    );
});
