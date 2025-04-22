import { observer } from 'mobx-react';
import { v4 } from 'uuid';
import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent, ChangeEvent } from 'react';
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

export const InputSearchMultiSelect = <Key extends unknown>(props: Props<Key>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<Key[]>(props.value || []); // Track selected values
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState(''); // New state to track search input
    const refDiv = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null); // Reference for the search input

    const ids = props.values.map(item => item.value);

    // Filtered options based on search query
    const filteredOptions = props.values.filter(option =>
        toName(option.name).props.children.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        setSearchQuery("");
    };

    // Handle keyboard events for navigation and selection
    const keyboardControlHandler = (event: KeyboardEvent) => {
        // Only handle key events when the dropdown is open
        if (!isOpen) return;

        // Prevent default behavior for arrow keys and Enter key
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter') {
            event.preventDefault();
        }

        if (event.key === 'Enter') {
            const item = filteredOptions[selectedIndex];
            if (item) toggleSelect(item.value);
        }

        if (event.key === 'ArrowDown' && selectedIndex < filteredOptions.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }

        if (event.key === 'ArrowUp' && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    // Handle outside click to close the dropdown
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

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value); // Update search query state
        setSelectedIndex(0); // Reset index on new search
    };

    // Focus the search input when the dropdown opens
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    const inputHeader = (
        <label>
            {props.name}
            <If condition={Boolean(props.description)}>
                <span className="description">{props.description}</span>
            </If>
        </label>
    );

    const items = filteredOptions.map((option, index) => (
        <div
            key={v4()} // Consider changing this to use option.value if it's unique
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
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange} // Search input handler
                className="search-input" // You can style this input
                ref={searchInputRef} // Add reference to search input
                placeholder={props.placeHolder || 'Search...'} // Search placeholder
                onFocus={() => shouldRun(!props.isDisabled, () => setIsOpen(true))} // Open dropdown on focus
                onKeyDown={keyboardControlHandler} // Enable keyboard navigation
            />
            {error}
            {isOpen && (
                <div className="input-text__options">
                    {items.length > 0 ? items : <div>No options found</div>}
                </div>
            )}
        </div>
    );
};
