import { describe, it, mount, cy } from '~cypress';
import { Stars } from '~/bits';
import { lang } from '~/api';
import { utilsArray } from '~/utils';

describe('bits/Stars', () => {
    it('display stars', () => {

        const labels = {
            skills: lang.dict.get('ratingSkills'),
            qualityOfRequirements: lang.dict.get('ratingQuality'),
            availability: lang.dict.get('ratingAvailability'),
            setResonableDeadlines: lang.dict.get('ratingDeadlines'),
            communication: lang.dict.get('ratingCommunication'),
            cooperation: lang.dict.get('ratingCooperation'),
        };

        const stars = [
            { key: labels.skills, value: 4 },
            { key: labels.qualityOfRequirements, value: 2 },
            { key: labels.availability, value: 5 },
            { key: labels.setResonableDeadlines, value: 1 },
            { key: labels.communication, value: 5 },
            { key: labels.cooperation, value: 2 },
        ];

        const starsAvg = utilsArray.avg(utilsArray.toRange(stars.map(x => x.value), 1, 5), 1);

        mount(() => (
            <div className="stars-container">
                <Stars labels={labels} values={stars} />
            </div>
        ));

        cy.contains(starsAvg).should('be.visible');
    });

});
