import { type Instance, types } from 'mobx-state-tree';
import { E, MstType, utils } from '~/api';
import { stores } from '~/stores';
import { Comment, type CommentType } from './Comment';
import { FileDataBase } from '~/models';

export type TaskUpdateType = Instance<typeof TaskUpdate>;

export const TaskUpdate = types
    .model({
        id: stores.idCollection.getIdentifier('taskUpdate'),
        taskId: MstType.number,
        actorId: MstType.number,
        actorType: types.optional(
            types.enumeration<E.WorkflowActorType>(
                'ActorType',
                Object.values(E.WorkflowActorType),
            ),
            E.WorkflowActorType.none,
        ),
        type: types.optional(
            types.enumeration<E.TaskUpdateType>(
                'TaskUpdateType',
                Object.values(E.TaskUpdateType),
            ),
            E.TaskUpdateType.none,
        ),
        resourceType: types.optional(
            types.enumeration<E.ResourceTypeMaterial>(
                'ActorType',
                Object.values(E.ResourceTypeMaterial),
            ),
            E.ResourceTypeMaterial.none,
        ),
        description: MstType.string,
        itemName: MstType.string,
        supplier: MstType.string,
        rate: MstType.number,
        rateType: types.optional(
            types.enumeration<E.RateType>(
                'RateType',
                Object.values(E.RateType),
            ),
            E.RateType.squaredMeter,
        ),
        totalPrice: MstType.number,
        quantity: MstType.number,
        attachments: types.optional(types.array(FileDataBase), []),
        comments: types.optional(types.array(Comment), []),
        currentComment: types.optional(Comment, () => Comment.create()),
        isCommentsOpened: types.optional(types.boolean, false),
        createdDate: MstType.Moment,
        isProof: MstType.boolean,
    }).views(self => ({
        get isFilled() {
            return self.description && self.type !== E.TaskUpdateType.none;
        },

        get externalId() {
            return stores.idCollection.getExternal('taskUpdate', self.id);
        },
    }))
    .actions(self => ({
        addAttachment: (item: Instance<typeof FileDataBase>) => {
            item.loadImg();
            self.attachments.push(item);
        },

        removeAttachment: (item: Instance<typeof FileDataBase>) => {
            self.attachments.remove(item);
        },

        setDescription: (text: string) => {
            self.description = text;
        },

        setType: (type: E.TaskUpdateType) => {
            self.type = type;
        },

        setRateType: (type: E.RateType) => {
            self.rateType = type;
        },

        setQuantity: (quantity: string) => {
            self.quantity = utils.fromInputNumber(quantity);
        },

        setItemName: (itemName: string) => {
            self.itemName = itemName;
        },

        addComment: (comment: CommentType) => {
            self.currentComment = Comment.create();
            self.comments.push(comment);
        },

        setCommentText: (text: string) => {
            self.currentComment.description = text;
        },

        switchComments: () => {
            self.isCommentsOpened = !self.isCommentsOpened;
        },

        disableComments: () => {
            self.isCommentsOpened = false;
        },
    }));
