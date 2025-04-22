import { Id, Img, Mobx } from '~/api';
import { ProjectBidContractor } from '~/models';
import { dtos } from '..';

export const getContractorViewBids = async (ids: number[]) => {
    if (ids.length === 0) {
        return;
    }

    const data = await dtos
        .contractor
        .execListContractorBidViewByIdsQuery({ ids });

    if (!data || !data.result) {
        return;
    }

    return Promise.all(data.result.map(toInternalBidView));
};

const toInternalBidView = (external: dtos.contractor.ContractorBidViewDto) => {
    const bidView = new ProjectBidContractor();

    if (external.companyLogoId) {
        Mobx.extendsObservable(bidView, {
            logo: Img.tryCreate(external.companyLogoId),
        });
    }

    Mobx.extendsObservable(bidView, {
        id: Id.init(external.id, 'external'),
        name: external.name ?? '',
        numberOfEngineers: external.numberOfEngineers ?? 0,
        numberOfLabors: external.numberOfLabors ?? 0,
        yearsOfExperience: external.yearsOfExperience ?? 0,
        phone: external.phone ?? '',
    });

    return bidView;
};
