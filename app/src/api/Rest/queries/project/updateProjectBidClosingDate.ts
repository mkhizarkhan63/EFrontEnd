import { dtos, type E } from '~/api';

export const updateProjectBidClosingDate = async (id: number, option: E.BidClosingDateOption) => await dtos.construction.execUpdateConstructionProjectBidClosingDateCommand({
    id,
    bidClosingDateOption: option,
});
