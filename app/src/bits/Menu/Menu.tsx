import { observer } from 'mobx-react';
import { E } from '~/api';
import { type IconName, Button, If } from '~/bits';
import { isKeyOf } from '~/utils';

type Props<T> = {
    getItems: () => Array<MenuButton<T>>;
    isActive: (page: T) => boolean;
    isChosen?: (page: T) => boolean;
    isCompleted?: (page: T) => boolean;
    isAnimated?: boolean;
};

export type MenuButton<T> = {
    value: T;
    name: string;
    additionalValue?: number;
    onClick?: () => void;
    iconName?: IconName;
    isDisabled?: boolean;
};

type MenuButtonProps<T> = MenuButton<T> & {
    isActive: boolean;
    isCompleted?: boolean;
    isChosen?: boolean;
    isAnimated?: boolean;
    iconName?: IconName;
    index: number;
};

const MenuButtonItem = <T extends string>(props: MenuButtonProps<T>) => {
    const params = () => {
        if (props.isAnimated) {
            return {
                color: 'blue' as const,
                leftImg: props.iconName,
                onClick: props.onClick,
                isDisabled: props.isDisabled,
            };
        }

        return props.isActive
            ? {
                color: 'white' as const,
            }
            : {
                color: 'gray' as const,
                onClick: props.onClick,
            };
    };
    return props.isAnimated ?
        (
            <div
                className="buttons-menu__item"
                data-is-active={props.isActive}
                data-is-chosen={props.isChosen}
                data-is-completed={props.isCompleted}
            >
                <If condition={isKeyOf(props.value, E.ProjectMenu)}>
                    <span className="buttons-menu__item-num">{props.index + 1}</span>
                </If>
                <If condition={isKeyOf(props.value, E.BuyProjectMenu)}>
                    <span className="buttons-menu__item-num">{props.index + 1}</span>
                </If>
                <Button
                    {...params()}
                    additionalValue={props.additionalValue}
                    value={props.name}
                />
            </div>
        ) :
        (
            <Button
                {...params()}
                additionalValue={props.additionalValue}
                value={props.name}
            />
        );
};

export const Menu = observer(<T extends string>(props: Props<T>) => {
    const items = props.getItems().map((item, index) => (
        <MenuButtonItem
            key={`${item.value}-${index}`}
            isActive={props.isActive(item.value)}
            isChosen={props.isChosen?.(item.value)}
            isCompleted={props.isCompleted?.(item.value)}
            {...item}
            isAnimated={props.isAnimated}
            isDisabled={item.isDisabled}
            index={index}
        />
    ));
    return (
        <div className="buttons-menu">
            {items}
        </div>
    );
});
