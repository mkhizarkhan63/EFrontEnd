import { describe, it, mount } from '~cypress';
import { Slider } from '~/bits';
import { Img } from '~/api';

describe('bits/Slider', () => {
    it('have to show list with itemRender and change slides', () => {
        const imageList = [
            {
                img: Img.empty(),
                id: '1',
                title: 'Title1',
                description: 'Desc1',
                alt: 'desc',
            },
            {
                img: Img.empty(),
                id: '2',
                title: 'Title2',
                description: 'Desc2',
                alt: 'desc',
            },
            {
                img: Img.empty(),
                id: '3',
                title: 'Title3',
                description: 'Desc3',
                alt: 'desc',
            },
        ];

        mount(() => <Slider list={imageList} />);

        cy.get('.slider__thumbnails').find('img').should('have.length', 3);
        cy.get('h2').should('contain', 'Title1');
        cy.get('p').should('contain', 'Desc1');

        imageList.forEach((slide, index) => {
            cy.get('.slider__thumbnails').find('img').eq(index).click();
            cy.get('h2').should('contain', slide.title);
            cy.get('p').should('contain', slide.description);
        });
    });
});
