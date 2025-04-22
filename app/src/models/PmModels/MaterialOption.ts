import { type Instance, types } from 'mobx-state-tree';
import { E, MstType, T } from '~/api';
import { fromInputNumber } from '~/api/Utils';
import { stores } from '~/stores';
import { FileDataBase } from '../FileData';
import { Comment, type CommentType } from './Comment';

export type MaterialOptionType = Instance<typeof MaterialOption>;

export const MaterialOption = types.model({
    id: stores.idCollection.getIdentifier('materialOption'),
    supplier: MstType.string,
    rates: types.optional(MstType.number, 0),
    rateType: types.optional(
        types.enumeration<E.RateType>(
            'RateType', Object.values(E.RateType),
        ),
        E.RateType.squaredMeter,
    ),
    totalValue: types.optional(MstType.number, 0),
    description: MstType.string,
    createdDate: MstType.Moment,
    actorType: types.optional(
        types.enumeration<E.WorkflowActorType>(
            'WorkflowActorType', Object.values(E.WorkflowActorType),
        ), E.WorkflowActorType.none,
    ),
    attachments: types.optional(types.array(FileDataBase), []),
    isSelected: MstType.boolean,
    comments: types.optional(types.array(Comment), []),
    currentComment: types.optional(Comment, () => Comment.create()),
    isCommentsOpened: types.optional(types.boolean, false),
}).views(self => ({
    get externalId() {
        return stores.idCollection.getExternal('materialOption', self.id);
    },

    get validationData() {
        return {
            supplier: self.supplier,
            rates: self.rates,
            totalValue: self.totalValue,
            description: self.description,
        };
    },
})).views(self => ({
    get isNotEmpty() {
        return T.is(self.validationData, T.type({
            supplier: T.nonempty(T.string()),
            description: T.nonempty(T.string()),
            rates: T.min(T.number(), 1),
            totalValue: T.min(T.number(), 1),
        }));
    },
})).actions(self => ({
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

    setSupplier: (text: string) => {
        self.supplier = text;
    },

    setRates: (text: string) => {
        self.rates = fromInputNumber(text);
    },

    setTotalValue: (text: string) => {
        self.totalValue = fromInputNumber(text);
    },

    selectOption: () => {
        self.isSelected = true;
    },

    deselectOption: () => {
        self.isSelected = false;
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
