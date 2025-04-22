import { observer } from 'mobx-react';
import { lang } from '~/api';
import { If } from '~/bits';

type Highlighted = {
    value: string;
    toHighlight: string;
};

type Props = {
    title: string;
    count?: number;
    list: string[] | Highlighted[];
    headOffice?: string;
};

export const DetailList = observer((props: Props) => {
    const content = props.list.map((item, i) => {
        if (typeof item === 'string') {
            return (
                <li key={`${item}-${i}`}>
                    {item}
                </li>
            );
        }

        return (
            <li key={`${item.value}-${i}`}>
                {item.value}
                <span className="details-list__item-blue">
                    &nbsp;-&nbsp;
                    {item.toHighlight}
                </span>
            </li>
        );
    });

    return (
        <div className="details-list">
            <p className="details-list__header">
                {props.title}
                <If condition={() => Boolean(props.count)}>
                    <span className="optional-text">
                        {lang.dict.format('parentheses', [props.count])}
                    </span>
                </If>
            </p>
            <ul className="details-list__items">
                <If condition={() => Boolean(props.headOffice)}>
                    <li>
                        {props.headOffice}
                        <span className="details-list__item-blue">
                            &nbsp;-&nbsp;
                            {lang.dict.get('headOffice')}
                        </span>
                    </li>
                </If>
                {content}
            </ul>
        </div>
    );
});
