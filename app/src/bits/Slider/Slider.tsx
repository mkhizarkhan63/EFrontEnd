import { useState } from 'react';
import { observer } from 'mobx-react';
import type { Img } from '~/api';
import { Button } from '..';

type Props = {
    list: Array<{
        img: Img;
        id: string;
        title: string;
        description: string;
        alt: string;
    }>;
};

type ThumbnailProps = {
    img: Img;
    alt: string;
    onClick: () => void;
    isActive: boolean;
};

const Thumbnail = observer((props: ThumbnailProps) => (
    <li
        className="slider__thumbnails-item"
        onClick={props.onClick}
        data-is-active={props.isActive}
    >
        <img
            className="slider__thumbnails-item-img"
            src={props.img.url}
            alt={props.alt}
        />
    </li>
));

export const Slider = observer(({ list }: Props) => {
    const [currentImg, setCurrentImg] = useState(0);

    const setCurrentPosition = (value: number) => {
        setCurrentImg(Math.max(0, Math.min(value, list.length-1)));
    };

    const movePosition = (delta: 1| -1) => {
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

    const nextSlide = () => {
        movePosition(1);
    };

    const previousSlide = () => {
        movePosition(-1);
    };

    const thumbnailList = list.map((item, i) => (
        <Thumbnail
            key={item.id}
            img={item.img}
            alt={item.id}
            isActive={i === currentImg}
            onClick={() => setCurrentPosition(i)}
        />
    ));

    const dots = list.map((item, i) => (
        <span
            className="dot"
            key={item.id}
            onClick={() => setCurrentPosition(i)}
            data-is-active={i === currentImg}
        />
    ));

    return (
        <div className="slider">
            <ul className="slider__thumbnails">{thumbnailList}</ul>
            <div className="slider__main-view">
                <div className="slider__selected-img">
                    <img
                        key={list[currentImg].id}
                        src={list[currentImg].img.url}
                        alt={list[currentImg].alt}
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
                        />
                    </div>
                    <div className="slider__btn slider__btn--left" >
                        <Button
                            centerImg="arrow-right"
                            color="white"
                            isCircle={true}
                            onClick={previousSlide}
                        />
                    </div>
                </div>
                <h2 className="slider__title">{list[currentImg].title}</h2>
                <p className="slider__subtitle">{list[currentImg].description}</p>
            </div>
        </div>
    );
});
