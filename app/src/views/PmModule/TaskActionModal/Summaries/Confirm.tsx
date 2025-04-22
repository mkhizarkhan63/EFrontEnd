import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import type { SubmissionType } from '~/models';

type Props = {
    sub: SubmissionType;
    desc: string;
    isGeneral?: boolean;
};

export const Confirm = observer(({ sub, desc, isGeneral }: Props) => {
    const generalTitle = sub.name;

    const paymentTitle = sub.status === E.SubmitStatus.rejected
        ? lang.dict.get('contractorRejectedPayment')
        : lang.dict.get('contractorConfirmedPayment');

    const title = isGeneral ? generalTitle : paymentTitle;

    const submitStatus = isGeneral ? lang.dict.get('submitted') : lang.dict.enum('submitStatus', sub.status);

    return (
        <div className="confirm" data-status={sub.status}>
            <p className="confirm__title">
                {title}
            </p>
            <p className="confirm__desc">
                {submitStatus} {desc}
            </p>
        </div>
    );
});
