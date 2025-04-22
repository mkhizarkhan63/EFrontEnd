import { observer } from 'mobx-react';
import { debug, E, lang } from '~/api';
import { type Dict } from '~/api/Lang/Dict';
import { stores } from '~/stores';

type Props = {
    message?: keyof Dict;
    isCve?: boolean;
};

const getError = () => {
    const context = stores.profile.currentProfile.role;

    switch (context) {
        case E.RoleInCompany.consultant:
            return debug.cve.consultant;

        case E.RoleInCompany.contractor:
            return debug.cve.contractor;

        case E.RoleInCompany.client:
            return debug.cve.client;
    }
};

export const CriticalError = observer(({ message, isCve }: Props) => {
    let errorTime = 0;

    if (isCve) {
        message = getError();
        errorTime = debug.cve.time;
    }

    if (!message) {
        return null;
    }

    const clearCve = () => {
        if (!isCve) {
            return;
        }

        debug.removeCve();
    };

    return (
        <div
            data-error-time={errorTime}
            className="invalid-route"
            onAnimationEnd={clearCve}
        >
            {lang.dict.get(message)}
        </div>
    );
});
