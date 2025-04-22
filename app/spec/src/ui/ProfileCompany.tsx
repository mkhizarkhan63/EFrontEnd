import moment from 'moment';
import { describe, it, mount, cy } from '~cypress';
import { Button, ProfileCompany } from '~/bits';
import { Img } from '~/api';
import { utilsArray } from '~/utils';

type StarsValuesProps = Array<{
    key: keyof typeof data.starsLabels;
    value: number;
}>;

class Controller {
    nameCompany = 'Firma';

    starsLabels = {
        skills: 'Skills',
        qualityOfRequirements: 'Quality of Requirements',
        availability: 'Availability',
        setResonableDeadlines: 'Set Resonable Deadlines',
        communication: 'Communication',
        cooperation: 'Cooperation',
    };

    starsValues: StarsValuesProps = [
        { key: 'skills', value: 4 },
        { key: 'qualityOfRequirements', value: 2 },
        { key: 'availability', value: 5 },
        { key: 'setResonableDeadlines', value: 1 },
        { key: 'communication', value: 5 },
        { key: 'cooperation', value: 2 },
    ];

    avatar = Img.empty();
}

const data = new Controller();

const starsAvg = utilsArray.avg(utilsArray.toRange(data.starsValues.map(x => x.value), 1, 5), 1);

describe('bits/ProfileCompany', () => {
    it('correct display', () => {
        mount(() => (
            <ProfileCompany
                name={data.nameCompany}
                stars={{ labels: data.starsLabels, values: data.starsValues }}
                dateSince={moment('10/10/2018')}
                avatar={data.avatar}
            >
                <Button color="blue" value="I am button" />
            </ProfileCompany>
        ));

        cy.get('img').should('be.visible');
        cy.contains('Firma').should('be.visible');
        cy.contains(starsAvg).should('be.visible');
        cy.contains('Since 2018').should('be.visible');
        cy.get('button').contains('I am button').should('be.visible');
    });
});
