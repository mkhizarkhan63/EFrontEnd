import type { Project } from '~/models';
import { Id, dtos } from '~/api';

export const postProjectBid = async (project: Project) => {
    if (project.id.isType('internal')) {
        return;
    }

    const externalProjectBid: dtos.construction.CreateProjectBidCommand = {
        totalPrice: 0,
        structureItemsTotalPrice: 0,
        turnkeyItemsTotalPrice: 0,
        totalDays: 0,
        message: '',
        projectId: project.id.asNumber(),
    };

    const res = await dtos
        .construction
        .execCreateProjectBidCommand(externalProjectBid);

    return res ? Id.init(res.id, 'external') : false;
};
