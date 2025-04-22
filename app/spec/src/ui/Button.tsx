import { describe, it, mount, expect, cy } from '~cypress';
import { Button } from '~/bits';

describe('bits/Button', () => {
    it('have to be clickable', () => {
        let hasBeenClicked = false;

        const handleClick = () => {
            hasBeenClicked = true;
        };

        mount(() => <Button onClick={handleClick} color="blue" value="Button" />);

        cy.get('button').click().then(() => {
            expect(hasBeenClicked).eq(true);
        });
    });

    it('disabled have to be not clickable', () => {
        mount(() => <Button isDisabled={true} color="blue" value="Button 2" />);

        cy.get('button').invoke('prop', 'disabled').should('eq', true);
    });
});
