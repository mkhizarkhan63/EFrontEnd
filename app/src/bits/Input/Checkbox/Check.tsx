export type Props = {
    type: 'check';
    name?: string;
    isDisabled?: boolean;
    isChecked: boolean;
    onChange?: (value: boolean) => void;
    customClick?: VoidFunction;
};

export const Check = (props: Props) => {
    props.type;
    return (
        <div className="checkbox-container">
            <label className="checkbox-container-option">
                <input
                    type="checkbox"
                    name={props.name}
                    checked={props.isChecked}
                    disabled={props.isDisabled}
                    onChange={e => props.onChange?.(e.target.checked)}
                />
                <span className="checkbox-container-input" />
                <span
                    className="checkbox-container-text"
                    onClick={e => {
                        if (!props.customClick) {
                            return;
                        }

                        e.preventDefault();
                        props.customClick();
                    }}
                >{props.name}
                </span>
            </label>
        </div>
    );
};
