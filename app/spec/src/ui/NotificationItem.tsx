import { E } from '~/api';
import { NotificationItem } from '~/bits';
import { Notification } from '~/models';
import { describe, it, mount, cy } from '~cypress';

// TODO fix when more notifications will be added
describe('bits/NotificationItem', () => {
    it('displays all notification types correctly', () => {
        const notification1 = new Notification();
        notification1.messageType = E.MessageType.system;

        const notification2 = new Notification();
        notification2.messageType = E.MessageType.updateEmail;

        const notification3 = new Notification();
        notification3.messageType = E.MessageType.projectChange;
        notification3.data = {
            projectId: 12,
            projectSignStage: 5,
        };

        mount(() => (
            <>
                <NotificationItem notification={notification1} />
                <NotificationItem notification={notification2} />
                <NotificationItem notification={notification3} />
            </>
        ));

        cy.get('.notification').eq(0).find('.notification__dot').should('have.attr', 'data-status', 'project');
        cy.get('.notification').eq(0).find('.notification__message').should('have.attr', 'data-highlight', 'system');
        cy.get('.notification__message-id').eq(0).should('contain', '#123');
        cy.get('.notification__time').eq(0).should('contain', notification1.printDate);

        cy.get('.notification').eq(1).find('.notification__dot').should('have.attr', 'data-status', 'profile');
        cy.get('.notification').eq(1).find('.notification__message').should('have.attr', 'data-highlight', 'updateEmail');
        cy.get('.notification__message-id').eq(1).should('contain', '#123');
        cy.get('.notification__time').eq(1).should('contain', notification2.printDate);

        cy.get('.notification').eq(2).find('.notification__dot').should('have.attr', 'data-status', 'sign');
        cy.get('.notification').eq(2).find('.notification__message').should('have.attr', 'data-highlight', 'projectChange');
        cy.get('.notification__message-id').eq(2).should('contain', '#12');
        cy.get('.notification__message').eq(2).should('contain', 'project is');
        cy.get('.notification__message-status').should('contain', 'Choose Contractor');
        cy.get('.notification__time').eq(2).should('contain', notification3.printDate);
    });
});