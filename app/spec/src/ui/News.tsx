import moment from 'moment';
import { Img } from '~/api';
import { News } from '~/bits';
import { describe, it, mount, cy } from '~cypress';

describe('bits/News', () => {
    it('should correctly display news', () => {
        const news = [
            {
                id: 1,
                img: Img.empty(),
                title: 'news1',
                url: 'url1',
                date: moment()
            },
            {
                id: 2,
                img: Img.empty(),
                title: 'news2',
                url: 'url2',
                date: moment()
            },
            {
                id: 3,
                img: Img.empty(),
                title: 'news3',
                url: 'url3',
                date: moment()
            },
        ];

        mount(() => <News news={news} />);

        cy.get('.sidebar__title').should('contain', 'Latest News');
        cy.get('.sidebar__latest-news').should('have.length', '3');

        news.forEach(news => {
            cy.get(`a[href="${news.url}"]`).should('exist');
            cy.get(`img[src="${news.img.url}"]`).should('exist');
            cy.get('.sidebar__latest-news-title').eq(news.id - 1).should('contain', news.title);
            cy.get('.sidebar__latest-news-date').eq(news.id - 1).should('contain', moment().format('ll'));
        });
    });
});