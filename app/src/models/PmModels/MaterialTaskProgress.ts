import { types, type Instance } from 'mobx-state-tree';
import type { Dict } from '~/api/Lang/Dict';
import moment from 'moment';
import { E, MstType } from '~/api';
import { Actor } from './UserTask';
import { stores } from '~/stores';
import type { TaskStatus } from '~/api/Enums';

export type MaterialTaskProgressType = Instance<typeof MaterialTaskProgress>;

export const MaterialTaskProgress = types
    .model({
        materialUserTaskId: MstType.number,
        status: types.optional(types.enumeration<E.TaskStatus>(
            'TaskStatus', Object.values(E.TaskStatus),
        ),
        E.TaskStatus.none,
        ),
        isActionable: MstType.boolean,
        isValidUserActor: MstType.boolean,
        canBeSkipped: MstType.boolean,
        canBeRejected: MstType.boolean,
        skipTask: types.maybe(MstType.Unknown),
        actorType: types.optional(
            types.enumeration<E.WorkflowActorType>(
                'ActorType',
                Object.values(E.WorkflowActorType),
            ),
            E.WorkflowActorType.none,
        ),
        dueDate: MstType.MaybeMoment,
        actor: Actor,
        materialUserTaskType: types.optional(
            types.enumeration<E.MaterialUserTaskType>(
                'ActorType',
                Object.values(E.MaterialUserTaskType),
            ),
            E.MaterialUserTaskType.none,
        ),
    })
    .actions(self => ({
        updateStatusForClient: (materialTask: typeof self) => {
            self.status = materialTask.status;
            self.materialUserTaskType = materialTask.materialUserTaskType;
            self.isActionable = materialTask.isActionable;
            self.isValidUserActor = materialTask.isValidUserActor;
        },

        setStatus: (status: TaskStatus) => {
            self.status = status;
        },

        setDue: () => {
            self.isValidUserActor = false;
        },
    }))
    .views(self => ({
        get skipTaskObject(): MaterialTaskProgressType | undefined {
            if (MaterialTaskProgress.is(self.skipTask)) {
                return self.skipTask as MaterialTaskProgressType;
            }

            return undefined;
        },

        get dayLeft() {
            if (!self.dueDate) {
                return undefined;
            }

            return self.dueDate.diff(moment(), 'days');
        },

        get contractorInstallationStatus(): keyof Dict {
            const { isActionable, isValidUserActor, materialUserTaskType } = self;

            if (self.status === E.TaskStatus.completed) {
                return 'delivered';
            }

            if (materialUserTaskType === E.MaterialUserTaskType.quantityRequest) {
                return isActionable && isValidUserActor ? 'submitQuantity' : 'waitingForContractor';
            }

            if (materialUserTaskType === E.MaterialUserTaskType.purchase) {
                return isActionable && isValidUserActor ? 'addPurchase' : 'waitingForClient';
            }

            if (materialUserTaskType === E.MaterialUserTaskType.delivery) {
                const isConsultant = stores.profile.currentProfile.role === E.RoleInCompany.consultant;

                if (isConsultant) {
                    return 'waitingForContractor';
                }

                return 'confirmDelivery';
            }

            if (materialUserTaskType === E.MaterialUserTaskType.onSite) {
                return isActionable && isValidUserActor ? 'confirmDelivery' : 'waitingForContractor';
            }

            return 'none';
        },

        get contractorForClientStatus(): keyof Dict {
            const { isActionable, isValidUserActor, materialUserTaskType } = self;

            if (self.status === E.TaskStatus.completed) {
                return 'approved';
            }

            if (materialUserTaskType === E.MaterialUserTaskType.provideOptions) {
                return isActionable && isValidUserActor ? 'submitOptions' : 'waitingForContractor';
            }

            if (materialUserTaskType === E.MaterialUserTaskType.selectOption) {
                return isActionable && isValidUserActor ? 'approveOption' : 'waitingForClient';
            }

            return 'none';
        },
    }));
