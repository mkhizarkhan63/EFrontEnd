import { observer } from 'mobx-react';
import { useState } from 'react';
import { lang } from '~/api';
import { Active, Rejected, Review } from './Subscription';
import { SubscriptionAndInvoicesVm } from './SubscriptionAndInvoices.vm';

const Content = observer((props: { vm: SubscriptionAndInvoicesVm }) => {
    switch (props.vm.subscription) {
        case 'active':
            return <Active vm={props.vm} />;
        case 'review':
            return <Review />;
        case 'rejected':
            return <Rejected />;
        default:
            return null;
    }
});

export const SubscriptionAndInvoices = observer(() => {
    const [vm] = useState(() => new SubscriptionAndInvoicesVm());

    return (
        <div className="contractor-settings contractor-settings--subscription">
            <div className="contractor-settings__top">
                <h2 className="contractor-settings__header">
                    {lang.dict.get('pageSubscriptionsAndInvoices')}
                </h2>
            </div>
            <div className="subscription">
                <Content vm={vm} />
            </div>
        </div>
    );
});
