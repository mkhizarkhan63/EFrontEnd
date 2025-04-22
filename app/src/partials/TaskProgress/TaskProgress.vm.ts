import { action, reaction, runInAction } from 'mobx';
import { getSnapshot } from 'mobx-state-tree';
import { E, lang, restQuery } from '~/api';
import {
    TaskUpdate,
    type FileDataType,
    type TaskUpdateType,
    type WorkflowProgressType,
    PmTaskUpdate,
} from '~/models';
import { stores } from '~/stores';
import { utilsString } from '~/utils';
import type { PmModuleVm } from '~/views';

export class TaskProgressVm {
    currentEditedTask = TaskUpdate.create();

    isLoading = false;

    constructor(public taskData: WorkflowProgressType, private parentVm: () => PmModuleVm) {
        makeSafeObservable(this, {
            selectOnChange: action,
            addUpdate: action,
            removeUpdate: action,
            editUpdate: action,
            switchComments: action,
            onUpload: action,
            removeDrawingFile: action,
            setValue: action,
            openGallery: action,
        });

        switch (this.context) {
            case E.RoleInCompany.contractor:
                this.selectOnChange(E.TaskUpdateType.generalUpdates);
                return;
            case E.RoleInCompany.consultant:
                this.selectOnChange(E.TaskUpdateType.siteObservation);
                return;
            case E.RoleInCompany.client:
                this.selectOnChange(E.TaskUpdateType.risksConcerns);
                break;
        }

        reaction(
            () => this.taskData.localUpdates,
            async () => await restQuery.workflow.saveTaskUpdateDraft(
                E.TaskUpdateDraft.task,
                this.taskData,
            ),
        );
    }

    get context() {
        return stores.profile.currentProfile.role;
    }

    get observationTitle() {
        switch (this.context) {
            case E.RoleInCompany.contractor:
                return lang.dict.get('submitObservationsContractor');
            case E.RoleInCompany.consultant:
                return lang.dict.get('submitObservationsConsultant');
            case E.RoleInCompany.client:
                return lang.dict.get('submitObservationsClient');
            default:
                return lang.dict.get('submitObservationsConsultant');
        }
    }

    get currentTask() {
        return this.taskData.currentLocalUpdateDtos ?? this.currentEditedTask;
    }

    get selectValues() {
        const actorType = utilsString.capitalize(this.taskData.currentTask.actorType);

        const values = Object.entries(E.TaskUpdateType)
            .filter(item => item[0] !== E.WorkflowActorType.none && !item[0].startsWith(`messageTo${actorType}`));

        return values.map(item => ({
            value: item[1],
            name: lang.dict.get(item[1]),
        }));
    }

    get isUpdateSubmitDisabled() {
        return !this.currentTask || !this.currentTask.isFilled;
    }

    selectOnChange = (type: E.TaskUpdateType) => {
        this.currentTask?.setType(type);
    };

    addUpdate = () => {
        if (this.taskData.currentLocalUpdateDtos) {
            return this.taskData.deselectUpdate();
        }

        this.taskData.addUpdate(this.currentEditedTask);

        this.currentEditedTask = TaskUpdate.create();

        switch (this.context) {
            case E.RoleInCompany.contractor:
                this.currentEditedTask.setType(E.TaskUpdateType.generalUpdates);
                return;
            case E.RoleInCompany.consultant:
                this.currentEditedTask.setType(E.TaskUpdateType.siteObservation);
                return;
            case E.RoleInCompany.client:
                this.currentEditedTask.setType(E.TaskUpdateType.risksConcerns);
                break;
        }
    };

    removeUpdate = (item: TaskUpdateType) => {
        this.taskData?.removeUpdate(item);
    };

    editUpdate = (item: TaskUpdateType) => {
        this.taskData.selectUpdate(item);
    };

    onUpload = (file: FileDataType) => {
        this.currentTask.addAttachment(file);
    };

    removeDrawingFile = (file: FileDataType) => {
        this.currentTask.removeAttachment(file);
    };

    setValue = (text: string) => {
        this.currentTask.setDescription(text);
    };

    switchComments = (item: TaskUpdateType) => {
        if (item.isCommentsOpened) {
            item.disableComments();
            return;
        }

        this.taskData.updateDtos.forEach(update => update.disableComments());
        item.switchComments();
    };

    addComment = async (item: TaskUpdateType) => {
        if (!item.externalId || !item.currentComment.description || this.isLoading) {
            return;
        }

        runInAction(() => {
            this.isLoading = true;
        });

        const { description, attachments } = item.currentComment;

        const res = await restQuery.project
            .postTaskUpdateComment(item.externalId, description, attachments);

        if (!res) {
            runInAction(() => {
                this.isLoading = false;
            });
            return;
        }

        item.addComment(res);

        runInAction(() => {
            this.isLoading = false;
        });
    };

    openGallery = (taskUpdate: TaskUpdateType, file: FileDataType, isComment?: boolean) => {
        if (isComment) {
            const comment = taskUpdate.comments.find(com => com.attachments.some(att => att.fileId === file.fileId));

            if (!comment) {
                return;
            }

            const pmTask = PmTaskUpdate.create({
                attachments: getSnapshot(comment?.attachments),
                createdOn: comment.createdDate,
                submittedByName: comment.name,
                taskName: lang.dict.enum('taskUpdateType', taskUpdate.type),
            });

            this.parentVm().openGallery(pmTask, file);

            return;
        }

        const attachments = taskUpdate.attachments.map(attachment => getSnapshot(attachment));

        const pmTask = PmTaskUpdate.create({
            attachments: attachments,
            createdOn: taskUpdate.createdDate,
            submittedByName: utilsString.capitalize(taskUpdate.actorType),
            taskName: lang.dict.enum('taskUpdateType', taskUpdate.type),
        });

        this.parentVm().openGallery(pmTask, file);
    };
}
