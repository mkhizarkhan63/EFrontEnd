import { observer } from 'mobx-react';
import { describe, it, mount, expect, cy } from '~cypress';
import { Subheader } from '~/bits';

describe('bits/Subheader', () => {
    it('subheader return button and right side test', () => {
        let testReturnButton = false;

        const handle = () => {
            testReturnButton = true;
        };

        const Component = observer(() => (
            <Subheader
                hasReturnButton={true}
                returnButton={handle}
                pageName="strona testowa"
                pageValue={10}
            >
                <Subheader.Right>
                    <p>TEST PRAWEJ STRONY</p>
                </Subheader.Right>
            </Subheader>
        ));

        mount(() => <Component />);

        cy.get('svg').click()
            .then(() => { expect(testReturnButton).eq(true); });
        cy.contains('strona testowa').should('be.visible');
        cy.contains(10).should('be.visible');
        cy.contains('TEST PRAWEJ STRONY').should('be.visible');
    });

    it('empty subheader with bottom side test', () => {

        const Component = observer(() => (
            <Subheader
                hasReturnButton={false}
            >
                <Subheader.Bottom>
                    <p>TEST DOLNEJ CZĘŚCI</p>
                </Subheader.Bottom>
            </Subheader>
        ));

        mount(() => <Component />);

        cy.get('svg').should('not.exist');
        cy.get('.subheader > div').eq(0).should('be.empty');
        cy.contains('TEST DOLNEJ CZĘŚCI').should('be.visible');
    });
});
