import { describe, e2e, cy, it } from '~cypress';
import { checkCheckboxByLabel, checkRadioByLabel, getInputByPlaceholder, selectFromDropdown } from '../utils/Input';

describe('Consultant register', () => {
    before(() => {
        e2e.host();
    });

    it('Register new consultant', () => {
        cy.login('66666666', '0000');
        cy.errorlessVisit('/company/register');
        cy.get('.register-box', { timeout: 10000 }).contains('Consultant').click();
        cy.contains('Register Now').click();

        cy.log('---- STEP 1 ----');

        cy.contains('Construction').should('not.exist');
        cy.contains('Phone Number').should('not.exist');
        cy.contains('Email').should('not.exist');

        getInputByPlaceholder('Write Name', 'David');
        getInputByPlaceholder('Write Years', '10');

        checkRadioByLabel('Yes', 1);
        checkRadioByLabel('No');

        getInputByPlaceholder('Write Name', 'Joe');
        getInputByPlaceholder('Write Years', '12');
        getInputByPlaceholder('Write Phone', '12345678');
        getInputByPlaceholder('Write Email', 'test@gmail.com');

        checkRadioByLabel('Yes', 1);
        checkRadioByLabel('Yes');

        cy.get('input').eq(2).should('have.value', 'David');
        cy.get('input').eq(3).should('have.value', '10');
        cy.get('input').eq(4).should('be.checked');

        checkRadioByLabel('No');

        cy.get('input').eq(2).should('have.value', 'Joe');
        cy.get('input').eq(3).should('have.value', '12');
        cy.get('input').eq(4).should('have.value', '12345678');
        cy.get('input').eq(5).should('have.value', 'test@gmail.com');
        cy.get('input').eq(6).should('be.checked');

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

        cy.contains('Next').click();

        cy.log('---- STEP 3 ----');

        cy.intercept('https://ebina-api.test.softwarespace.io/contractor/getconsultantquery/**').as('consultantQuery');
        cy.wait('@consultantQuery');

        cy.get('input').eq(1).should('be.checked');
        cy.get('input').eq(3).should('be.checked');
        cy.get('.product-list').should('not.exist');
        cy.get('.governates').should('not.exist');
        cy.get('button[data-color="gray"]').should('not.exist');

        checkRadioByLabel('Yes');

        cy.get('input').eq(2).type('50').should('have.value', '50');
        cy.get('input').eq(3).type('52').should('have.value', '52');
        cy.get('input').eq(4).type('55').should('have.value', '55');
        cy.get('input').eq(5).type('20').should('have.value', '20');
        cy.get('input').eq(6).type('25').should('have.value', '25');

        cy.get('input').eq(8).should('be.disabled');
        cy.get('input').eq(10).should('be.disabled');
        cy.get('input').eq(12).should('be.disabled');
        cy.get('input').eq(14).should('be.disabled');

        cy.get('.checkbox-container').eq(0).click();
        cy.get('.checkbox-container').eq(1).click();
        cy.get('.checkbox-container').eq(2).click();
        cy.get('.checkbox-container').eq(3).click();

        cy.get('input').eq(7).should('be.checked');
        cy.get('input').eq(9).should('be.checked');
        cy.get('input').eq(11).should('be.checked');
        cy.get('input').eq(13).should('be.checked');

        getInputByPlaceholder('Price/m2', '220', 2);
        getInputByPlaceholder('Price/m2', '230', 3);
        getInputByPlaceholder('Price/m2', '240', 4);
        getInputByPlaceholder('Price/m2', '250', 5);

        cy.get('button[data-color="blue"]').eq(0).click();
        cy.get('.input-group__row').eq(1).get('button[data-color="gray"]');

        cy.get('input').eq(5).type('30').should('have.value', '30');
        cy.get('input').eq(6).type('32').should('have.value', '32');
        cy.get('input').eq(7).type('35').should('have.value', '35');

        cy.get('button[data-color="gray"]').click().should('not.exist');

        checkRadioByLabel('Yes', 1);

        cy.get('form').eq(3).should('not.exist');

        cy.get('input[placeholder="Write OMR/Visit"]').should('be.disabled');

        selectFromDropdown('Dhofar');

        cy.get('.checkbox-container').eq(4).click();
        selectFromDropdown('Sadah', 1);
        getInputByPlaceholder('Write OMR/Visit', '20');

        cy.get('.checkbox-container').eq(5).click();
        selectFromDropdown('Salah', 2);
        getInputByPlaceholder('Write OMR/Visit', '30', 1);

        cy.get('.checkbox-container').eq(6).click();
        selectFromDropdown('Taqah', 3);
        getInputByPlaceholder('Write OMR/Visit', '40', 2);

        cy.get('.checkbox-container').eq(7).click();
        selectFromDropdown('Dhalkut', 4);
        getInputByPlaceholder('Write OMR/Visit', '50', 3);

        cy.get('.checkbox-container').eq(8).click();
        selectFromDropdown('Mirbat', 5);
        getInputByPlaceholder('Write OMR/Visit', '60', 4);

        cy.get('button[data-color="blue"]').eq(1).click();

        cy.get('form').eq(3).get('input[placeholder="Write OMR/Visit"]').should('be.disabled');

        selectFromDropdown('Muscat', 6);

        cy.get('.checkbox-container').eq(9).click();
        selectFromDropdown('Muscat', 7);
        getInputByPlaceholder('Write OMR/Visit', '70', 5);

        cy.get('.checkbox-container').eq(10).click();
        selectFromDropdown('Seeb', 8);
        getInputByPlaceholder('Write OMR/Visit', '80', 6);

        cy.get('.checkbox-container').eq(11).click();
        selectFromDropdown('Bawshar', 9);
        getInputByPlaceholder('Write OMR/Visit', '90', 7);

        cy.get('.checkbox-container').eq(12).click();
        selectFromDropdown('Muttrah', 10);
        getInputByPlaceholder('Write OMR/Visit', '100', 8);

        cy.get('.checkbox-container').eq(13).click();
        selectFromDropdown('Al Amarat', 11);
        getInputByPlaceholder('Write OMR/Visit', '110', 9);

        cy.get('button[data-color="gray"]').click().should('not.exist');

        cy.contains('Next').click();

        cy.log('---- STEP 4 ----');

        getInputByPlaceholder('Write Number', '3');
        getInputByPlaceholder('Write Number', '10', 1);

        getInputByPlaceholder('In OMR', '5');

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

        cy.get('button[type="button"]').eq(0).click();

        selectFromDropdown('Architect', 0);
        selectFromDropdown('Project Manager', 1);
        getInputByPlaceholder('Type Here', '1', 0);
        getInputByPlaceholder('Type Here', '2', 1);

        cy.get('button[type="button"]').eq(2).click();

        selectFromDropdown('Accountant', 2);
        selectFromDropdown('PRO', 3);
        getInputByPlaceholder('Type Here', '5', 2);
        getInputByPlaceholder('Type Here', '6', 3);

        cy.get('button[data-color="gray"]').eq(0).click().should('not.exist');
        cy.get('button[data-color="gray"]').click().should('not.exist');

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

        cy.get('button[data-color="gray"]').click().should('not.exist');

        cy.contains('Next').click();

        cy.log('---- STEP 7 ----');

        cy.get('input[accept="image/*,application/pdf"]').attachFile('example.pdf');
        cy.get('input[accept="image/*,application/pdf"]').eq(1).attachFile('example.pdf');
        cy.get('input[accept="image/*,application/pdf"]').eq(2).attachFile('example.pdf');
        cy.get('input[accept="image/*"]').attachFile('type.png');
        cy.get('input[accept="*"]').attachFile('example.pdf');

        cy.get('.textarea__input').type('Lorem Ipsum Dolor Sit Amet')
            .should('have.value', 'Lorem Ipsum Dolor Sit Amet');

        cy.contains('Submit').click();

        cy.log('---- REDIRECT DETAILS ----');

        cy.contains('Edit Profile Details').click();
        cy.url().should('include', '/settings/general');
    });
});