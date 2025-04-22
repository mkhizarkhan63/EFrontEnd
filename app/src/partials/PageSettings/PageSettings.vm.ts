import { action } from 'mobx';
import type { ComponentType } from 'react';
import { stores } from '~/stores';

type PageSettingsItem = {
    key: string;
    name: string;
    content: ComponentType;
};

export class PageSettingsVm {
    mobileMenuIsVisible = true;

    constructor(readonly menuItems: PageSettingsItem[]) {
        makeSafeObservable(this, {
            openTab: action,
            mount: false,
            setMobileMenuIsVisible: action,
        });
    }

    mount = () => {
        if (!this.isValidTab) {
            this.openTab(this.menuItems[0].key ?? '');
        }
    };

    get activeTab() {
        return stores.display.router.$.settings.params.tab;
    }

    get isValidTab() {
        return this.menuItems.map(item => item.key).includes(this.activeTab);
    }

    get content() {
        return this.menuItems
            .find(item => item.key === this.activeTab)?.content;
    }

    openTab = (key: string) => {
        this.setMobileMenuIsVisible(false);
        stores.display.router.$.settings.go({ tab: key });
    };

    setMobileMenuIsVisible = (value: boolean) => {
        this.mobileMenuIsVisible = value;
    };
}
