import { restClient } from '~/api';
import { observable, makeObservable, runInAction } from 'mobx';
import { type User, UserManager, type UserManagerSettings } from 'oidc-client-ts';
import { utilsObject } from '~/utils';
import { Env } from '../Env';
import { debug, DebugLevel } from '../Debug';
import { storage } from '../Storage';
import { stores } from '~/stores';

class Auth {
    isLoading = true;

    mgr;

    private get settings() {
        return {
            authority: Env.get('AUTH_ENDPOINT', ''),
            clientId: Env.get('AUTH_ID', ''),
            scope: 'openid profile roles offline_access',
            clientSecret: Env.get('AUTH_SECRET', ''),
            responseType: 'code',
            redirectUri: `${window.location.origin}/auth/callback`,
            silentRequestTimeoutInSeconds: 5,
            checkSessionIntervalInSeconds: 1,
        };
    }

    constructor() {
        makeObservable(this, {
            isLoading: observable,
        });

        const settings = {
            ...utilsObject.toSnakeCaseKeys(this.settings),
            automaticSilentRenew: true,
            redirectMethod: 'replace',
            loadUserInfo: true,
            monitorSession: true,
        } as unknown as UserManagerSettings;

        const mgr = new UserManager(settings);
        this.mgr = mgr;

        mgr.events.addSilentRenewError(() => {
            mgr.signinRedirectCallback();
        });

        mgr.events.addAccessTokenExpired(() => {
            this.logout();
        });

        const updateUser = async () => {
            const user = await mgr.getUser();
            restClient.setToken(user ? user.access_token : '---');
        };

        mgr.events.addUserSessionChanged(updateUser);
        mgr.events.addUserLoaded(updateUser);
        mgr.events.addUserSignedIn(updateUser);
        mgr.events.addUserUnloaded(updateUser);
        mgr.events.addUserSignedOut(updateUser);
    }

    restore = async () => {
        const mgr = this.mgr;

        if (stores.display.router.$.authCallback.match) {
            let ok = true;

            try {
                const user = await mgr.signinRedirectCallback();
                this.updateStatusOfUser(user);
            } catch (error) {
                debug.print(error, 'api/Auth', DebugLevel.info);
                ok = false;
            }

            if (!ok) {
                getDocument().location.replace('/');
                return;
            }

            stores.display.router.rawGo(storage.session.get('authRedirect', '/'));
            storage.session.set('authRedirect', undefined);
        }

        const user = await mgr.getUser();

        if (!user) {
            storage.session.set('authRedirect', getDocument().location.pathname);
            await mgr.clearStaleState();
            await mgr.signinRedirect();
            return;
        }

        restClient.setToken(user.access_token ?? '');
        this.updateStatusOfUser(user);

        mgr.startSilentRenew();

        runInAction(() => {
            this.isLoading = false;
        });
    };

    updateStatusOfUser = (user?: User | null) => {
        if (!user || user === null) {
            return;
        }

        if (String(user?.profile?.role).toLowerCase() === 'admin') {
            stores.display.setAdmin();
        } else if (String(user?.profile?.role).toLowerCase() === 'superadmin') {
            stores.display.setSuperAdmin();
        } else {
            // do nothing
        }
    };

    logout = async () => {
        try {
            restClient.clearId();

            await this.mgr.signoutRedirect(utilsObject.toSnakeCaseKeys({
                postLogoutRedirectUri: window.location.origin,
            }));
        } catch (error) {
            try {
                await this.mgr.clearStaleState();
                await this.mgr.removeUser();
            } catch (error_) {
                // well, we tried at least
            }
            getDocument().location.replace('/');
        }
    };
}

export const auth = new Auth();
