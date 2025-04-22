import { lang } from '~/api';
import { Close, If, SideModal, SortedTable } from '~/bits';
import { type SowSubitem } from '~/models';
import type { StageVm } from './Stage.vm';

type Props = {
    vm: StageVm;
};

const getColumns = () => SortedTable.createColumns<SowSubitem>(
    () => [
        {
            keyName: lang.dict.get('order'),
            displayName: lang.dict.get('section'),
            size: .5,
            isSortable: false,
            render: item => <div className="section">{`1.${item.orderNumber + 1}`}</div>,
        },
        {
            keyName: lang.dict.get('description'),
            displayName: lang.dict.get('description'),
            size: 4.4,
            isSortable: false,
            render: item => (
                <>
                    <p className="title">
                        {item.titleEnglish}:
                    </p>
                    <p className="desc">
                        {item.englishDescription}
                    </p>
                    <If condition={item.acceptanceWorkflowName.length > 0}>
                        <p className="info">
                            Acceptance Criteria:&nbsp;
                            <span className="info__details">
                                {item.acceptanceWorkflowName}
                            </span>
                        </p>
                    </If>
                </>
            ),
        },
        {
            keyName: lang.dict.get('supplier'),
            displayName: lang.dict.get('supplier'),
            isSortable: false,
            render: item => <p>{item.supplier === '' ? '---' : item.supplier}</p>,
        },
        {
            keyName: lang.dict.get('rates'),
            displayName: lang.dict.get('rates'),
            size: .6,
            align: 'right',
            isSortable: false,
            render: item => <p>{item.rate === '' ? '---' : item.rate}</p>,
        },
    ]);

export const SowItemModal = ({ vm }: Props) => {
    const table = vm.currentSowItem?.subItems
        ? (
            <SortedTable
                data={vm.currentSowItem?.subItems}
                keyValue="orderNumber"
                columns={getColumns()}
            />
        )
        : null;

    return (
        <SideModal
            variant="sow-item"
            onBlur={vm.closeSowItemModal}
        >
            <div className="side-modal__header">
                <Close onClick={vm.closeSowItemModal} />
                <p className="side-modal__header-title">{vm.currentSowItem?.englishName}</p>
            </div>
            <div className="side-modal__content">
                {table}
            </div>
        </SideModal>
    );
};
