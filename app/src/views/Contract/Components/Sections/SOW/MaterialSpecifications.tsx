import type { SowItem } from '~/models';
import { Table } from '../../Customs';

type Props = {
    sowItems: SowItem[];
    sowItem: SowItem;
    name: string;
    order: number;
};

const DEFAULTVALUE = [['---', '---', '---', '---']];

const MaterialTable = ({ sowItem, name, order }: Omit<Props, 'sowItems'>) => {
    const sowSubItems = sowItem.forContract.sowSubItemList
        .map((item, i) => [
            `${order}.${i+1}`,
            <>
                <span className="pdf-material-specs__desc">
                    {item.titleEnglish}:
                </span>
                {item.englishDescription}
                <p className="pdf-material-specs__accept">
                    Acceptance Criteria: {Table.$u('5.0 Document Submission')}
                </p>
            </>,
            item.supplier ?? '---',
            item.rate ?? '---',
        ]);

    const content = sowSubItems.length > 0 ? sowSubItems : DEFAULTVALUE;

    return (
        <div>
            <div className="pdf-table-subheader">{`${order}. ${name}`}</div>
            <Table
                header={['Section', 'Description', 'Supplier', 'Rate']}
                spacing={[10, 55, 15, 10]}
                alignments={['left', 'left', 'left', 'right']}
                rows={content}
            />
        </div>
    );
};

export const MaterialSpecifications = ({ sowItems }: Pick<Props, 'sowItems'>) => {
    const materialSpecifications = sowItems.map((item, i) => (
        <MaterialTable
            key={item.id.asStr()}
            name={item.englishName}
            sowItem={item}
            order={++i}
        />
    ));

    return (
        <div className="pdf-material-specs">
            {materialSpecifications}
        </div>
    );
};
