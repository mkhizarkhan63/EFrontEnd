import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { FileDataBase } from '../FileData';
import { Actor } from './UserTask';
import moment from 'moment';
import { stores } from '~/stores';
import { BankDetails } from './BankDetails';

export type SiteVisitType = Instance<typeof SiteVisit>;

export const SiteVisit = types
    .model({
        order: MstType.number,
        siteVisitDescription: types.string,
        visitDate: MstType.MaybeMoment,
        stageOrder: MstType.number,
        isDelay: MstType.boolean,
        daysInDelay: MstType.number,
    });

export type ConsultantPaymentType = Instance<typeof ConsultantPayment>;

export const ConsultantPayment = types
    .model({
        id: types.number,
        generationDate: MstType.Moment,
        forMonth: types.number,
        forYear: types.number,
        numberOfVisits: types.number,
        taxPercentage: types.number,
        taxValue: types.number,
        subTotal: types.number,
        pricePerVisit: MstType.number,
        grandTotalPrice: types.number,
        status: types.enumeration<E.TaskStatus>(
            'TaskStatus', Object.values(E.TaskStatus),
        ),
        dueDate: MstType.Moment,
        isConfirmed: types.boolean,
        siteVisitsInformation: types.array(SiteVisit),
        fileId: FileDataBase,
        invoiceId: types.number,
        actor: Actor,
        consultantId: types.number,
        projectId: types.number,
        delayInDays: MstType.number,
        consultantName: MstType.string,
        bankDetails: BankDetails,
        numberOfPossiblePenalties: MstType.number,
        penaltySubtotal: MstType.number,
    }).views(self => ({
        get invoiceDate() {
            return moment().month(self.forMonth - 1)
                .year(self.forYear).format('MM - YYYY');
        },

        get paymentStatusForConsultant() {
            if (self.status !== E.TaskStatus.completed && !self.isConfirmed) {
                return self.status;
            }

            if (self.isConfirmed) {
                return self.status;
            }

            return stores.profile.currentProfile.role === E.RoleInCompany.client
                ? self.status
                : E.TaskStatus.due;
        },
    })).actions(self => ({
        setStatus: (status: E.TaskStatus) => {
            self.status = status;
        },

        setIsConfirmed: () => {
            self.isConfirmed = true;
        },
    }));
