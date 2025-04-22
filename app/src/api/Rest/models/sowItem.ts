import { enums, Id, Mobx, T, type dtos, models } from '~/api';
import { FileData, SowItem } from '~/models';
import { toInternalSowSubitem } from './sowSubitem';

type InternalSowItemProp =
    | dtos.construction.SowItemDto
    | dtos.contract.ContractSowItemDto
    | dtos.construction.SowItemWithInstallationDto
    | dtos.construction.SowItemWithUsageAmountDto;

export const toInternalSowItem = (x: InternalSowItemProp) => {
    const sowItem = new SowItem();

    Mobx.extendsObservable(sowItem, {
        id: Id.init(x.id, 'external'),
        arabicName: x.arabicName,
        englishName: x.englishName,
        orderNumber: x.orderNumber,
        numberOfSpecs: x.numberOfSpecs,
        consultantVisits: x.consultantVisits,
        numberOfWorkflows: x.numberOfWorkflows,
        category: T.create(
            x.category,
            enums.sowItemCategory.castToInternal,
        ),
    });

    // Construction
    if ('versionId' in x) {
        Mobx.extendsObservable(sowItem.forConstruction, {
            sowId: Id.tryInit(x.versionId, 'external'),
            showItemInFrontend: x.showItemInFrontend,
            isMandatory: x.isMandatory,
            sowSubItems: x.itemUnits
                ?.map(item => models.sowSubitem.toInternalSowSubitem(item))
                .sort((a, b) => a.orderNumber - b.orderNumber),
        });
    }

    // Contract
    if ('contractId' in x) {
        Mobx.extendsObservable(sowItem.forContract, {
            contractId: Id.tryInit(x.contractId, 'external'),
            sowSubItemList: x.itemUnits?.map(item => toInternalSowSubitem(item)),
            approval: x.approval,
            materialExecutionStage: x.materialExecutionStage,
        });
    }

    // ProjeCreate
    if ('installation' in x) {
        Mobx.extendsObservable(sowItem, {
            installBy: x.installation,
        });
    }

    // With use count
    if ('itemVisibility' in x) {
        Mobx.extendsObservable(sowItem, {
            sowItemVisibility: T.create(x.itemVisibility, enums.sowItemVisibility.castToInternal),
            sowItemChangeStatus: T.create(x.changeStatus, enums.sowItemChangeStatus.castToInternal),
            sowItemUseTimes: x.amount,
        });
    }

    if (x.iconFileId) {
        const logo = FileData.create({
            fileId: x.iconFileId,
        });

        logo.loadImgFromId(x.iconFileId);
        logo.connect();

        Mobx.extendsObservable(sowItem, {
            logo,
        });
    }

    return sowItem;
};
