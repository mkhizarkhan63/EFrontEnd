import { types } from 'mobx-state-tree';

export const number = types.optional(types.number, 0);

export const string = types.optional(types.string, '');

export const boolean = types.optional(types.boolean, false);
