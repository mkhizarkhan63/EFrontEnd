import { observer } from 'mobx-react';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    condition: boolean | (() => boolean);
}>;

export const If = observer((props: Props) => {
    const result = typeof props.condition === 'boolean'
        ? props.condition
        : props.condition();

    return result ? <>{props.children}</> : null;
});
