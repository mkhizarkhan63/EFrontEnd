import { makeAutoObservable } from 'mobx';
import { describe, it, mount, cy } from '~cypress';
import { Input } from '~/bits';

class Controller {
    Component = (props: number) => <span>TEST {props}</span>;

    values = [
        { value: '0', name: () => this.Component(0) },
        { value: '1', name: () => this.Component(1) },
        { value: '2', name: () => this.Component(2) },
        { value: '3', name: () => this.Component(3) },
    ];

    selectValue = '0';

    error = 'Test error';

    handleChange = (value: string) => {
        this.selectValue = value;
    };

    constructor() {
        makeAutoObservable(this);
    }
}

describe('bits/InputSelect', () => {
    it('select test', () => {
        const data = new Controller();

        mount(() => (
            <Input.Select
                onChange={data.handleChange}
                value={data.selectValue}
                values={data.values}
            />
        ));

        cy.contains('TEST 0').should('exist');

        cy.get('[data-role="input-text"]').click();

        cy.contains('TEST 2').click();

        cy.contains('TEST 0').should('not.exist');

        cy.contains('TEST 2').should('exist');

    });

    it('select is error', () => {
        const data = new Controller();

        mount(() => (
            <Input.Select
                onChange={data.handleChange}
                error={data.error}
                value={data.selectValue}
                values={data.values}
            />
        ));

        cy.get('[data-is-error]').should('exist');
        cy.contains('Test error').should('exist');

    });

    it('close after click', () => {
        const data = new Controller();

        mount(() => (
            <Input.Select
                onChange={data.handleChange}
                value={data.selectValue}
                values={data.values}
            />
        ));

        cy.contains('TEST 0').click();

        data.values.forEach(item => {
            cy.contains(`TEST ${item.value}`).should('exist');
        });

        cy.contains('TEST 3').click();

        data.values.forEach(item => {
            item.value === '3'
                ? cy.contains('TEST 3').should('exist')
                : cy.contains(`TEST ${item.value}`).should('not.exist');
        });
    });
});
