import { backendDict } from './Backend';
import { defaultDict } from './Default';

export const dict = {
    ...defaultDict,
    ...backendDict,
};

export type Dict = (
    & typeof backendDict
    & typeof defaultDict
);
