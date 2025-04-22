import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Button } from '..';
import type { Img } from '~/api';
import { utilsArray, utilsNumber } from '~/utils';

type Props = {
    doMoveSlider?: boolean;
    list: Array<{
        img?: Img;
        id: string;
    }>;
};

export const SliderForDesign = observer(({ list, doMoveSlider }: Props) => {
    const [currentImg, setCurrentImg] = useState(0);

    let interval: ReturnType<typeof setTimeout>;

    const setCurrentPosition = (value: number) => {
        setCurrentImg(utilsNumber.toRange(value, 0, list.length - 1));
    };

    const movePosition = (delta: 1 | -1) => {
        const position = currentImg + delta;

        if (position >= list.length) {
            setCurrentPosition(-Infinity);
            return;
        }

        if (position < 0) {
            setCurrentPosition(Infinity);
            return;
        }

        setCurrentPosition(position);
    };

    useEffect(() => {
        setCurrentImg(0);
        clearInterval(interval);
    }, [list.map(x => x.id).join(',')]);

    const nextSlide = () => {
        movePosition(1);
    };

    const previousSlide = () => {
        movePosition(-1);
    };

    const dots = list.map((item, i) => (
        <span
            className="dot"
            key={item.id}
            onClick={() => setCurrentPosition(i)}
            data-is-active={i === currentImg}
        />
    ));

    useEffect(() => {
        if (!doMoveSlider) {
            return;
        }
        interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    });

    const picture = utilsArray.extract(list, currentImg);

    return (
        <div className="slider">
            <div className="slider__main-view">
                <div className="slider__selected-img">
                    <img
                        src={picture?.img?.url}
                        alt={picture?.id}
                        key={picture?.id}
                    />
                    <div className="slider__dots">
                        {dots}
                    </div>
                    <div className="slider__btn slider__btn--right">
                        <Button
                            centerImg="arrow-right"
                            color="white"
                            isCircle={true}
                            onClick={nextSlide}
                            hasStopPropagation={true}
                        />
                    </div>
                    <div className="slider__btn slider__btn--left" >
                        <Button
                            centerImg="arrow-right"
                            color="white"
                            isCircle={true}
                            onClick={previousSlide}
                            hasStopPropagation={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
