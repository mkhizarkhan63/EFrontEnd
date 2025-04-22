import { observer } from 'mobx-react';
import { Icons } from '~/bits';
import { utilsArray, utilsNumber } from '~/utils';

type Props<Key extends string> = {
    labels: Record<Key, string>;
    values: Array<{ key: Key; value: number }>;
};

const starsIcons = Array.from(Array(5)).map((e, i) => <Icons key={i} icon="star" />);

export const Stars = observer(<Key extends string>(props: Props<Key>) => {
    const starsDetails = props.values.map(item => (
        <div key={`item-${item.key}-${item.value}`} className="stars-dropdown-item">
            {props.labels[item.key]}
            <div
                className="stars__icons"
                data-value-stars={utilsNumber.toRange(item.value, 0, 5)}
            >
                <div className="stars__icons-container">
                    {starsIcons}
                </div>
            </div>
        </div>
    ));

    const avg = utilsArray.avg(utilsArray.toRange(props.values.map(x => x.value), 0, 5), 1);

    return (
        <div className="stars">
            <div className="stars__icons" data-value-stars={Math.round(avg)}>
                {starsIcons}
            </div>
            <div className="stars__value">
                {avg}
            </div>
            <div className="stars__dropdown">
                {starsDetails}
            </div>
        </div>
    );
});
