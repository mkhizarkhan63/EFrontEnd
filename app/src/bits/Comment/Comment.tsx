import type moment from 'moment';
import { observer } from 'mobx-react';
import { type Img } from '~/api';
import { Stars } from '~/bits';

type Props<Key extends string> = {
    name: string;
    labels: Record<Key, string>;
    values: Array<{ key: Key; value: number }>;
    date?: moment.Moment;
    text?: string;
    avatar: Img;
};

export const Comment = observer(<Key extends string>(props: Props<Key>) => {
    const text = props.text
        ? (
            <p className="comment-box__text">
                {props.text}
            </p>
        )
        : null;

    const acronym = props.name
        .trimStart()
        .split(/\s/)
        .slice(0, 2)
        .reduce((response, word) => response + word.slice(0, 1), '');

    const altAvatar = (
        <div>
            {acronym}
        </div>
    );

    return (
        <div className="comment-box">
            <div className="comment-box__info">
                <div className="comment-box__avatar">
                    {altAvatar}
                </div>
                <div className="comment-box__data">
                    <h2 className="comment-box__name">
                        {props.name}
                    </h2>
                    <div className="stars-container">
                        <Stars labels={props.labels} values={props.values} />
                        <span className="comment-box__time">
                            {props.date?.format('DD MMM YYYY')}
                        </span>
                    </div>
                </div>
            </div>
            {text}
        </div>
    );
});
