import { describe, it, mount, cy } from '~cypress';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Input } from '~/bits';

describe('bits/InputCheckbox', () => {
    it('have to be clickable', () => {

        const hasBeenChecked = observable.box(false);

        const Checkbox = observer(() => (
            <Input.Checkbox
                onChange={value => hasBeenChecked.set(value)}
                type="radio"
                text={{ first: 'YES', second: 'NO' }}
                isChecked={hasBeenChecked.get()}
            />
        ));

        mount(() => <Checkbox />);

        cy.get('label').eq(0).click();

        cy.get('input').eq(0).invoke('prop', 'checked').should('eq', true);

        cy.get('label').eq(1).click();

        cy.get('input').eq(0).invoke('prop', 'checked').should('eq', false);
    });

    it('disabled have to be not clickable', () => {

        const hasBeenChecked = observable.box(false);

        const Checkbox = observer(() => (
            <Input.Checkbox
                onChange={value => hasBeenChecked.set(value)}
                type="radio"
                text={{ first: 'YES', second: 'NO' }}
                isDisabled={true}
                isChecked={hasBeenChecked.get()}
            />
        ));

        mount(() => <Checkbox />);

        cy.get('input').eq(0).invoke('prop', 'disabled').should('eq', true);
        cy.get('input').eq(1).invoke('prop', 'disabled').should('eq', true);
    });
});
