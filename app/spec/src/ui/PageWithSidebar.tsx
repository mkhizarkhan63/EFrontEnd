import { describe, it, mount, expect, cy } from '~cypress';
import { PageWithSidebar } from '~/partials';
import { StepBar, StepBarStatus } from '~/bits';
import { makeAutoObservable } from 'mobx';

class Controller {
    isClicked = false;

    Sidebar = () => <StepBar steps={this.steps} />;

    constructor() {
        makeAutoObservable(this);
    }

    testFunction = () => {
        this.isClicked = !this.isClicked;
    };

    steps = [
        { name: 'stepA', status: StepBarStatus.done, onClick: this.testFunction },
        { name: 'stepB', status: StepBarStatus.done },
        { name: 'stepC', status: StepBarStatus.inProgress },
        { name: 'stepD', status: StepBarStatus.wait },
        { name: 'stepE', status: StepBarStatus.wait },
        { name: 'stepF', status: StepBarStatus.wait },
    ];
}

describe('partials/PageWithSidebar', () => {
    it('check if display sidebar', () => {
        const data = new Controller();

        mount(() => (
            <PageWithSidebar sidebar={data.Sidebar}>
                <div>Page</div>
            </PageWithSidebar>
        ));

        cy.contains('stepA').should('be.visible');
        cy.contains('stepA').click().then(() => expect(data.isClicked).eq(true));
        cy.contains('Page').should('be.visible');
    });

});
