import { observer } from 'mobx-react';
import { If } from '~/bits';

type Props = {
    imageSrc: string;
    imageAlt: string;
    description?: string;
    value?: string;
};

export const ImageDetail = observer((props: Props) => (
    <If condition={Boolean(props.description && props.value)}>
        <div className="image-detail">
            <img
                src={props.imageSrc}
                alt={props.imageAlt}
                className="image-detail__img"
            />
            <div className="image-detail__desc">
                <p className="image-detail__title">
                    {props.description}
                </p>
                <p className="image-detail__value">
                    {props.value}
                </p>
            </div>
        </div>
    </If>
));
