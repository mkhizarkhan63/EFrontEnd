import { ProgressBar } from '~/bits';
import { describe, it, mount, cy } from '~cypress';

describe('bits/ProgressBar', () => {
    it('displays correctly', () => {
        mount(() => <ProgressBar value={70} />);

        cy.get('.progress-bar').then(parent => {
            const parentWidth = parent.innerWidth();
            const childrenWidth = parent.children().outerWidth();

            if (childrenWidth && parentWidth) {
                cy.get('.progress-bar-value')
                    .should('have.attr', 'style', `width: ${childrenWidth * 100 / parentWidth}%;`);
            }
        });
    });
});