import { observer } from 'mobx-react';
import moment from 'moment';
import { lang, type Img } from '~/api';

type Props = {
    news: Array<{
        id: number;
        img: Img;
        title: string;
        url: string;
        date: moment.Moment;
    }>;
};

export const News = observer(({ news }: Props) => {
    const boxNews = news.map(item => (
        <div className="sidebar__latest-news" key={item.id}>
            <a href={item.url} >
                <img
                    src={item.img.url}
                    alt={item.title}
                    className="sidebar__latest-news-img"
                />
            </a>
            <p className="sidebar__latest-news-title">
                {item.title}
            </p>
            <p className="sidebar__latest-news-date">
                {moment(item.date).format('ll')}
            </p>
        </div>
    ));
    return (
        <div className="sidebar__latest-news-container">
            <h3 className="sidebar__title">
                {lang.dict.get('latestNews')}
            </h3>
            {boxNews}
        </div>
    );
});
