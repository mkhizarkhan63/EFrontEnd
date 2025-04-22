import { types, type Instance } from 'mobx-state-tree';
import { PmLog } from './PmLog';

export type PmLogTypes = Instance<typeof PmLogs>;

export const PmLogs = types
    .model({
        logs: types.array(PmLog),
    });
