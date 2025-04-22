import { useEffect, useRef, useState, type ComponentType } from 'react';
import { If } from '~/bits';

type Props<Key> = {
    isDisabled?: boolean;
    values: Array<{
        value: Key;
        name: ComponentType | string;
    }>;
    onChange: (value: Key) => void;
    value?: Key;
};

type ItemProps<T>= {
    values: Props<T>['values'];
    value: Props<T>['value'];
};

const BLUR_EVENTS = [
    'focus',
    'click',
    'keydown',
    'keypress',
] as const;

const toName = (name: string | ComponentType) => {
    const Name = name;

    return typeof name === 'string'
        ? <>{name}</>
        : <Name />;
};

const ItemName = <Key extends unknown>(
    props: ItemProps<Key>,
) => {
    const FoundName = props.values
        .find(item => item.value === props.value)
        ?.name;

    if (!FoundName) {
        return null;
    }

    if (typeof FoundName === 'string') {
        return (
            <div className="input-text__option">
                {FoundName}
            </div>
        );
    }

    return <FoundName />;
};

export const Select = <Key extends unknown>(props: Props<Key>) => {
    const [isOpen, setIsOpen] = useState(false);

    const refDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const eventHandler = (event: Event) => {
            if (refDiv.current && !refDiv.current.contains(event.target as Node)) {
                setIsOpen(false);
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

    const findValue = (value: Key) => props.values
        .find(item => item.value === value)?.value;

    const onChange = (value: Key) => {
        const realValue = findValue(value);

        if (realValue !== undefined) {
            props.onChange(realValue);
            setIsOpen(false);
        }
    };

    const items = props.values.map((option, index) => (
        <div
            key={[option.name, option.value, index].join(',')}
            onClick={() => onChange(option.value)}
            className="input-text__option--dropdown"
        >
            {toName(option.name)}
        </div>
    ));

    return (
        <div
            className="input-text input-text--select"
            ref={refDiv}
        >
            <div
                data-is-disabled={props.isDisabled}
                data-value={props.value}
                data-role="input-text"
                className="input-text-input"
                onClick={() => setIsOpen(!isOpen)}
                data-is-open={isOpen}
            >
                <ItemName values={props.values} value={props.value} />
                <div className="tick" />
            </div>
            <If condition={isOpen} >
                <div className="input-text__options">
                    {items}
                </div>
            </If>
        </div>
    );
};

