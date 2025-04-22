import type { PropsWithChildren } from 'react';
import { hook } from '~/utils';

type Props = PropsWithChildren<{
    variant?: string;
    onBlur?: () => void;
}>;

export const SideModal = (props: Props) => {
    const ref = hook.useClickOutside(() => props.onBlur?.());

    return (
        <div
            ref={ref}
            data-variant={props.variant}
            className="side-modal"
        >
            {props.children}
        </div>
    );
};
