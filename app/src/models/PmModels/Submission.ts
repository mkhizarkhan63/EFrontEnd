import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { stores } from '~/stores';
import { MaterialOption } from './MaterialOption';
import { TaskUpdate } from './TaskUpdate';
import { Checklist, DatePicker, Payment } from './ValueTypes';

export type SubmissionType = Instance<typeof Submission>;

export const Submission = types
    .model({
        id: stores.idCollection.getIdentifier('submission'),
        name: MstType.string,
        actionType: types.optional(
            types.enumeration<E.ActionType>(
                'ActionType',
                Object.values(E.ActionType),
            ),
            E.ActionType.none,
        ),
        actionValue: MstType.string,
        actionData: MstType.string,
        status: types.optional(
            types.enumeration<E.SubmitStatus>(
                'ActionType',
                Object.values(E.SubmitStatus),
            ),
            E.SubmitStatus.none,
        ),
        actorType: types.optional(
            types.enumeration<E.WorkflowActorType>(
                'ActorType',
                Object.values(E.WorkflowActorType),
            ),
            E.WorkflowActorType.none,
        ),
        taskUpdates: types.maybe(
            types.array(TaskUpdate),
        ),
        materialOptions: types.maybe(
            types.array(MaterialOption),
        ),
        submitterId: MstType.number,
        actorId: MstType.number,
        submitterType: types.optional(
            types.enumeration<E.WorkflowActorType>(
                'ActorType',
                Object.values(E.WorkflowActorType),
            ),
            E.WorkflowActorType.none,
        ),
        createdDate: MstType.MaybeMoment,
        materialSubmissionType: types.optional(
            types.enumeration<E.MaterialSubmissionType>(
                'MaterialSubmissionType',
                Object.values(E.MaterialSubmissionType),
            ),
            E.MaterialSubmissionType.none,
        ),
        valueChecklist: types.maybe(Checklist),
        valuePayments: types.maybe(Payment),
        valueDatePicker: types.maybe(DatePicker),
        isParsed: MstType.boolean,
        isPreviousCollapsed: MstType.boolean,
        rejectedOptionDescription: types.maybe(MstType.string),
    }).actions(self => ({
        afterCreate() {
            this.parse();
        },

        parse: () => {
            if (self.isParsed) {
                return;
            }

            let parsedData: Record<string, unknown> = {};

            try {
                parsedData = JSON.parse(self.actionData);
            } catch (error) {
                // error
            }

            const lowerKeys: Record<string, unknown> = {};

            for (const key in parsedData) {
                const newKey = key.charAt(0).toLowerCase() + key.slice(1);
                lowerKeys[newKey] = parsedData[key];
            }

            switch (self.actionType) {
                case E.ActionType.checklist:
                    self.valueChecklist = Checklist.create(lowerKeys);
                    break;
                case E.ActionType.payment:
                    self.valuePayments = Payment.create(lowerKeys);
                    break;
                case E.ActionType.datePicker:
                    self.valueDatePicker = DatePicker.create(lowerKeys);
            }

            self.isParsed = true;
        },

        switchPreviousCollapsed: () => {
            self.isPreviousCollapsed = !self.isPreviousCollapsed;
        },
    }));
