import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button } from '~/bits';

type Props = {
    title: string;
    description: string;
    onClick: () => void;
    menu: JSX.Element;
};

export const ClientNavBanner = observer(({ title, description, onClick, menu }: Props) => (
    <div className="client-nav-banner">
        <div className="client-nav-banner__left">
            <p className="client-nav-banner__left-title">{title}</p>
            <p className="client-nav-banner__left-desc">{description}</p>
            <Button
                color="transparent"
                onClick={onClick}
                leftImg="next"
                value={lang.dict.get('seeHowItWorks')}
            />
        </div>
        {menu}
    </div>
));
