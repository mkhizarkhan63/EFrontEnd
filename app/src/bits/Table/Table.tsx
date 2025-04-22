import { observer } from 'mobx-react';
import { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { Icons } from '..';

type Column<Key extends unknown, T extends unknown> = {
    keyName: Key;
    displayName: string;
    isSortable?: boolean;
    size?: number;
    align?: 'right' | 'left';
    render: (item: T, index: number) => JSX.Element;
};

type Props<T extends unknown, Key extends unknown> = {
    data: T[];
    keyValue: keyof T;
    columns: Array<Column<Key, T>>;
    isMovable?: boolean;
    sortBy?: [isAsc: boolean, column: Key];
    onMove?: (aIndex: number, bIndex: number) => void;
    onSort?: (column: Key) => void;
};

const useReload = (
    // setup => create => remove
    onReload: (reload: () => void) => () => () => void,
    refs: unknown[],
) => {
    const [reloadValue, setReload] = useState(0);
    const reload = () => setReload(v => v + 1);
    useEffect(onReload(reload), [reloadValue, ...refs]);
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

/**
 * @deprecated Use `SortedTable` instead
 */
export const createTableColumns = <
    T extends unknown,
    Key extends unknown,
>(creator: () => Array<Column<Key, T>>) => creator();

/**
 * @deprecated Use `SortedTable` instead
 */
export const Table = observer(<T extends unknown, Key extends unknown>({
    data,
    keyValue,
    columns,
    sortBy,
    isMovable,
    onSort,
    onMove,
}: Props<T, Key>) => {
    const ref = useRef<HTMLDivElement>(null);

    useReload(reload => () => {
        if (!ref.current || isMovable !== true) {
            return () => { /* */ };
        }

        const sortable = new Sortable(ref.current, {
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
        sortBy?.[0],
        sortBy?.[1],
        keyValue,
    ]);

    const list = data.map((item, i) => {
        const key = item[keyValue];

        const cols = columns.map(col => (
            <div
                className="table__cell"
                style={{ flex: col.size ?? 1, textAlign: col.align === 'right' ? 'right' : 'left' }}
                key={[key, col.keyName].join('-')}
            >
                {col.render(item, i)}
            </div>
        ));

        return <div className="table__row" key={String(key)}>{cols}</div>;
    });

    const headers = columns.map((col, i) => (
        <div
            className="table__cell"
            style={{ flex: col.size ?? 1, textAlign: col.align === 'right' ? 'right' : 'left' }}
            key={`${col.keyName}-${i}-${col.displayName}`}
            onClick={() => col.isSortable === true && onSort?.(col.keyName)}
            data-is-sortable={col.isSortable === true}
        >
            {col.displayName}
            <SortIcon
                isVisible={() => Boolean(sortBy?.[1] && sortBy?.[1] === col.keyName)}
                isAsc={() => Boolean(sortBy?.[0] && sortBy?.[0] === true)}
            />
        </div>
    ));
    return (
        <div className="table" data-comp="bits/table">
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
