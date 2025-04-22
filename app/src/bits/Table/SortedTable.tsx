import { observer } from 'mobx-react';
import { useRef } from 'react';
import Sortable from 'sortablejs';
import { type DndPort, type Sorter, type LazyModelScroller, type LazyDataScroller, Id } from '~/api';
import { hook, utilsString } from '~/utils';
import { Icons, Loading } from '..';
import InfiniteScroll from 'react-infinite-scroll-component';

type Column<
    Key extends unknown,
    T extends unknown,
> = {
    keyName: Key;
    displayName: string;
    description?: string;
    size?: number;
    align?: 'right' | 'left';
    isMoving?: boolean;
    render: (item: T, index: number) => JSX.Element;
};

type CustomHeader = {
    isAsc: (keyName: string) => boolean;
    isVisible: (keyName: string) => boolean | undefined;
    onClick: (keyName: string) => void;
};

type Props<
    T extends unknown,
    Key extends unknown,
    SortKeys extends string,
    LazyModel extends { id: number; externalId?: number },
    LazyData extends { id: Id },
> = {
    data: T[];
    keyValue: keyof T;
    columns: Array<Column<Key, T>>;
    isMovable?: boolean;
    paymentOnHover?: (item: T) => void;
    onClick?: (item: T) => void;
    sorter?: Sorter<T, SortKeys, SortKeys>;
    customHeader?: CustomHeader;
    lazyLoad?: LazyModelScroller<LazyModel, LazyData> | LazyDataScroller<LazyData>;
    dndPort?: DndPort<T>;
    onMove?: (aIndex: number, bIndex: number) => void;
    attrs?: Record<string, (item: T) => boolean | string | number | undefined>;
};

const SortIcon = observer((props: {
    isVisible: () => boolean;
    isAsc: () => boolean;
}) => {
    if (!props.isVisible()) {
        return null;
    }
    const icon = !props.isAsc()
        ? (
            <div className="sort-icon sort-icon--top">
                <Icons icon="dropdown" />
            </div>
        )
        : (
            <div className="sort-icon">
                <Icons icon="dropdown" />
            </div>
        );
    return (
        <div className="sort">
            {icon}
        </div>
    );
});

const createColumns = <
    T extends unknown,
>(creator: () => Array<Column<string, T>>) => creator();

const getKeyOf = (id: unknown) => {
    if (id instanceof Id) {
        return id.asStr();
    }

    return String(id);
};

const isSorted = (value: unknown, sorter?: {
    columns: string[];
}) => (sorter?.columns ?? []).includes(String(value));

const getColStyle = <Key, T>(col: Column<Key, T>) => ({
    flex: col.size ?? 1,
    textAlign: col.align ?? 'left',
});

const TableComponent = observer(<
    T extends unknown,
    Key extends string,
    SortKeys extends string,
    LazyModel extends { id: number; externalId?: number },
    D extends { id: Id },
>({
    data,
    keyValue,
    columns,
    sorter,
    isMovable,
    onMove,
    dndPort,
    customHeader,
    attrs,
    lazyLoad,
    paymentOnHover,
    onClick,
}: Props<T, Key, SortKeys, LazyModel, D>) => {
    const ref = useRef<HTMLDivElement>(null);

    hook.useReload(reload => {
        if (!ref.current || isMovable !== true) {
            return () => { /* */ };
        }

        const hasHandler = columns.some(x => x.isMoving === true);

        const sortable = new Sortable(ref.current, {
            handle: hasHandler ? '[data-moving-handler="true"]' : undefined,
            onEnd: event => {
                const source = event.oldIndex;
                const target = event.newIndex;
                if (typeof source === 'number' && typeof target === 'number') {
                    onMove?.(source, target);
                }
                reload();
            },
        });

        return () => {
            sortable.destroy();
        };
    }, [
        ref.current,
        columns.map(item => item.keyName).join(''),
        data.map(item => item[keyValue]).join(''),
        isMovable,
        sorter?.dir,
        sorter?.key,
        keyValue,
    ]);

    const getAttrs = (item: T) => {
        if (!attrs) {
            return {};
        }

        return Object.fromEntries(Object.entries(attrs)
            .map(el => [`data-${utilsString.toKebabCase(el[0])}`, el[1](item)]));
    };

    const listItems = data.map((item, i) => {
        const key = item[keyValue];

        const cols = columns.map(col => (
            <div
                className="table__cell"
                style={getColStyle(col)}
                key={[getKeyOf(key), col.keyName].join('-')}
                data-moving-handler={col.isMoving}
            >
                {col.render(item, i)}
            </div>
        ));

        return (
            <div
                className="table__row"
                key={[getKeyOf(key), i].join('-')}
                {...getAttrs(item)}
                {...(dndPort?.itemProps(item) ?? {})}
                data-hover-color={paymentOnHover?.(item)}
                onClick={() => onClick?.(item)}
            >
                {cols}
            </div>
        );
    });

    const list = lazyLoad
        ? (
            <InfiniteScroll
                dataLength={lazyLoad.length}
                next={lazyLoad.loadNext}
                hasMore={!lazyLoad.isLast}
                loader={<Loading isEnabled={true} />}
                scrollableTarget="scrolling-page"
            >
                {listItems}
            </InfiniteScroll>
        )
        : listItems;

    const headerClickHandler = customHeader
        ? customHeader.onClick
        : sorter?.toggleSort;

    const isSortIconVisible = customHeader
        ? customHeader.isVisible
        : sorter?.isSelected;

    const isAscending = (type: string) => {
        if (customHeader) {
            return customHeader.isAsc(type);
        }

        return Boolean(sorter?.isDir('asc'));
    };

    const headers = columns.map((col, i) => (
        <div
            className="table__cell"
            style={getColStyle(col)}
            key={[col.keyName, i, col.displayName].join('-')}
            onClick={() => headerClickHandler?.(col.keyName)}
            data-is-sortable={isSorted(col.keyName, sorter)}
        >
            {col.displayName}
            {col.description && <span className="description">{col.description}</span>}
            <SortIcon
                isVisible={() => Boolean(isSortIconVisible?.(col.keyName))}
                isAsc={() => isAscending(col.keyName)}
            />
        </div>
    ));

    return (
        <div className="table" data-comp="bits/table" data-is-lazyload={Boolean(lazyLoad)}>
            <div className="table__header">{headers}</div>
            <div
                className="table__body"
                data-is-movable={isMovable === true}
                ref={ref}
            >
                {list}
            </div>
        </div>
    );
});

export const SortedTable = Object.assign(TableComponent, {
    createColumns,
});
