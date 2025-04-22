import { describe, it, mount, cy } from '~cypress';
import { PageLayout21 } from '~/partials';

describe('partials/PageLayout21', () => {
    it('display content and children', () => {

        const Content = () => <div>TEST 123</div>;

        mount(() => (
            <PageLayout21 content={Content}>
                <div>Details</div>
            </PageLayout21>
        ));

        cy.contains('TEST 123').should('be.visible');
        cy.contains('Details').should('be.visible');
    });

});
