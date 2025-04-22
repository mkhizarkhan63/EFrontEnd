import { observer } from 'mobx-react';
import { lang, E } from '~/api';
import { SideModal, Close, SortedTable } from '~/bits';
import type { ProjectBidCostItem } from '~/models';
import type { BidingVm } from '../Biding.vm';

type ContentProps = {
    vm: BidingVm;
    type: E.ConstructionType;
};

const getColumns = (type: E.ConstructionType) => SortedTable.createColumns<ProjectBidCostItem>(
    () => (type === E.ConstructionType.structureOnly
        ? [
            {
                keyName: 'changeName',
                displayName: lang.dict.get('item'),
                size: 4,
                render: item => <div className="name">{item.name}</div>,
            },
            {
                keyName: 'quantity',
                displayName: lang.dict.get('quantity'),
                size: 1.5,
                render: item => <div>{item.quantity} {item.quantityUnit}</div>,
            },
            {
                keyName: 'costOmr',
                displayName: lang.dict.get('totalCosts'),
                size: 2,
                align: 'right' as const,
                render: item => <div className="cost">{item.price} {lang.dict.get('fieldOmr')}</div>,
            },
        ]
        : [
            {
                keyName: 'item',
                displayName: lang.dict.get('item'),
                size: 3,
                render: item => <div className="name">{item.name}</div>,
            },
            {
                keyName: 'costOmr',
                displayName: lang.dict.get('totalCosts'),
                size: 2,
                align: 'right' as const,
                render: item => <div className="cost">{item.price} {lang.dict.get('fieldOmr')}</div>,
            },
        ]));

const Content = observer(({ vm, type }: ContentProps) => {
    const { bid } = vm.project.forContractor;

    const part = type === E.ConstructionType.structureOnly
        ? bid?.structureOnly
        : bid?.turnKey;

    if (!part || type === E.ConstructionType.none) {
        return null;
    }
    return (
        <SortedTable
            data={part.costItems}
            keyValue="id"
            columns={getColumns(type)}
        />
    );
});

export const ViewCosts = observer(({ vm }: { vm: BidingVm }) => (
    <SideModal variant="view-costs" onBlur={vm.toggleIsViewCosts}>
        <div className="side-modal__header">
            <Close onClick={vm.toggleIsViewCosts} />
            <p className="side-modal__header-title">{lang.dict.get('viewCosts')}</p>
        </div>
        <div className="side-modal__content">
            <p className="side-modal__subheader">{lang.dict.get('structureProjectPrice')}</p>
            <Content
                vm={vm}
                type={E.ConstructionType.structureOnly}
            />
            <p className="side-modal__subheader">{lang.dict.get('turnKeyItems')}</p>
            <Content
                vm={vm}
                type={E.ConstructionType.turnKey}
            />
        </div>
    </SideModal>
));
