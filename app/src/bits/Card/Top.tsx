import { If } from '~/bits';

type Props = {
    title?: string;
    optionalTopTitle?: string;
};

export const Top = (props: Props) => {
    const optionalElement = (
        <If condition={() => Boolean(props.optionalTopTitle)}>
            <div className="optional">{props.optionalTopTitle}</div>
        </If>
    );

    return (
        <If condition={() => Boolean(props.title)}>
            <div className="top">
                <div className="title">{props.title}</div>
                {optionalElement}
            </div>
        </If>
    );
};
