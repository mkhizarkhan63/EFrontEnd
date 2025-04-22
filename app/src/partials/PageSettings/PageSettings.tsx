import { useEffect, useRef, type ComponentType } from 'react';
import { observer } from 'mobx-react';
import { PageWithSidebar } from '~/partials';
import { PageSettingsVm } from './PageSettings.vm';
import { Button, Icons, TryRender } from '~/bits';
import { hook } from '~/utils';
import { lang } from '~/api';

type PageSettingsItem = {
    key: string;
    name: string;
    content: ComponentType;
};

type PageSettingsProps = {
    title: string;
    menuItems: PageSettingsItem[];
};

type SidebarProps = PageSettingsProps & {
    vm: PageSettingsVm;
};

const Sidebar = observer(({ vm, title, menuItems }: SidebarProps) => {
    const tabs = menuItems.map(item => (
        <div
            className="sidebar__step"
            key={item.key}
            data-is-active={item.key === vm.activeTab}
            onClick={() => vm.openTab(item.key)}
        >
            {item.name}
            <Icons icon="next-sign" />
        </div>
    ));

    return (
        <div className="sidebar">
            <div className="sidebar__header">{title}</div>
            <div className="sidebar__tabs">
                {tabs}
            </div>
            <div className="sidebar__mobile-back">
                <Button
                    color="transparent"
                    leftImg="back"
                    value={lang.dict.get('goBack')}
                    onClick={() => vm.setMobileMenuIsVisible(true)}
                />
            </div>
        </div>
    );
});

export const PageSettings = observer((props: PageSettingsProps) => {
    const vm = hook.useVm(() => new PageSettingsVm(props.menuItems));

    const parent = useRef<HTMLDivElement>(null);

    useEffect(() => {
        parent.current?.scrollTo(0, 0);
    }, [vm.activeTab]);

    return (
        <div
            className="settings-container"
            data-mobile-menu-is-visible={vm.mobileMenuIsVisible}
        >
            <PageWithSidebar
                pageName="page-profile-settings"
                ref={parent}
                sidebar={() => (
                    <Sidebar
                        vm={vm}
                        title={props.title}
                        menuItems={props.menuItems}
                    />
                )}
            >
                <TryRender component={() => vm.content} />
            </PageWithSidebar>
        </div>
    );
});
