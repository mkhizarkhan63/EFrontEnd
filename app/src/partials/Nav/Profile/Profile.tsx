import { observer } from 'mobx-react';
import { type Img, lang, E } from '~/api';
import { If } from '~/bits';
import type { NavVm } from '../Nav.vm';
import { stopPropagation } from '~/utils';

type CellProps = {
    onClick?: () => void;
    icon: string;
    title: string;
};

type CompanyProps = {
    onSettingsClick?: () => void;
    onBoxClick?: () => void;
    name?: string;
    role?: E.RoleInCompany;
    logo?: Img;
};

type ProfileProps = {
    vm: NavVm;
};

const roleAppearence = (role?: E.RoleInCompany) => {
    switch (role) {
        case E.RoleInCompany.client:
            return 'neutral';
        case E.RoleInCompany.contractor:
            return 'wait';
        case E.RoleInCompany.consultant:
            return 'positive';
        default:
            return 'neutral';
    }
};

const Cell = (props: CellProps) => (
    <div
        className="cell"
        onClick={props.onClick}
    >
        <div className="cell__icon" data-icon={props.icon} />
        <div className="cell__title">{props.title}</div>
    </div>
);

const Company = observer((props: CompanyProps) => (
    <div className="company" onClick={props.onBoxClick} data-role={props.role}>
        <div className="company__avatar">
            <img
                src={props.logo?.url}
                alt=" "
                className="company__avatar-logo"
            />
        </div>
        <div className="company__texts">
            <div className="company__name">{props.name}</div>
            <div
                className="company__role"
                data-appearence={roleAppearence(props.role)}
            >
                {lang.dict.enum('roleInCompany', props.role)}
            </div>
        </div>
        <img
            className="company__settings-icon"
            src="/assets/graphics/settings.svg"
            alt="settings-icon"
            onClick={stopPropagation(props.onSettingsClick)}
        />
    </div>
));

export const Profile = observer(({ vm }: ProfileProps) => {
    const companies = vm.profile.profilesInCompanies.map(x => (
        <Company
            name={x.companyName}
            key={x.id.asNumber()}
            onSettingsClick={() => vm.profile.openSettings(x.id)}
            onBoxClick={() => vm.profile.openProjects(x.id)}
            role={x.role}
            logo={x.logo}
        />
    ));

    const settingsTitleDictKey = vm.role === E.RoleInCompany.client ? 'clientSettings' : 'companySettings';

    return (
        <div className="profile">
            <div className="profile__top" data-is-admin={vm.role === E.RoleInCompany.admin}>
                <div
                    className="profile__top-avatar profile__top-avatar--first"
                    data-is-double={vm.isSelectedCompany}
                >
                    <img
                        src={vm.profile?.avatar?.img?.url ?? '/assets/graphics/blue_avatar.svg'}
                        alt=" "
                        className="profile__top-avatar-icon"
                    />
                </div>
                <If condition={() => vm.isSelectedCompany}>
                    <div className="profile__top-avatar profile__top-avatar--second">
                        <img
                            src={vm.logo?.url}
                            alt=" "
                            className="profile__top-avatar-icon"
                        />
                    </div>
                </If>
                <div className="profile__top-name">{vm.profile.name}</div>
                <div className="profile__top-role">
                    {lang.dict.enum('roleInCompany', vm.role)}
                </div>
                <If condition={() => vm.role !== E.RoleInCompany.admin}>
                    <Cell
                        onClick={vm.profile.goSettings}
                        title={lang.dict.get(settingsTitleDictKey)}
                        icon="settings"
                    />
                </If>
            </div>
            <div className="profile__bottom">
                <div className="profile__bottom-companies">
                    <Company
                        onBoxClick={vm.profile.openProjects}
                        onSettingsClick={vm.profile.openSettings}
                        name={vm.profile.name}
                        role={E.RoleInCompany.client}
                        logo={vm.profile.avatar?.img}
                    />
                    {companies}
                </div>
                <div className="profile__bottom-actions">
                    <Cell
                        icon="add"
                        title={lang.dict.get('profileAddCompany')}
                        onClick={vm.profile.goCompanyRegister}
                    />
                    <If condition={() => vm.isAdmin}>
                        <Cell
                            icon="settings"
                            title={lang.dict.get('admin')}
                            onClick={vm.goAdmin}
                        />
                    </If>
                    <Cell
                        icon="logout"
                        title={lang.dict.get('profileLogout')}
                        onClick={vm.logout}
                    />
                </div>
            </div>
        </div>
    );
});
