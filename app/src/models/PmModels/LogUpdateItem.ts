import { type Instance, types } from 'mobx-state-tree';
import { E, MstType, lang } from '~/api';
import { FileDataBase } from '../FileData';
import { Actor } from './UserTask';
import { utilsString } from '~/utils';

export type LogUpdateItemType = Instance<typeof LogUpdateItem>;

export const LogUpdateItem = types
    .model({
        id: MstType.number,
        posterActorType: types.optional(
            types.enumeration<E.WorkflowActorType>(
                'WorkflowActorType', Object.values(E.WorkflowActorType),
            ),
            E.WorkflowActorType.none,
        ),
        posterActor: Actor,
        postedAt: MstType.MaybeMoment,
        attachment: types.maybe(FileDataBase),
        picture: types.maybe(MstType.Img),
        fileName: MstType.string,
        isChecked: false,
        title: MstType.string,
    }).views(self => ({
        get galleryTitle() {
            if (self.title === 'None') {
                return lang.dict.get('projectDrawings');
            }

            if (self.title.length === 0) {
                return utilsString.capitalize(self.posterActorType).concat(' Observation');
            }

            return self.title;
        },
    }))
    .actions(self => ({
        setChecked(isChecked: boolean) {
            self.isChecked = isChecked;
        },
        openDocument() {
            if (!self.attachment?.img?.url) {
                return;
            }

            const a = document.createElement('a');
            a.href = self.attachment?.img?.url;
            a.target = '_blank';
            a.click();
        },
    }));

