import { observer } from 'mobx-react';
import type { LogType as LogVm, ProjectAdmin } from '~/models';
import { LogEntries } from '~/bits';
import { lang } from '~/api';

type Props = {
    projectAdmin: ProjectAdmin;
};

const logList = (vm: LogVm[]) => vm.map(item => ({
    id: item.id,
    text: lang.currentLanguage === 'en' ? item.description : item.descriptionArabic,
    date: item.date,
    renderAuthor: () => <span className="account-type">{item.accountType}</span>,
    user: item.user,
}));

export const Log = observer(({ projectAdmin }: Props) => (
    <LogEntries
        entries={
            logList(projectAdmin.logList.data)
        }
    />
));

