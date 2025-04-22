import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';
import { describe, it, cy, expect, mount } from '~cypress';
import { ModelList } from '~/bits';

type Person = {
    id: string;
    name: string;
    age: number;
    setName: (name: string) => void;
    setAge: (age: number) => void;
};

type PersonProps = {
    vm: Person;
    remove: () => void;
};

class Controller {
    i = 0;

    constructor() {
        makeAutoObservable(this);
    }

    remove = (id: string) => {
        this.listPerson = this.listPerson
            .filter(item => item.id !== id);
    };

    createPerson = (name: string, age: number): Person => ({
        id: `${this.i++}`,
        name,
        age,
        setName(newName: string) { this.name = newName; },
        setAge(newAge: number) { this.age = newAge || 0; },
    });

    listPerson = [
        this.createPerson('Dawid', 25),
        this.createPerson('Maciek', 29),
    ];
}

const PersonForm = observer((props: PersonProps) => (

    <div className="container">
        <span className="person-name">{props.vm.name}</span>
        <span className="person-age">{props.vm.age}</span>
        <input
            onChange={e => props.vm.setName(e.target.value)}
            value={props.vm.name}
        />
        <input
            onChange={e => props.vm.setAge(parseInt(e.target.value, 10))}
            value={props.vm.age}
        />
        <button name={props.vm.name} onClick={props.remove}>X</button>
    </div>
));

describe('bits/ModelList', () => {
    it('have to show list with itemRender', () => {
        const data = new Controller();

        mount(() => (
            <ModelList
                itemRender={PersonForm}
                modelsList={data.listPerson}
                onRemove={data.remove}
                context={{}}
            />
        ));

        cy.get('.container').should('have.length', 2);
    });

    it('have to add new item', () => {
        const data = new Controller();

        mount(() => (
            <ModelList
                itemRender={PersonForm}
                modelsList={data.listPerson}
                onRemove={data.remove}
                context={{}}
            />
        ));

        cy.wait(1000).then(() => {
            cy.log('Add John');

            data.listPerson.push(data.createPerson('John', 19));

            cy.get('.person-name').contains('John').should('be.visible');
        });

        cy.get('.container').should('have.length', 3);
    });

    it('have to change the name of item', () => {
        const data = new Controller();

        mount(() => (
            <ModelList
                itemRender={PersonForm}
                modelsList={data.listPerson}
                onRemove={data.remove}
                context={{}}
            />
        ));

        cy.log('Change Name');

        cy.wait(1000).then(() => {
            const personDawid = data.listPerson.find(person => person.name === 'Dawid');

            expect(personDawid).to.be.ok;

            if (personDawid) {
                personDawid.name = 'Wiktor';
            }

            cy.get('.person-name').contains('Wiktor').should('be.visible');
        });
    });

    it('have to remove item', () => {
        const data = new Controller();

        mount(() => (
            <ModelList
                itemRender={PersonForm}
                modelsList={data.listPerson}
                onRemove={data.remove}
                context={{}}
            />
        ));

        cy.log('Remove Dawid');

        cy.get('button[name="Dawid"]').click();

        cy.get('.person-name').contains('Dawid').should('not.exist');

        cy.get('.container').should('have.length', 1);
    });
});
