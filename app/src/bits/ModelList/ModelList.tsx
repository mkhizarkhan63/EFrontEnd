import { observer } from 'mobx-react';
import type { ComponentType } from 'react';
import type { Id } from '~/api';

type T0 = { id: string | Id | number };

type Props<T extends T0, Ctx> = {
    onRemove?: (id: T['id']) => void;
    context: Ctx;
    itemRender: ComponentType<{
        index: number;
        vm: T;
        remove: () => void;
        context: Ctx;
    }>;
    modelsList: T[];
};

const extractString = (id: string | Id) => (typeof id === 'string' ? id : id.asStr());

export const ModelList = observer(<T extends T0, Ctx extends unknown>(props: Props<T, Ctx>) => {
    const {
        onRemove,
        modelsList,
        itemRender: Item,
        context,
    } = props;

    const itemsRender = modelsList.map((model, i) => {
        const key = typeof model.id === 'number'
            ? String(model.id)
            : extractString(model.id);

        return (
            <Item
                key={key}
                index={i}
                remove={() => onRemove?.(model.id)}
                vm={model}
                context={context}
            />
        );
    });

    return (
        <div className="model-list">
            {itemsRender}
        </div>
    );
});
