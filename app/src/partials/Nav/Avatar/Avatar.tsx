import { observer } from 'mobx-react';
import { lang } from '~/api';
import { If } from '~/bits';
import type { NavVm } from '../Nav.vm';

type Props = {
    vm: NavVm;
};

export const Avatar = observer(({ vm }: Props) => (
    <>
        <div
            className="avatar"
            data-is-double={vm.isSelectedCompany}
        >
            <div className="avatar__box-info">
                <span className="avatar__name">
                    {vm.profile.name}
                </span>
                <span className="avatar__status">
                    {lang.dict.enum('roleInCompany', vm.role)}
                </span>
            </div>
            <div
                className="avatar__box avatar__box--first"
                data-is-collapsed={vm.isProfileCollapsed}
                onClick={vm.toggleIsProfileCollapsed}
            >
                <img
                    className="avatar__icon"
                    src={vm.avatar?.img?.url ?? '/assets/graphics/blue_avatar.svg'}
                    alt=""
                />
            </div>
        </div>
        <If condition={() => vm.isSelectedCompany}>
            <div className="avatar__box avatar__box--second">
                <img
                    className="avatar__icon"
                    src={vm.logo?.url}
                    alt=" "
                />
            </div>
        </If>
    </>
));
