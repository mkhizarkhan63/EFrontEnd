import { beforeEach, describe, e2e, cy, xit as it } from '~cypress';

describe('Products and services section', () => {
    beforeEach(() => e2e.host());

    it('Fill company informations', () => {
        cy.visit('/company/register/2');
        cy.get('.side-bar-step-name').its(3).click();

        const input = {
            delivered: '453',
            atOnce: '765',
            largest: '53',
            experience: '65',
            perMeter: '432',
            perMeter2: '567',
            hasEverFailed: true,
            hasJudgements: false,
            website: 'www.website.com',
            instagram: 'www.instagram.com',
            linkedin: 'www.linekdin.com',
            twitter: 'www.twitter.com',
            other: 'www.other.com',
        };

        cy.get('.input-text-input').its(0).clear().type(input.delivered);
        cy.get('.input-text-input').its(1).clear().type(input.atOnce);
        cy.get('.input-text-input').its(2).clear().type(input.largest);
        cy.get('.input-text-input').its(3).clear().type(input.experience);
        cy.get('.input-text-input').its(4).clear().type(input.perMeter);
        cy.get('.input-text-input').its(5).clear().type(input.perMeter2);
        cy.get('.input-text-input').its(6).clear().type(input.website);
        cy.get('.input-text-input').its(7).clear().type(input.instagram);
        cy.get('.input-text-input').its(8).clear().type(input.linkedin);
        cy.get('.input-text-input').its(9).clear().type(input.twitter);
        cy.get('.input-text-input').its(10).clear().type(input.other);

        cy.get('.checkbox-radio-input').its(input.hasEverFailed ? 0 : 1).click();
        cy.get('.checkbox-radio-input').its(input.hasJudgements ? 2 : 3).click();

        cy.get('.btn--main').last().click();

        cy.reload();
        cy.get('.side-bar-step-name').its(3).click();

        cy.get('.input-text-input').its(0).should('have.value', input.delivered);
        cy.get('.input-text-input').its(1).should('have.value', input.atOnce);
        cy.get('.input-text-input').its(2).should('have.value', input.largest);
        cy.get('.input-text-input').its(3).should('have.value', input.experience);
        cy.get('.input-text-input').its(4).should('have.value', input.perMeter);
        cy.get('.input-text-input').its(5).should('have.value', input.perMeter2);
        cy.get('.input-text-input').its(6).should('have.value', input.website);
        cy.get('.input-text-input').its(7).should('have.value', input.instagram);
        cy.get('.input-text-input').its(8).should('have.value', input.linkedin);
        cy.get('.input-text-input').its(9).should('have.value', input.twitter);
        cy.get('.input-text-input').its(10).should('have.value', input.other);
        cy.get('.checkbox-radio-input').its(0).should(input.hasEverFailed ? 'be.checked' : 'not.be.checked');
        cy.get('.checkbox-radio-input').its(2).should(input.hasJudgements ? 'be.checked' : 'not.be.checked');
    });
});
