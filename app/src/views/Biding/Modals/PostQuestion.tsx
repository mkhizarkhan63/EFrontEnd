import { observer } from 'mobx-react';
import type { BidingVm } from '../Biding.vm';
import { SideModal } from '~/bits';
import { Questions } from '~/partials';

type Props = {
    vm: BidingVm;
};

export const PostQuestion = observer(({ vm }: Props) => (
    <SideModal
        variant="post-question"
        onBlur={vm.toggleIsPostQuestion}
    >
        <Questions id={vm.project.id.asNumber()} bidingVm={vm} />
    </SideModal>
));
