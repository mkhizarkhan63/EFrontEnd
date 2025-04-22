import { cy } from '~cypress';

export const checkCheckboxByLabel = (checkboxLabel: string, eq = 0) => {
    cy.get('.checkbox-multiple')
        .eq(eq)
        .contains(checkboxLabel)
        .click()
        .find('input')
        .should('be.checked');
};

export const checkRadioByLabel = (radioLabel: string, eq = 0) => {
    cy.get('.checkbox-radio')
        .eq(eq)
        .contains(radioLabel)
        .click()
        .find('input')
        .should('be.checked');
};

export const checkMultipleRadioByLabel = (radioLabel: string, eq = 0) => {
    cy.get('.radio-multiple')
        .eq(eq)
        .contains(radioLabel)
        .click()
        .find('input')
        .should('be.checked');
};

