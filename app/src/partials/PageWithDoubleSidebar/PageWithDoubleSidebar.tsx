import { type ComponentType, type PropsWithChildren } from 'react';
import { Footer } from '../Footer';
import { Nav } from '../Nav';

type Props = PropsWithChildren<{
    leftPanel: ComponentType;
    rightPanel: ComponentType;
}>;

export const PageWithDoubleSidebar = (props: Props) => {
    const {
        leftPanel: LeftPanel,
        rightPanel: RightPanel,
        children,
    } = props;

    return (
        <div className="page">
            <Nav />
            <div
                className="view-content"
                id="scrolling-page"
            >
                <div className="page-with-double-sidebar">
                    <div className="left-panel">
                        <LeftPanel />
                    </div>
                    <div className="center-panel">
                        {children}
                    </div>
                    <div className="right-panel">
                        <RightPanel />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};
