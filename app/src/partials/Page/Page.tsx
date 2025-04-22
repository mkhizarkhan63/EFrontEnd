import type { PropsWithChildren } from 'react';
import { Nav } from '~/partials/';
import { Footer } from '../Footer';

type Props = PropsWithChildren<{
    isLazy?: boolean;
    name?: string;
}>;

export const Page = (props: Props) => (
    <div className="page" data-name={props.name}>
        <Nav />
        <div
            className="view-content"
            id="scrolling-page"
            data-is-lazy={props.isLazy}
        >
            <div className="view-content__scroll">
                {props.children}
                <Footer />
            </div>
        </div>
    </div>
);
