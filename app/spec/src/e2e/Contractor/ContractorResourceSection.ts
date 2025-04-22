import { beforeEach, describe, e2e, cy, xit as it } from '~cypress';

describe('Products and services section', () => {
    beforeEach(() => e2e.host());

    it('Fill primitive informations', () => {
        cy.visit('/company/register/2');
        cy.get('.side-bar-step-name').its(4).click();

        const input = {
            measures: 'measures',
            software: {
                bank: true,
                board: false,
                pdo: true,
                other: 'other',
            },
            company: {
                name: 'name',
                crNumber: 'number',
                manPower: '23',
                provide: 'provide',
            },
            resources: {
                engineers: '12',
                labors: '45',
                admins: '9',
            }
        }

        cy.get('.textarea__input').its(0).clear().type(input.measures);
        cy.get('.checkbox-multiple-input').its(0).setCheck(input.software.bank);
        cy.get('.checkbox-multiple-input').its(1).setCheck(input.software.board);
        cy.get('.checkbox-multiple-input').its(2).setCheck(input.software.pdo);
        cy.get('.checkbox-multiple-input').its(3).check();
        cy.get('.textarea__input').its(1).clear().type(input.software.other);

        cy.get('.input-text-input').its(0).clear().type(input.company.name);
        cy.get('.input-text-input').its(1).clear().type(input.company.crNumber);
        cy.get('.input-text-input').its(2).clear().type(input.company.manPower);
        cy.get('.input-text-input').its(3).clear().type(input.company.provide);

        cy.get('.input-text-input').its(5).clear().type(input.resources.engineers);
        cy.get('.input-text-input').its(7).clear().type(input.resources.labors);
        cy.get('.input-text-input').its(9).clear().type(input.resources.admins);

        cy.get('.btn--main').last().click();
        cy.reload();
        cy.get('.side-bar-step-name').its(4).click();

        cy.get('.textarea__input').its(0).should('have.value', input.measures);
        cy.get('.checkbox-multiple-input').its(0).should(input.software.bank ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(1).should(input.software.board ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(2).should(input.software.pdo ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(3).should('be.checked');
        cy.get('.textarea__input').its(1).should('have.value', input.software.other);

        cy.get('.input-text-input').its(0).should('have.value', input.company.name);
        cy.get('.input-text-input').its(1).should('have.value', input.company.crNumber);
        cy.get('.input-text-input').its(2).should('have.value', input.company.manPower);
        cy.get('.input-text-input').its(3).should('have.value', input.company.provide);

        cy.get('.input-text-input').its(5).should('have.value', input.resources.engineers);
        cy.get('.input-text-input').its(7).should('have.value', input.resources.labors);
        cy.get('.input-text-input').its(9).should('have.value', input.resources.admins);
    });
});
