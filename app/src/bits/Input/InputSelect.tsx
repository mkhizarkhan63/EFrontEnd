import { observer } from 'mobx-react';
import { v4 } from 'uuid';
import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent } from 'react';
import { Id, lang } from '~/api';
import { If } from '~/bits';
import { shouldRun } from '~/utils';

type Props<Key> = {
    name?: string;
    description?: string;
    isDisabled?: boolean;
    error?: string;
    values: Array<{ value: Key; name: ComponentType | string; isVisible?: boolean }>;
    onChange?: (value: Key, ids: Key[]) => void;
    value?: Key;
    placeHolder?: string;
    isCheckbox?: boolean;
};

const BLUR_EVENTS = ['focus', 'click', 'keydown', 'keypress'] as const;

const toValue = (value: unknown) => {
    if (value instanceof Id) {
        return value.asStr();
    }

    return value;
};

const toName = (name: string | ComponentType) => {
    const Name = name;

    return typeof name === 'string'
        ? <>{name}</>
        : <Name />;
};

const ItemName = <Key extends unknown>(
    props: {
        values: Props<Key>['values'];
        value: Props<Key>['value'];
    },
) => {
    const findName = props.values
        .find(item => toValue(item.value) === toValue(props.value))?.name;

    if (typeof findName === 'string') {
        return <div className="input-text__option">{findName}</div>;
    }

    const OptionName = findName;

    return OptionName ? <OptionName /> : null;
};

const PlaceHolder = observer(<Key extends unknown>(
    props: {
        values: Props<Key>['values'];
        value?: Props<Key>['value'];
        placeHolder?: Props<Key>['placeHolder'];
    },
) => {
    const defaultPlaceHolder = props.placeHolder
        ? props.placeHolder
        : lang.dict.get('fieldPleaseChoose');

    return props.value !== undefined && props.value !== 'none' as Key
        ? <ItemName values={props.values} value={props.value} />
        : <div className="input-placeholder">{defaultPlaceHolder}</div>;
});

export const InputSelect = <Key extends unknown>(props: Props<Key>) => {
    const [isOpen, setIsOpen] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const refDiv = useRef<HTMLDivElement>(null);

    const ids = props.values.map(item => item.value);

    const keyboardControlHandler = (event: KeyboardEvent) => {
        if (!isOpen) {
            return;
        }

        event.preventDefault();

        if (event.key === 'Enter') {
            const item = props.values[selectedIndex];

            if (!item) {
                return;
            }

            props.onChange?.(item.value, ids);

            if (!props.isCheckbox) {
                setIsOpen(false);
                setSelectedIndex(0);
            }

            return;
        }

        if (event.key === 'ArrowDown') {
            if (selectedIndex === props.values.length - 1) {
                return;
            }

            setSelectedIndex(prev => {
                const newValue = prev + 1;

                refDiv.current?.querySelector(`[data-item-index="${newValue}"]`)
                    ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });

                return newValue;
            });

            return;
        }

        if (event.key === 'ArrowUp') {
            if (selectedIndex === 0) {
                return;
            }

            setSelectedIndex(prev => {
                const newValue = prev - 1;

                refDiv.current?.querySelector(`[data-item-index="${newValue}"]`)
                    ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });

                return newValue;
            });
        }
    };

    useEffect(() => {
        const eventHandler = (event: Event) => {
            if (props.isCheckbox && refDiv.current?.id && document
                .getElementById(refDiv.current.id)?.contains(event.target as Node)) {
                return;
            }

            if (refDiv.current && !refDiv.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSelectedIndex(0);
            }
        };

        for (const eventName of BLUR_EVENTS) {
            getDocument()
                .addEventListener(eventName, eventHandler, false);
        }

        return () => {
            for (const eventName of BLUR_EVENTS) {
                getDocument()
                    .removeEventListener(eventName, eventHandler);
            }
        };
    }, [refDiv, refDiv.current]);

    const inputHeader = (
        <label>
            {props.name}
            <If condition={Boolean(props.description)}>
                <span className="description">{props.description}</span>
            </If>
        </label>
    );

    const findValue = (value: Key) => props.values
        .find(item => item.value === value)?.value;

    const onChange = (value: Key) => {
        const realValue = findValue(value);

        if (realValue !== undefined) {
            props.onChange?.(realValue, ids);

            if (!props.isCheckbox) {
                setIsOpen(false);
            }
        }
    };

    const items = props.values
        .filter(item => !item?.isVisible)
        .map((option, index) => (
            <div
                key={[option.name, option.value, index].join(',')}
                className="input-text__option--dropdown"
                onClick={() => onChange(option.value)}
                onBlur={index + 1 === props.values.length ? () => setIsOpen(false) : undefined}
                data-is-focused={index === selectedIndex}
                data-item-index={index}
            >
                {toName(option.name)}
            </div>
        ));

    const error = props.error
        ? <span className="error">{props.error}</span>
        : null;

    const options = isOpen
        ? (
            <div className="input-text__options">
                {items}
            </div>
        )
        : null;

    return (
        <div
            className="input-text input-text--select"
            ref={refDiv}
            id={v4()}
        >
            <div className="input-text-header">
                {inputHeader}
            </div>
            <div
                tabIndex={0}
                onKeyDown={keyboardControlHandler}
                data-is-error={props.error}
                data-is-disabled={props.isDisabled}
                data-value={toValue(props.value)}
                data-role="input-text"
                className="input-text-input"
                onFocus={() => shouldRun(!props.isDisabled, () => setIsOpen(true))}
                onMouseDown={() => shouldRun(!props.isDisabled, () => setIsOpen(state => !state))}
                data-is-open={isOpen}
            >
                <PlaceHolder
                    values={props.values}
                    value={props.value}
                    placeHolder={props.placeHolder}
                />
                <div className="tick" />
            </div>
            {error}{options}
        </div>
    );
};
