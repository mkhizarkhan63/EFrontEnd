import { observable } from 'mobx';
import { describe, it, mount, cy, expect } from '~cypress';
import { Input } from '~/bits';

const DATA_LIST = Object.freeze([
    {
        textValue: 'Polska',
        value: {
            lcName: 'polska',
            nameLength: 6,
        },
    },
    {
        textValue: 'Niemcy',
        value: {
            lcName: 'niemcy',
            nameLength: 6,
        },
    },
    {
        textValue: 'Peru',
        value: {
            lcName: 'peru',
            nameLength: 4,
        },
    },
]);

const INVALID_NAME = '0123';

const noop = () => { /**/ };

const modelsData = () => {
    const data = observable({
        models: Array.from(DATA_LIST),
        actualValue: '',
        nameLength: undefined as number | undefined,
        change: (text: string, obj?: { nameLength: number }) => {
            data.actualValue = text;
            data.nameLength = obj
                ? obj.nameLength
                : undefined;
        },
    });
    return data;
};

describe('bits/SearchBox', () => {
    it('have to show on focus whole list ', () => {
        const dataList = modelsData();

        mount(() => (
            <Input.SearchBox
                options={dataList.models}
                textValue={dataList.actualValue}
                onChange={dataList.change}
                id="search-box"
            />
        ));

        cy.get('#search-box').click();

        cy.get('ul').should('be.visible');

        cy.get('li').should('have.length', 3);
    });

    it('have to manipulate with arrowDown and enter keys ', () => {
        const dataList = modelsData();

        mount(() => (
            <Input.SearchBox
                options={dataList.models}
                textValue={dataList.actualValue}
                onChange={dataList.change}
                id="search-box"
            />
        ));

        cy.get('#search-box').click();

        cy.get('#search-box').type('{downarrow}');

        cy.get('#search-box').type('{enter}');

        cy.get('#search-box').should('have.value', 'Niemcy');
    });

    it('have to manipulate with arrowUp and enter keys ', () => {
        const dataList = modelsData();

        mount(() => (
            <Input.SearchBox
                options={dataList.models}
                textValue={dataList.actualValue}
                onChange={dataList.change}
                id="search-box"
            />
        ));

        const firstName = DATA_LIST.find(() => true)?.textValue ?? '';

        cy.get('#search-box').click();

        cy.get('#search-box').type('{downarrow}');

        cy.get('#search-box').type('{downarrow}');

        cy.get('#search-box').type('{uparrow}');

        cy.get('#search-box').type('{uparrow}');

        cy.get('#search-box').type('{enter}');

        cy.get('#search-box').should('have.value', firstName);
    });

    it('have to close with Esc key ', () => {
        const dataList = modelsData();

        mount(() => (
            <Input.SearchBox
                options={dataList.models}
                textValue={dataList.actualValue}
                onChange={dataList.change}
                id="search-box"
            />
        ));

        cy.get('#search-box').click();

        cy.get('#search-box').type('{esc}');

        cy.get('#search-box').should('have.value', '');

        cy.get('ul').should('not.exist');
    });

    it('have to click with mouse on item ', () => {
        const dataList = modelsData();

        mount(() => (
            <Input.SearchBox
                options={dataList.models}
                textValue={dataList.actualValue}
                onChange={dataList.change}
                id="search-box"
            />
        ));

        const anyName = DATA_LIST.find(() => true)?.textValue ?? '';

        cy.get('#search-box').click();

        cy.get('li').contains(anyName).eq(0).click();

        cy.get('#search-box').should('have.value', anyName);
    });

    it('have to show only suggest whitch have the same letter', () => {
        const dataList = modelsData();

        mount(() => (
            <Input.SearchBox
                options={dataList.models}
                textValue={dataList.actualValue}
                onChange={dataList.change}
                id="search-box"
            />
        ));

        const anyName = DATA_LIST.find(() => true)?.textValue ?? '';

        cy.get('#search-box').type(anyName.slice(0, 4));

        cy.get('li').should('have.text', anyName);
    });

    it('have to not show Suggestion when write false value', () => {
        const dataList = modelsData();

        mount(() => (
            <Input.SearchBox
                options={dataList.models}
                textValue={dataList.actualValue}
                onChange={dataList.change}
                id="search-box"
            />
        ));

        cy.get('#search-box').type(INVALID_NAME);

        cy.get('li').should('not.exist');
    });

    it('have to not show Suggestion when click Tab', () => {
        const dataList = modelsData();

        mount(() => (
            <>
                <Input.SearchBox
                    options={dataList.models}
                    textValue={dataList.actualValue}
                    onChange={dataList.change}
                    id="search-box"
                />
                <Input.Text
                    onChange={noop}
                />
            </>
        ));

        cy.get('#search-box').click();

        cy.get('#search-box').tab();

        cy.get('ul').should('not.exist');
    });

    it('have to give you data object with value', () => {
        const dataList = modelsData();

        mount(() => (
            <>
                <Input.SearchBox
                    options={dataList.models}
                    textValue={dataList.actualValue}
                    onChange={dataList.change}
                    id="search-box"
                />
                <Input.Text
                    onChange={noop}
                />
            </>
        ));

        const item = DATA_LIST.find(() => true);

        expect(item).to.be.not.eq(undefined);

        cy.get('#search-box').click();

        cy.get('*').contains(item?.textValue ?? '').click()
            .then(() => {
                expect(dataList.nameLength).to.be.eq(item?.value.nameLength);
            });
    });

    it('list have to disappear after click', () => {
        const dataList = modelsData();

        mount(() => (
            <>
                <Input.SearchBox
                    options={dataList.models}
                    textValue={dataList.actualValue}
                    onChange={dataList.change}
                    id="search-box"
                />
                <Input.Text
                    onChange={noop}
                />
            </>
        ));

        const item = DATA_LIST.find(() => true);

        expect(item).to.be.not.eq(undefined);

        cy.get('#search-box').click();

        cy.get('*').contains(item?.textValue ?? '').click();

        cy.get('*').contains(item?.textValue ?? '').should('not.exist');
    });
});
