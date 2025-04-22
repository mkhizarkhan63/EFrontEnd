import type { FormEvent } from 'react';
import { Icons, Loading, type IconName, If } from '~/bits';

type Props = {
    color: 'white' | 'green' | 'blue' | 'gray' | 'darkgray' | 'transparent' | 'orange' | 'red';
    value?: string;
    additionalValue?: number;
    leftImg?: IconName;
    centerImg?: IconName;
    rightImg?: IconName;
    isDisabled?: boolean;
    hasOutline?: boolean;
    isCircle?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
    isSubmit?: boolean;
    hasStopPropagation?: boolean;
    isPmIndicator?: boolean;
};

const Icon = (position: string, img: IconName) => (
    <div
        className={`icon ${position}`}
        data-icon-name={img}
    >
        <Icons icon={img} />
    </div>
);

export const Button = (props: Props) => {
    const handleClick = props.hasStopPropagation
        ? (e: FormEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            props.onClick?.();
        }
        : () => {
            props.onClick?.();
        };

    const isDisabled = [
        props.isLoading,
        props.isDisabled,
    ].includes(true);

    return (
        <button
            className={props.isCircle ? 'btn btn--circle' : 'btn btn--main'}
            data-color={props.color}
            data-is-outlined={props.hasOutline}
            data-is-loading={props.isLoading}
            disabled={isDisabled}
            onClick={handleClick}
            type={props.isSubmit ? 'submit' : 'button'}
        >
            {props.centerImg ? Icon('circle', props.centerImg) : null}
            {props.leftImg ? Icon('left', props.leftImg) : null}
            <div className="text">
                {props.value}
                <If condition={!props.isPmIndicator && (Boolean(props.additionalValue) || props.additionalValue === 0)} >
                    <span className="text-number">({props.additionalValue})</span>
                </If>
                <If condition={Boolean(props.isPmIndicator) && Boolean(props.additionalValue)} >
                    <span className="text-number-circle">{props.additionalValue}</span>
                </If>
            </div>
            {props.rightImg ? Icon('right', props.rightImg) : null}
            <Loading isEnabled={Boolean(props.isLoading)} />
        </button>
    );
};
