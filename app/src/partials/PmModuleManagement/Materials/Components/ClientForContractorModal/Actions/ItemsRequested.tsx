import { observer } from 'mobx-react';
import { lang } from '~/api';
import { If } from '~/bits';
import type { ClientForContractorModalVm } from '../ClientForContractorModal.vm';
import { Submission } from './Submission';

type Props = {
    parentVm: ClientForContractorModalVm;
};

export const ItemsRequested = observer(({ parentVm }: Props) => {
    const items = parentVm.itemsRequestedByContractor;
    const isClientPurchase = parentVm.clientPurchase.length > 0;

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="items-requested">
            <p className="items-requested__header">
                {lang.dict.format('itemsRequestedByContractor', [items.length])}
            </p>
            <p className="items-requested__text">
                {lang.dict.get('addYourCommentsForAnySpecialRequests')}
            </p>
            <Submission
                isReadOnly={true}
                parentVm={parentVm}
                tasks={items}
                type="requested"
            />
            <If condition={isClientPurchase}>
                <p className="items-requested__header items-requested__header--purchased">
                    {lang.dict.get('clientPurchaseDetails')}
                </p>
                <Submission
                    isReadOnly={true}
                    parentVm={parentVm}
                    tasks={parentVm.clientPurchase}
                    type="purchased"
                />
            </If>
        </div>
    );
});
