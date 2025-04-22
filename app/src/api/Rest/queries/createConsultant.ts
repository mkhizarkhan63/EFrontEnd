import { Id } from '~/api/Id';
import { dtos } from '..';

export const createConsultant = async (consultant: dtos.contractor.CreateConsultantCommand) => {
    const data = await dtos.contractor.execCreateConsultantCommand(consultant);

    if (data === false) {
        return false;
    }

    return Id.init(data.id, 'external');
};
