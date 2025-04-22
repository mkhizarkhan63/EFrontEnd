export type Props<Key> = {
    type: 'radio';
    values: Array<{ id: Key; name: string; value: boolean }>;
    isDisabled?: boolean;
    onChange: (id: Key, value: boolean) => void;
};
let i = 0;
export const RadioMultiple = <Key extends unknown>(props: Props<Key>) => {
    props.type;
    const radio = props.values.map(checkbox => (
        <label className="radio-multiple-option" key={String(checkbox.id)} data-is-disabled={props.isDisabled}>
            <input
                className="radio-multiple-input"
                type="radio"
                name={`radio-multiple-${i++}`}
                disabled={props.isDisabled}
                checked={checkbox.value}
                onChange={e => props.onChange(checkbox.id, e.target.checked)}
            />
            <span className="radio-multiple-checkbox" />
            {checkbox.name}
        </label>
    ));

    return (
        <div className="radio-multiple">
            {radio}
        </div>
    );
};
