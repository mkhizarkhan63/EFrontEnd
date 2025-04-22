import { action, makeAutoObservable } from 'mobx';
import { clone } from 'mobx-state-tree';
import { ErrorListHolder, T } from '~/api';
import type { FileDataType } from '~/models';
import { stores } from '~/stores';

const struct = () => T.type({
    name: T.name(),
    email: T.email(),
});

export class GeneralInfoVm {
    name = '';

    email = '';

    avatar?: FileDataType;

    isLoading = false;

    errorListHolder = new ErrorListHolder(
        () => this,
        () => struct(),
    );

    constructor() {
        makeAutoObservable(this, {
            mount: false,
            setName: action,
            setEmail: action,
            save: action,
            uploadAvatar: action,
            removeAvatar: action,
        });
    }

    get profile() {
        return stores.profile.currentProfile;
    }

    get phone() {
        return this.profile.phone;
    }

    mount = () => {
        this.name = this.profile.name ?? '';
        this.email = this.profile.email ?? '';
        this.avatar = clone(this.profile.avatar);
    };

    setName = (value: string) => {
        this.name = value;
    };

    setEmail = (value: string) => {
        this.email = value;
    };

    uploadAvatar = (userAvatar: FileDataType) => {
        this.avatar = userAvatar;
        this.avatar.loadImg();
    };

    removeAvatar = () => {
        this.avatar?.removeFile();
    };

    save = () => {
        (async () => {
            if (this.isLoading || !this.errorListHolder.test()) {
                return;
            }

            this.isLoading = true;

            const res = await stores.profile.updateProfileInfo(
                this.name,
                this.email,
                this.avatar,
            );

            this.isLoading = false;

            if (res) {
                stores.profile.currentProfile.updateProfileInfo(
                    this.name,
                    this.email,
                    this.avatar,
                );
                stores.display.router.reload();
            }
        })();
    };
}
