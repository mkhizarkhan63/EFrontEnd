import { Component, type ReactElement, type PropsWithChildren, type ComponentType } from 'react';

type ChildElement = ReactElement<typeof Subheader.Right | typeof Subheader.Bottom> | null;

type Props = {
    returnButton?: () => void;
    hasReturnButton?: boolean;
    leftPosition?: 'left' | 'center' | 'right';
    pageName?: string;
    pageNameVariant?: string;
    pageValue?: number;
    children?: ChildElement[] | ChildElement;
    pageSubName?: JSX.Element;
    variant?: string;
    menu?: ComponentType;
};

type ChildrenProps = PropsWithChildren<unknown>;

export class Subheader extends Component<Props> {
    render() {
        const props = this.props;

        const returnButton = props.hasReturnButton
            ? (
                <svg className="left__return" onClick={props.returnButton}>
                    <image xlinkHref="/assets/graphics/return.svg" />
                </svg>
            )
            : null;

        const pageValue = props.pageValue !== undefined
            ? <span className="left__value">{props.pageValue}</span>
            : null;

        const pageName = props.pageName !== undefined
            ? (
                <h2 className="left__name" data-variant={props.pageNameVariant}>
                    <span className="left__name-text">{props.pageName}</span>
                    {pageValue}
                    {props.pageSubName}
                </h2>
            )
            : null;

        const Menu = props.menu;

        const header = Menu ? <Menu /> : pageName;

        return (
            <div className="subheader" data-variant={props.variant}>
                <div
                    className="subheader__left"
                    data-position={props.leftPosition}
                >
                    {returnButton}
                    {header}
                </div>
                {props.children}
            </div>
        );
    }

    static Right = (props: ChildrenProps) => <div className="subheader__right">{props.children}</div>;

    static Bottom = (props: ChildrenProps) => <div className="subheader__bottom">{props.children}</div>;
}
