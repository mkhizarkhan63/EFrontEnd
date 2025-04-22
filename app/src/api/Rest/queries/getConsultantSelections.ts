import { E } from '~/api';
import { Consultant, FileData } from '~/models';
import { stores } from '~/stores';
import { dtos } from '..';

export const getConsultantSelections = async (wilayatId?: number, projectId?: number) => {
    const data = await dtos.contractor.execListConsultantSelectionQuery({
        wilayatId,
        projectId,
    });

    if (!data) {
        return [];
    }

    const { result } = data;

    return await Promise.all(result.map(async external => Consultant.create({
        id: stores.idCollection.getInternal('company', external.id),
        type: E.ProfileType.consultant,
        name: external.name,
        logo: await toInternalAvatar(external.companyLogoId),
        yoursYearsOfExperience: external.yearsOfExperience,
        numberOfEngineers: external.numberOfEngineers,
        pricePerSquareMeter: external.pricePerSquareMeter,
        numberOfServices: external.numberOfServices,
        totalVisits: external.totalVisits,
        isInvited: external.isInvited,
        templateTimeOfProject: external.templateTimeOfProject,
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
