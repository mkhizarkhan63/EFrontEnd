import { makeAutoObservable } from 'mobx';
import { InputCounter } from '~/bits';
import { describe, it, cy, mount, expect } from '~cypress';

class Controller {
    num = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setNum = (value: number) => {
        this.num = value;
    };
}

describe('bits/InputCounter', () => {
    it('have to increase the value', () => {
        const data = new Controller();

        mount(() => (
            <InputCounter
                value={data.num}
                onChange={data.setNum}
            />
        ));

        cy.get('button').eq(1).click();
        cy.get('input').should('have.value', '1');
    });

    it('have to decrease the value', () => {
        const data = new Controller();

        mount(() => (
            <InputCounter
                value={data.num}
                onChange={value => data.setNum(value)}
            />
        ));

        cy.get('button').eq(0).click();
        cy.get('input').should('have.value', '-1');
    });

    it('have to be editable', () => {
        const data = new Controller();

        mount(() => (
            <InputCounter
                value={data.num}
                onChange={data.setNum}
            />
        ));

        cy.get('input')
            .type('77')
            .invoke('prop', 'value')
            .should('eq', '77');
    });

    it('have to parse string input into zero', () => {
        const data = new Controller();

        mount(() => (
            <InputCounter
                value={data.num}
                onChange={data.setNum}
            />
        ));

        cy.get('input')
            .type('fff')
            .invoke('prop', 'value')
            .should('eq', '0');
    });

    it('have to be equal to zero', () => {
        const data = new Controller();

        mount(() => (
            <InputCounter
                value={data.num}
                onChange={data.setNum}
            />
        ));

        cy.get('input')
            .invoke('prop', 'value')
            .should('eq', '0');
        expect(data.num).to.be.eq(0);
    });
});
