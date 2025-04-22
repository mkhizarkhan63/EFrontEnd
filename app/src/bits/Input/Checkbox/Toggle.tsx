export type Props = {
    type: 'toggle';
    isDisabled?: boolean;
    isChecked: boolean;
    onChange: (value: boolean) => void;
};

export const Toggle = (props: Props) => {
    props.type;
    return (
        <label className="toggle">
            <input
                type="checkbox"
                checked={props.isChecked}
                disabled={props.isDisabled}
                onChange={e => props.onChange(e.target.checked)}
            />
            <span className="checkbox-toggle" />
        </label>
    );
};
