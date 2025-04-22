import { forwardRef, type PropsWithChildren, type ComponentType } from 'react';
import { Nav } from '~/partials/Nav';
import { Footer } from '../Footer';

type Props = PropsWithChildren<{
    sidebar: ComponentType;
    pageName?: string;
}>;

export const PageWithSidebar = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const Sidebar = props.sidebar;

    return (
        <div className="page">
            <Nav />
            <div
                ref={ref}
                className="view-content view-content--page-with-sidebar"
            >
                <div
                    className="page-with-sidebar"
                    data-page={props.pageName}
                >
                    <Sidebar />
                    {props.children}
                    <Footer />
                </div>
            </div>
        </div>
    );
});
