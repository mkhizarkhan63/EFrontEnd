import type moment from 'moment';
import { lang } from '~/api';
import { If } from '../If';

type Props = {
    entries: Entry[];
    isHideCount?: boolean;
};

type Entry = {
    id: number;
    text: string;
    date: moment.Moment;
    renderAuthor: () => JSX.Element;
    user: string;
};

export const LogEntries = (props: Props) => {
    const { entries, isHideCount } = props;

    const items = entries.map(entry => (
        <div
            key={entry.id}
            className="log-entry"
        >
            <p className="log-entry__text">
                {entry.renderAuthor()}
                {entry.text}
            </p>
            <p className="log-entry__date">
                {entry.user}
            </p>
            <p className="log-entry__date">
                {entry.date.format('DD/MM/YYYY LT')}
            </p>
        </div>
    ));

    return (
        <div className="log-list">
            <If condition={() => !isHideCount}>
                <p className="log-list__title">
                    {lang.dict.get('log')} ({entries.length})
                </p>
            </If>
            {items}
        </div>
    );
};
