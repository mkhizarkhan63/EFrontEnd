import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, CompanyOffers, ErrorList, If, LogoListPrevious, Menu, Switch } from '~/bits';
import { BuyProjectsVm } from '../BuyProjects.vm';

type Props = {
    vm: BuyProjectsVm;
};

export const BuyProjectStep = observer(({ vm }: Props) => {


    return (
        <div className="buyproject-side-bar" >
            <Menu
                getItems={() => vm.menuItems}
                isActive={vm.isMenuItemActive}
                isChosen={vm.isMenuItemChosen}
                isAnimated={true}
                isCompleted={vm.isMenuItemCompleted}
                
            />

        </div>

    );
});