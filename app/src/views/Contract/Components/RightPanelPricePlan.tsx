import { observer } from 'mobx-react';
import { Button, SortedTable } from '~/bits';
import { lang } from '~/api';
import type { ContractVm } from '../Contract.vm';

type Props = {
    vm: ContractVm;
};

type ContentProps = Props & {
    valueType: 'price' | 'plan';
};

const getColumns = () => SortedTable.createColumns<{
    name: string;
    value: string;
    unit: string;
}>(
    () => [
        {
            keyName: lang.dict.get('name'),
            displayName: '',
            size: 3.1,
            render: item => <div className="name">{item.name}</div>,
        },
        {
            keyName: lang.dict.get('value'),
            displayName: '',
            align: 'right',
            size: 2,
            render: item => <div className="value">{String(item.value)} {item.unit}</div>,
        },
    ]);

const Content = observer(({ valueType, vm }: ContentProps) => {
    const data = valueType === 'price'
        ? vm.priceData
        : vm.planData;

    if (!data) {
        return null;
    }

    const tableName = lang.dict.get(valueType);

    return (
        <>
            <p className="right-panel__table-name">{tableName}</p>
            <SortedTable
                data={data}
                keyValue="name"
                columns={getColumns()}
            />
        </>
    );
});

export const RightPanelPricePlan = observer(({ vm }: Props) => (
    <div className="right-panel-price">
        <div className="right-panel__content">
            <div className="right-panel__table right-panel__table--price">
                <Content
                    vm={vm}
                    valueType="price"
                />
            </div>
            <div className="right-panel__table right-panel__table--plan">
                <Content
                    vm={vm}
                    valueType="plan"
                />
            </div>
            <div className="right-panel__change-contract">
                <p className="right-panel__change-contract-text">
                    {lang.dict.get('changeContractDesc')}
                </p>
                <Button
                    color="transparent"
                    value={lang.dict.get('modifyContract')}
                    onClick={vm.openModifyContract}
                />
            </div>
            <div className="right-panel__btn-sign">
                <Button
                    color="green"
                    rightImg="next"
                    value={lang.dict.get('goSubmit')}
                    onClick={vm.goToDetails}
                />
            </div>
        </div>
    </div>
));
