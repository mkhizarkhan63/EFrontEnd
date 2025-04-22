import { LazyData, restQuery } from '~/api';

export class Contractors {
    dicts = new LazyData(
        'Contractor dictionaries',
        restQuery.getContractorDictionaries,
        {
            consultantProductUnit: [],
            designServiceUnits: [],
            productUnits: [],
            serviceUnits: [],
            specializations: [],
        },
    ).lock();
}
