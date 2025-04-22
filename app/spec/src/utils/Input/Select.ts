import { cy } from '~cypress';

export const selectFromDropdown = (
    optionName: string,
    eq = 0
) => {
    cy.get('.input-text--select').eq(eq).click();
    cy.get('.input-text__option--dropdown').contains(optionName).click();
    cy.get('.input-text--select').eq(eq).within(() => {
        cy.get('.input-text__option')
            .should('contain', optionName);
    });
};