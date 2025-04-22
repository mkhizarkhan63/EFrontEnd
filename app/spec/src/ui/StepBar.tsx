import { describe, it, mount, expect, cy } from '~cypress';
import { StepBar, StepBarStatus } from '~/bits';

describe('bits/StepBar', () => {
    it('clickable test, display test', () => {
        let testOnClick = false;

        const testFunction = (e: boolean) => {
            testOnClick = e;
        };
        const steps = [
            { name: 'stepA', status: StepBarStatus.done, onClick: () => testFunction(true) },
            { name: 'stepB', status: StepBarStatus.done },
            { name: 'stepC', status: StepBarStatus.inProgress },
            { name: 'stepD', status: StepBarStatus.wait },
            { name: 'stepE', status: StepBarStatus.wait },
            { name: 'stepF', status: StepBarStatus.wait },
        ];

        mount(() => <StepBar steps={steps} />);

        cy.contains('stepA').click().then(() => {
            expect(testOnClick).eq(true);
        });

        const arrayVisible = ['stepA', 'stepB', 'stepC', 'stepD', 'stepE', 'stepF', '3', '4', '5', '6'];
        const arrayNotVisible = ['1', '2'];

        arrayVisible.forEach(item => {
            cy.contains(item).should('be.visible');
        });
        arrayNotVisible.forEach(item => {
            cy.contains(item).should('not.exist');
        });
    });
});
