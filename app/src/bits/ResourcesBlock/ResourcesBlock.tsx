import { observer } from 'mobx-react';
import { lang } from '~/api';

type Props = {
    data: Array<{
        name: string;
        value: number;
    }>;
};

export const ResourcesBlock = observer((props: Props) => {
    const content = props.data
        .map((item, index) => (
            <div
                className="resources__item"
                key={`${item}-${index}`}
            >
                <p className="resources__value">
                    {item.value}
                </p>
                <p className="resources__name">
                    {item.name}
                </p>
            </div>
        ));
    return (
        <div className="resources">
            <p className="resources__header">
                {lang.dict.get('resources')}
            </p>
            <div className="resources__list">
                {content}
            </div>
        </div>
    );
});
