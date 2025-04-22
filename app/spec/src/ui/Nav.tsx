import { describe, it, mount, cy } from '~cypress';
import { Nav } from '~/partials';

describe('partials/Nav', () => {
    xit('have to change language && change data-is-open *moved to phase2*', () => {
        mount(() => <Nav />);

        cy.get('.tick').eq(0)
            .should('have.attr', 'data-is-open', 'false');

        cy.get('li').eq(1).click();

        cy.get('.tick').eq(0)
            .should('have.attr', 'data-is-open', 'true');

        cy.get('.current-language')
            .then($li => {
                const currentLanguage = $li.text();

                cy.get('li').eq(1).find('a').click();

                cy.get('.current-language')
                    .should('not.have.text', `${currentLanguage}`);
            });

        cy.get('li').eq(1).click();

        cy.get('.tick').eq(0)
            .should('have.attr', 'data-is-open', 'false');

        cy.get('li').eq(1).click();

        cy.get('header').click();

        cy.get('.tick').eq(0)
            .should('have.attr', 'data-is-open', 'false');
    });

    it('have to open help modal && change data-is-open', () => {
        cy.reload();

        mount(() => <Nav />);

        cy.get('.tick').eq(0)
            .should('have.attr', 'data-is-open', 'false');

        cy.get('li').eq(1).click();

        cy.get('.tick').eq(0)
            .should('have.attr', 'data-is-open', 'true');

        cy.get('.help').should('be.visible');

        cy.get('.close').click();

        cy.get('.tick').eq(0)
            .should('have.attr', 'data-is-open', 'false');

        cy.get('.help').should('not.exist');
    });

    it('have to open notifications modal && change data-is-open', () => {
        cy.reload();

        mount(() => <Nav />);

        cy.get('.tick').eq(1)
            .should('have.attr', 'data-is-open', 'false');

        cy.get('li').eq(2).click();

        cy.get('.notifications').should('exist');

        cy.get('.tick').eq(1)
            .should('have.attr', 'data-is-open', 'true');

        cy.get('li').eq(2).click();

        cy.get('.tick').eq(1)
            .should('have.attr', 'data-is-open', 'false');

        cy.get('.notifications').should('not.exist');

        cy.get('li').eq(2).click();

        cy.get('.notifications').should('exist');

        cy.get('header').click();

        cy.get('.notifications').should('not.exist');

        cy.get('.tick').eq(1)
            .should('have.attr', 'data-is-open', 'false');
    });

    it('have to open avatar modal && change data-is-open', () => {
        cy.reload();

        mount(() => <Nav />);

        cy.get('.tick').eq(2)
            .should('have.attr', 'data-is-open', 'false');

        cy.get('li').eq(3).click();

        cy.get('.profile').should('exist');

        cy.get('.tick').eq(2)
            .should('have.attr', 'data-is-open', 'true');

        cy.get('li').eq(3).click();

        cy.get('.tick').eq(2)
            .should('have.attr', 'data-is-open', 'false');

        cy.get('.profile').should('not.exist');

        cy.get('li').eq(3).click();

        cy.get('.profile').should('exist');

        cy.get('header').click();

        cy.get('.profile').should('not.exist');

        cy.get('.tick').eq(2)
            .should('have.attr', 'data-is-open', 'false');
    });
});
