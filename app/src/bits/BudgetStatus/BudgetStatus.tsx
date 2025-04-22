import { E, lang } from '~/api';
import { toCurrency } from '~/utils/number';
import { Button, If } from '~/bits';
import { observer } from 'mobx-react';

type Props = {
    totalBudget?: number;
    onEdit: VoidFunction;
    context: E.RoleInCompany;
};

export const BudgetStatus = observer(({ totalBudget, onEdit, context }: Props) => {
    const title = context === E.RoleInCompany.client
        ? lang.dict.get('myTotalBudget')
        : lang.dict.get('totalBudget');

    return (
        <div className="budget">
            <div className="budget__left">
                <p className="budget__title">{title}</p>
                <p className="budget__value">
                    {toCurrency(totalBudget, 0)}
                    &nbsp;
                    {lang.dict.get('fieldOmr')}
                </p>
            </div>
            <If condition={context === E.RoleInCompany.client}>
                <Button
                    color="white"
                    value={lang.dict.get('edit')}
                    onClick={onEdit}
                />
            </If>
        </div>
    );
});
