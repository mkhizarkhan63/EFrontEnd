import { type Paging } from '~/api/Paging';
import { dtos } from '..';
import { ContractorForInvite, FileData } from '~/models';
import { stores } from '~/stores';
import { Id } from '~/api/Id';

export const getContractorsForInvite = async (projectId: number, governorateId?: number, paging?: Paging) => {
    const res = await dtos.contractor.execListContractorWithInvitationStatusQuery({
        constructionProjectId: projectId,
        governorateId,
        ...paging?.toQuery(),
    });

    if (!res) {
        return [];
    }

    paging?.setPagesCount(res.pageCount ?? 0);
    paging?.setRowCount(res.rowCount ?? 0);

    return Promise.all(res.result.map(async item => ContractorForInvite.create({
        id: stores.idCollection.getInternal('contractorForInvite', item.id),
        name: item.name,
        headOfficeGovernorateId: Id.init(item.headOfficeGovernorateId, 'external'),
        completedProjects: item.projectsDelivered,
        avatar: await toInternalAvatar(item.companyLogoId),
        engineers: item.numberOfEngineers,
        labors: item.numberOfLabors,
        isInvited: item.isInvited,
        isSubmitted: item.isSubmitted,
        phone: item.phone,
    })));
};

const toInternalAvatar = async (logoId?: string) => {
    if (!logoId) {
        return;
    }

    const file = await FileData.tryFromExternal(logoId);
    file?.loadImg();
    return file;
};
