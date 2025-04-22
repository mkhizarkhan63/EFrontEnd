import { observer } from 'mobx-react';
import { SideModal, Close, Input, Button } from '~/bits';
import { lang, utils } from '~/api';
import type { BidingVm } from '../Biding.vm';

type Props = {
    vm: BidingVm;
};

export const SubmitBid = observer(({ vm }: Props) => {
    const { bid } = vm.project.forContractor;

    if (!bid) {
        return null;
    }

    return (
        <SideModal variant="submit-bid" onBlur={vm.toggleIsSubmitBid}>
            <div className="side-modal__header">
                <Close onClick={vm.toggleIsSubmitBid} />
                <p className="side-modal__header-title">
                    {lang.dict.get('submitBid')}
                </p>
            </div>
            <div className="submit-bid__content">
                <img
                    className="submit-bid__image"
                    src="/assets/graphics/submit-bid.svg"
                    alt="Submit Bid"
                />
                <p className="submit-bid__text">
                    {lang.dict.get('submitBidDetails')}
                </p>
                <Input.Text
                    name={lang.dict.get('numberOfCurrentProjects')}
                    placeHolder={lang.dict.get('fieldExample')}
                    type="text"
                    value={utils.toInputNumber(bid.numberOfCurrentProjects)}
                    onChange={bid.setNumberOfCurrentProjects}
                />
                <Input.Textarea
                    name={lang.dict.get('submitBidTextAreaName')}
                    description={lang.dict.get('fieldOptional')}
                    placeHolder={lang.dict.get('submitBidTextAreaPlaceholder')}
                    value={bid.message}
                    onChange={bid.setMessage}
                />
                <Button
                    color="blue"
                    value={lang.dict.get('goSubmit')}
                    rightImg="next"
                    onClick={vm.submitBid}
                    isDisabled={bid.numberOfCurrentProjects === 0}
                />
            </div>
        </SideModal>
    );
});
