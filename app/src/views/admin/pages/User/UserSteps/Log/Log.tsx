import { observer } from 'mobx-react';
import { LogEntries } from '~/bits';
import { lang } from '~/api';
import type { UserVm } from '../../User.vm';
import { capitalize } from '~/utils/string';

type Props = {
    parentVm: UserVm;
};

export const Logs = observer(({ parentVm }: Props) => {
    const logs = parentVm.logs.data.map(item => ({
        id: item.id,
        text: lang.currentLanguage === 'en' ? item.description : item.descriptionArabic,
        date: item.date,
        renderAuthor: () => <span className="account-type" data-type={item.accountType}>{capitalize(String(item.accountType))}</span>,
        user: item.user,
    }));

    return (
        <div className="history-logs">
            <h2 className="history-logs__header">
                {lang.dict.get('historyLog')}
            </h2>
            <LogEntries
                isHideCount={true}
                entries={logs}
            />
        </div>
    );
});
