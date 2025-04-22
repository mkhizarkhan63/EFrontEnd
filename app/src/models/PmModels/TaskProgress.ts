import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { stores } from '~/stores';
import { Actor } from './UserTask';
import { Checklist, DatePicker, Payment } from './ValueTypes';
import { PaymentBlock } from './PaymentBlock';
import { type Moment } from 'moment';

export type TaskProgressType = Instance<typeof TaskProgress>;

export const TaskProgress = types
    .model({
        id: stores.idCollection.getIdentifier('userTask'),
        nameEn: MstType.string,
        nameAr: MstType.string,
        descriptionEn: MstType.string,
        descriptionAr: MstType.string,
        status: types.optional(
            types.enumeration<E.TaskStatus>(
                'TaskStatus',
                Object.values(E.TaskStatus),
            ),
            E.TaskStatus.none,
        ),
        actorType: types.optional(
            types.enumeration<E.WorkflowActorType>(
                'ActorType',
                Object.values(E.WorkflowActorType),
            ),
            E.WorkflowActorType.none,
        ),
        dueDate: MstType.MaybeMoment,
        actionType: types.optional(
            types.enumeration<E.ActionType>(
                'ActionType',
                Object.values(E.ActionType),
            ),
            E.ActionType.none,
        ),
        actionValue: MstType.string,
        actor: types.maybe(Actor),
        isActionable: MstType.boolean,
        isValidUserActor: types.boolean,
        isParsed: MstType.boolean,
        valueChecklist: types.maybe(Checklist),
        valuePayments: types.maybe(Payment),
        valueDatePicker: types.maybe(DatePicker),
        paymentBlockPayload: types.maybe(PaymentBlock),
    }).views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('userTask', self.id);
        },
    })).actions(self => ({
        changeStatus: (status: E.TaskStatus) => {
            self.status = status;
        },

        afterCreate() {
            this.parse();
        },

        setDueDate: (date?: Moment) => {
            if (!date) {
                return;
            }

            self.dueDate = date;
        },

        parse: () => {
            if (self.isParsed) {
                return;
            }

            let value = {};

            try {
                value = JSON.parse(self.actionValue);
            } catch (error) {
                // error
            }

            switch (self.actionType) {
                case E.ActionType.checklist:
                    self.valueChecklist = Checklist.create(value);
                    break;
                case E.ActionType.payment:
                    self.valuePayments = Payment.create({ grandTotal: 6300, tax: 5 });
                    break;
                case E.ActionType.datePicker:
                    self.valueDatePicker = DatePicker.create(value);
            }
            self.isParsed = true;
        },
    }));
