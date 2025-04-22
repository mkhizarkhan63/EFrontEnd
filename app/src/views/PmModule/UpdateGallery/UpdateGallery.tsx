import { observer } from 'mobx-react';
import { Button, Close, SideModal } from '~/bits';
import type { LogUpdateItemType, PmTaskUpdateType } from '~/models';
import Carousel from 'nuka-carousel/lib/carousel';
import { lang } from '~/api';
import { hook } from '~/utils';
import type { ControlProps } from 'nuka-carousel';
import { useEffect, useRef, useState } from 'react';

type Props = {
    item: () => PmTaskUpdateType | undefined;
    attachments: () => LogUpdateItemType[];
    current: () => number;
    loadNext: () => void;
    changed: () => boolean;
    onClose: () => void;
    fileId: string;
    onRedirect: (id: number) => void;
};

type LeftButtonProps = {
    previousSlide: () => void;
    currentSlide: number;
};

type RightButtonProps = {
    nextSlide: () => void;
    currentSlide: number;
    slideCount: number;
};

const handleGoTo = (controls: ControlProps, index: number) => {
    controls.goToSlide(index);
};

export const UpdateGallery = observer(({ attachments, current, loadNext, changed, onClose, item, fileId, onRedirect }: Props) => {
    const update = item();
    let imageIndex = 0;
    const [slideNumber, setSlideNumber] = useState(0);

    const handleRight = (
        callback: () => void,
        currentSlide: number,
        slideCount: number,
        load: () => void,
    ) => {
        if (update) {
            callback();
            return;
        }

        if (currentSlide === slideCount - 2) {
            load();
        }

        callback();

        if (currentSlide === slideCount - 1) {
            return;
        }

        setSlideNumber(currentSlide + 1);
    };

    const handleLeft = (callback: () => void, currentSlide: number) => {
        if (update) {
            callback();
            return;
        }

        callback();

        if (currentSlide === 0) {
            return;
        }

        setSlideNumber(currentSlide - 1);
    };

    const ButtonRight = ({ nextSlide, currentSlide, slideCount }: RightButtonProps) => (
        <div className="slider-btn slider-btn--right">
            <Button
                centerImg="arrow-right"
                color="white"
                isCircle={true}
                onClick={() => handleRight(nextSlide, currentSlide, slideCount, loadNext)}
            />
        </div>
    );

    const ButtonLeft = ({ previousSlide, currentSlide }: LeftButtonProps) => (
        <div className="slider-btn slider-btn--left" >
            <Button
                centerImg="arrow-right"
                color="white"
                isCircle={true}
                onClick={() => handleLeft(previousSlide, currentSlide)}
            />
        </div>
    );

    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (update) {
            const attachment = update.attachments.find(file => file.fileId === fileId);

            if (!attachment) {
                return;
            }

            const index = update.attachments.indexOf(attachment);
            imageIndex = index;
            ref.current?.click();
        }

        if (!ref.current || update) {
            return;
        }

        ref.current.click();
        setSlideNumber(current());
    }, [current(), changed()]);

    const isMobile = hook.useIsMobile();

    const attachments2 = update
        ? update.attachments.map(attachment => (
            <div
                key={attachment.id}
                className="update-gallery__img-container"
            >
                <img
                    src={attachment.img?.url}
                    className="update-gallery__img"
                />
            </div>
        )) :
        attachments().map(attachment => (
            <div
                key={attachment?.id}
                className="update-gallery__img-container"
            >
                <img
                    src={attachment?.picture?.url.replace('?imageSize=3', '')}
                    className="update-gallery__img"
                />
            </div>
        ));

    const title = update ? update.taskName : attachments()[slideNumber].galleryTitle;

    const submittedBy = update ? update.submittedByName : attachments()[slideNumber].posterActor.galleryName;

    const submittedOn = update ? update.createdOn?.format('dddd, D MMM YYYY, h:mm A') : attachments()[slideNumber].postedAt?.format('dddd, D MMM YYYY, h:mm A');

    const updateId = attachments()[slideNumber]?.id;

    const attachmentsToDownload = () => {
        if (update) {
            return;
        }

        const a = document.createElement('a');
        a.href = attachments()[slideNumber].picture?.url ?? '';
        a.download = attachments()[slideNumber].fileName;
        a.target = '_blank';
        a.click();
    };

    return (
        <SideModal variant="update-gallery" onBlur={onClose}>
            <div className="update-gallery">
                <div className="update-gallery__top">
                    <Close onClick={onClose} />
                    <p className="update-gallery__top-title">
                        <span
                            className="update-gallery__top-title-text"
                            onClick={() => onRedirect(updateId)}
                        >
                            {title}
                        </span>
                    </p>
                    <Button
                        color="white"
                        centerImg="download"
                        isCircle={true}
                        onClick={attachmentsToDownload}
                    />
                </div>
                <Carousel
                    slidesToShow={1}
                    cellSpacing={isMobile ? 0 : 20}
                    slidesToScroll={1}
                    renderCenterLeftControls={ButtonLeft}
                    renderCenterRightControls={ButtonRight}
                    renderBottomCenterControls={controls => (
                        <button
                            ref={ref}
                            style={{ display: 'none' }}
                            onClick={() => handleGoTo(controls, update ? imageIndex :current())}
                        >
                            GO
                        </button>
                    )}
                >
                    {attachments2}
                </Carousel>
                <div className="update-gallery__bottom">
                    <div className="update-gallery__bottom-left">
                        <span className="update-gallery__bottom-text" />
                    </div>
                    <div className="update-gallery__bottom-right">
                        <div className="update-gallery__submitted">
                            <span className="update-gallery__submitted-title">
                                {lang.dict.get('submittedBy')}
                            </span>&nbsp;
                            <span className="update-gallery__submitted-value">
                                {submittedBy}
                            </span>
                        </div>
                        <div className="update-gallery__submitted">
                            <span className="update-gallery__submitted-title">
                                {lang.dict.get('submittedOn')}
                            </span>&nbsp;
                            <span className="update-gallery__submitted-value">
                                {submittedOn}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </SideModal>
    );
});
