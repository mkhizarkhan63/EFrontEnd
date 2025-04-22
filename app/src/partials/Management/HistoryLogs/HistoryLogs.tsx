import { observer } from 'mobx-react';
import type { LogType } from '~/models';
import { LogEntries } from '~/bits';
import { lang } from '~/api';

type Props = {
    logList: LogType[];
};

export const HistoryLogs = observer(({ logList }: Props) => {
    const logs = logList.map(item => ({
        id: item.id,
        text: lang.currentLanguage === 'en' ? item.description : item.descriptionArabic,
        date: item.date,
        renderAuthor: () => <span className="account-type" data-type={item.accountType}>{item.accountType}</span>,
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

