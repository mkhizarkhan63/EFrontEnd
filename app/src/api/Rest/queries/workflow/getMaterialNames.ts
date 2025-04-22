import { MaterialName } from '~/models/PmModels/MaterialName';
import { dtos } from '../..';

export const getMaterialNames = async (constructionProjectId: number) => {
    const res = await dtos.workflow.execGetListMaterialNamesQuery({ constructionProjectId });

    if (!res) {
        return false;
    }

    return res.result.map(item => MaterialName.create({
        id: item.id,
        englishName: item.englishName,
        arabicName: item.arabicName,
    }));
};
