import type { ComponentType } from 'react';
import { Select } from './Select';
import { Text } from './Text';

type Props1<Key> = {
    issDisabledSelect?: boolean;
    selectValues: Array<{
        value: Key;
        name: ComponentType | string;
    }>;
    selectOnChange: (value: Key) => void;
    selectValue?: Key;
    textPlaceHolder?: string;
    isDisabledText?: boolean;
    textName?: string;
    textDescription?: string;
    textValue?: string;
    textOnChange?: (value: string) => void;
    textError?: string;
};

export const TextAndSelect = <Key extends unknown>(props: Props1<Key>) => (
    <div className="input-text-and-select">
        <Text
            placeHolder={props.textPlaceHolder}
            isDisabled={props.isDisabledText}
            name={props.textName}
            description={props.textDescription}
            value={props.textValue}
            onChange={props.textOnChange}
            error={props.textError}
        />
        <Select
            value={props.selectValue}
            isDisabled={props.issDisabledSelect}
            values={props.selectValues}
            onChange={props.selectOnChange}
        />
    </div>
);
