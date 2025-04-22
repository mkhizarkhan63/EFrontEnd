import { dtos, models } from '~/api';
import { type Project } from '~/models';

export const getProjectBid = async (project: Project) => {
    const { bidId } = project.forContractor;

    if (!bidId || bidId.isType('internal')) {
        return;
    }

    const data = await dtos.construction.execGetProjectBidQuery({
        id: bidId.asNumber(),
    });

    if (!data || !data.result) {
        return;
    }

    const { result } = data;
    return models.projectBid.toInternalProjectBid(project, result);
};
