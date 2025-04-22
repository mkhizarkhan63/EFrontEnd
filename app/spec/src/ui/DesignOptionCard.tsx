import { Img } from '~/api';
import { DesignOptionCard } from '~/bits';
import { DesignOption } from '~/models';
import { describe, it, mount, cy, expect } from '~cypress';

const getDesignOption = () => DesignOption.create({
    id: 1,
    consultantId: 1,
    title: 'Title',
    companyAvatar: Img.empty(),
    companyName: 'Company',
    bedrooms: 1,
    toilets: 2,
    builtUpArea: 100,
    designPrice: 1000,
    estimatedConstructionPrice: 10000,
    sliderImgs: [
        {
            id: 'first',
            img: new Img('/assets/graphics/static-home-1.jpg'),
        },
        {
            id: 'second',
            img: new Img('/assets/graphics/static-home-2.jpg'),
        },
    ],
});

describe('bits/DesignOptionCard', () => {
    it('displays correctly', () => {
        const props = getDesignOption();

        mount(() => <DesignOptionCard data={props} />);

        cy.get('.slider__selected-img').find('img').should('exist');

        cy.get('.design-card__title').should('contain', 'Title');
        cy.get('.design-card__company').find('img').should('exist');
        cy.get('.design-card__company').contains('Company').should('exist');

        cy.get('.design-card__col-title').eq(0).should('contain', 'Built up Area');
        cy.get('.design-card__col-amount').eq(0).should('contain', '100 m²');
        cy.get('.design-card__col-title').eq(1).should('contain', 'Bedroom');
        cy.get('.design-card__col-amount').eq(1).should('contain', '1');
        cy.get('.design-card__col-title').eq(2).should('contain', 'Toilets');
        cy.get('.design-card__col-amount').eq(2).should('contain', '2');

        cy.get('.design-card__price-title').eq(0).should('contain', 'Estimated Construction Price');
        cy.get('.design-card__design-price').should('contain', '10,000 OMR');
        cy.get('.design-card__price-title').eq(1).should('contain', 'Design Price');
        cy.get('.design-card__estimated-price').should('contain', '1,000 OMR');
    });

    it('is clickable', () => {
        const props = getDesignOption();

        let likeHasBeenClicked = false;
        let companyHasBeenClicked = false;

        mount(() => (
            <DesignOptionCard
                data={props}
                openCompanyProfile={() => { companyHasBeenClicked = true; }}
                onLikeClick={() => { likeHasBeenClicked = true; }}
            />
        ));

        cy.get('button').eq(0).click();
        cy.get('img[alt="second"]').should('exist');
        cy.get('button').eq(1).click();
        cy.get('img[alt="first"]').should('exist');

        cy.contains('Company').click().then(() =>
            expect(companyHasBeenClicked).eq(true)
        );

        cy.get('div[data-icon-name="like"]').click().then(() =>
            expect(likeHasBeenClicked).eq(true)
        );

        cy.get('.design-card__row--icons').find('button').click();
        cy.get('.design-levels').should('exist');
    });
});
