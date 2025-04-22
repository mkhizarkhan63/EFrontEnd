import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Management, PageSettings } from '~/partials';
import { CompanyProfile, ManageEmployees, NewProjectSettings, SubscriptionAndInvoices } from './Tabs';

export const CompanyProfileSettings = observer(() => {
    const menuItems = [
        {
            key: 'general',
            name: lang.dict.get('pageCompanyProfile'),
            content: CompanyProfile,
        },
        {
            key: 'manageEmployees',
            name: lang.dict.get('pageManageEmployees'),
            content: ManageEmployees,
        },
        {
            key: 'newProject',
            name: lang.dict.get('pageNewProjectSettings'),
            content: NewProjectSettings,
        },
        {
            key: 'subscriptionAndInvoices',
            name: lang.dict.get('pageSubscriptionsAndInvoices'),
            content: SubscriptionAndInvoices,
        },
        {
            key: 'myClientReview',
            name: lang.dict.get('pageMyClientReview'),
            content: () => <Management.Reviews />,
        },
    ];

    return (
        <PageSettings
            title={lang.dict.get('profileSettings')}
            menuItems={menuItems}
        />
    );
});
