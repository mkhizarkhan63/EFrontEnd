import { action, runInAction } from 'mobx';
import { E, lang, restQuery } from '~/api';
import type { ConsultantPaymentType } from '~/models';
import { stores } from '~/stores';
import { downloadFile } from '~/utils';
import { type PmModuleVm } from '~/views';

export class InvoiceVm {
    isLoading = false;

    isOpen = false;

    isBigView = false;

    modalData?: ConsultantPaymentType;

    currentPenalty = 0;

    constructor(private parentVm?: PmModuleVm) {
        makeSafeObservable(this, {
            mount: false,
            setBigView: action,
            sendDecision: false,
            close: action,
            changePenalty: action,
        });
    }

    get isClientContext() {
        return stores.profile.currentProfile.role === E.RoleInCompany.client;
    }

    get penaltySubtotal() {
        const pricePerVisit = this.modalData?.pricePerVisit;

        if (!pricePerVisit) {
            return 0;
        }

        return pricePerVisit / 4 * 0.2 * this.currentPenalty;
    }

    get taxValue() {
        const totalPrice = this.modalData?.subTotal;

        if (!totalPrice) {
            return 0;
        }

        return (totalPrice - this.penaltySubtotal) /100 * 5;
    }

    get grandTotal() {
        const totalPrice = this.modalData?.subTotal;

        if (!totalPrice) {
            return 0;
        }

        return totalPrice - this.penaltySubtotal + this.taxValue;
    }

    get bankDetails() {
        return this.modalData?.bankDetails;
    }

    get textValueBtn() {
        if (this.isClientContext) {
            return lang.dict.get('payNow');
        }

        return lang.dict.get('confirm');
    }

    get isDisabledBtn() {
        if (!this.modalData) {
            return false;
        }

        const { status, isConfirmed } = this.modalData;

        const isCompleted = status === E.TaskStatus.completed;

        if (!isCompleted && this.isClientContext) {
            return true;
        }

        if (!this.isClientContext && isCompleted && !isConfirmed) {
            return true;
        }

        return false;
    }

    mount = () => {
        (async () => {
            if (!this.parentVm?.consultantPaymentModel?.userTaskId || this.isLoading) {
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            const response = await restQuery
                .getConsultantPayment(this.parentVm?.consultantPaymentModel?.userTaskId);

            if (!response) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            runInAction(() => {
                this.currentPenalty = response.numberOfPossiblePenalties;
                this.modalData = response;
                this.isOpen = true;
                this.isLoading = false;
            });
        })();
    };

    setBigView = () => {
        this.isBigView = true;
    };

    close = () => {
        this.parentVm?.setPayment(undefined);
        this.isOpen = false;
    };

    sendDecision = () => {
        (async () => {
            if (this.isLoading || !this.parentVm?.consultantPaymentModel?.userTaskId) {
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            const response = this.isClientContext
                ? await restQuery.payConsultantPayment(
                    this.parentVm?.consultantPaymentModel?.userTaskId,
                    this.currentPenalty,
                    this.penaltySubtotal,
                    this.taxValue,
                    this.grandTotal,
                )
                : await restQuery.confirmConsultantPayment(this.parentVm?.consultantPaymentModel?.userTaskId);

            if (!response) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            runInAction(() => {
                if (this.isClientContext) {
                    this.modalData?.setStatus(E.TaskStatus.completed);
                    alert(lang.dict.get('thankYouForYourPayment'));
                }

                if (!this.isClientContext) {
                    this.modalData?.setIsConfirmed();
                }

                this.parentVm?.updateConsultantPayment();

                this.isLoading = false;
            });
        })();
    };

    downloadPdf = () => {
        if (!this.modalData) {
            return;
        }

        downloadFile(this.modalData.fileId);
    };

    changePenalty = (penalty: number) => {
        this.currentPenalty = penalty;
    };
}
