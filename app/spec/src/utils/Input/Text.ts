import { cy } from '~cypress';

export const getInputByPlaceholder = (
    inputPlaceholder: string,
    value: string,
    eq = 0,
) => {
    cy.get(`input[placeholder="${inputPlaceholder}"]`).eq(eq).type(value)
    cy.get(`input[placeholder="${inputPlaceholder}"]`)
        .eq(eq)
        .should('contain.value', value)
};
