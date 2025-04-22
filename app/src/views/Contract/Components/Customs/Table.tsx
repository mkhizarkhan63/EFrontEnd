import { utilsArray } from '~/utils';

type Alignment = (
    | 'left'
    | 'right'
    | 'center'
);

export type TableRowProps = {
    header?: string[];
    rows?: Array<Array<string | JSX.Element | number>> | undefined;
    spacing: number[];
    alignments?: Alignment[];
    isHideBorders?: boolean;
    headerImg?: string;
    tableAdd?: JSX.Element;
};

const bold = (text?: string | number) => (
    <span className="highlighted">
        {text}
    </span>
);

const underline = (text: string | number) => (
    <span className="highlighted" data-is-underline={true}>
        {text}
    </span>
);

const TableRaw = (props: TableRowProps) => {
    if (!props.rows) {
        return null;
    }

    const rows = props.rows.map((row, i) => {
        const items = row.map((item, j) => (
            <td
                key={`${j}-item`}
                width={`${utilsArray.extract(props.spacing, j, 0)}%`}
                align={utilsArray.extract(props.alignments ?? [], j, 'left')}
            >
                {item}
            </td>
        ));

        return (
            <tr key={`${i}-row`}>
                {items}
            </tr>
        );
    });

    const headerItems = (props.header ?? []).map((item, idx) => (
        <td
            key={idx}
            width={`${utilsArray.extract(props.spacing, idx, 0)}%`}
            align={utilsArray.extract(props.alignments ?? [], idx, 'left')}
            className="table-header"
        >
            {item}
        </td>
    ));

    const header = props.header
        ? (
            <tr className="pdf-table__thead-text">
                {headerItems}
            </tr>
        )
        : null;

    const headerImg = props.headerImg && props.headerImg !== ''
        ? <img src={props.headerImg} />
        : null;

    return (
        <>
            {props.tableAdd}
            <table
                className="pdf-table"
                width="100%"
                data-hide-borders={Boolean(props.isHideBorders)}
            >
                <thead className="pdf-table__thead">
                    <tr className="pdf-table__thead-img">
                        {headerImg}
                    </tr>
                    {header}
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </>
    );
};

const createTable = (props: TableRowProps) => () => <TableRaw {...props} />;

export const Table = Object.assign(TableRaw, {
    create: createTable,
    $b: bold,
    $u: underline,
});
