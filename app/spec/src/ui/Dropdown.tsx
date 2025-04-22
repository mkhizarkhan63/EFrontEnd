import { Dropdown } from '~/bits';
import { DropdownViewModel } from '~/bits/Dropdown/Dropdown.vm';
import { describe, it, mount, cy } from '~cypress';

describe('bits/Dropdown', () => {
    it('show and hide content correctly', () => {
        const model = new DropdownViewModel();
        const Content = () => <div>Hello!</div>

        mount(() => (
            <Dropdown
                content={() => <Content />}
                viewModel={model}
                hideTick={true}
            >
                <div>Click</div>
            </Dropdown>
        ));

        cy.get('.dropped').should('not.exist');
        cy.contains('Click').click();
        cy.get('.dropped').should('contain', 'Hello!')
        cy.contains('Click').click();
        cy.get('.dropped').should('not.exist');
        cy.contains('Click').click();
        cy.get('body').click(200, 200);
        cy.get('.dropped').should('not.exist');

        cy.get('.tick').should('not.be.visible');
    });
});