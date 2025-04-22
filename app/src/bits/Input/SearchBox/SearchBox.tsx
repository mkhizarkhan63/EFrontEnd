import {
    useEffect,
    useRef,
    useState,
    type KeyboardEvent,
} from 'react';
import { utils } from '~/api';
import { useInView } from 'react-intersection-observer';

type Props<T> = {
    options: Array<{
        textValue: string;
        value: T;
        element?: JSX.Element;
    }>;
    textValue: string;
    placeHolder?: string;
    name?: string;
    id?: string;
    /**
     * @description number between 0 and 1
     */
    precisionVisible?: number;
    onChange: (
        textValue: string,
        value?: T,
    ) => void;
    onVisibilityChange: (isVisible: boolean) => void;
};

const BLUR_EVENTS = ['focus', 'click', 'keydown', 'keypress'] as const;

export const SearchBox = <T extends unknown>({
    options,
    textValue,
    onChange,
    precisionVisible = 0.4,
    placeHolder,
    name,
    id,
    onVisibilityChange,
}: Props<T>) => {
    const [isSuggestVisible, showSuggest] = useState(false);

    const refDiv = useRef<HTMLDivElement>(null);

    const [cursor, setCursor] = useState(0);

    const [lastArray, setLastArray] = useState('');

    const { ref } = useInView({
        threshold: 1,
        onChange: onVisibilityChange,
        triggerOnce: true,
        rootMargin: '0px 0px 100px 0px',
    });

    const currentArray = options
        .map(item => item.textValue)
        .join(',');

    if (currentArray !== lastArray) {
        setLastArray(currentArray);
        setCursor(0);
    }

    const emitChange = (text: string) => {
        const realValue = options.find(item => item.textValue === text);
        setCursor(0);
        onChange(text, realValue?.value);
    };

    const hideAndEmitChange = (text: string) => () => {
        showSuggest(false);
        emitChange(text);
    };

    const filteredOptions = utils
        .fuzzySort(
            textValue.toLowerCase(),
            options,
            item => item.textValue.toLowerCase(),
            precisionVisible,
        )
        .filter(item => item.textValue !== textValue);

    useEffect(() => {
        const eventHandler = (event: Event) => {
            if (refDiv.current && !refDiv.current.contains(event.target as Node)) {
                showSuggest(false);
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

    const keyboardNavigation = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!isSuggestVisible) {
            if (event.key !== 'Escape') {
                showSuggest(true);
            }
            return;
        }

        switch (event.key) {
            case 'ArrowDown':
                setCursor(c => (c < filteredOptions.length -1 ? c + 1 : c));

                break;
            case 'ArrowUp':
                setCursor(c => (c > 0 ? c -1 : 0));

                break;
            case 'Escape':
                showSuggest(false);

                setCursor(c => (c < filteredOptions.length -1 ? c + 1 : c));

                break;
            case 'Enter':
                const item = filteredOptions[cursor];

                setCursor(0);

                if (item) {
                    hideAndEmitChange(item.textValue)();
                }

                break;
            case 'Tab':
                setCursor(0);

                showSuggest(false);

                break;
            default:
                break;
        }
    };

    const items = filteredOptions.map((item, i) => (
        <li
            className="input-text__option--dropdown"
            key={i}
            onClick={hideAndEmitChange(item.textValue)}
            data-select={cursor === i}
            ref={ref}
        >
            {item.element ? item.element : item.textValue}
        </li>
    ));

    const list = isSuggestVisible ? <ul className="input-text__options">{items}</ul> : null;

    return (
        <div className="input-text input-text--search" ref={refDiv}>
            <div className="input-text-header">{name}</div>
            <div
                className="search-container"
                data-is-open={isSuggestVisible ? 'true' : 'false'}
            >
                <input
                    className="input-text-input"
                    onFocus={() => showSuggest(true)}
                    onChange={e => emitChange(e.target.value)}
                    onKeyDown={keyboardNavigation}
                    type="search"
                    value={textValue}
                    placeholder={placeHolder}
                    name={name}
                    id={id}
                    autoComplete="off"
                    autoCorrect="off"
                />
                <div className="tick" />
            </div>
            {list}
        </div>
    );
};
