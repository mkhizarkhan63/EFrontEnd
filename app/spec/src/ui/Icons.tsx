import { describe, it, mount, cy } from '~cypress';
import { Button } from '~/bits';

describe('bits/Icons', () => {
    it('button has to has icon', () => {
        mount(() => <Button color="blue" value="Icon test" leftImg="example-icon" />);

        cy.get('image').should('exist');
    });
});
