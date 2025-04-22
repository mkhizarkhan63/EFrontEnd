import type { PropsWithChildren } from 'react';
import type { Img } from '~/api';
import { If } from '../If';

type Props = PropsWithChildren<{
    logos: Array<Img | undefined>;
}>;

export const LogoListPrevious = (props: Props) => {
    const logoList = props.logos.slice(0, 5).map((logo, index) => (
        <div className="logo-icon-container" key={`${index}-${logo?.url}`}>
            <img
                className="logo-icon"
                src={logo?.url ?? ''}
                alt=""
            />
        </div>
    ));

    return (
        <div className="logo-list-previous">
            <div className="logo-list-previous__box">
                {logoList}
                <If condition={() => props.logos.length > 5}>
                    <div className="logo-icon-container logo-icon-container--more">
                        <img
                            className="logo-icon"
                            src="/assets/graphics/ellipsis_vertical.svg"
                            alt=""
                        />
                    </div>
                </If>
            </div>
            {props.children}
        </div>
    );
};
