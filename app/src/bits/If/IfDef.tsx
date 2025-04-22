import { observer } from 'mobx-react';

type Props<T> = {
    condition: () => T | undefined;
    render: (t: T) => JSX.Element;
};

export const IfDef = observer(<T extends unknown>(props: Props<T>) => {
    const t = props.condition();

    return t === undefined
        ? null
        : props.render(t);
});
