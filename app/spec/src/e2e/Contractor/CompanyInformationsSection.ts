import { beforeEach, describe, e2e, cy, xit as it } from '~cypress';

describe('Products and services section', () => {
    beforeEach(() => e2e.host());

    it('Fill company informations', () => {
        cy.visit('/company/register/2');
        cy.get('.side-bar-step-name').its(1).click();

        const input = {
            name: 'name',
            address: 'address',
            email: 'email@gmail.com',
            phone: '1324324563',
            crNumber: '123345',
            projectSize: '12',
            organizations: {
                bank: true,
                board: false,
                pdo: true,
                others: false,
            },
            governorate: {
                nth1: true,
                nth2: false,
                nth3: false,
                nth4: false,
            },
        }

        cy.get('.input-text-input').its(0).clear().type(input.name);
        cy.get('.input-text-input').its(1).clear().type(input.address);
        cy.get('.input-text-input').its(2).clear().type(input.email);
        cy.get('.input-text-input').its(3).clear().type(input.phone);
        cy.get('.input-text-input').its(5).clear().type(input.crNumber);
        cy.get('.input-text-input').its(6).clear().type(input.projectSize);
        cy.get('.checkbox-multiple-input').its(0).setCheck(input.organizations.bank);
        cy.get('.checkbox-multiple-input').its(1).setCheck(input.organizations.board);
        cy.get('.checkbox-multiple-input').its(2).setCheck(input.organizations.pdo);
        cy.get('.checkbox-multiple-input').its(3).setCheck(input.organizations.others);
        cy.get('.checkbox-multiple-input').its(4).setCheck(input.governorate.nth1);
        cy.get('.checkbox-multiple-input').its(5).setCheck(input.governorate.nth2);
        cy.get('.checkbox-multiple-input').its(6).setCheck(input.governorate.nth3);
        cy.get('.checkbox-multiple-input').its(7).setCheck(input.governorate.nth4);

        cy.get('.btn--main').last().click();
        cy.reload();
        cy.get('.side-bar-step-name').its(1).click();

        cy.get('.input-text-input').its(0).should('have.value', input.name);
        cy.get('.input-text-input').its(1).should('have.value', input.address);
        cy.get('.input-text-input').its(2).should('have.value', input.email);
        cy.get('.input-text-input').its(3).should('have.value', input.phone);
        cy.get('.input-text-input').its(5).should('have.value', input.crNumber);
        cy.get('.input-text-input').its(6).should('have.value', input.projectSize);
        cy.get('.checkbox-multiple-input').its(0).should(input.organizations.bank ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(1).should(input.organizations.board ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(2).should(input.organizations.pdo ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(3).should(input.organizations.others ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(4).should(input.governorate.nth1 ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(5).should(input.governorate.nth2 ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(6).should(input.governorate.nth3 ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-multiple-input').its(7).should(input.governorate.nth4 ? 'be.checked' : 'not.be.checked');
    });
});
