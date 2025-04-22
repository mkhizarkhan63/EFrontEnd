import { dtos, type Id } from '~/api';

export const post = async (projectId: Id) => {
    if (projectId.isType('internal')) {
        return;
    }

    return await dtos.contract.execCreateContractCommand({ projectId: projectId.asNumber() });
};
