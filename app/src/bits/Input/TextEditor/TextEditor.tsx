import { useLayoutEffect, useRef, useState } from 'react';
import Quill from 'quill';

type Props = {
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
};

export const TextEditor = (props: Props) => {
    const [isFocused, setIsFocused] = useState(false); // Track if the editor is focused
    const quillRef = useRef<HTMLDivElement>(null); // Ref for Quill container
    const quillInstanceRef = useRef<Quill | null>(null);

    // Initialize Quill when the component mounts
    useLayoutEffect(() => {
        if (quillRef.current && !quillInstanceRef.current) {
            // Initialize Quill editor
            quillInstanceRef.current = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: isFocused, // Disable Quill's default toolbar
                },
                placeholder: props.placeHolder || 'Type here...',
                readOnly: props.isReadOnly, // Handle read-only state
            });

            // Sync content with parent when Quill changes
            quillInstanceRef.current.on('text-change', () => {
                const content = quillInstanceRef.current?.root.innerHTML || '';
                if (props.onChange) {
                    props.onChange(content);
                }
            });

            // Add event listeners for focus and blur to show/hide the toolbar
            const quillEditor = quillInstanceRef.current;
            // quillEditor.root.addEventListener('blur', () => {
            //     setIsFocused(false)
            // });
            quillEditor.root.addEventListener('focus', () => {
                setIsFocused(true)
            });

        }

        // Cleanup Quill instance when component unmounts
        return () => {
            if (quillInstanceRef.current) {
                quillInstanceRef.current = null; // Clean up the Quill instance
            }
        };
    }, [props.placeHolder, props.isReadOnly, props.onChange]);

    // Update Quill content when `props.value` changes
    useLayoutEffect(() => {
        if (quillInstanceRef.current && props.value !== undefined) {
            quillInstanceRef.current.root.innerHTML = props.value;
        }
    }, [props.value]);

    return (
        <div className="texteditor">
            {props.withoutHeader ? null : (
                <div className="texteditor__header">
                    <label>
                        {props.name}&nbsp;
                        {props.description ? <span className="description">{props.description}</span> : null}
                        {props.error ? <span className="error">{props.error}</span> : null}
                    </label>
                </div>
            )}

            <div
                className="texteditor__container"
                style={{
                    direction: props.isArabic ? 'rtl' : 'ltr',
                    pointerEvents: props.isDisabled ? 'none' : 'auto', // Handle disabled state
                }}
            >
                {/* Placeholder Text */}
                {props.value?.trim().length === 0 && !props.isReadOnly && !props.isDisabled && (
                    <div className="texteditor__placeholder">{props.placeHolder}</div>
                )}
                
                {/* Button */}
                <div
                    className={`texteditor__toolbar ${isFocused ? 'texteditor__toolbar--visible' : 'texteditor__toolbar--hidden'}`}
                >
                    <button
                        onClick={() => quillInstanceRef.current?.format('bold', true)}
                        className="texteditor__toolbar-button"
                    >
                        Bold
                    </button>
                    <button
                        onClick={() => quillInstanceRef.current?.format('italic', true)}
                        className="texteditor__toolbar-button"
                    >
                        Italic
                    </button>
                    <button
                        onClick={() => quillInstanceRef.current?.format('list', 'bullet')}
                        className="texteditor__toolbar-button"
                    >
                        Bullet List
                    </button>
                </div>

                {/* Quill Editor */}
                <div
                    ref={quillRef}
                    className="texteditor__input"
                    data-is-disabled={props.isDisabled}
                    style={{ minHeight: '150px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}
                ></div>


            </div>
        </div>
    );
};
