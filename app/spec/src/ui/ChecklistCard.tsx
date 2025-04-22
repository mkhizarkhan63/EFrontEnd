import { ChecklistCard } from "~/bits";
import { describe, it, mount, cy } from '~cypress';

describe('bits/Card/ChecklistCard', () => {
    it('displays correctly', () => {
        mount(() => (
            <ChecklistCard
                title="Title"
                subtitle="subtitle"
                picture="loan"
                by="testbank"
                buttonName="Button"
                byLogo="bank"
                checklist={['checklist1', 'checklist2', 'checklist3']}
            />
        ));

        cy.get('.title').should('contain', 'Title');
        cy.get('.subtitle').should('contain', 'subtitle');

        cy.get('.feature').should('have.length', 3);
        cy.get('.feature').eq(0).should('contain', 'checklist1');
        cy.get('.feature').eq(1).should('contain', 'checklist2');
        cy.get('.feature').eq(2).should('contain', 'checklist3');

        cy.get('div[data-picture="loan"]').should('exist');

        cy.get('.bottom__text').should('contain', 'testbank');
        cy.get('div[data-logo="bank"]').should('exist');

        cy.get('button').should('be.visible');
    });
});
