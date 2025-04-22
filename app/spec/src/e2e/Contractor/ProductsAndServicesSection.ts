import { beforeEach, describe, e2e, cy, xit as it } from '~cypress';

describe('Products and services section', () => {
    beforeEach(() => e2e.host());

    it('Updates', () => {
        const input = {
            service1: true,
            service2: true,
            service3: true,
            service4: true,
            otherService: 'other service',
            product1: false,
            product2: false,
            product3: false,
            product4: false,
            otherProduct: 'other product',
        };

        cy.visit('/company/register/2');
        cy.get('.side-bar-step-name').its(2).click();

        cy.get('.checkbox-multiple-input').its(0).setCheck(input.service1);
        cy.get('.checkbox-multiple-input').its(1).setCheck(input.service2);
        cy.get('.checkbox-multiple-input').its(2).setCheck(input.service3);
        cy.get('.checkbox-multiple-input').its(3).setCheck(input.service4);
        cy.get('.input-array-input-text').its(0).type(input.otherService);
        cy.get('.checkbox-multiple-input').its(15).setCheck(input.product1);
        cy.get('.checkbox-multiple-input').its(16).setCheck(input.product2);
        cy.get('.checkbox-multiple-input').its(17).setCheck(input.product3);
        cy.get('.checkbox-multiple-input').its(18).setCheck(input.product4);
        cy.get('.input-array-input-text').its(1).type(input.otherProduct);

        cy.get('.btn--main').last().click();
        cy.reload();
        cy.get('.side-bar-step-name').its(2).click();

        cy.get('.checkbox-multiple-input').its(0).should(input.service1 ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(1).should(input.service2 ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(2).should(input.service3 ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(3).should(input.service4 ? 'be.checked' : 'not.be.checked');
        cy.get('.input-array-input-text').its(0).should('have.value', input.otherService);
        cy.get('.checkbox-multiple-input').its(15).should(input.product1 ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(16).should(input.product2 ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(17).should(input.product3 ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(18).should(input.product4 ? 'be.checked' : 'not.be.checked');
        cy.get('.input-array-input-text').its(1).should('have.value', input.otherProduct);
    });
});
