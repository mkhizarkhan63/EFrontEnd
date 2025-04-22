import { describe, it, mount, cy } from '~cypress';
import { makeAutoObservable } from 'mobx';
import { Input } from '~/bits';
import { xRef } from '~/utils';

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

describe('bits/InputTextarea', () => {
    it('have to be editable', () => {
        const data = new Controller();
        const xref = xRef.connect(Input.Textarea);

        mount(() => (
            <Input.Textarea
                {...xref.props}
                name="TEXT AREA"
                onChange={data.handleChange}
                value={data.text}
            />
        ));

        const textToType = 'test editable';

        cy.getRef(xref, 'textarea')
            .type(textToType)
            .find('textarea')
            .should('have.value', textToType);
    });

    it('have to be editable with validation', () => {
        const data = new Controller();
        const xref = xRef.connect(Input.Textarea);

        mount(() => (
            <Input.Textarea
                {...xref.props}
                name="TEXT AREA"
                onChange={data.handleChange}
                error={data.error}
                value={data.text}
            />
        ));

        const textToType = 'test validation';

        cy.getRef(xref, 'textarea').type(textToType);
        cy.get('span').contains('Enter correct value').should('exist');
    });

    it('have to be readonly', () => {
        const data = new Controller();
        const xref = xRef.connect(Input.Textarea);

        mount(() => (
            <Input.Textarea
                {...xref.props}
                name="TEXT AREA"
                onChange={data.handleChange}
                isDisabled={true}
                value={data.text}
            />
        ));

        cy.getRef(xref, 'textarea').find('textarea').invoke('attr', 'data-is-disabled').should('eq', 'true');
    });
});
