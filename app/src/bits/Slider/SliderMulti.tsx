import { observer } from 'mobx-react';
import { lang, type Img } from '~/api';
import { Button } from '..';

type Props = {
    list: Array<{
        img: Img;
        id: string;
        title?: string;
        description?: string;
        alt?: string;
    }>;
    onBack: () => void;
    current: number;
    setCurrent: (value: number, length: number) => void;
};

export const SliderMulti = observer(({ list, onBack, current, setCurrent }: Props) => {
    if (list.length === 0) {
        return null;
    }

    const setCurrentPosition = (value: number) => {
        setCurrent(value, list.length);
    };

    const movePosition = (delta: 1 | -1) => {
        const position = current + delta;

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

    const previous = () => {
        movePosition(-1);
    };

    const next = () => {
        movePosition(1);
    };

    return (
        <div className="slider">
            <div className="slider__main-view">
                <div className="slider__selected-img">
                    <img
                        key={list[current].id}
                        src={list[current].img.url}
                        alt={list[current].alt}
                    />
                    <div className="slider__btn slider__btn--right">
                        <Button
                            centerImg="arrow-right"
                            color="white"
                            isCircle={true}
                            onClick={next}
                        />
                    </div>
                    <div className="slider__btn slider__btn--left" >
                        <Button
                            centerImg="arrow-right"
                            color="white"
                            isCircle={true}
                            onClick={previous}
                        />
                    </div>
                </div>
            </div>
            <div className="slider__back">
                <div className="btn-back">
                    <Button
                        value={lang.dict.get('goBack')}
                        color="white"
                        leftImg="back"
                        onClick={onBack}
                    />
                </div>
                <div className="slider__back-right">
                    {current + 1}/{list.length}
                </div>
            </div>
            <div className="slider__info">
                <div className="slider__info-box">
                    <p className="slider__info-title">
                        {list[current].title}
                    </p>
                    <p className="slider__info-desc">
                        {list[current].description}
                    </p>
                </div>
            </div>
        </div>
    );
});
