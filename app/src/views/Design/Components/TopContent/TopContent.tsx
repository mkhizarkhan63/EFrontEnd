import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, If, SliderForDesign } from '~/bits';
import type { DesignVm } from '../../Design.vm';

type Props = {
    vm: DesignVm;
};

export const TopContent = observer(({ vm }: Props) => {
    const slideTypes = Object.values(E.SlideType).map(key => {
        const slider = vm.design?.sliderList.find(el => el.type === key);

        if (!slider || !slider.isVisible) {
            return null;
        }

        return (
            <p
                className="bottom-bar__item"
                key={key}
                data-is-active={vm.isActiveSlide(key)}
                onClick={() => vm.setCurrentSlideType(key)}
            >
                {lang.dict.enum('slideType', key)}
            </p>
        );
    });

    return (
        <div className="design-detail-top">
            <div className="design-detail-top__back">
                <Button
                    color="white"
                    leftImg="back"
                    value={lang.dict.get('goBack')}
                    onClick={vm.goPrevious}
                />
            </div>
            <SliderForDesign
                doMoveSlider={true}
                list={vm.sliderList}
            />
            <div className="bottom-bar">
                <div className="bottom-bar__left">
                    {slideTypes}
                </div>
                <div className="bottom-bar__right">
                    <div className="bottom-bar__link-container">
                        <If condition={() => Boolean(vm.design?.videoLink)}>
                            <a
                                href={vm.design?.videoLink}
                                target="_blank"
                                className="bottom-bar__link"
                            >
                                <img src="/assets/graphics/play.svg" className="bottom-bar__link-img" />
                                {lang.dict.get('watchTourVideo')}
                            </a>
                        </If>
                    </div>
                    <div className="bottom-bar__btn-like" data-liked={vm.design?.liked}>
                        <Button
                            isCircle={true}
                            color="gray"
                            centerImg={vm.design?.liked ? 'like-red' : 'like'}
                            onClick={vm.setCardLiked}
                        />
                    </div>
                    <If condition={() => vm.hasProject}>
                        <Button
                            value={lang.dict.get('startDesign')}
                            color="green"
                            rightImg="next"
                            onClick={vm.openStartDesign}
                        />
                    </If>
                </div>
            </div>
        </div>
    );
});
