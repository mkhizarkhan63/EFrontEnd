type Value = {
    value: number;
    color: 'orange' | 'grey' | 'red' | 'green';
};

type Props = {
    values?: Value[];
};

export const ProgressBar = ({ values }: Props) => {
    if (!values) {
        return null;
    }

    let lastValue = 0;

    const bars = values.map((value, i) => {
        const calculateValue = lastValue + Math.min(Math.max(value.value, 0), 100);
        lastValue = calculateValue;

        return (
            <div
                key={`${i}-${value.color}`}
                className="progress-bar-value"
                style={{ width: `${calculateValue}%` }}
                data-is-color={value.color}
            />
        );
    });

    return (
        <div className="progress-bar">
            {bars.reverse()}
        </div>
    );
};
