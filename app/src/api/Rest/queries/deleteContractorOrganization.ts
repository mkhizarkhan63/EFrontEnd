import { dtos } from '..';

export const deleteContractorOrganization = (idToDelete: number) => dtos
    .contractor
    .execDeleteContractorOrganizationCommand({ id: idToDelete });
