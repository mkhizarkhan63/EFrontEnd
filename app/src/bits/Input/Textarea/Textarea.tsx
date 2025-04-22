import { useLayoutEffect, useRef } from 'react';
import { If } from '~/bits';
import { xRef } from '~/utils';

type Props = xRef.Props<'textarea', {
    placeHolder?: string;
    isDisabled?: boolean;
    name?: string | JSX.Element;
    description?: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
    isReadOnly?: boolean;
    isArabic?: boolean;
    withoutHeader?: boolean;
}>;

export const Textarea = (props: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const bindRef = xRef.binder(props);

    useLayoutEffect(() => {
        if (textareaRef.current) {
            const parentHeight = textareaRef.current.parentElement?.offsetHeight ?? textareaRef.current.offsetHeight;
            const borderSize = parentHeight - textareaRef.current.offsetHeight;

            textareaRef.current.style.height = 'inherit';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight + borderSize}px`;
        }
    }, [props.value]);

    return (
        <div className="textarea">
            <If condition={!props.withoutHeader}>
                <div className="textarea__header">
                    <label>
                        {props.name}&nbsp;
                        {props.description ? <span className="description">{props.description}</span> : null}
                        {props.error ? <span className="error">{props.error}</span> : null}
                    </label>
                </div>
            </If>
            <div
                className="textarea__container"
                ref={bindRef('textarea')}
            >
                <If condition={props.value?.trim().length === 0 && !props.isReadOnly}>
                    <div className="textarea__placeholder">{props.placeHolder}</div>
                </If>
                <textarea
                    ref={textareaRef}
                    dir={props.isArabic ? 'rtl' : 'ltr'}
                    onChange={e => props.onChange?.(e.target.value)}
                    className="textarea__input"
                    data-is-disabled={props.isDisabled}
                    value={props.value}
                    disabled={props.isDisabled}
                    placeholder={props.placeHolder}
                >
                    {props.value}
                </textarea>
            </div>
        </div>
    );
};
