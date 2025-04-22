import { observer } from 'mobx-react';
import { useState } from 'react';
import { lang } from '~/api';
import { Button } from '~/bits';
import { ClientNavVm } from './ClientNav.vm';

export const ClientNav = observer(() => {
    const [vm] = useState(() => new ClientNavVm());

    return (
        <div className="client-nav">
            <div className="client-nav__left">
                <p className="client-nav__text">{lang.dict.get('selectService')}</p>
                <div
                    onClick={vm.goDesign}
                    data-is-active={vm.isOnDesign}
                    className="client-nav__btn"
                >
                    {lang.dict.get('design')}
                </div>
                <div
                    onClick={vm.goBuild}
                    data-is-active={vm.isOnBuild}
                    className="client-nav__btn"
                >
                    {lang.dict.get('build')}
                </div>
                <div
                    onClick={vm.goBuy}
                    data-is-active={vm.isOnBuy}
                    className="client-nav__btn"
                >
                    {lang.dict.get('buy')}
                </div>
            </div>
            <Button
                value={lang.dict.get('registerCompany')}
                color="white"
                onClick={vm.goCompanyRegister}
                leftImg="register-company"
            />
        </div>
    );
});
