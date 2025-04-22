import { E } from '~/api';
import { dtos } from '..';

type Params = {
    id?: number;
    type: E.ProfileType;
    status: E.CompaniesStatus.rejected | E.CompaniesStatus.approved;
};

export const updateCompanyStatus = async (params: Params) => {
    if (!params.id) {
        return;
    }

    const profileType = params.type === E.ProfileType.consultant ? 'Consultant' : 'Contractor';
    const status = params.status === E.CompaniesStatus.rejected ? 'Rejected' : 'Approved';
    await dtos.contractor[`execUpdate${profileType}StatusTo${status}Command`]({ id: params.id });
};
