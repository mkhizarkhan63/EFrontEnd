import { observer } from 'mobx-react';
import { lang } from '~/api';
import {
    Button,
    ErrorList,
    If,
    ReviewList,
    ReviewModal,
    SideModal,
} from '~/bits';
import type { CompanyType } from '~/models';
import { hook } from '~/utils';
import { ReviewsVm } from './Reviews.vm';

type Props = {
    company?: CompanyType;
};

export const Reviews = observer(({ company }: Props) => {
    const vm = hook.useVm(() => new ReviewsVm(company), []);

    if (!vm.company) {
        return null;
    }

    return (
        <div className="reviews" data-is-admin={vm.isAdmin}>
            <div className="reviews__top">
                <h2 className="reviews__header">
                    {lang.dict.get('reviews')}&nbsp;
                    <span className="reviews__header-num">
                        ({vm.company.references.length})
                    </span>
                </h2>
                <Button
                    color="blue"
                    value={lang.dict.get('addReview')}
                    leftImg="add"
                    onClick={vm.toggleReview}
                />
            </div>
            <div className="reviews-items">
                <ReviewList vm={vm} />
            </div>
            <If condition={() => vm.isOpenModal} >
                <SideModal
                    variant="review"
                    onBlur={vm.toggleReview}
                >
                    <ReviewModal vm={vm} />
                </SideModal>
            </If>
            <ErrorList errors={vm.errorListHolder} />
        </div>
    );
});

