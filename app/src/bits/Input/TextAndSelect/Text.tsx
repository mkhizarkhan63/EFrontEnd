type Props = {
    placeHolder?: string;
    isDisabled?: boolean;
    name?: string;
    description?: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
};

export const Text = (props: Props) => (
    <div className="input-text">
        <div className="input-text-header">
            <label>
                {props.name}
                {props.description && <span className="description">{props.description}</span>}
                {props.error && <span className="error">{props.error}</span>}
            </label>
        </div>
        <input
            type="text"
            className={props.error ? 'input-text-input error' : 'input-text-input'}
            placeholder={props.placeHolder}
            disabled={props.isDisabled}
            value={props.value}
            onChange={e => props.onChange?.(e.target.value)}
        />
    </div>
);
