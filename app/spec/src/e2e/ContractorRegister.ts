import { describe, e2e, cy, it } from '~cypress';
import { checkCheckboxByLabel, getInputByPlaceholder, checkRadioByLabel, selectFromDropdown, checkMultipleRadioByLabel } from '../utils/Input';

describe('Contractor register', () => {
    before(() => {
        e2e.host();
    });

    it('Register new contractor', () => {
        cy.login('66666666', '0000');
        cy.errorlessVisit('/company/register');
        cy.get('.register-box', { timeout: 10000 }).contains('Contractor').click();
        cy.contains('Register Now').click();

        cy.log('---- STEP 1 ----');

        cy.get('input[type="text"]').should('not.visible');

        checkRadioByLabel('No');

        getInputByPlaceholder('Write Name', 'TestFullName');
        getInputByPlaceholder('Write Email', 'TestUser@Test.com');
        getInputByPlaceholder('Write Phone', '12345678');

        checkMultipleRadioByLabel('Engineer');

        cy.contains('Next').click();

        cy.log('---- STEP 2 ----');

        cy.get('input[accept="image/*"]').attachFile('type.png');

        getInputByPlaceholder('Write Name', 'Test Name');
        getInputByPlaceholder('Write Email', 'TestUser@Test.com');
        getInputByPlaceholder('Write Phone', '12345678');
        getInputByPlaceholder('Write CR Number', '1234567');

        selectFromDropdown('Dhofar', 0);
        selectFromDropdown('Mirbat', 1);

        cy.get('.react-datepicker-wrapper').eq(0).click();
        cy.get('.react-datepicker__day--today').click();
        cy.get('.react-datepicker-wrapper').eq(1).click();
        cy.get('.react-datepicker__day--today').click();

        checkCheckboxByLabel('Oman Housing Bank');
        checkCheckboxByLabel('Muscat', 1);

        getInputByPlaceholder('In M2', '1000');

        cy.contains('Next').click();

        cy.log('---- STEP 3 ----');

        cy.intercept('https://ebina-api.test.softwarespace.io/contractor/getcontractorquery/**').as('contractorQuery');
        cy.wait('@contractorQuery');
        cy.wait('@contractorQuery');

        checkCheckboxByLabel('Plumbing Works');
        checkCheckboxByLabel('UPVC Works: Windows and Doors');

        getInputByPlaceholder('Write here', 'Test1');
        cy.get('div[data-role="add-value"]').eq(0).click();
        cy.contains('Test1').should('be.visible');

        checkCheckboxByLabel('Structure Design', 1);
        checkCheckboxByLabel('Surveying Team and Kit', 1);

        getInputByPlaceholder('Write here', 'Test2', 1);
        cy.get('div[data-role="add-value"]').eq(1).click();
        cy.contains('Test2').should('be.visible');

        cy.contains('Next').click();

        cy.log('---- STEP 4 ----');

        getInputByPlaceholder('Write Number', '3', 0);
        getInputByPlaceholder('Write Number', '10', 1);
        getInputByPlaceholder('Write Years', '8', 0);

        getInputByPlaceholder('In OMR', '5');
        getInputByPlaceholder('In OMR', '4', 1);
        getInputByPlaceholder('In OMR', '6', 2);

        checkRadioByLabel('Yes');
        checkRadioByLabel('Yes', 1);

        cy.contains('Next').click();

        cy.log('---- STEP 5 ----');

        cy.contains('Please Specify').should('not.exist');
        cy.get('[data-icon-name="close"]').should('not.exist');
        cy.contains('Please list').should('not.exist');

        cy.get('.textarea__input').type('Test test test')
            .should('have.value', 'Test test test');

        checkCheckboxByLabel('Excel');
        checkCheckboxByLabel('Other');

        cy.get('.textarea__input').eq(1).type('Monday')
            .should('have.value', 'Monday');

        checkRadioByLabel('Yes');

        cy.get('button[type="button"]').eq(0).click();

        getInputByPlaceholder('Type Here', 'Test');
        getInputByPlaceholder('Type Here', '80', 1);
        getInputByPlaceholder('Write here', 'Cleaning');
        getInputByPlaceholder('e.g.7', '5');

        cy.get('button[type="button"]').eq(1).click();

        selectFromDropdown('Architect', 0);
        selectFromDropdown('Project Manager', 1);
        getInputByPlaceholder('Type Here', '1', 2);
        getInputByPlaceholder('Type Here', '2', 3);

        cy.get('button[type="button"]').eq(3).click();

        selectFromDropdown('Foreman', 2);
        selectFromDropdown('Helper', 3);
        getInputByPlaceholder('Type Here', '3', 4);
        getInputByPlaceholder('Type Here', '4', 5);

        cy.get('button[type="button"]').eq(5).click();

        selectFromDropdown('Accountant', 4);
        selectFromDropdown('PRO', 5);
        getInputByPlaceholder('Type Here', '5', 6);
        getInputByPlaceholder('Type Here', '6', 7);

        cy.get('button[type="button"]').eq(7).click();

        cy.get('.model-list').eq(4)
            .within(() => {
                getInputByPlaceholder('Type Here', 'Test1');
                getInputByPlaceholder('Type Here', 'Test2', 1);
                cy.get('input').eq(1).type('5')
                    .should('have.value', '5');
                cy.get('input').eq(3).type('8')
                    .should('have.value', '8');
            });

        cy.contains('Next').click();

        cy.log('---- STEP 6 ----');

        cy.get('button[type="button"]').eq(0).click();

        getInputByPlaceholder('Type Here', 'Test Client');
        getInputByPlaceholder('Type Here', '12345678', 1);
        getInputByPlaceholder('Type Here', 'Test Location', 2);
        getInputByPlaceholder('Type Here', '2000000', 3);
        selectFromDropdown('Turn Key');
        cy.get('.react-datepicker-wrapper').eq(0).click();
        cy.get('.react-datepicker__day--today').click();

        getInputByPlaceholder('Type Here', 'Test Client2', 4);
        getInputByPlaceholder('Type Here', '84560375', 5);
        getInputByPlaceholder('Type Here', 'Test Location2', 6);
        getInputByPlaceholder('Type Here', '1000000', 7);
        selectFromDropdown('Structure Only', 1);
        cy.get('.react-datepicker-wrapper').eq(1).click();
        cy.get('.react-datepicker__day--today').click();

        getInputByPlaceholder('Type Here', 'Test Client3', 8);
        getInputByPlaceholder('Type Here', '76548761', 9);
        getInputByPlaceholder('Type Here', 'Test Location3', 10);
        getInputByPlaceholder('Type Here', '3000000', 11);
        selectFromDropdown('Turn Key', 2);
        cy.get('.react-datepicker-wrapper').eq(2).click();
        cy.get('.react-datepicker__day--today').click();

        cy.contains('Next').click();

        cy.log('---- STEP 7 ----');

        cy.get('input[accept="image/*,application/pdf"]').attachFile('example.pdf');
        cy.get('input[accept="image/*,application/pdf"]').eq(1).attachFile('example.pdf');
        cy.get('input[accept="image/*"]').attachFile('type.png');

        cy.get('.textarea__input').type('Lorem Ipsum Dolor Sit Amet')
            .should('have.value', 'Lorem Ipsum Dolor Sit Amet');

        cy.contains('Submit').click();

        cy.log('---- REDIRECT DETAILS ----');

        cy.contains('Edit Profile Details').click();
        cy.url().should('include', '/settings/general');
    });
});
