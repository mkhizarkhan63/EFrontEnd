import { types, type Instance } from 'mobx-state-tree';

let lastUsedId = 0;

const ChecklistItem = types
    .model({
        id: types.optional(types.identifierNumber, () => lastUsedId++),
        order: types.optional(types.number, () => lastUsedId++),
        en: types.string,
        ar: types.string,
        isChecked: types.maybe(types.boolean),
    })
    .actions(self => ({
        setIsChecked: (value: boolean) => {
            self.isChecked = value;
        },
    }));

export type ChecklistType = Instance<typeof Checklist>;

export const Checklist = types
    .model({
        type: types.optional(types.literal('checklist'), 'checklist'),
        options: types.array(ChecklistItem),
        checkeds: types.array(types.boolean),
    }).views(self => ({
        get isSomeOptionsUnchecked() {
            return Boolean(self.options.some(item => item.isChecked === undefined));
        },
    }));
