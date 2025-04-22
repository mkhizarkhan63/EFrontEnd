import { beforeEach, describe, e2e, cy, it } from '~cypress';

describe('Open home page', () => {
    beforeEach(() => e2e.host());

    it('Without errors', () => {
        cy.visit('/', {
            onBeforeLoad: win => {
                cy.spy(win.console, 'error').as('consoleError');
            },
        });
        cy.get('@consoleError').should('not.be.called');
    });
});