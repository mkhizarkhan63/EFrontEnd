import { observer } from 'mobx-react';
import moment from 'moment';
import { lang, utils } from '~/api';
import {
    Button,
    Close,
    If,
    Input,
    RatingStars,
    UploaderImages,
} from '~/bits';
import type { ReviewsVm } from '~/partials/Management';

type Props = {
    vm: ReviewsVm;
};

export const ReviewModal = observer(({ vm }: Props) => {
    if (!vm.review) {
        return null;
    }

    const review = vm.review;

    return (
        <>
            <div className="side-modal__header">
                <Close onClick={vm.toggleReview} />
                <p className="side-modal__header-title">
                    {lang.dict.get('clientReviewsAddProjectReview')}
                </p>
            </div>
            <div className="side-modal__content">
                <div className="side-modal__inputs">
                    <Input.Text
                        name={lang.dict.get('clientName')}
                        value={review.clientName}
                        onChange={review.setClientName}
                        placeHolder={lang.dict.get('fieldWriteNamePlaceholder')}
                    />
                    <Input.Text
                        name={lang.dict.get('clientReviewsClientPhone')}
                        value={review.phoneNumber}
                        onChange={review.setPhoneNumber}
                        placeHolder={lang.dict.get('fieldWritePhonePlaceholder')}
                    />
                    <Input.Select
                        name={lang.dict.get('headOfficeGovernorate')}
                        values={review.governoratesList}
                        value={review.headGovernorateId}
                        onChange={review.setHeadGovernorate}
                    />
                    <Input.Select
                        name={lang.dict.get('headOfficeWilayat')}
                        values={review.wilayatsList}
                        value={review.headOfficeWilayatId}
                        onChange={review.setHeadWilayat}
                    />
                    <Input.Text
                        name={lang.dict.get('landArea')}
                        value={utils.toInputNumber(review.projectValue)}
                        onChange={review.setProjectValue}
                        placeHolder={lang.dict.get('landArea')}
                    />
                    <Input.Select
                        name={lang.dict.get('projectCreatorProjectType')}
                        values={vm.projectTypes}
                        value={review.projectType}
                        onChange={review.setProjectType}
                    />
                    <Input.DateSelect
                        name={lang.dict.get('projectStartDate')}
                        value={review.projectStartDate}
                        onChange={review.setStartDate}
                        placeHolder={lang.dict.get('fieldWriteDate')}
                        max={moment().add(-1, 'days')}
                        min={moment().add(-20, 'years')}
                    />
                    <Input.DateSelect
                        name={lang.dict.get('projectEndDate')}
                        value={review.projectCompletionDate}
                        onChange={review.setEndDate}
                        placeHolder={lang.dict.get('fieldWriteDate')}
                        max={moment()}
                        min={moment(review.minimumEndDate).add(1, 'days')}
                        isDisabled={Boolean(!review.projectStartDate)}
                    />
                </div>
                <p className="side-modal__content-title">
                    {lang.dict.get('clientReviewsUploadProjectImages')}
                </p>
                <div className="uploader-container">
                    <UploaderImages
                        files={review.images}
                        addFile={review.addFile}
                        removeFile={review.removeFile}
                    />
                </div>
                <If condition={() => vm.isAdmin} >
                    <div className="side-modal__rating">
                        <p className="side-modal__rating-title">
                            {lang.dict.get('rating')}
                        </p>
                        <div className="rating-container">
                            <RatingStars
                                values={() => review.starsList}
                                onChange={review.stars.setStars}
                            />
                            <Input.Text
                                name="FeedBack"
                                value={review.stars.feedBack}
                                onChange={review.stars.setFeedBack}
                                placeHolder={lang.dict.get('fieldPleaseAddFeedBack')}
                            />
                        </div>
                    </div>
                </If>
            </div>
            <If condition={() => vm.isAdmin} >
                <Button
                    color="blue"
                    value={vm.isEdit ? 'Submit Review' : 'Save'}
                    onClick={vm.saveReview}
                    rightImg="next"
                    isLoading={vm.isSaving}
                    isDisabled={!vm.changes?.hasBeenChanged}
                />
            </If>
            <If condition={() => !vm.isAdmin} >
                <Button
                    color="blue"
                    value={lang.dict.get('sendReviewRequest')}
                    onClick={vm.saveReview}
                    rightImg="next"
                    isLoading={vm.isSaving}
                    isDisabled={!vm.changes?.hasBeenChanged}
                />
            </If>
        </>
    );
});
