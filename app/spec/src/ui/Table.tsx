import moment from 'moment';
import { describe, it, mount } from '~cypress';
import { Table } from '~/bits';

const createData = () => [
    {
        id: 0,
        order: 0,
        name: 'test',
        date: moment(),
    }, {
        id: 1,
        order: 10,
        name: 'wsadzxcDRTE sdfsRsdfsdfSD DHYYy?',
        date: moment().add(1, 'day').endOf('day'),
    }, {
        id: 3,
        order: 0,
        name: 'test',
        date: moment(),
    }, {
        id: 4,
        order: 10,
        name: 'wsadzxcDRTE sd32323232456fsRESD DHYYy?',
        date: moment().add(1, 'day').endOf('day'),
    }, {
        id: 5,
        order: 0,
        name: 'texcdfgrst',
        date: moment(),
    }, {
        id: 6,
        order: 10,
        name: 'wsadzxcDRTE sdfsRESD678678 DHYYy?',
        date: moment().add(1, 'day').endOf('day'),
    },
];

type DataEntry = ReturnType<typeof createData>[number];

const createColumns = () => [
    {
        keyName: 'id',
        displayName: 'id',
        render: (item: DataEntry) => <>{item.id}</>,
    }, {
        keyName: '1',
        displayName: 'order?',
        render: (item: DataEntry) => <>{item.order}</>,
    }, {
        keyName: '2',
        displayName: 'name',
        render: (item: DataEntry) => <>{item.name.toLowerCase().replace(/\s+/, ' ')}</>,
    }, {
        keyName: '3',
        displayName: 'some date',
        render: (item: DataEntry) => <strong>{item.date.format('LLLL')}</strong>,
    },
];

describe('bits/Table', () => {
    it('display content and children', () => {
        const data = {
            data: createData(),
            columns: createColumns(),
            didMod: false,
            removeColumn: () => {
                if (data.didMod === false) {
                    return;
                }

                data.columns.pop();
                data.didMod = false;
            },
            addColumn: () => {
                if (data.didMod === true) {
                    return;
                }

                data.columns.push({
                    keyName: '4',
                    displayName: 'next day',
                    render: (item: DataEntry) => <>{moment(item.date).add(1, 'day').format('LLLL')}</>,
                });
                data.didMod = true;
            },
            move: (a: number, b: number) => {
                const item = data.data.splice(a, 1)[0];
                data.data.splice(b, 0, item);
                data.data = Array.from(data.data);
            },
            isMovable: false,
            toggleMove: () => {
                data.isMovable = !data.isMovable;
            },
        };

        mount(() => (
            <>
                <Table
                    data={data.data}
                    keyValue="id"
                    columns={data.columns}
                    isMovable={data.isMovable}
                    onMove={data.move}
                />
                <button onClick={data.addColumn}>ADD</button>
                <button onClick={data.removeColumn}>REMOVE</button>
                <button onClick={data.toggleMove}>TOGGLE MOVE</button>
            </>

        ));
    });
});

