import { dtos, Mobx, models } from '~/api';
import { type Project } from '~/models';
import { getContractorViewBids } from '../getContractorViewBids';

export const getProjectBids = async (project: Project) => {
    const data = await dtos.construction.execListProjectBidByIdQuery({
        projectId: project.id.asNumber(),
        page: 1,
        pageSize: 9999,
    });

    if (!data || !data.result || data.result.length === 0) {
        return [];
    }

    const { result } = data;

    const contractorIds = result
        .map(bid => bid.contractorId)
        .filter((x): x is number => typeof x === 'number');

    const contractors = await getContractorViewBids(contractorIds);

    return result.map(item => {
        const projectBid = models.projectBid.toInternalProjectBid(project, item);
        const contractor = contractors?.find(x => x.id.asNumber() === item.contractorId);

        return Mobx.extendsObservable(projectBid, {
            contractor,
        });
    });
};
