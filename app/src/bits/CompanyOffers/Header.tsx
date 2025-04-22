import { observer } from 'mobx-react';
import type { ReactElement } from 'react';

type Props = {
    isTotalPrice: boolean;
    headerContent: ReactElement;
    togglePriceType: () => void;
};

export const Header = observer((props: Props) => (
    <div className="table__header">
        <div className="headers">{props.headerContent}</div>
    </div>
));
