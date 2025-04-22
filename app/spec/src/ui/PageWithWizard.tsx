import { describe, it, mount } from '~cypress';
import { PageWithWizard } from '~/partials';
import moment from 'moment';
import { E } from '~/api';

describe('bits/PageWithWizard', () => {
    it('process box test', () => {
        let testReturnButton = false;

        const handle = () => {
            testReturnButton = true;
        };

        const test = {
            hasReturnButton: true,
            returnButton: handle,
            pageName: 'strona testowa',
            pageSubName: <p>Client Add Services</p>,
        };

        const Content = (
            <>
                <div className="subheader-item">
                    <p>Client Name</p>
                    <p>James Hollinghead</p>
                </div>
                <div className="subheader-item">
                    <p>Email ID</p>
                    <p>mahmood931752@gmail.com</p>
                </div>
                <div className="subheader-item">
                    <p>Contact No</p>
                    <p>97708812</p>
                </div>
            </>
        );

        const status = {
            steps: [
                {
                    status: E.ProcessWizard.done,
                    name: 'Draft',
                    date: moment(),
                },
                {
                    status: E.ProcessWizard.done,
                    name: 'Admin Review',
                    date: moment(),
                },
                {
                    status: E.ProcessWizard.done,
                    name: 'Contract Bidding',
                    date: moment(),
                },
                {
                    status: E.ProcessWizard.inProgress,
                    name: 'Client Add Services',
                    date: moment(),
                },
                {
                    status: E.ProcessWizard.wait,
                    name: 'Contract Ready',
                    date: moment(),
                },
                {
                    status: E.ProcessWizard.wait,
                    name: 'Signed/Live in Pm',
                    date: moment(),
                },
            ],
        };

        mount(() => (
            <PageWithWizard
                stepWizard={status}
                subheader={test}
                subheaderContent={Content}
            />
        ));

        cy.get('.wizard__step-name').should('exist');
    });
});
