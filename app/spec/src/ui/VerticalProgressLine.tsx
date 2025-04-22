import { Button, VerticalProgressLine } from '~/bits';
import { ContractorBidContractVm } from '~/views/ContractorBidContract/ContractorBidContract.vm';
import { describe, it, mount, cy } from '~cypress';
import moment from 'moment';

type Status = 'success' | 'pending';

const createVm = () => new ContractorBidContractVm();

describe('bits/VerticalProgressLine', () => {
    it('displays correctly', () => {
        let isGoToClicked = false;

        const clientAdvancePayment = {
            status: 'pending' as Status,
            date: moment(),
        };

        const contractorPmCommitment = {
            status: 'pending' as Status,
            date: moment(),
        };

        const consultantEngineerCommitment = {
            status: 'pending' as Status,
            date: moment(),
        };

        const vm = createVm();

        mount(() => (
            <VerticalProgressLine
                clientContractSignature={vm.clientContractSignature}
                contractorContractSignature={vm.contractorContractSignature}
                consultantContractSignature={vm.consultantContractSignature}
                contractorPmCommitment={contractorPmCommitment}
                extraElement={() => <Button color="white" />}
                clientAdvancePayment={clientAdvancePayment}
                consultantEngineerCommitment={consultantEngineerCommitment}
                goToProjectManagement={() => isGoToClicked = true}
            />
        ));

        cy.get('.vertical-progress-line__step').should('have.length', 6);
        cy.get('button[data-color="white"]').should('exist');
        cy.get('.vertical-progress-line__step-status').should('have.length', 3);

        cy.get('.vertical-progress-line__step').eq(0).find(`.vertical-progress-line__step-icon[data-icon="${vm.clientContractSignature.status === 'success'}"]`).should('exist');
        cy.get('.vertical-progress-line__step-title').eq(0).should('contain', 'Client Contract Signature');
        cy.get('.vertical-progress-line__step-date').eq(0).should('contain', vm.clientContractSignature?.date?.format('DD MMMM YYYY'));

        cy.get('.vertical-progress-line__step').eq(1).find(`.vertical-progress-line__step-icon[data-icon="false"]`).should('exist');
        cy.get('.vertical-progress-line__step-title').eq(1).should('contain', 'Client Advance Payment');
        cy.get('.vertical-progress-line__step-date').eq(1).should('contain', clientAdvancePayment.date?.format('DD MMMM YYYY'));

        cy.get('.vertical-progress-line__step').eq(2).find(`.vertical-progress-line__step-icon[data-icon="${vm.contractorContractSignature.status === 'success'}"]`).should('exist');
        cy.get('.vertical-progress-line__step-title').eq(2).should('contain', 'Contractor Contract Signature');
        cy.get('.vertical-progress-line__step-date').eq(2).should('contain', vm.contractorContractSignature.date?.format('DD MMMM YYYY'));

        cy.get('.vertical-progress-line__step').eq(3).find(`.vertical-progress-line__step-icon[data-icon="false"]`).should('exist');
        cy.get('.vertical-progress-line__step-title').eq(3).should('contain', 'Contractor PM Commitment');
        cy.get('.vertical-progress-line__step-date').eq(3).should('contain', contractorPmCommitment.date?.format('DD MMMM YYYY'));

        cy.get('.vertical-progress-line__step').eq(4).find(`.vertical-progress-line__step-icon[data-icon="${vm.consultantContractSignature.status === 'success'}"]`).should('exist');
        cy.get('.vertical-progress-line__step-title').eq(4).should('contain', 'Consultant Contract Signature');
        cy.get('.vertical-progress-line__step-date').eq(4).should('contain', vm.consultantContractSignature.date?.format('DD MMMM YYYY'));

        cy.get('.vertical-progress-line__step').eq(5).find(`.vertical-progress-line__step-icon[data-icon="false"]`).should('exist');
        cy.get('.vertical-progress-line__step-title').eq(5).should('contain', 'Consultant Engineer Commitment');
        cy.get('.vertical-progress-line__step-date').eq(5).should('contain', consultantEngineerCommitment.date?.format('DD MMMM YYYY'));

        cy.contains('Go To').click().then(() =>
            expect(isGoToClicked).eq(true)
        );
    });

    it('displays with working buttons', () => {
        let isSubmitClicked = false;

        const clientAdvancePayment = {
            status: 'pending' as Status,
            date: moment(),
            isButtonsBlockVisible: true,
        };

        const contractorPmCommitment = {
            status: 'pending' as Status,
            date: moment(),
            isButtonsBlockVisible: true,
            submitPmCommitment: () => isSubmitClicked = true,
        };

        const consultantEngineerCommitment = {
            status: 'pending' as Status,
            date: moment(),
        };

        const vm = createVm();

        mount(() => (
            <VerticalProgressLine
                clientContractSignature={vm.clientContractSignature}
                contractorContractSignature={vm.contractorContractSignature}
                consultantContractSignature={vm.consultantContractSignature}
                contractorPmCommitment={contractorPmCommitment}
                extraElement={() => <Button color="white" />}
                clientAdvancePayment={clientAdvancePayment}
                consultantEngineerCommitment={consultantEngineerCommitment}
            />
        ));

        cy.get('.vertical-progress-line__step').eq(3).contains('Submit PM Commitment').click().then(() =>
            expect(isSubmitClicked).eq(true)
        );

        // TODO check buttons for invoices
    });
});