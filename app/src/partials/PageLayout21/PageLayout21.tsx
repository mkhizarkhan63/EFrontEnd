import type { PropsWithChildren } from 'react';
import { Nav } from '~/partials/Nav';

type Props = PropsWithChildren<{
    content: JSX.Element;
}>;

export const PageLayout21 = ({ content, children }: Props) => (
    <div className="page">
        <Nav />
        <div className="page-layout-21">
            <div className="page-layout-21__container">
                <div className="page-layout-21__content">
                    {content}
                </div>
                <div className="page-layout-21__details">
                    <div className="scroll-container">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
