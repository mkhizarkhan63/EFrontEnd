import { describe, it, mount, cy } from '~cypress';
import { ProcessBox } from '~/bits';
import { makeAutoObservable } from 'mobx';

class Controller {
    status = [
        { status: 'done' as const, name: 'test1', description: 'etap I' },
        { status: 'inProgress' as const, icon: 'reviewing' as const, name: 'test2', description: 'etap II' },
        { status: 'wait' as const, name: 'test3', description: 'etap III' },
    ];

    constructor() {
        makeAutoObservable(this);
    }
}

describe('bits/ProcessBox', () => {
    it('process box test', () => {
        const data = new Controller();

        mount(() => (
            <ProcessBox steps={data.status}>
                <div> component test </div>
            </ProcessBox>
        ));

        data.status.forEach(item => {
            cy.contains(item.name).should('be.visible');
        });

        cy.get('div[data-status="inProgress"] > div').eq(2);

        cy.contains('component test').should('be.visible');
    });
});
