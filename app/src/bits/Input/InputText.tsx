import { useRef, useEffect, useState, type ChangeEvent } from 'react';
import { If } from '../If';
import { Button } from '../Button';

type Props = {
    placeHolder?: string;
    isDisabled?: boolean;
    name?: string;
    description?: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
    type?: 'text' | 'password';
    isArabic?: boolean;
    onBlur?: () => void;
    shouldCursorMove?: boolean;
    isDynamicWidth?: boolean;
};

export const InputText = (props: Props) => {
    const [cursor, setCursor] = useState<number>();
    const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const input = ref.current;

        if (!input || !cursor) {
            return;
        }

        input.setSelectionRange(cursor, cursor);
    }, [ref, cursor, props.value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { selectionStart, value } = e.target;

        if (typeof selectionStart === 'number') {
            if (props.shouldCursorMove) {
                const endCursor = value.length > 3 ? selectionStart + 1 : selectionStart;

                setCursor(endCursor);

                props.onChange?.(value);
                return;
            }

            setCursor(selectionStart);
        }

        props.onChange?.(value);
    };

    const error = props.error
        ? <span className="error">{props.error}</span>
        : null;

    const passwordType = isPasswordVisible ? 'text' : 'password';

    return (
        <div className="input-text" data-is-password={props.type === 'password'}>
            <div className="input-text-header">
                <label>
                    {props.name}
                    {props.description ? <span className="description">{props.description}</span> : null}
                </label>
            </div>
            <input
                ref={ref}
                dir={props.isArabic ? 'rtl' : 'ltr'}
                type={props.type === 'password' ? passwordType : 'text'}
                className={
                    props.error ? 'input-text-input error' : 'input-text-input'
                }
                placeholder={props.placeHolder}
                disabled={props.isDisabled}
                value={props.value}
                onChange={handleChange}
                onBlur={props.onBlur}
            />
            {props.isDynamicWidth ? <p className="dynamic-width">{props.value}</p> : null}
            <div>
                {error}
            </div>
            <If condition={props.type === 'password'}>
                <Button
                    color="transparent"
                    centerImg={isPasswordVisible ? 'eye-hide' : 'eye'}
                    isCircle={true}
                    onClick={() => setPasswordVisibility(!isPasswordVisible)}
                />
            </If>
        </div>
    );
};
