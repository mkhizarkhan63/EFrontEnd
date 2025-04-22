import { describe, it, mount, cy } from '~cypress';
import { makeAutoObservable } from 'mobx';
import { Input } from '~/bits';

class Controller {
    text = '';

    error = '';

    constructor() {
        makeAutoObservable(this);
    }

    handleChange = (inputValue: string) => {
        this.text = inputValue;

        if (inputValue === 'test validation') {
            this.error = 'Enter correct value';
        }
    };
}

describe('bits/Input/InputText', () => {
    it('have to be editable', () => {
        const data = new Controller();

        mount(() => (
            <Input.Text
                onChange={value => data.handleChange(value)}
                value={data.text}
            />
        ));

        const textToType = 'test editable';

        cy.get('input').type(textToType);

        cy.get('input').eq(0).invoke('prop', 'value').should('eq', textToType);
    });

    it('have to be editable with validation', () => {
        const data = new Controller();

        mount(() => (
            <Input.Text
                onChange={data.handleChange}
                error={data.error}
                value={data.text}
            />
        ));

        cy.get('input').type('test validation');

        cy.get('span').contains('Enter correct value').should('exist');
    });

    it('have to be readonly', () => {
        const data = new Controller();

        mount(() => (
            <Input.Text
                onChange={data.handleChange}
                isDisabled={true}
                value={data.text}
            />
        ));

        cy.get('input').eq(0).invoke('prop', 'disabled').should('eq', true);
    });
});
