import { makeAutoObservable } from 'mobx';
import { E, Id, Mobx } from '~/api';
import { CompanyOffers } from '~/bits';
import { Project, ProjectBid, ProjectBidContractor } from '~/models';
import { cy, describe, it, mount } from '~cypress';

class Controller {
    tableColumnsOpen = [
        'Structural Price',
        'Additional Price',
        'Ongoing Projects',
        'Years of Experience',
        'Number of Engineers',
        'Number of Labors',
        'View Profile',
        'Less Info',
    ];

    tableColumnsClosed = [
        'Total Price',
        'Project Time (days)',
        'More Info',
    ];

    bids: ProjectBid[];

    constructor() {
        makeAutoObservable(this);

        const project = new Project();
        project.projectStatus = E.ProjectStatus.draft;
        project.setPlotArea('10');

        const contractor = new ProjectBidContractor();
        contractor.numberOfEngineers = 5;
        contractor.ongoingProjects = 4;
        contractor.numberOfLabors = 3;
        contractor.yearsOfExperience = 10;

        const contractor2 = new ProjectBidContractor();
        contractor2.numberOfEngineers = 2;
        contractor2.ongoingProjects = 1;
        contractor2.numberOfLabors = 6;
        contractor2.yearsOfExperience = 40;

        this.bids = [
            Mobx.extendsObservable(new ProjectBid(project), {
                contractor: contractor,
                id: Id.init(1, 'internal'),
                totalPrice: 1000,
                structureItemsTotalPrice: 100,
                turnkeyItemsTotalPrice: 12,
                totalDays: 365,
                contractorId: Id.init(1, 'internal'),
                badgesType: E.TopContractorsTypes.fastest,
                message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.',
            }),
            Mobx.extendsObservable(new ProjectBid(project), {
                id: Id.init(2, 'internal'),
                contractorId: Id.init(2, 'internal'),
            }),
            Mobx.extendsObservable(new ProjectBid(project), {
                contractor: contractor2,
                id: Id.init(3, 'internal'),
                totalPrice: 100,
                structureItemsTotalPrice: 120,
                turnkeyItemsTotalPrice: 15,
                totalDays: 120,
                contractorId: Id.init(3, 'internal'),
                badgesType: E.TopContractorsTypes.rated,
            }),
        ];
    }
}

describe('bits/CompanyOffers', () => {
    const data = new Controller();

    it('displays correctly closed', () => {
        mount(() => <CompanyOffers bids={data.bids} onSelectContractor={() => { /* */ }} />);

        cy.get('img').should('be.visible');
        cy.get('input').should('be.checked');
        cy.get('.company__offer').should('not.exist');

        data.tableColumnsClosed.forEach(item => {
            cy.contains(item).should('be.visible');
        });

        data.tableColumnsOpen.forEach(item => {
            cy.contains(item).should('not.be.visible');
        });

        data.bids.forEach((item, index) => {
            cy.get('.company').eq(index).within(() => {
                cy.get('p').eq(1).should('contain', Math.round(item.totalPrice / item.project.landArea));
                cy.get('p').eq(2).should('contain', item.totalDays ?? '0');
            });
        });

        cy.get('button').eq(0).click();
        cy.get('.company__offer').should('exist');
    });

    it('opens correctly', () => {
        mount(() => <CompanyOffers bids={data.bids} onSelectContractor={() => { /* */ }} />);

        cy.contains('Click here to compare contractors experience and resources').click();

        data.tableColumnsOpen.forEach(item => {
            cy.contains(item).should('be.visible');
        });

        data.tableColumnsClosed.forEach(item => {
            item === 'More Info' ?
                cy.contains(item).should('not.be.visible') :
                cy.get('p').not('.only-on-closed').contains(item).should('be.visible');
        });

        data.bids.forEach((item, index) => {
            cy.get('.company').eq(index).within(() => {
                cy.get('p').not('.only-on-closed').eq(1).should('contain', Math.round(item.totalPrice / item.project.landArea));
                cy.get('p').not('.only-on-closed').eq(2).should('contain', Math.round(item.structureItemsTotalPrice / item.project.landArea));
                cy.get('p').not('.only-on-closed').eq(3).should('contain', Math.round(item.turnkeyItemsTotalPrice / item.project.landArea));
                cy.get('p').not('.only-on-closed').eq(4).should('contain', item.totalDays);
                cy.get('p').not('.only-on-closed').eq(5).should('contain', item.contractor.ongoingProjects);
                cy.get('p').not('.only-on-closed').eq(6).should('contain', item.contractor.yearsOfExperience);
                cy.get('p').not('.only-on-closed').eq(7).should('contain', item.contractor.numberOfEngineers);
                cy.get('p').not('.only-on-closed').eq(8).should('contain', item.contractor.numberOfLabors);
            });
        });

        cy.get('.checkbox-toggle').click();

        data.bids.forEach((item, index) => {
            cy.get('.company').eq(index).within(() => {
                cy.get('p').not('.only-on-closed').eq(1).should('contain', item.totalPrice);
                cy.get('p').not('.only-on-closed').eq(2).should('contain', item.structureItemsTotalPrice);
                cy.get('p').not('.only-on-closed').eq(3).should('contain', item.turnkeyItemsTotalPrice);
            });
        });

        cy.contains('Hide Information').click();

        data.tableColumnsOpen.forEach(item => {
            cy.contains(item).should('not.be.visible');
        });
    });
});
