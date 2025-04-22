import { dtos, enums, Mobx, models, T, type E } from '~/api';
import { SowItemByProjectType } from '~/models';

export const getSowItemsByTypeProject = async (
    constructionType: E.ConstructionType,
    sowVersionId?: number,
) => {
    const response = await dtos.construction.execListProjectMaterialsQuery({
        constructionType: T.create(
            constructionType,
            enums.ConstructionType.castToExternal,
        ),
        sowVersionId,
    });

    const projectTypeSowItems = new SowItemByProjectType();

    if (!response || !response.result) {
        return projectTypeSowItems;
    }

    const data = response.result;

    Mobx.extendsObservable(projectTypeSowItems, {
        contractorItems: data.contractorItems
            ?.map(item => models.sowItem.toInternalSowItem(item)),
        clientItems: data.clientItems
            ?.map(item => models.sowItem.toInternalSowItem(item)),
    });

    return projectTypeSowItems;
};
