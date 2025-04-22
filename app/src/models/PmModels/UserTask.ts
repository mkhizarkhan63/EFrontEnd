import { types, type Instance } from 'mobx-state-tree';
import { type Moment } from 'moment';
import { E, MstType, lang } from '~/api';
import { stores } from '~/stores';

export type UserTaskType = Instance<typeof UserTask>;

export const Actor = types
    .model({
        id: stores.idCollection.getIdentifier('actor'),
        actorType: types.optional(
            types.enumeration<E.WorkflowActorType>(
                'WorkflowType',
                Object.values(E.WorkflowActorType),
            ),
            E.WorkflowActorType.none,
        ),
        email: MstType.string,
        phone: MstType.string,
        avatar: MstType.Img,
        name: MstType.string,
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('actor', self.id);
        },

        get galleryName() {
            if (self.name === 'Unknown') {
                return lang.dict.get('system');
            }

            return self.name;
        },
    }));

export const UserTask = types
    .model({
        id: stores.idCollection.getIdentifier('userTask'),
        order: types.number,
        isActive: types.boolean,
        isCompleted: types.boolean,
        startDate: MstType.MaybeMoment,
        completionDate: MstType.MaybeMoment,
        defaultTaskTime: types.number,
        dueDate: MstType.MaybeMoment,
        status: types.optional(
            types.enumeration<E.TaskStatus>(
                'TaskStatus',
                Object.values(E.TaskStatus),
            ),
            E.TaskStatus.upComing,
        ),
        projectBidStageUnitId: types.number,
        actor: types.optional(Actor, () => Actor.create()),
        nameEn: types.string,
        nameAr: types.string,
        descriptionEn: MstType.string,
        descriptionAr: MstType.string,
        createdDate: MstType.Moment,
        workflowId: types.number,
        avatars: types.model({
            client: MstType.Img,
            consultant: MstType.Img,
            contractor: MstType.Img,
        }),
        isFirst: MstType.boolean,
    }).views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('userTask', self.id);
        },

        get isActionable() {
            switch (self.actor.actorType) {
                case E.WorkflowActorType.client:
                    return stores.profile.currentProfile.role === E.RoleInCompany.client;

                case E.WorkflowActorType.contractor:
                    return stores.profile.currentProfile.role === E.RoleInCompany.contractor;

                case E.WorkflowActorType.consultant:
                    return stores.profile.currentProfile.role === E.RoleInCompany.consultant;
            }

            return false;
        },

        get avatar() {
            switch (self.actor.actorType) {
                case E.WorkflowActorType.client:
                    return self.avatars.client?.url;

                case E.WorkflowActorType.contractor:
                    return self.avatars.contractor?.url;

                case E.WorkflowActorType.consultant:
                    return self.avatars.consultant?.url;
            }

            return '';
        },
    })).actions(self => ({
        changeStatus: (status: E.TaskStatus) => {
            self.status = status;
        },
        setIsFirst: (value: boolean) => {
            self.isFirst = value;
        },
        setDate: (date: Moment) => {
            self.dueDate = date;
        },
    }));
