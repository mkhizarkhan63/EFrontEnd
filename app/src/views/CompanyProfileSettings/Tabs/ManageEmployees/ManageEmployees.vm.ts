import { action, runInAction } from 'mobx';
import { lang, LazyData, restQuery } from '~/api';
import type { EmployeeType } from '~/models';
import { stores } from '~/stores';
import { confirmPrompt } from '~/utils';

type ModalType = 'log' | 'edit';

export class ManageEmployeesVm {
    isLoading = false;

    modal = {
        isOpen: false,
        id: undefined as number | undefined,
        type: undefined as ModalType | undefined,
    };

    employeeLogs = new LazyData(
        'Employee Logs',
        () => restQuery.getUserLogs(this.employee?.userId),
        [],
    );

    constructor() {
        makeSafeObservable(this, {
            openModal: action,
            closeModal: action,
        });
    }

    get logs() {
        return this.employeeLogs.data;
    }

    get employee() {
        return this.company?.employees.data.find(x => x.id === this.modal.id);
    }

    get company() {
        return stores.profile.company;
    }

    openModal = (id?: number, type?: ModalType) => {
        this.modal.isOpen = true;
        this.modal.id = id;
        this.modal.type = type;

        if (type === 'log') {
            this.employeeLogs.reload();
        }
    };

    closeModal = () => {
        this.modal.isOpen = false;
    };

    reject = (id?: number) => {
        confirmPrompt(
            lang.dict.get('confirmRejectEmployee'),
            () => this.remove(id, 'reject'),
        );
    };

    delete = (id?: number) => {
        confirmPrompt(
            lang.dict.get('confirmDeleteEmployee'),
            () => this.remove(id, 'remove'),
        );
    };

    private remove = async (id?: number, type?: 'remove' | 'reject') => {
        if (!this.company || !id || !type || this.isLoading) {
            return;
        }

        this.isLoading = true;

        await restQuery.removeEmployee(id, this.company, type);

        runInAction(() => {
            this.isLoading = false;
        });
    };

    accept = async (employee: EmployeeType) => {
        if (!this.company || this.isLoading) {
            return;
        }

        this.isLoading = true;

        await restQuery.acceptEmployee(employee, this.company);

        runInAction(() => {
            this.isLoading = false;
        });
    };
}
