import { type Instance, types } from 'mobx-state-tree';
import { MstType } from '~/api';
import { stores } from '~/stores';
import { FileDataBase } from '../FileData';
import { Actor } from './UserTask';

export type CommentType = Instance<typeof Comment>;

export const Comment = types
    .model({
        id: stores.idCollection.getIdentifier('comment'),
        actorId: MstType.number,
        resourceId: MstType.number,
        description: MstType.string,
        attachments: types.optional(types.array(FileDataBase), []),
        createdDate: MstType.MaybeMoment,
        name: MstType.string,
        avatar: MstType.Img,
        actor: types.maybe(Actor),
    })
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
    }));
