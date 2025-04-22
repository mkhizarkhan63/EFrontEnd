import { lang, E, type T } from '~/api';
import { isEnum } from '.';
import { capitalize } from './string';

const stringSizeRegEx = /^expected a string with a length between `(\d+)` and `(\d+)` but received one with a length of `(\d+)`$/i;
const numberSizeRegEx = /^expected a number between `(\d+)` and `(\d+)` but received `(\d+)`$/i;
const numberMinRegEx = /^Expected a number greater than or equal to (\d+) but received `(\d+)`/;

const translateString = (error: T.Failure, name: string) => {
    if (error.refinement === 'size') {
        const res = error.message.match(stringSizeRegEx);

        if (res) {
            return lang.dict.format('inputErrorLength', [name, res[1], res[2]]);
        }
    }

    return lang.dict.format('inputError', [name]);
};

const translateNumber = (error: T.Failure, name: string) => {
    if (error.refinement === 'size') {
        const res = error.message.match(numberSizeRegEx);

        if (res) {
            if (error.key === 'timeOfStage') {
                return lang.dict.format('timeOfStageError', [`${error.path[0] as number + 1}`, res[1], res[2]]);
            }
            return lang.dict.format('inputErrorSize', [name, name, res[1], res[2]]);
        }
    }

    const res = error.message.match(numberMinRegEx);

    if (res) {
        return lang.dict.format('inputErrorMin', [name, name, res[1]]);
    }
};

const customErrorMessage = (error: T.Failure, name: string) => {
    switch (error.type) {
        case 'nameDesc':
            return lang.dict.format('nameDescError', [name]);
        case 'emptyPartList':
            return lang.dict.format('emptyListError', [name]);
        case 'limit':
            return lang.dict.format('percentageLimitError', [name]);
        case 'suggestedPercentage':
            return lang.dict.format('suggestedPercentageError', [name]);
        case 'acceptanceWorkflow':
            return lang.dict.format('acceptanceWorkflow', [name]);
        case 'wilayatPrices':
            return lang.dict.get('wilayatPrices');
        case 'literal':
            return lang.dict.format('itemsInStageError', [name]);
        default:
            return name;
    }
};

const customErrorTypes = ['nameDesc', 'emptyPartList', 'limit', 'suggestedPercentage', 'acceptanceWorkflow', 'wilayatPrices', 'literal'];

export const translateError = (error: T.Failure) => {
    const paths = error.path.filter(e => typeof e === 'string');

    let dictCode = paths.map((e, index) => (index > 0 ? capitalize(e) : e)).join('');

    if (customErrorTypes.includes(error.type)) {
        dictCode = error.path[0];
    }

    if (!isEnum(E.Validation)(dictCode)) {
        return dictCode;
    }

    const name = lang.dict.enum('validation', dictCode);

    if (customErrorTypes.includes(error.type)) {
        return customErrorMessage(error, name);
    }

    switch (error.type) {
        case 'object':
        case 'enums':
        case 'id':
        case 'instance':
            return lang.dict.format('listError', [name]);
        case 'string':
            return translateString(error, name);
        case 'number':
            return translateNumber(error, name);
        case 'supplier':
        case 'rate':
        case 'email':
        case 'mobile':
        case 'moment':
        case 'confirmPassword':
        case 'badPassword':
        case 'password':
        case 'url':
        case 'crNumber':
            return lang.dict.format('inputError', [name]);
        case 'name':
            return lang.dict.format('nameError', [name]);
        case 'files':
            return lang.dict.format('filesError', [name]);
        case 'percent':
            return lang.dict.format('percentError', [name]);
        case 'array':
        case 'set':
            return lang.dict.format('checkError', [name]);
        case 'sumOfPercentages':
            return lang.dict.format('sumOfPercentagesError', [name, error.message]);
        case 'subItemsLength':
            return lang.dict.format('subItemsLength', [name]);
        case 'companyAlready':
            return lang.dict.format('companyAlready', [name]);
        case 'companyDoesNotExist':
            return lang.dict.format('companyDoesNotExist', [name]);
        case 'isNotAlreadyInvited':
            return lang.dict.format('isNotAlreadyInvited', [name]);
        case 'missingOwner':
            return lang.dict.get('missingOwner');
        case 'alreadyAssign':
            return lang.dict.get('alreadyAssign');
        case 'clientDoesNotExist':
            return lang.dict.format('clientDoesNotExist', [name]);
        case 'lastWorkflowHasMinimumTasks':
            return lang.dict.get('lastWorkflowHasMinimumTasks');
        case 'lastSowItemHasItemUnits':
            return lang.dict.get('lastSowItemHasItemUnits');
        case 'firstStageHasAdvancePayment':
            return lang.dict.get('firstStageHasAdvancePayment');
        case 'isPriceValid':
            return lang.dict.get('isPriceValid');
        case 'isMaterialFinished':
            return lang.dict.get('isMaterialFinished');
        case 'previousStagesCompleted':
            return lang.dict.get('previousStagesCompleted');
    }

    return `[${name}] ${error.message}`;
};
