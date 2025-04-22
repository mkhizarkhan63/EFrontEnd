import { action, runInAction } from 'mobx';
import { ErrorListHolder, T } from '~/api';
import { stores } from '~/stores';

const struct = (newPassword: string) => T.type({
    oldPassword: T.password(),
    newPassword: T.password(),
    confirmPassword: T.confirmPassword(newPassword),
});

export class ChangePasswordVm {
    oldPassword = '';

    newPassword = '';

    confirmPassword = '';

    isSaving = false;

    errorListHolder = new ErrorListHolder(
        () => this.walidationData,
        () => struct(this.newPassword),
    );

    constructor() {
        makeSafeObservable(this, {
            setOldPassword: action,
            setNewPassword: action,
            setConfirmPassword: action,
        });
    }

    get walidationData() {
        return {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword,
        };
    }

    setOldPassword = (password: string) => {
        this.oldPassword = password;
    };

    setNewPassword = (password: string) => {
        this.newPassword = password;
    };

    setConfirmPassword = (password: string) => {
        this.confirmPassword = password;
    };

    resetValue = () => {
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword ='';
    };

    save = () => {
        (async () => {
            if (this.isSaving) {
                return;
            }

            this.isSaving = true;

            if (!this.errorListHolder.test()) {
                this.isSaving = false;
                return;
            }

            const response = await stores.profile.updatePassword(
                this.oldPassword,
                this.newPassword,
                this.confirmPassword,
            );

            if (!response.success) {
                runInAction(() => {
                    this.errorListHolder.add({
                        value: '',
                        key: 'badPassword',
                        type: 'badPassword',
                        refinement: undefined,
                        message: 'Bad old Password',
                        branch: [''],
                        path: ['badPassword'],
                    });
                });

                this.isSaving = false;

                return;
            }

            this.resetValue();

            this.isSaving = false;
        })();
    };

    delete = () => {
        /* */
    };
}
