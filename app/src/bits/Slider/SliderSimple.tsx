import { useState } from 'react';
import { observer } from 'mobx-react';
import { Button } from '~/bits';
import type { Id } from '~/api';

type Props = {
    list: Array<{
        id: Id;
        component: () => JSX.Element;
    }>;
};

type ItemProps = {
    elem: JSX.Element;
    onClick: () => void;
    isActive: boolean;
};

const Item = observer((props: ItemProps) => (
    <li
        onClick={props.onClick}
        data-is-active={props.isActive}
        className="slider-columns-item"
    >
        {props.elem}
    </li>
));

export const SliderSimple = observer(({ list }: Props) => {
    const [currentElement, setCurrentElement] = useState(0);

    const setCurrentPosition = (value: number) => {
        setCurrentElement(Math.max(0, Math.min(value, list.length-1)));
    };

    const movePosition = (delta: 1 | -1) => {
        const position = currentElement + delta;

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

    const itemList = list.map((item, i) => (
        <Item
            key={item.id.asStr()}
            elem={item.component()}
            isActive={i === currentElement}
            onClick={() => setCurrentPosition(i)}
        />
    ));

    return (
        <div className="slider-columns">
            <div className="slider-columns-list">{itemList}</div>
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
    );
});
