import { ContactDetail } from '~/bits';
import { cy, describe, it, mount } from '~cypress';

describe('bits/ContactDetails', () => {
    it('displays number', () => {
        mount(() => (
            <ContactDetail
                text="Test"
                phone={12345678}
            />
        ));

        cy.get('p').eq(0).should('contain', 'Client Detail');
        cy.get('p').eq(1).should('contain', 'Test');
        cy.get('p').eq(2).should('contain', '12345678');
    });
});