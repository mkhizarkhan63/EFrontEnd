import { Icons } from '~/bits';

type Props = {
    onClick: () => void;
};

export const Close = (props: Props) => (
    <div
        className="close"
        onClick={props.onClick}
    >
        <Icons icon="close" />
    </div>
);
