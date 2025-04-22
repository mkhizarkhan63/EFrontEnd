import { type Instance, types } from 'mobx-state-tree';
import { MstType } from '~/api';
import { stores } from '~/stores';
import { FileData } from '../FileData';

export type ArchitectListItemType = Instance<typeof ArchitectListItem>;

export const ArchitectListItem = types.model({
    id: stores.idCollection.getIdentifier('architectListItem'),
    name: MstType.string,
    headOfficeGovernorateId: MstType.Id,
    completedProjects: MstType.number,
    avatar: types.maybe(FileData),
    crStartDate: MstType.MaybeMoment,
    engineers: MstType.number,
    minProjectPrice: MstType.number,
    haveDesignServices: MstType.boolean,
    products: types.array(MstType.number),
    stars: types.model({
        recommendation: MstType.number,
        communication: MstType.number,
        cooperation: MstType.number,
        qualityOfWorks: MstType.number,
        speedOfWorks: MstType.number,
        management: MstType.number,
    }),
}).views(self => ({
    get externalId() {
        return stores.idCollection.getExternal('architectListItem', self.id);
    },
    get starValues() {
        return Object.entries(self.stars)
            .map(key => ({
                key: key[0],
                value: key[1],
            }));
    },
}));
