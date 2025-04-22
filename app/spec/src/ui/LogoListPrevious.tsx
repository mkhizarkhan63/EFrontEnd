import { describe, it, mount, cy, xit } from '~cypress';
import { LogoListPrevious } from '~/bits';
import { Img } from '~/api';

describe('bits/LogoListPrevious', () => {
    it('.box should be not visible', () => {
        const logos: Img[] = [];

        mount(() => <LogoListPrevious logos={logos} />);

        cy.get('.logo-list-previous__box').should('not.be.visible');
    });

    it('.box && img should be visible ', () => {
        const logos = [new Img('https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg')];

        mount(() => <LogoListPrevious logos={logos} />);

        cy.get('.logo-list-previous__box').should('be.visible');

        cy.get('img').should('be.visible');
    });

    it('props children should be visible', () => {
        const logos: Img[] = [];

        mount(() => (
            <LogoListPrevious logos={logos}>
                <div className="children">Test</div>
            </LogoListPrevious>
        ));

        cy.get('.children').should('be.visible');
    });
});
