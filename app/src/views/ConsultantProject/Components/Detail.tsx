import { observer } from 'mobx-react';
import { If } from '~/bits';

type Props = {
    description?: string;
    value?: string;
};

export const Detail = observer((props: Props) => (
    <If condition={Boolean(props.description && props.value)}>
        <div className="detail">
            <p className="detail__desc">
                {props.description}
            </p>
            <p className="detail__value">
                {props.value}
            </p>
        </div>
    </If>
));
