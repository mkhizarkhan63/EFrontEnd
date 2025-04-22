import { debug } from '~/api';
import type { PropsWithChildren } from 'react';

type PossibleReason = (
    | 'moved-to-phase-2'
);

const DEPRECATED: PossibleReason[] = [];

type Props = PropsWithChildren<{
    reason: PossibleReason;
}>;

export const Hide = (props: Props) => {
    if (DEPRECATED.includes(props.reason)) {
        debug.print(
            new Error(`Hiding '${props.reason}' has been deprecated, but used`),
            'bits/Hide',
        );
    }

    return null;
};
