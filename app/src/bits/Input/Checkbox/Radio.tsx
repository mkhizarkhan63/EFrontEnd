export type Props = {
    type: 'radio';
    name?: string;
    text?: { first: string; second: string };
    isDisabled?: boolean;
    isChecked?: boolean;
    isOrderReversed?: boolean;
    onChange: (value: boolean) => void;
};

let i = 0;

export const Radio = (props: Props) => {
    props.type;
    props.name;

    const idName = `input-radio-${i++}`;

    const firstIsChecked = typeof props.isChecked === 'undefined'
        ? false
        : props.isChecked;

    const secondIsChecked = typeof props.isChecked === 'undefined'
        ? false
        : !props.isChecked;

    const text = props.text ?? {
        first: '',
        second: '',
    };

    const labels = [
        <label
            key="first-label"
            className="checkbox-radio-option"
            data-is-disabled={props.isDisabled}
        >
            <input
                type="radio"
                name={idName}
                checked={firstIsChecked}
                disabled={props.isDisabled}
                onChange={() => props.onChange(true)}
            />
            <span className="checkbox-radio-input" />
            {text.first}
        </label>,
        <label
            key="second-label"
            className="checkbox-radio-option"
            data-is-disabled={props.isDisabled}
        >
            <input
                type="radio"
                name={idName}
                checked={secondIsChecked}
                disabled={props.isDisabled}
                onChange={() => props.onChange(false)}
            />
            <span className="checkbox-radio-input" />
            {text.second}
        </label>,
    ];

    if (props.isOrderReversed === true) {
        labels.reverse();
    }

    return (
        <div className="checkbox-radio">
            {labels}
        </div>
    );
};
