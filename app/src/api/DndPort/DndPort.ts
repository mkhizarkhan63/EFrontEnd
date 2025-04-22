import type { DragEvent } from 'react';

let lastId = 0;

const DND_MIME = 'application/js-dnd-port';

type Params<T> = {
    onDrop?: (id: T) => void;
};

export class DndPort<T> {
    id = `dnd-port-${++lastId}`;

    currentItem?: T;

    constructor(private params?: Params<T>) {}

    itemProps = (item: T) => ({
        onDragStart: (e: DragEvent) => {
            e.dataTransfer.setData(DND_MIME, this.id);
            this.currentItem = item;
        },
        draggable: true,
    });

    zoneProps = (onCatchItem: (item: T) => void) => ({
        onDrop: (e: DragEvent) => {
            e.preventDefault();
            const data = e.dataTransfer.getData(DND_MIME);

            if (!data || data !== this.id) {
                return;
            }

            if (!this.currentItem) {
                return;
            }

            this.params?.onDrop?.(this.currentItem);

            onCatchItem(this.currentItem);
            this.currentItem = undefined;
        },
        onDragOver: (e: DragEvent) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        },
    });
}
