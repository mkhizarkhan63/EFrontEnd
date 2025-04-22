import { dtos, enums } from '../..';
import type { ProjectDraft } from '~/models';
import { T } from '~/api';
import { file } from '..';

export const postProject = async (project: ProjectDraft, publish = false) => {
    if (!project.wilayatId || !project.governorateId) {
        return false;
    }

    const krookieFilesId = await file.add(project.krookieFiles);

    const drawingsFilesId = await file.add(project.drawingsFiles);

    await Promise.all(project.filesToRemove.map(id => file.deleteId(id)));

    const raw: dtos.construction.CreateConstructionProjectCommand = {
        landArea: project.landArea,
        buildingAllAreaInTheDrawings: project.buildingAllAreaInTheDrawings,
        addedBuiltUpArea: project.addedBuiltUpArea,
        landType: T.create(
            project.landType,
            enums.ConstructionLand.castToExternal,
        ),
        wilayatId: project.wilayatId.asNumber(),
        governorateId: project.governorateId.asNumber(),
        additionalComment: project.additionalComment,
        startingStep: T.create(
            project.startingStep,
            enums.ProjectStartingStep.castToExternal,
        ),
        krookieFiles: krookieFilesId,
        drawingFiles: drawingsFilesId,
        changeStatusToReview: publish,
    };

    if (project.constructionType) {
        raw.constructionType = T.create(
            project.constructionType,
            enums.ConstructionType.castToExternal,
        );
    }

    const data = await dtos
        .construction
        .execCreateConstructionProjectCommand(raw);

    if (data === false) {
        return false;
    }

    return data.id;
};
