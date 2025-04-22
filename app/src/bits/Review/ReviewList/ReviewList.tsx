import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, If, ReviewFileList, Stars } from '~/bits';
import type { ClientReferenceType } from '~/models';
import type { ReviewsVm } from '~/partials/Management';
import { utilsDate, utilsNumber } from '~/utils';

type Props = {
    vm: ReviewsVm;
    item: ClientReferenceType;
};

const ReviewItem = observer(({ item, vm }: Props) => (
    <div className="reviews-item" data-is-reviewer={Boolean(!item.toReview)}>
        <div className="reviews-item__project">
            <div className="reviews-item__project-desc">
                <div className="reviews-item__project-desc-col">
                    <p className="reviews-item__project-title">
                        {item.clientName}
                    </p>
                    <div className="reviews-item__project-phone">
                        {lang.dict.get('clientReviewsClientPhone')} -&nbsp;
                        <a
                            className="reviews-item__project-phone-num"
                            href={`tel:${item.phoneNumber}`}
                        >
                            {item.phoneNumber}
                        </a>
                    </div>
                </div>
                <If condition={() => item.toReview}>
                    <p className="reviews-item__project-label">
                        {lang.dict.get('clientReviewsReviewUnderReview')}
                    </p>
                </If>
            </div>
            <div className="reviews-item__project-properties">
                <div className="property">
                    <p className="property__text property__text">
                        {item.wilayatName}
                    </p>
                    <p className="property__title">
                        {item.governorateName}
                    </p>
                </div>
                <div className="property">
                    <p className="property__text property__text--green">
                        {utilsNumber.valueOrPlaceholder(item.projectValue, 'm2')}
                    </p>
                    <p className="property__title">
                        {lang.dict.enum('constructionType', item.projectType)}
                    </p>
                </div>
                <div className="property">
                    <p className="property__date">
                        {item.projectStartDate?.format('ll')}
                    </p>
                    <p className="property__title">
                        {lang.dict.get('startDate')}
                    </p>
                </div>
                <If condition={utilsDate.isDateValid(item.projectCompletionDate)}>
                    <div className="property">
                        <p className="property__date">
                            {item.projectCompletionDate?.format('ll')}
                        </p>
                        <p className="property__title">
                            {lang.dict.get('endDate')}
                        </p>
                    </div>
                </If>
                <If condition={() => !item.toReview && vm.isAdmin}>
                    <div className="reviews-item__project-buttons">
                        <Button
                            color="transparent"
                            centerImg="delete"
                            onClick={() => vm.removeReview(item)}
                        />
                        <Button
                            color="transparent"
                            centerImg="edit"
                            onClick={() => vm.editReview(item)}
                        />
                    </div>
                </If>
            </div>
        </div>
        <If condition={() => !item.toReview}>
            <div className="reviews-item__reviewer">
                <div className="reviews-item__reviewer-top">
                    <p className="reviews-item__reviewer-prefix">
                        {item.prefixName}
                    </p>
                    <div className="reviews-item__reviewer-desc">
                        <p className="reviews-item__reviewer-name">
                            {item.clientName}
                        </p>
                        <div className="stars-container">
                            <Stars
                                values={item.starsList}
                                labels={vm.starsLabels}
                            />
                            <span className="reviews-item__reviewer-date">
                                {item.projectCompletionDate?.startOf('day').fromNow()}
                            </span>
                        </div>
                    </div>
                </div>
                <p className="reviews-item__reviewer-text">{item.stars.feedBack}</p>
            </div>
        </If>
        <ReviewFileList krookies={item.images} />
        <If condition={() => item.toReview && vm.isAdmin}>
            <div className="reviews-item__buttons">
                <Button
                    color="white"
                    value={lang.dict.get('reject')}
                    leftImg="close-red"
                    onClick={() => vm.removeReview(item)}
                />
                <Button
                    color="green"
                    value={lang.dict.get('approveReview')}
                    rightImg="next"
                    onClick={() => vm.editReview(item, true)}
                />
            </div>
        </If>
    </div>
));

export const ReviewList = observer(({ vm }: Pick<Props, 'vm'>) => {
    const references = vm.company?.references;

    if (!references) {
        return null;
    }

    const reviewItems = references.map((item, index) => (
        <ReviewItem
            key={`review-${index}`}
            vm={vm}
            item={item}
        />
    ));

    return <>{reviewItems}</>;
});
