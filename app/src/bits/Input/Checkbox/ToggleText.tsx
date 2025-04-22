export type Props = {
    type: 'toggleText';
    text: { first: string; second: string };
    isDisabled?: boolean;
    isChecked: boolean;
    onChange?: (value: boolean) => void;
};

export const ToggleText = (props: Props) => {
    props.type;

    return (
        <label className="toggle-text">
            <input
                type="checkbox"
                checked={props.isChecked}
                disabled={props.isDisabled}
                onChange={e => props.onChange?.(e.target.checked)}
            />
            <div className="toggle-text-value">{props.text.first}</div>
            <div className="toggle-text-value">{props.text.second}</div>
            <span className="checkbox-toggle-text" />
        </label>
    );
};
