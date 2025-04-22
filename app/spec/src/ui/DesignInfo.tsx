import { E, Img } from '~/api';
import { DesignInfo } from '~/bits';
import { DesignOption, FloorLevel, Room } from '~/models';
import { describe, xit as it, mount, cy } from '~cypress';

const getDesign = () => {
    const levelItems = [
        FloorLevel.create({
            size: 150,
            type: E.FloorType.ground,
            rooms: [
                Room.create({
                    count: 1,
                    type: E.RoomType.majilis,
                }),
                Room.create({
                    count: 2,
                    type: E.RoomType.dining,
                }),
            ],
        }),
        FloorLevel.create({
            size: 170,
            type: E.FloorType.floor,
            rooms: [
                Room.create({
                    count: 2,
                    type: E.RoomType.majilis,
                }),
                Room.create({
                    count: 3,
                    type: E.RoomType.dining,
                }),
            ],
        }),
    ];

    return DesignOption.create({
        title: 'Design',
        inspirationDescription: 'description',
        estimatedConstructionPrice: 2500,
        designPrice: 3000,
        requiredLandSize: 500,
        floorLevels: levelItems,
        companyName: 'Adam',
    });
};

describe('bits/DesignInfo', () => {
    it('displays correctly', () => {
        const design = getDesign();

        mount(() => (
            <DesignInfo
                design={design}
                personName="Mirek"
                personAvatar={Img.empty()}
                personSpecialization="tester"
                requirementDescription="requirement"
            />
        ));

        cy.get('.design-info__desc-title').should('contain', 'Design');
        cy.get('.design-info__desc-text').should('contain', 'description');

        cy.get('.design-info__person-name').should('contain', 'Adam');
        cy.get('.design-info__person-role').should('contain', 'tester');
        cy.get('.design-info__person').find('img').should('exist');

        cy.get('.design-info__price-estimated-value').should('contain', '2,500');

        cy.get('.design-info__price-total-value').should('contain', '3000');

        cy.get('.design-info__land-size-value').should('contain', '500 m²');

        cy.get('.design-info__check-text').should('contain', 'requirement');

        cy.get('.design-item').should('have.length', 2);

        cy.get('.design-item__floor-type').eq(0).should('contain', 'Ground Floor');
        cy.get('.design-item__floor-size').eq(0).should('contain', '150');
        cy.get('.design-item__room').eq(0).should('contain', 'Majilis');
        cy.get('.design-item__room').eq(1).should('contain', '2 x\u00a0Dining Room');

        cy.get('.design-item__floor-type').eq(1).should('contain', 'Floor');
        cy.get('.design-item__floor-size').eq(1).should('contain', '170');
        cy.get('.design-item__room').eq(2).should('contain', '2 x\u00a0Majilis');
        cy.get('.design-item__room').eq(3).should('contain', '3 x\u00a0Dining Room');
    });
});
