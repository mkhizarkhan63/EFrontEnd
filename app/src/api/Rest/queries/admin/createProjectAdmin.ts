import { E, Id, T, dtos, enums } from '~/api';
import type { ProjectDraft } from '~/models';
import { file } from '..';

export const createProjectAdmin = async (draft: ProjectDraft) => {
    if (!draft.wilayatId || !draft.governorateId) {
        return false;
    }

    const clientExist = await dtos.profile.execGetProfileByPhoneQuery(
        {
            phone: draft.forAdmin.client.mobile,
        },
    );

    if (!clientExist) {
        return new Error("Client doesn't exist");
    }

    draft.clientId = Id.init(clientExist.result.id, 'external');

    const krookieFiles = await file.add(draft.krookieFiles);

    const drawingFiles = await file.add(draft.drawingsFiles);

    await Promise.all(draft.filesToRemove.map(id => file.deleteId(id)));

    const isConstructionType = draft.startingStep === E.ProjectStartingStep.build ? true : undefined;

    const raw: dtos.construction.CreateConstructionProjectCommand = {
        startingStep: T.create(
            draft.startingStep,
            enums.ProjectStartingStep.castToExternal,
        ),
        clientId: clientExist.result.id,
        landArea: draft.forAdmin.project.landArea,
        buildingAllAreaInTheDrawings: draft.forAdmin.project.buildingAllAreaInTheDrawings,
        addedBuiltUpArea: draft.forAdmin.project.addedBuiltUpArea || 1,
        constructionType: isConstructionType && T.create(
            draft.constructionType,
            enums.ConstructionType.castToExternal,
        ),
        landType: T.create(
            draft.landType,
            enums.ConstructionLand.castToExternal,
        ),
        wilayatId: draft.wilayatId.asNumber(),
        governorateId: draft.governorateId.asNumber(),
        additionalComment: draft.forAdmin.project.additionalComment,
        krookieFiles,
        drawingFiles,
    };

    const response = await dtos
        .construction
        .execCreateConstructionProjectCommand(raw);

    if (!response || !response.isSuccess) {
        return false;
    }

    return response.id;
};
