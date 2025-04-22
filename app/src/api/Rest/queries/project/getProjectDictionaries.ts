import { Id } from '~/api/Id';
import { Mobx, dtos } from '~/api';
import { Governorate, Wilayat } from '~/models';

export const getProjectDictionaries = async () => {
    const data = await dtos.construction.execListDictionaryDataQuery(undefined);

    const rawResult = {
        governorates: [],
        wilayats: [],
        ...data ?? {},
    };

    return {
        governorates: rawResult.governorates.map(entry => {
            const item = new Governorate();

            Mobx.extendsObservable(item, {
                id: Id.tryInit(entry.id, 'external'),
                abbreviation: entry.abbreviation,
                altDisplayName: entry.displayName,
                translationKey: entry.translationKey,
            });

            return item;
        }),
        wilayats: rawResult.wilayats.map(entry => {
            const item = new Wilayat();

            Mobx.extendsObservable(item, {
                id: Id.tryInit(entry.id, 'external'),
                governorateId: Id.tryInit(entry.governorateId, 'external'),
                altDisplayName: entry.displayName,
                translationKey: entry.translationKey,
            });

            return item;
        }),
    };
};
