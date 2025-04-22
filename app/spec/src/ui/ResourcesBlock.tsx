import { ResourcesBlock } from '~/bits';
import { describe, it, cy, mount } from '~cypress';

describe('bits/ResourcesBlock', () => {
    it('displays data correctly', () => {
        const data = [
            { name: 'Adam', value: 10 },
            { name: 'John', value: 20 },
            { name: 'Test', value: 350 },
        ];

        mount(() => <ResourcesBlock data={data} />);

        cy.get('.resources__header').should('contain', 'Resources');

        cy.get('.resources__item').should('have.length', 3);

        data.forEach((person, index) => {
            cy.get('.resources__value').eq(index).should('contain', person.value);
            cy.get('.resources__name').eq(index).should('contain', person.name);
        });
    });
});