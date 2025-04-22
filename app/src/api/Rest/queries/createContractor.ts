import { Id } from '~/api/Id';
import { dtos } from '..';

export const createContractor = async (contractor: dtos.contractor.CreateContractorCommand) => {
    const data = await dtos.contractor.execCreateContractorCommand(contractor);

    if (!data) {
        return;
    }

    return Id.init(data.id, 'external');
};
