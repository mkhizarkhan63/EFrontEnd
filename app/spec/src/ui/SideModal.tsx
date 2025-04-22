import { makeAutoObservable } from 'mobx';
import { If, SideModal } from '~/bits';
import { describe, it, mount, cy } from '~cypress';

class Controller {
    isOpen = false;

    constructor() {
        makeAutoObservable(this);
    }

    open = () => {
        this.isOpen = true;
    }

    close = () => {
        this.isOpen = false;
    }
}

describe('bits/SideModal', () => {
    it('open and close correctly', () => {
        const controller = new Controller();

        mount(() => (
            <>
                <If condition={() => controller.isOpen}>
                    <SideModal
                        onBlur={controller.close}
                        variant="variant"
                    >
                        Hello!
                    </SideModal>
                </If>
                <button onClick={controller.open}>Button</button>
            </>
        ));

        cy.get('div[data-variant="variant"]').should('not.exist');
        cy.contains('Button').click();
        cy.get('div[data-variant="variant"]').should('contain', 'Hello!');

        cy.get('body').click(0, 0).then(() => {
            cy.get('div[data-variant="variant"]').should('not.exist');
        });
    });
});