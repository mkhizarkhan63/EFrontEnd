import moment from 'moment';
import { makeAutoObservable } from 'mobx';
import { describe, it, mount, cy } from '~cypress';
import { Comment } from '~/bits';
import { Img } from '~/api';

class Controller {
    text = 'TEST this is comment. Have a nice day :)';

    name = 'Jaś Kowalski';

    labels = {
        skills: 'Skills',
        qualityOfRequirements: 'Quality of Requirements',
        availability: 'Availability',
        setResonableDeadlines: 'Set Resonable Deadlines',
        communication: 'Communication',
        cooperation: 'Cooperation',
    };

    stars = [
        { key: 'skills', value: 5 },
        { key: 'qualityOfRequirements', value: 4 },
        { key: 'availability', value: 3 },
        { key: 'setResonableDeadlines', value: 2 },
        { key: 'communication', value: 1 },
        { key: 'cooperation', value: 0 },
    ];

    avatar = Img.empty();

    daysDiff = 3;

    constructor() {
        makeAutoObservable(this);
    }

    get date() {
        return moment().subtract(this.daysDiff, 'day');
    }

    get avg() {
        return this.stars.reduce((a, b) => a + b.value, 0);
    }
}

describe('bits/Comment', () => {
    it('displays correctly', () => {
        const data = new Controller();

        mount(() => (
            <Comment
                avatar={data.avatar}
                name={data.name}
                labels={data.labels}
                values={data.stars}
                date={data.date}
                text={data.text}
            />
        ));

        cy.get('img').should('be.visible');
        cy.contains(data.name).should('be.visible');
        cy.contains(String(data.stars[0].value)).should('be.visible');
        cy.contains(data.text).should('be.visible');
    });
});
