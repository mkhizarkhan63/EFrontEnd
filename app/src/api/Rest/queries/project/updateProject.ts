import type { Project, ProjectDraft } from '~/models';
import { T, dtos, enums } from '~/api';
import { file } from '..';

export const updateProject = async (project: Project | ProjectDraft, publish: boolean) => {
    if (!project.wilayatId || !project.governorateId || project.id.isType('internal')) {
        return false;
    }

    const krookieFilesId = await file.add(project.krookieFiles);

    const drawingsFilesId = await file.add(project.drawingsFiles);

    await Promise.all(project.filesToRemove.map(id => file.deleteId(id)));

    const externalProject: dtos.construction.UpdateConstructionProjectCommand = {
        id: project.id.asNumber(),
        landArea: project.landArea,
        addedBuiltUpArea: project.addedBuiltUpArea,
        landType: T.create(
            project.landType,
            enums.ConstructionLand.castToExternal,
        ),
        constructionType: T.create(
            project.constructionType,
            enums.ConstructionType.castToExternal,
        ),
        wilayatId: project.wilayatId.asNumber(),
        governorateId: project.governorateId.asNumber(),
        buildingAllAreaInTheDrawings: project.buildingAllAreaInTheDrawings,
        krookieFiles: krookieFilesId,
        drawingFiles: drawingsFilesId,
        additionalComment: project.additionalComment,
        changeStatusToReview: publish,
        stageTemplateId: project.stageTemplateId?.asNumber(),
        designId: 'designId' in project && project.designId?.isType('external')
            ? project.designId.asNumber()
            : undefined,
    };

    const response = await dtos
        .construction
        .execUpdateConstructionProjectCommand(externalProject);

    if (!response || !response.isSuccess) {
        return false;
    }

    return response.id;
};
