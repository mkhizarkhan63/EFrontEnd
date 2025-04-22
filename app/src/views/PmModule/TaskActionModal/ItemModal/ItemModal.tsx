import { lang } from '~/api';
import { Close, SideModal, SortedTable } from '~/bits';
import type { SowItemUnitType, PmSowItemType } from '~/models';

type Props = {
    sowItem?: PmSowItemType;
    onBlur: () => void;
};

const getColumns = () => SortedTable.createColumns<SowItemUnitType>(
    () => [
        {
            keyName: lang.dict.get('order'),
            displayName: lang.dict.get('section'),
            size: 1.4,
            isSortable: false,
            render: item => <div>{`1.${item.orderNumber + 1}`}</div>,
        },
        {
            keyName: lang.dict.get('description'),
            displayName: lang.dict.get('description'),
            size: 8,
            isSortable: false,
            render: item => (
                <>
                    <p className="title-modal">
                        {lang.currentLanguage === 'en' ? item.titleEnglish : item.titleArabic}:
                    </p>
                    <p className="desc-modal">
                        {lang.currentLanguage === 'en' ? item.englishDescription : item.arabicDescription}
                    </p>
                </>
            ),
        },
        {
            keyName: lang.dict.get('supplier'),
            displayName: lang.dict.get('supplier'),
            size: 3,
            isSortable: false,
            render: item => (
                <p className="supplier">
                    {
                        item.supplier === ''
                            ? '---'
                            : item.supplier
                    }
                </p>
            ),
        },
        {
            keyName: lang.dict.get('rates'),
            displayName: lang.dict.get('rates'),
            size: 2.2,
            align: 'right',
            isSortable: false,
            render: item => (
                <p className="rates">
                    {
                        item.rate === 0
                            ? '---'
                            : lang.dict.format('omrFormat', [item.rate])
                    }
                </p>
            ),
        },
    ]);

export const ItemModal = ({ sowItem, onBlur }: Props) => {
    if (!sowItem) {
        return null;
    }

    return (
        <SideModal
            variant="item-modal"
            onBlur={onBlur}
        >
            <div className="side-modal__header">
                <Close onClick={onBlur} />
                <p className="side-modal__header-title">
                    {lang.currentLanguage === 'en' ? sowItem.englishName : sowItem.arabicName}
                </p>
            </div>
            <div className="side-modal__content">
                <SortedTable
                    data={sowItem.itemUnits}
                    keyValue="orderNumber"
                    columns={getColumns()}
                />
            </div>
        </SideModal>
    );
};
