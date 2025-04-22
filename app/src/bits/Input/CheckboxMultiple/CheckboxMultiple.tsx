import type { ComponentType } from 'react';
import { Id } from '~/api';

export type Props<Key extends unknown> = {
    type?: 'checkbox';
    values: Array<{ id: Key; name: ComponentType | string; value: boolean }>;
    isDisabled?: boolean;
    singleDisabledId?: Key;
    onChange: (id: Key, value: boolean, ids: Key[]) => void;
};

const toName = (name: string | ComponentType) => {
    const Name = name;

    return typeof name === 'string'
        ? <>{name}</>
        : <Name />;
};

export const CheckboxMultiple = <Key extends unknown>(
    props: Props<Key>,
) => {
    props.type;

    const checkboxes = props.values.map((checkbox, i, values) => {
        const isEqualSingleDisabled = Id.isEqual(props.singleDisabledId, checkbox.id);
        const ids = values.map(item => item.id);

        return (
            <label
                className="checkbox-multiple-option"
                key={Id.asStr(checkbox.id)}
                data-is-disabled={props.isDisabled ?? isEqualSingleDisabled}
            >
                <input
                    className="checkbox-multiple-input"
                    type="checkbox"
                    disabled={props.isDisabled ?? isEqualSingleDisabled}
                    checked={checkbox.value}
                    onChange={e => props.onChange(checkbox.id, e.target.checked, ids)}
                />
                <span
                    className="checkbox-multiple-checkbox"
                />
                {toName(checkbox.name)}
            </label>
        );
    });

    return <div className="checkbox-multiple">{checkboxes}</div>;
};
