import { dtos, type Id } from '~/api';

export const updateSelectBid = async (projectBidId: Id, projectId: Id, unSelect = false) => {
    if (projectId.isType('internal') || projectBidId.isType('internal')) {
        return;
    }

    return await dtos.construction.execUpdateConstructionProjectStatusToBidSelectedCommand({
        projectBidId: projectBidId.asNumber(),
        id: projectId.asNumber(),
        ...unSelect ? { unSelect } : {},
    });
};
