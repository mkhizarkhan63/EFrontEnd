import { RadioMultiple, type Props as RadioMultipleProps } from './RadioMultiple';
import { ToggleMultiple, type Props as ToggleMultipleProps } from './ToggleMultiple';
import { CheckboxMultiple, type Props as CheckboxMultipleProps } from './CheckboxMultiple';

type Props<Key> = (
    | RadioMultipleProps<Key>
    | ToggleMultipleProps<Key>
    | CheckboxMultipleProps<Key>
);

export const Multiple = <Key extends unknown>(props: Props<Key>) => {
    switch (props.type) {
        case 'radio':
            return <RadioMultiple {...props} />;
        case 'toggle':
            return <ToggleMultiple {...props} />;
        case 'checkbox':
        default:
            return <CheckboxMultiple {...props} />;
    }
};
