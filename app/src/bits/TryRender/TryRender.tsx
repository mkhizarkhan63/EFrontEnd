import type { ComponentType } from 'react';
import { observer } from 'mobx-react';

type UnknownProps = Record<string | number | symbol, unknown>;

type Props<P extends UnknownProps> = keyof Pick<P, {
    [K in keyof P]-?: undefined extends P[K] ? never : K;
}[keyof P]> extends never
    ? {
        component: () => ComponentType<P> | undefined;
        props?: P;
    }
    : {
        component: () => ComponentType<P> | undefined;
        props: P;
    };

export const TryRender = observer(<P extends UnknownProps>(props: Props<P>) => {
    const Comp = props.component();

    if (!Comp) {
        return null;
    }

    if (props.props) {
        return <Comp {...props.props} />;
    }

    const altProps = {} as unknown as P;

    return <Comp {...altProps} />;
});
