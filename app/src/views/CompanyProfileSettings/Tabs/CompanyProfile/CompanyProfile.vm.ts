import { E, lang } from '~/api';
import { type IconName } from '~/bits';
import { stores } from '~/stores';
import { isUrlValid } from '~/utils/string';

type StarsValue = {
    key: keyof typeof E.StarsLabel;
    value: number;
};

export class CompanyProfileVm {
    starsValues: StarsValue[] = [
        { key: 'management', value: 0 },
        { key: 'qualityOfWorks', value: 0 },
        { key: 'recommendation', value: 0 },
        { key: 'speedOfWorks', value: 0 },
        { key: 'communication', value: 0 },
        { key: 'cooperation', value: 0 },
    ];

    constructor() {
        makeSafeObservable(this, {
            goToPublicProfile: false,
            goToEditProfile: false,
        });
    }

    get profile() {
        return stores.profile.profile;
    }

    get contractor() {
        return stores.profile.contractor;
    }

    get workingGovernorates() {
        return this.contractor?.workingGovernorates
            .filter(x => !x.value.isEqual(this.contractor?.headOfficeGovernorateId))
            .map(x => x.name) ?? [];
    }

    get contact() {
        return [
            { name: 'phone' as const, data: this.profile?.phone ?? '' },
            { name: 'email' as const, data: this.profile?.email ?? '' },
        ];
    }

    get socialMedia() {
        if (!this.profile) {
            return [];
        }

        const allMedia = this.profile.marketings.map(item => ({
            name: item.marketingService as IconName,
            url: item.addressUrl,
        }));

        return allMedia.filter(item => isUrlValid(item.url));
    }

    get planningSoftware() {
        const software = this.profile?.planningSoftware
            .map(item => lang.dict.enum('planningSoftware', item))
            .join(', ');

        if (this.profile?.otherPlanningSoftware !== '') {
            return `${software} (${this.profile?.otherPlanningSoftware})`;
        }

        return software ?? '';
    }

    goToPublicProfile = () => {
        const role = stores.profile.currentProfile.role;

        if (role === E.RoleInCompany.client) {
            return;
        }

        stores.display.router
            .$.context
            .$.details
            .go({
                type: role,
                id: this.profile?.externalId ?? 0,
            });
    };

    goToEditProfile = () => {
        const profileContext = stores.profile.currentProfile.selectedCompany;

        if (!profileContext) {
            return;
        }

        stores.display.router
            .$.company
            .$.edit
            .go({
                type: profileContext.role as unknown as E.ProfileType,
                id: profileContext.contextId.asNumber(),
                // step: E.CompanySteps.ownerInfo,
                step: E.CompanySteps.companyInfo,
            });
    };
}
