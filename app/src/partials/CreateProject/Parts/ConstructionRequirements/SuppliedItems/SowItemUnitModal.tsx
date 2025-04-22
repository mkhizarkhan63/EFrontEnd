import { If } from '~/bits';
import type { SowItem } from '~/models';
import { Table } from '~/views/Contract/Components/Customs';

type Props = {
    item?: SowItem;
    onClose: VoidFunction;
};

export const SowItemUnitModal = ({ item, onClose }: Props) => {
    const sowSubItems = item?.subItems
        .map((subItem, i) => [
            `${i + 1}`,
            <>
                <span className="pdf-material-specs__desc">
                    {subItem.titleEnglish}:
                </span>
                {subItem.englishDescription}
                <If condition={subItem.acceptanceWorkflowName.length > 0}>
                    <p className="pdf-material-specs__accept">
                        Acceptance Criteria: {Table.$u(subItem.acceptanceWorkflowName)}
                    </p>
                </If>
            </>,
            subItem.supplier.length > 0 ? subItem.supplier : '-',
            subItem.rate ?? '-',
        ]);

    return (
        <div>
            <div className="return">
                <svg className="return__arrow" onClick={onClose}>
                    <image xlinkHref="/assets/graphics/return.svg" />
                </svg>
                <span className="return__name">{item?.englishName}</span>
            </div>
            <Table
                header={['Section', 'Description', 'Supplier', 'Rate']}
                spacing={[13, 52, 15, 10]}
                alignments={['left', 'left', 'left', 'right']}
                rows={sowSubItems}
            />
        </div>
    );
};
