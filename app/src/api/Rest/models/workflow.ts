import { enums, Mobx, T, type dtos } from '~/api';
import { WorkflowType } from '~/models';

export const toInternalWorkflowType = (x: dtos.workflow.WorkflowDto) => {
    const workflowType = new WorkflowType(x.id);

    Mobx.extendsObservable(workflowType, {
        nameEn: x.nameEn,
        nameAr: x.nameAr,
        descriptionEn: x.descriptionEn,
        descriptionAr: x.descriptionAr,
    });

    x.workflowTasks?.forEach(y => {
        workflowType.addTask({
            id: y.id,
            order: y.order,
            nameEn: y.nameEn ?? '',
            nameAr: y.nameAr ?? '',
            descriptionEn: y.descriptionEn ?? '',
            descriptionAr: y.descriptionAr ?? '',
            defaultTaskTime: y.defaultTaskTime,
            actorType: T.create(y.actorType, enums.WorkflowActorType.castToInternal),
            actionType: T.create(y.actionType, enums.WorkflowActionType.castToInternal),
            actionValue: y.actionValue,
        });
    });

    return workflowType;
};

export const toInternalWorkflowTypes = (workflows: dtos.workflow.WorkflowDto[]) => workflows
    .map(toInternalWorkflowType);
