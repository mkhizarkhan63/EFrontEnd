import { makeAutoObservable } from 'mobx';
import { describe, it, cy, mount } from '~cypress';
import { If } from '~/bits';

class Controller {
    isOpen = true;

    text = 'xyz';

    constructor() {
        makeAutoObservable(this);
    }

    toggle = () => {
        this.isOpen = !this.isOpen;
    };
}

describe('bits/If', () => {
    it('have to change visible', () => {
        const data = new Controller();

        mount(() => (
            <If condition={data.isOpen}>
                <div>
                    {data.text}
                    <button onClick={data.toggle} />
                </div>
            </If>
        ));

        cy.contains(data.text).should('exist');

        cy.get('button').click();

        cy.contains(data.text).should('not.exist');
    });
});
