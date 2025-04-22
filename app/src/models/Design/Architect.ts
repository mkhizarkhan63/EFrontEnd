import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';

export type ArchitectType = Instance<typeof Architect>;

export const Architect = types
    .model({
        name: MstType.string,
        role: types.optional(
            types.enumeration<E.AffiliationType>('AffiliationType', Object.values(E.AffiliationType)),
            E.AffiliationType.architect,
        ),
        avatar: MstType.Img,
        phone: MstType.string,
    })
    .actions(self => ({
        setRole: (role: E.AffiliationType) => {
            self.role = role;
        },
    }));
