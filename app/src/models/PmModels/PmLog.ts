import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { stores } from '~/stores';

export type PmLogType = Instance<typeof PmLog>;

export const PmLog = types
    .model({
        id: stores.idCollection.getIdentifier('pmLog'),
        actorType: types.optional(
            types.enumeration<E.WorkflowActorType>(
                'WorkflowActorType',
                Object.values(E.WorkflowActorType),
            ),
            E.WorkflowActorType.client,
        ),
        date: MstType.Moment,
        description: MstType.string,
    });
