import { DetailList } from '~/bits';
import { describe, it, mount, cy } from '~cypress';

describe('bits/DetailList', () => {
    it('displays correctly', () => {
        mount(() => (
            <DetailList
                title='Detail'
                headOffice='Warsaw'
                list={['first', 'second', 'third']}
            />
        ));

        cy.get('.details-list__header').should('contain', 'Detail');

        cy.get('li').should('have.length', 4);
        cy.get('li').eq(0).should('contain', 'Warsaw');
        cy.get('li').eq(0).find('span').should('contain', 'Head Office');
        cy.get('li').eq(1).should('contain', 'first');
        cy.get('li').eq(2).should('contain', 'second');
        cy.get('li').eq(3).should('contain', 'third');
    });
});