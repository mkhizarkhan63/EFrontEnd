import { observer } from 'mobx-react';
import type { ComponentType, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    state: boolean | (() => boolean);
    alt: ComponentType;
}>;

export const Switch = observer((props: Props) => {
    const result = typeof props.state === 'boolean'
        ? props.state
        : props.state();

    const Alt = props.alt;

    return result ? <>{props.children}</> : <Alt />;
});
