import { If } from '~/bits';

type Props = {
    letter?: string;
    titleBig?: string;
    tableNumber?: number;
    tableName?: string;
    tableItems: Array<{
        name: string;
        count: string | number;
    }>;
    note?: string;
};

export const Header = (props: Props) => {
    const tableItems = props.tableItems.map((item, index) => (
        <div key={index} className="pdf-table-header__item">
            <div className="pdf-table-header__item-label">{item.name}</div>
            <div className="pdf-table-header__item-value">{item.count}</div>
        </div>
    ));

    return (
        <>
            <If condition={props.tableNumber === 1}>
                <div className="pdf-header">
                    <span className="pdf-header__letter">{props.letter}</span>
                    <span className="pdf-header__text">{props.titleBig}</span>
                </div>
            </If>
            <div className="pdf-table-header">
                <If condition={Boolean(props.letter)} >
                    <div className="pdf-table-header__left">
                        <div className="pdf-table-header__table-nr">Table {props.letter}.{props.tableNumber}</div>
                        <div className="pdf-table-header__table-name">{props.tableName}</div>
                    </div>
                </If>
                <div className="pdf-table-header__right">
                    {tableItems}
                </div>
            </div>
            <div className="pdf-table-header__note">{props.note}</div>
        </>
    );
};
