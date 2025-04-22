import { E, Id } from '~/api';
import { ProjectTile } from '~/bits';
import { Project } from '~/models';
import { describe, xit as it, mount, cy } from '~cypress';

const createProject = () => {
    const project = new Project();
    project.projectStatus = E.ProjectStatus.draft;
    project.projectNumber = '11';
    project.setGovernorate(4);
    project.setWilayat(19);
    project.stagePlanId = Id.init(19, 'external');
    project.landArea = 200;
    project.landType = E.ConstructionLand.residential;
    project.constructionType = E.ConstructionType.turnKey;
    project.projectStatus = E.ProjectStatus.signed;

    return project;
};

const dictionary = {
    governorates: [{
        abbreviation: "BAS",
        displayName: "AlBatinah South",
        id: 4,
        translationKey: "construction:dictionary:governorate:al_batinah_south",
    }],
    wilayats: [{
        governorateId: 4,
        displayName: "Wadi Al Maawil",
        translationKey: "construction:dictionary:vilayat:wadi_al_maawil",
        id: 19,
    }],
};

const stagePlan = {
    result: {
        additionalFloors: 0,
        basement: 1,
        groundFloor: true,
        id: 19,
        levellingFloor: false,
        numberOfInspections: 0,
        outerBlocks: 0,
        penthouseFloor: false,
        planParts: [],
        pool: false,
        projectId: 25,
        projectInUse: 0,
        projectScope: 0,
        projectScopeTwo: 0,
        sowVersionId: 3,
        stageId: "3-3-1BG",
        stageLevels: 0,
        templateName: "dwadawdw",
    },
};

describe('bits/ProjectTile', () => {
    it('displays correctly', () => {
        cy.intercept('/construction/listdictionarydataquery', dictionary);
        cy.intercept('/construction/getstageplanquery/19?id=19', stagePlan);

        let tileClicked = false;

        const project = createProject();

        mount(() => (
            <ProjectTile
                project={project}
                profileType={E.ProfileType.consultant}
                countdown="12 days left"
                onClick={() => tileClicked = true}
            />
        ));

        cy.get('p[data-step="signed"]').should('contain', 'Signed');
        cy.get('.project-tile__id').should('contain', '#11');

        cy.get('.project-tile__location-title').should('contain', 'Wadi Al Maawil');
        cy.get('.project-tile__location-subtitle').should('contain', 'Al Batinah South');
        cy.get('.project-tile__days-left-num').should('contain', '12 days left');

        cy.get('.project-tile__meters').should('contain', '200 m²');
        cy.get('.project-tile__residential').should('contain', 'Residential');
        cy.get('.project-tile__levels-symbols').should('contain', '1B+G');
        cy.get('.project-tile__levels-desc').should('contain', 'Floor Levels');

        cy.get('body').click(12, 12).then(() => {
            expect(tileClicked).eq(true);
        });
    });

    it('NewProjects displays correctly for Contractor/Start Bid', () => {
        cy.intercept('/construction/listdictionarydataquery', dictionary);
        cy.intercept('/construction/getstageplanquery/19?id=19', stagePlan);

        let startBidClicked = false;

        const project = createProject();
        project.forContractor.bidStatus = E.BidStatus.none;

        mount(() => (
            <ProjectTile
                project={project}
                profileType={E.ProfileType.contractor}
                countdown="12 days left"
                onClick={() => { }}
            />
        ));

        cy.get('.new-project-tile__bids-desc').should('not.exist');
        cy.contains('Reject').should('not.exist');
        cy.get('.new-project-tile-label').should('contain', 'You got Invited!');

        cy.get('.new-project-tile__location-title').should('contain', 'Wadi Al Maawil');
        cy.get('.new-project-tile__location-subtitle').should('contain', 'Al Batinah South');
        cy.get('.new-project-tile__days-left').find('p').should('contain', '12 days left');
        cy.get('.new-project-tile__meters').should('contain', '200 m²');
        cy.get('.new-project-tile__residential').should('contain', 'Residential');

        cy.get('.new-project-tile__levels-symbols').should('contain', '1B+G');
        cy.get('.new-project-tile__levels-desc').should('contain', 'Floor Levels');
        cy.get('.new-project-tile__date-number').should('contain', project.bidClosingDate.format('MMM D, YYYY'));
        cy.get('.new-project-tile__date-desc').should('contain', 'Closing Date');

        cy.contains('Start Bid').click().then(() => {
            expect(startBidClicked).eq(true);
        });
    });

    it('NewProjects displays correctly for Contractor/Continue Bid" ', () => {
        cy.intercept('/construction/listdictionarydataquery', dictionary);
        cy.intercept('/construction/getstageplanquery/19?id=19', stagePlan);

        let bidClicked = false;

        const project = createProject();
        project.forContractor.bidStatus = E.BidStatus.continue;

        mount(() => (
            <ProjectTile
                project={project}
                profileType={E.ProfileType.contractor}
                countdown="12 days left"
                onClick={() => { }}
            />
        ));

        cy.contains('Reject').should('not.exist');
        cy.get('.new-project-tile-label').should('contain', 'Continue Bid');

        cy.get('.new-project-tile__location-title').should('contain', 'Wadi Al Maawil');
        cy.get('.new-project-tile__location-subtitle').should('contain', 'Al Batinah South');
        cy.get('.new-project-tile__days-left').find('p').should('contain', '12 days left');
        cy.get('.new-project-tile__meters').should('contain', '200 m²');
        cy.get('.new-project-tile__residential').should('contain', 'Residential');
        cy.get('.new-project-tile__bids-desc').should('contain', 'Bids Remaining');

        cy.get('.new-project-tile__levels-symbols').should('contain', '1B+G');
        cy.get('.new-project-tile__levels-desc').should('contain', 'Floor Levels');
        cy.get('.new-project-tile__date-number').should('contain', project.bidClosingDate.format('MMM D, YYYY'));
        cy.get('.new-project-tile__date-desc').should('contain', 'Closing Date');

        cy.get('.new-project-tile__status-desc').should('contain', 'Turn Key');
        cy.get('.new-project-tile__status-type').should('contain', 'Project Type');

        cy.get('button').contains('Continue Bid').click().then(() => {
            expect(bidClicked).eq(true);
        });
    });

    it('NewProjects displays correctly for Consultant', () => {
        cy.intercept('/construction/listdictionarydataquery', dictionary);
        cy.intercept('/construction/getstageplanquery/19?id=19', stagePlan);

        let acceptClicked = false;
        let rejectClicked = false;

        const project = createProject();
        project.forContractor.bidStatus = E.BidStatus.none;

        mount(() => (
            <ProjectTile
                project={project}
                profileType={E.ProfileType.consultant}
                countdown="12 days left"
                onClick={() => { }}
            />
        ));

        cy.get('.new-project-tile-label').should('contain', 'You got Invited!');
        cy.get('.new-project-tile__location-title').should('contain', 'Wadi Al Maawil');
        cy.get('.new-project-tile__location-subtitle').should('contain', 'Al Batinah South');
        cy.get('.new-project-tile__days-left').find('p').should('contain', '12 days left');
        cy.get('.new-project-tile__meters').should('contain', '200 m²');
        cy.get('.new-project-tile__residential').should('contain', 'Residential');

        cy.get('.new-project-tile__levels-symbols').should('contain', '1B+G');
        cy.get('.new-project-tile__levels-desc').should('contain', 'Floor Levels');
        cy.get('.new-project-tile__date-number').should('contain', project.bidClosingDate.format('MMM D, YYYY'));
        cy.get('.new-project-tile__date-desc').should('contain', 'Closing Date');

        cy.get('.new-project-tile__status-desc').should('contain', 'Turn Key');
        cy.get('.new-project-tile__status-type').should('contain', 'Project Type');

        cy.get('button').contains('Reject').click().then(() => {
            expect(rejectClicked).eq(true);
        });

        cy.get('button').contains('View Project').click().then(() => {
            expect(acceptClicked).eq(true);
        });
    });
});