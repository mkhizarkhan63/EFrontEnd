import { describe, it, mount, cy } from '~cypress';
import { makeAutoObservable } from 'mobx';
import { Input } from '~/bits';

class Controller {
    hasBeenChecked = [
        { id: '1', name: 'test 1', value: false },
        { id: '2', name: 'test 2', value: false },
        { id: '3', name: 'test 3', value: false },
        { id: '4', name: 'test 4', value: false },
        { id: '5', name: 'test 5', value: false },
    ];

    constructor() {
        makeAutoObservable(this);
    }

    handleClick = (id: string, value: boolean) => {
        this.hasBeenChecked = this.hasBeenChecked.map(item => {
            if (item.id !== id) {
                return item;
            }
            return { ...item, value };
        });
        return (
            this.hasBeenChecked, this.handleClick
        );
    };
}

describe('bits/InputCheckboxMultiple', () => {
    it('have to be clickable', () => {
        const data = new Controller();

        mount(() => (
            <Input.Multiple
                onChange={(id, value) => data.handleClick(id, value)}
                values={data.hasBeenChecked}
            />
        ));

        cy.get('span').eq(0).click();

        cy.get('input').eq(0).invoke('prop', 'checked').should('eq', true);
    });

    it('have to be disabled', () => {
        const data = new Controller();

        mount(() => (
            <Input.Multiple
                onChange={(id, value) => data.handleClick(id, value)}
                isDisabled={true}
                values={data.hasBeenChecked}
            />
        ));

        cy.get('input').invoke('prop', 'disabled').should('eq', true);
    });
});
