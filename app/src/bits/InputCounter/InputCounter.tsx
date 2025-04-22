import { Button } from '../Button';

type Props = {
    value: number;
    name?: string;
    minValue?: number;
    maxValue?: number;
    onChange: (value: number) => void;
    isPercentage?: boolean;
};

export const InputCounter = (props: Props) => {
    const handleInput = (value: number | string) => {
        if (typeof value === 'string') {
            value = Number(value);
        }

        if (isNaN(value)) {
            value = 0;
        }

        props.onChange(value);
    };

    const deltaChange = (delta: number) => () => {
        if ((props.minValue ?? Infinity) === props.value && (delta === -1 || delta === -0.5)) {
            return;
        }

        if ((props.maxValue ?? -Infinity) === props.value && (delta === 1 || delta === 0.5)) {
            return;
        }

        handleInput(props.value + delta);
    };

    return (
        <div className="input-counter-container">
            <label>
                {props.name}
            </label>
            <div className="input-counter">
                <Button
                    centerImg="minus"
                    color="blue"
                    isCircle={true}
                    onClick={deltaChange(props.isPercentage ? -0.5 : -1)}
                />
                <input
                    className="input-counter__input"
                    value={props.isPercentage ? `${props.value}%` : props.value}
                    onChange={e => handleInput(e.target.value)}
                    disabled={props.isPercentage}
                />
                <Button
                    centerImg="add"
                    color="blue"
                    isCircle={true}
                    onClick={deltaChange(props.isPercentage ? 0.5 : 1)}
                />
            </div>
        </div>
    );
};
