import { describe, it, cy, mount } from '~cypress';
import { makeAutoObservable } from 'mobx';
import { Input } from '~/bits';

class Controller {
    values: string[] = [];

    value = '';

    constructor() {
        makeAutoObservable(this);
    }

    change = (value: string) => {
        this.value = value;
    };

    add = () => {
        this.values.push(this.value);
        this.value = '';
    };

    delete = (value: string) => {
        this.values = this.values.filter(item => item !== value);
    };
}

describe('bits/Input/InputArrayStrings', () => {
    it('add and delete strings from Input Array', () => {
        const data = new Controller();

        mount(() => (
            <Input.ArrayStrings
                onChange={data.change}
                value={data.value}
                listValues={data.values}
                deleteItem={data.delete}
                addItem={data.add}
            />
        ));

        cy.get('input').type('TeSt!1');
        cy.get('[data-role="add-value"]').click();

        cy.get('input').type('TeSt!2');
        cy.get('[data-role="add-value"]').click();

        cy.get('input').type('TeSt!3');
        cy.get('[data-role="add-value"]').click();

        cy.get('input').type('TeSt!4');
        cy.get('[data-role="add-value"]').click();

        cy.get('.input-array-results-row').eq(0).should('contain', 'TeSt!1');
        cy.get('.input-array-results-row').eq(1).should('contain', 'TeSt!2');
        cy.get('.input-array-results-row').eq(2).should('contain', 'TeSt!3');
        cy.get('.input-array-results-row').eq(3).should('contain', 'TeSt!4');

        cy.get('.icon-box').eq(3).click();
        cy.contains('TeSt!3').should('not.exist');
        cy.get('.input-array-results-row').should('have.length', 3);

        cy.get('.icon-box').eq(1).click();
        cy.contains('TeSt!1').should('not.exist');
        cy.get('.input-array-results-row').should('have.length', 2);

        cy.get('.icon-box').eq(1).click();
        cy.contains('TeSt!2').should('not.exist');
        cy.get('.input-array-results-row').should('have.length', 1);

        cy.get('.icon-box').eq(1).click();
        cy.get('.input-array-results-row').should('not.exist');
    });
});
