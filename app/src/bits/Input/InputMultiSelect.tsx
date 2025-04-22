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
    onChange?: (value: Key[], ids: Key[]) => void;
    value?: Key[]; // Multi-select now
    placeHolder?: string;
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
    return typeof name === 'string' ? <>{name}</> : <Name />;
};

// Placeholder logic
const PlaceHolder = observer(<Key extends unknown>(
    props: {
        values: Props<Key>['values'];
        value?: Key[]; // Reflect multi-select with an array of values
        placeHolder?: Props<Key>['placeHolder'];
    },
) => {
    const defaultPlaceHolder = props.placeHolder
        ? props.placeHolder
        : lang.dict.get('fieldPleaseChoose');

    return props.value && props.value.length > 0
        ? <div className="input-selected-options">
            {props.value.map(v => (
                <span key={String(toValue(v))} className="selected-option">
                    {toName(props.values.find(item => toValue(item.value) === toValue(v))?.name || '')}
                </span>
            ))}
        </div>
        : <div className="input-placeholder">{defaultPlaceHolder}</div>;
});



export const InputMultiSelect = <Key extends unknown>(props: Props<Key>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<Key[]>(props.value || []); // Track selected values
    const [selectedIndex, setSelectedIndex] = useState(0);
    const refDiv = useRef<HTMLDivElement>(null);

    const ids = props.values.map(item => item.value);


    // Synchronize internal selectedValues with prop value
    useEffect(() => {
        if (props.value) {
            setSelectedValues(props.value); // Update internal state when prop changes
        }
    }, [props.value]);
    
    // Toggle selection of an option
    const toggleSelect = (value: Key) => {
        setSelectedValues(prev => {
            const isAlreadySelected = prev.includes(value);
            const newValues = isAlreadySelected ? prev.filter(v => v !== value) : [...prev, value];
            props.onChange?.(newValues, ids);
            return newValues;
        });
    };

    const keyboardControlHandler = (event: KeyboardEvent) => {
        if (!isOpen) return;

        event.preventDefault();

        if (event.key === 'Enter') {
            const item = props.values[selectedIndex];
            if (item) toggleSelect(item.value);
            return;
        }

        if (event.key === 'ArrowDown' && selectedIndex < props.values.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }

        if (event.key === 'ArrowUp' && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    useEffect(() => {
        const eventHandler = (event: Event) => {
            if (refDiv.current && !refDiv.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        BLUR_EVENTS.forEach(eventName => {
            document.addEventListener(eventName, eventHandler, false);
        });

        return () => {
            BLUR_EVENTS.forEach(eventName => {
                document.removeEventListener(eventName, eventHandler);
            });
        };
    }, []);

    const inputHeader = (
        <label>
            {props.name}
            <If condition={Boolean(props.description)}>
                <span className="description">{props.description}</span>
            </If>
        </label>
    );

    const items = props.values.map((option, index) => (
        <div
            key={v4()}
            className="input-text__option--dropdown"
            onClick={() => toggleSelect(option.value)}
            data-is-focused={index === selectedIndex}
            data-item-index={index}
        >
            <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => toggleSelect(option.value)}
            />
            {toName(option.name)}
        </div>
    ));

    const error = props.error ? <span className="error">{props.error}</span> : null;

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
                className="input-text-input"
                onFocus={() => shouldRun(!props.isDisabled, () => setIsOpen(true))}
                onMouseDown={() => shouldRun(!props.isDisabled, () => setIsOpen(state => !state))}
                data-is-open={isOpen}
            >
                <PlaceHolder
                    values={props.values}
                    value={selectedValues}
                    placeHolder={props.placeHolder}
                />
                <div className="tick" />
            </div>
            {error}
            {isOpen && <div className="input-text__options">{items}</div>}
        </div>
    );
};
