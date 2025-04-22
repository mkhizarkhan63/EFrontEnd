import { beforeEach, describe, e2e, cy, xit as it } from '~cypress';

describe('Products and services section', () => {
    beforeEach(() => e2e.host());

    it('Updates', () => {
        const firstInput = {
            name: 'name',
            phone: '312312312',
            location: 'location',
            value: '123',
            type: 'type',
        };

        const secondInput = {
            name: 'name',
            phone: '312312312',
            location: 'location',
            value: '345',
            type: 'type',
        };

        cy.visit('/company/register/2');
        cy.get('.side-bar-step-name').its(5).click();

        cy.get('.input-text-input').its(0).clear().type(firstInput.name);
        cy.get('.input-text-input').its(1).clear().type(firstInput.phone);
        cy.get('.input-text-input').its(2).clear().type(firstInput.location);
        cy.get('.input-text-input').its(3).clear().type(firstInput.value);
        cy.get('.input-text-input').its(4).clear().type(firstInput.type);

        cy.get('.input-text-input').its(5).clear().type(secondInput.name);
        cy.get('.input-text-input').its(6).clear().type(secondInput.phone);
        cy.get('.input-text-input').its(7).clear().type(secondInput.location);
        cy.get('.input-text-input').its(8).clear().type(secondInput.value);
        cy.get('.input-text-input').its(9).clear().type(secondInput.type);

        cy.get('.btn--main').last().click();
        cy.reload();
        cy.get('.side-bar-step-name').its(5).click();

        cy.get('.input-text-input').its(0).should('have.value', firstInput.name);
        cy.get('.input-text-input').its(1).should('have.value', firstInput.phone);
        cy.get('.input-text-input').its(2).should('have.value', firstInput.location);
        cy.get('.input-text-input').its(3).should('have.value', firstInput.value);
        cy.get('.input-text-input').its(4).should('have.value', firstInput.type);

        cy.get('.input-text-input').its(5).should('have.value', secondInput.name);
        cy.get('.input-text-input').its(6).should('have.value', secondInput.phone);
        cy.get('.input-text-input').its(7).should('have.value', secondInput.location);
        cy.get('.input-text-input').its(8).should('have.value', secondInput.value);
        cy.get('.input-text-input').its(9).should('have.value', secondInput.type);
    });
});
