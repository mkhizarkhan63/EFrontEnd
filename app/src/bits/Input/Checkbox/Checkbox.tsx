import { Radio, type Props as RadioProps } from './Radio';
import { Toggle, type Props as ToggleProps } from './Toggle';
import { ToggleText, type Props as ToggleTextProps } from './ToggleText';
import { Check, type Props as CheckProps } from './Check';

type Props = (
    | RadioProps
    | ToggleProps
    | ToggleTextProps
    | CheckProps
);

export const Checkbox = (props: Props) => {
    switch (props.type) {
        case 'radio':
            return <Radio {...props} />;
        case 'toggle':
            return <Toggle {...props} />;
        case 'toggleText':
            return <ToggleText {...props} />;
        case 'check':
            return <Check {...props} />;
        default:
            return null;
    }
};
