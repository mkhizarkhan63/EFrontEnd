import { dtos, Id, Mobx, T } from '~/api';
import { DictionaryData } from '~/models';
import { ResourceType } from '../enums';

type Data =
    | dtos.contractor.DictionaryDataDto
    | dtos.contractor.SpecializationDto;

export const getContractorDictionaries = async () => {
    const data = await dtos.contractor.execListDictionaryDataQuery(undefined);

    const rawResult = {
        consultantProductUnit: [],
        designServiceUnits: [],
        productUnits: [],
        serviceUnits: [],
        specializations: [],
        ...data ?? {},
    };

    return {
        consultantProductUnit: rawResult.consultantProductUnit.map(toInternal),
        designServiceUnits: rawResult.designServiceUnits.map(toInternal),
        productUnits: rawResult.productUnits.map(toInternal),
        serviceUnits: rawResult.serviceUnits.map(toInternal),
        specializations: rawResult.specializations.map(toInternal),
    };
};

const toInternal = (x: Data) => {
    const dictionaryData = new DictionaryData();

    Mobx.extendsObservable(dictionaryData, {
        id: Id.init(x.id, 'external'),
        altDisplayName: x.displayName,
        translationKey: x.translationKey,
        systemName: x.systemName,
        type: 'type' in x
            ? T.create(x.type, ResourceType.castToInternal)
            : undefined,
    });

    return dictionaryData;
};
