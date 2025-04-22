import moment from 'moment';
import { enums, Img, restQuery, T, type dtos } from '~/api';
import { Actor, Phase, PmProject, PmStage, UserTask, WorkflowSequence } from '~/models';
import { stores } from '~/stores';

type Avatars = {
    client?: Img;
    contractor?: Img;
    consultant?: Img;
};

export const toInternalPmProject = async (projectId: number, project?: dtos.workflow.ProjectDto, validations?: dtos.workflow.SubmissionValidations) => {
    const avatarIds = {
        client: project?.clientId ? await restQuery.getAvatarId(project.clientId, false) : '',
        contractor: project?.contractorId ? await restQuery.getAvatarId(project.contractorId, true) : '',
        consultant: project?.consultantId ? await restQuery.getAvatarId(project.consultantId, true) : '',
    };

    const avatars = {
        client: Img.tryCreate(avatarIds.client),
        contractor: Img.tryCreate(avatarIds.contractor),
        consultant: Img.tryCreate(avatarIds.consultant),
    };

    return PmProject.create({
        id: stores.idCollection.getInternal('project', projectId),
        phases: toInternalPhases(project?.phases, avatars),
        startDate: T.create(project?.startDate, T.MaybeTimestamp),
        estimatedFinishDate: T.create(project?.estimatedFinishDate, T.MaybeTimestamp),
        contractorId: project?.contractorId,
        consultantId: project?.consultantId,
        supplierId: project?.supplierId,
        clientId: project?.clientId,
        baselineStartDate: T.create(project?.baselineStartDate, T.MaybeTimestamp),
        baselineFinishDate: T.create(project?.baselineFinishDate, T.MaybeTimestamp),
        isMaterialFinished: validations?.isMaterialFinished,
        previousStagesCompleted: validations?.previousStagesCompleted,
    });
};

const toInternalPhases = (phases?: dtos.workflow.PhaseDto[], avatars?: Avatars) => {
    if (phases?.length === 0) {
        return [];
    }

    return phases?.map(phase => Phase.create({
        id: stores.idCollection.getInternal('phase', phase.id),
        stages: toInternalStages(phase.stages, avatars),
        phaseType: T.create(
            phase.phaseType,
            enums.StageTemplatePart.castToInternal,
        ),
        isActive: phase.isActive,
        isCompleted: phase.isCompleted,
        startDate: T.create(phase.startDate, T.MaybeTimestamp),
        completionDate: T.create(phase.completionDate, T.MaybeTimestamp),
        order: phase.order,
        baselineStartDate: T.create(phase.baselineStartDate, T.Timestamp),
        baselineFinishDate: T.create(phase.baselineFinishDate, T.Timestamp),
    }));
};

const toInternalStages = (stages: dtos.workflow.StageDto[], avatars?: Avatars) => {
    if (stages.length === 0) {
        return [];
    }

    return stages.map(stage => PmStage.create({
        id: stores.idCollection.getInternal('stage', stage.id),
        status: T.create(
            stage.status,
            enums.StageStatus.castToInternal,
        ),
        order: stage.order,
        isActive: stage.isActive,
        isCompleted: stage.isCompleted,
        startDate: T.create(stage.startDate, T.MaybeTimestamp),
        completionDate: T.create(stage.completionDate, T.MaybeTimestamp),
        weight: stage.weight,
        name: stage.nameEn,
        nameAr: stage.nameAr,
        workflowSequences: toInternalWorkflows(stage.workflowSequences, avatars),
        baselineStartDate: T.create(stage.baselineStartDate, T.MaybeTimestamp),
        baselineFinishDate: T.create(stage.baselineFinishDate, T.MaybeTimestamp),
        projectBidStageUnitId: stage.projectBidStageUnitId,
        description: stage.descriptionEn,
        descriptionAr: stage.descriptionAr,
    }));
};

export const toInternalWorkflows = (workflows: dtos.workflow.WorkflowSequenceDto[], avatars?: Avatars) => {
    if (workflows.length === 0) {
        return [];
    }

    return workflows.map(workflow => WorkflowSequence.create({
        id: stores.idCollection.getInternal('workflowSequence', workflow.id),
        order: workflow.order,
        userTasks: toInternalUserTasks(workflow.userTasks, workflow.id, avatars),
        nameEn: workflow.nameEn,
        nameAr: workflow.nameAr,
        description: workflow.description,
        sowItemName: workflow.sowItemName,
        subItemNameEn: workflow.userTasks.find(item => item.sowSubItem)?.sowSubItem?.titleEnglish,
        subItemNameAr: workflow.userTasks.find(item => item.sowSubItem)?.sowSubItem?.titleArabic,
        sowItemId: workflow.sowItemId,
        rate: workflow.rate,
        supplier: workflow.supplier,
    })).sort((a, b) => a.order - b.order);
};

const toInternalUserTasks = (userTasks: dtos.workflow.UserTaskDto[], workflowId: number, avs?: Avatars) => {
    if (userTasks.length === 0) {
        return [];
    }

    const avatars = avs ? avs : { client: undefined, contractor: undefined, consultant: undefined };

    return userTasks.map(userTask => UserTask.create({
        id: stores.idCollection.getInternal('userTask', userTask.id),
        order: userTask.order,
        isActive: userTask.isActive,
        isCompleted: userTask.isCompleted,
        startDate: T.create(userTask.startDate, T.MaybeTimestamp),
        completionDate: T.create(userTask.completionDate, T.MaybeTimestamp),
        dueDate: T.create(userTask.dueDate, T.MaybeTimestamp),
        status: T.create(
            userTask.status,
            enums.TaskStatus.castToInternal,
        ),
        projectBidStageUnitId: userTask.projectBidStageUnitId,
        actor: Actor.create({
            id: stores.idCollection.getInternal('actor', userTask.actorId),
            actorType: T.create(
                userTask.actorType,
                enums.WorkflowActorType.castToInternal,
            ),
        }),
        nameEn: userTask.nameEn,
        nameAr: userTask.nameAr,
        descriptionEn: userTask.descriptionEn,
        descriptionAr: userTask.descriptionAr,
        createdDate: T.create(userTask.createdDate, T.MaybeTimestamp),
        defaultTaskTime: moment.duration(userTask.defaultTaskTime).asDays(),
        workflowId,
        avatars,
    })).sort((a, b) => a.order - b.order);
};
