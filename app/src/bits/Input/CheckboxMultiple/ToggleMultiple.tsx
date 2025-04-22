import { Icons, type IconName } from '~/bits';

export type Props<Key> = {
    type: 'toggle';
    values: Array<{ id: Key; name: string; value: boolean; img?: IconName }>;
    isDisabled?: boolean;
    onChange: (id: Key, value: boolean) => void;
};

let i = 0;

export const ToggleMultiple = <Key extends unknown>(props: Props<Key>) => {
    props.type;
    const toggle = props.values.map(item => (
        <label className="toggle-multiple-option" key={String(item.id)}>
            <input
                className="toggle-multiple-input"
                type="radio"
                name={`toggle-multiple-${i++}`}
                disabled={props.isDisabled}
                checked={item.value}
                onChange={e => props.onChange(item.id, e.target.checked)}
            />
            <span className="toggle-multiple-toggle">
                {item.img ? <Icons icon={item.img} /> : null}
                <p className="toggle-multiple-toggle-name">{item.name}</p>
            </span>
        </label>
    ));

    return (
        <div className="toggle-multiple">
            {toggle}
        </div>
    );
};
