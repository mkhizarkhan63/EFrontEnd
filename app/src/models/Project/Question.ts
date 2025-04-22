import { types, type Instance } from 'mobx-state-tree';
import { type Img, MstType } from '~/api';
import { stores } from '~/stores';

export type QuestionType = Instance<typeof Question>;
export type AnswerType = Instance<typeof Answer>;

export const Answer = types
    .model({
        id: stores.idCollection.getIdentifier('questionAnswer'),
        text: MstType.string,
        date: MstType.Moment,
        isHidden: MstType.boolean,
        isEdited: MstType.boolean,
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('questionAnswer', self.id);
        },
    }))
    .actions(self => ({
        connect: (externalId: number) => {
            stores.idCollection.connect(
                'questionAnswer',
                self.id,
                externalId,
            );
        },
        setText: (txt: string) => {
            self.text = txt;
        },
        switchEdited: () => {
            self.isEdited = !self.isEdited;
        },
        setIsHidden: (isHidden: boolean) => {
            self.isHidden = isHidden;
        },
    }));

export const Question = types
    .model({
        id: stores.idCollection.getIdentifier('question'),
        projectId: MstType.Id,
        avatar: MstType.Img,
        date: MstType.Moment,
        text: MstType.string,
        isNew: MstType.boolean,
        answer: types.optional(Answer, () => Answer.create()),
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('question', self.id);
        },
    }))
    .actions(self => ({
        connect: (externalId: number) => {
            stores.idCollection.connect(
                'question',
                self.id,
                externalId,
            );
        },
        setText: (txt: string) => {
            self.text = txt;
        },
        setAvatar: (avatar: Img) => {
            self.avatar = avatar;
        },
        setIsNew: (isNew: boolean) => {
            self.isNew = isNew;
        },
    }));
