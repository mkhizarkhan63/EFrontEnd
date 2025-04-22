import type { ComponentType, PropsWithChildren } from 'react';
import { Nav } from '~/partials/Nav';
import { Footer } from '../Footer';

type Props = PropsWithChildren<{
    sidebar: ComponentType;
}>;

export const PageWithThinSidebar = (props: Props) => {
    const Sidebar = props.sidebar;

    return (
        <div className="page">
            <Nav />
            <div
                className="view-content"
                id="scrolling-page"
            >
                <div className="page-with-thin-sidebar">
                    <Sidebar />
                    {props.children}
                    <Footer />
                </div>
            </div>
        </div>
    );
};
