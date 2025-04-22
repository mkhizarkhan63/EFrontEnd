import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Dropdown, If } from '~/bits';
import { NavVm } from './Nav.vm';
import { Help } from './Help';
import { Notifications } from './Notifications';
import { Avatar } from './Avatar';
import { Profile } from './Profile';
import { lang } from '~/api';
import { stores } from '~/stores';

export const Nav = observer(() => {
    const [vm] = useState(() => new NavVm());

    useEffect(() => vm.resetDropdowns(), []);

    const handleLanguageChange = (val: string) => () => vm.setCurrentLanguage(val);

    const dropdownList = vm.languages.map((item: string) => (
        <a
            key={item}
            className="nav__link"
            onClick={handleLanguageChange(item)}
            data-lang={item}
        >
            {item}
        </a>
    ));

    return (
        <header className="header">
            <img
                alt="Logo"
                className="logo"
                src="/assets/graphics/logo.svg"
                onClick={vm.goHome}
            />
            <nav className="nav" data-is-client={vm.isClient} >
                <ul className="nav__list">
                    <div className="nav__list-projects">
                        <If condition={() => vm.showInvites}>
                            <li
                                className="nav__item nav__item--invitations"
                            >
                                <a
                                    className="nav__link"
                                    data-is-checked={vm.isOnInvites}
                                    onClick={vm.goInvites}
                                >
                                    {lang.dict.get('companyInvitations')}
                                </a>
                                <span className="nav__item-num">
                                    {stores.profile.invites.data.length}
                                </span>
                            </li>
                        </If>
                        <If condition={() => vm.showInvitations}>
                            <li
                                onClick={vm.goProjectInvitations}
                                className="nav__item nav__item--new-projects"
                            >
                                <a
                                    className="nav__link"
                                    data-is-checked={vm.isOnProjectIvitations}
                                >
                                    {lang.dict.get('invitations')}
                                </a>
                            </li>
                        </If>
                        <If condition={() => vm.showNewProjects}>
                            <li
                                onClick={vm.goNewProjects}
                                className="nav__item nav__item--new-projects"
                            >
                                <a
                                    className="nav__link"
                                    data-is-checked={vm.isOnNewProjects}
                                >
                                    {lang.dict.get('newProjects')}
                                </a>
                            </li>
                        </If>
                        <li
                            onClick={vm.goMyProject}
                            className="nav__item nav__item--my-projects"
                        >
                            <a
                                className="nav__link"
                                data-is-checked={vm.isOnMyProjects}
                            >
                                {lang.dict.get('myProjectsPageTitle')}
                            </a>
                        </li>
                    </div>
                    <If condition={() => !stores.display.router.$.admin.match}>
                        <li className="nav__item nav__item--lang-dropdown">
                            <Dropdown
                                content={() => dropdownList}
                                viewModel={vm.dropdowns.language}
                            >
                                <div className="current-language" data-lang={vm.currentLanguage}>
                                    {vm.currentLanguage}
                                </div>
                            </Dropdown>
                        </li>
                    </If>
                    <li className="nav__item nav__item--help-dropdown">
                        <Dropdown
                            content={() => <Help onClose={vm.dropdowns.help.close} />}
                            viewModel={vm.dropdowns.help}
                            hideTick={true}
                        >
                            <div className="action-icon help-icon" />
                        </Dropdown>
                    </li>
                    <li className="nav__item nav__item--notifications-dropdown">
                        <Dropdown
                            content={() => <Notifications />}
                            viewModel={vm.dropdowns.notifications}
                            hideTick={true}
                        >
                            <div className="action-icon notifications-icon" />
                        </Dropdown>
                    </li>
                    <li className="nav__item nav__item--profile-dropdown">
                        <Dropdown
                            content={() => <Profile vm={vm} />}
                            viewModel={vm.dropdowns.profile}
                        >
                            <Avatar vm={vm} />
                        </Dropdown>
                    </li>
                </ul>
            </nav>
        </header>
    );
});
