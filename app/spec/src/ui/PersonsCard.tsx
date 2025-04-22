import { PersonsCard } from '~/bits';
import { E, Img, lang } from '~/api';
import { describe, xit as it, mount } from '~cypress';

describe('bits/PersonsCard', () => {
    it('displays correctly', () => {
        const persons = [
            {
                name: 'John',
                role: E.ArchitectAndEngineersRole.architect,
                avatar: Img.empty()
            },
            {
                name: 'Adam',
                role: E.ArchitectAndEngineersRole.employeeManager,
                avatar: Img.empty()
            },
            {
                name: 'Test',
                role: E.ArchitectAndEngineersRole.siteEngineer,
                avatar: Img.empty()
            },
        ];

        mount(() => <PersonsCard persons={persons} />);

        cy.get('.engineers__item').should('have.length', 3);
        cy.get('.engineers__title-num').should('contain', '(3)');
        cy.get('.engineers__title').should('contain', 'Architects & Engineers');

        persons.forEach((person, index) => {
            cy.get(`img[src="${person.avatar.url}"]`).should('exist');
            cy.get('.engineers__item-name').eq(index).should('contain', person.name);
            cy.get('.engineers__item-role').eq(index)
                .should('contain', lang.dict.enum('consultantArchitectRole', person.role));
        });
    });
});