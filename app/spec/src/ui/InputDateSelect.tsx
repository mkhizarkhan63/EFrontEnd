import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { describe, it, mount, cy } from '~cypress';
import { Input } from '~/bits';

class Controller {
    date = moment('10/10/2022');

    constructor() {
        makeAutoObservable(this);
    }

    changeDate = (newDate: moment.Moment) => {
        this.date = newDate;
    };
}

describe('bits/Input/InputDateSelect', () => {
    it('change date', () => {
        const data = new Controller();

        mount(() => (
            <Input.DateSelect
                onChange={value => data.changeDate(value)}
                value={data.date}
            />

        ));

        cy.get('input').click();

        cy.contains(/^20$/).click();

        cy.get('input').should('have.value', '20/10/2022');
    });

});
