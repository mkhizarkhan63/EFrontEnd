import { observer } from 'mobx-react';
import { lang, type E } from '~/api';
import { Icons, If } from '~/bits';
import { utilsNumber } from '~/utils';

type Props = {
    values: () => Array<{
        key: E.ReviewStars;
        value: number;
    }>;
    onChange?: (
        value: number,
        key: E.ReviewStars,
    ) => void;
    isFlow?: boolean;
};

type StarsProps = {
    item: {
        key: E.ReviewStars;
        value: number;
    };
    onChange?: (
        value: number,
        key: E.ReviewStars,
    ) => void;
    isFlow?: boolean;
};

const StarsIcons = ({ item, onChange, isFlow }: StarsProps) => {
    const iconsList = Array(5).fill(0).map((e, i) => (
        <Icons
            key={item.key}
            icon="star"
            remove={() => onChange?.(i + 1, item.key)}
        />
    ));

    return <>{iconsList}</>;
};

const Stars = observer(({ item, onChange, isFlow }: StarsProps) => (
    <div key={item.key} className="rating-stars">
        <If condition={!isFlow}>
            <p>{lang.dict.enum('reviewStars', item.key)}</p>
        </If>
        <div
            className="stars__icons"
            data-value-stars={isFlow ? item.value : utilsNumber.toRange(item.value, 1, 5)}
        >
            <div className="stars__icons-container">
                <StarsIcons
                    item={item}
                    onChange={onChange}
                    isFlow={isFlow}
                />
            </div>
        </div>
    </div>
));

export const RatingStars = observer((props: Props) => {
    const starsList = props.values().map(item => (
        <Stars
            key={item.key}
            item={item}
            onChange={props.onChange}
            isFlow={props.isFlow}
        />
    ));

    return <>{starsList}</>;
});

