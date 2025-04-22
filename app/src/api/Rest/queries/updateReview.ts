import { dtos, E, restQuery, T } from '~/api';
import type { ClientReferenceType, CompanyType } from '~/models';
import { loadFileNames } from '~/utils';
import { ConstructionType, DesignType } from '../enums';

type Props = {
    reference: ClientReferenceType;
    company?: CompanyType;
};

export const updateReview = async ({ reference, company }: Props) => {
    if (!company || !reference.externalId || !company.externalId) {
        return;
    }

    const profileType = company.type === E.ProfileType.consultant ? 'Consultant' : 'Contractor' as const;

    const images: string[] = [];

    await Promise.all(reference.filesToRemove.map(id => restQuery.file.deleteId(id)));

    reference.resetFileToRemove();

    if (reference.images) {
        images.push(...await restQuery.file.add(reference.images));

        reference.images.forEach((item, i) => {
            item.setFileId(images[i]);
            item.connect();
        });

        await loadFileNames(reference.images);
    }

    const projectType = company.type === E.ProfileType.contractor
        ? {
            projectType: T.create(
                reference.projectType,
                ConstructionType.castToExternal,
            ),
        }
        : {
            designType: T.create(
                reference.projectType,
                DesignType.castToExternal,
            ),
        };

    const response = await dtos.contractor[
        `execUpdate${profileType}ClientReferenceCommand`
    ]({
        id: reference.externalId,
        clientName: reference.clientName,
        phoneNumber: reference.phoneNumber,
        governorateId: reference.governorateId?.asNumber(),
        wilayatId: reference.wilayatId?.asNumber(),
        projectValue: reference.projectValue,
        projectCompletionDate: reference.projectCompletionDate?.toISOString(),
        startDate: reference.projectStartDate?.toISOString(),
        imagesIds: images,
        companyId: company.externalId,
        ...projectType,
    });

    if (!response) {
        return;
    }

    const id = reference.stars.externalId;

    const rensponseStars = await dtos.contractor[
        `exec${id ? 'Update' : 'Create'}${profileType}ProjectReviewCommand`
    ]({
        id: id ?? 0,
        recommendation: reference.stars.recommendation,
        communication: reference.stars.communication,
        qualityOfWork: reference.stars.qualityOfWork,
        speedOfWork: reference.stars.speedOfWork,
        management: reference.stars.management,
        cooperation: reference.stars.cooperation,
        feedBack: reference.stars.feedBack,
        clientReferenceId: reference.externalId,
    });

    if (!rensponseStars) {
        return;
    }

    if (!id) {
        reference.stars.connect(rensponseStars.id);
    }

    return rensponseStars.isSuccess;
};
