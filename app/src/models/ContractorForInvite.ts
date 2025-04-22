import { types, type Instance } from 'mobx-state-tree';
import { MstType, lang } from '~/api';
import { FileData } from './FileData';
import { stores } from '~/stores';

export type ContractorForInviteType = Instance<typeof ContractorForInvite>;

export const ContractorForInvite = types
    .model({
        id: stores.idCollection.getIdentifier('contractorForInvite'),
        name: MstType.string,
        avatar: types.maybe(FileData),
        headOfficeGovernorateId: MstType.Id,
        completedProjects: MstType.number,
        crStartDate: MstType.MaybeMoment,
        engineers: MstType.number,
        labors: MstType.number,
        isInvited: MstType.boolean,
        isSubmitted: MstType.boolean,
        phone: MstType.string,
    }).views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('contractorForInvite', self.id);
        },
        get buttonValue() {
            if (self.isSubmitted) {
                return lang.dict.get('submitted');
            }

            return self.isInvited ? lang.dict.get('invited') : lang.dict.get('invite');
        },
        get isNotActionable() {
            return self.isInvited || self.isSubmitted;
        },
    })).actions(self => ({
        setInvited: () => {
            self.isInvited = true;
        },
    }));
