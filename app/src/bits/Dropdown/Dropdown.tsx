import { observer } from 'mobx-react';
import { type ReactNode, type PropsWithChildren } from 'react';
import { hook } from '~/utils';
import type { DropdownViewModel } from './Dropdown.vm';

const Dropped = (props: PropsWithChildren<{
    isOpen: boolean;
}>) => {
    if (!props.isOpen) {
        return null;
    }

    return (
        <div className="dropped">
            {props.children}
        </div>
    );
};

export const Dropdown = observer((props: PropsWithChildren<{
    content: () => ReactNode;
    viewModel: DropdownViewModel;
    hideTick?: boolean;
}>) => {
    const ref = hook.useClickOutside(props.viewModel.close);
    return (
        <div
            className="dropdown"
            ref={ref}
        >
            <div
                className="face"
                onClick={props.viewModel.toggle}
            >
                <div
                    className="preview"
                    data-is-open={props.viewModel.isOpen}
                >
                    {props.children}
                </div>
                <div
                    className="tick"
                    hidden={props.hideTick}
                    data-is-open={props.viewModel.isOpen}
                />
            </div>
            <Dropped
                isOpen={props.viewModel.isOpen}
            >
                {props.content()}
            </Dropped>
        </div>
    );
});
