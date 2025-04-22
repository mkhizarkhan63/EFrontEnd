import { observer } from 'mobx-react';
import { EngineeringServicesBlock, PersonsCard, ProfileCompany } from '~/bits';
import type { DesignVm } from '../../Design.vm';

type Props = {
    vm: DesignVm;
};

export const Sidebar = observer(({ vm }: Props) => {
    if (!vm.consultant) {
        return null;
    }

    return (
        <div className="design-detail-right">
            <ProfileCompany
                name={vm.consultant.nameTranslated}
                stars={{ labels: vm.starsLabels, values: vm.consultant.starsValues }}
                avatar={vm.avatar}
                contact={vm.contact}
                socialMedia={vm.socialMedia}
            />
            <EngineeringServicesBlock
                services={vm.namesAndIconsOfServices}
                products={vm.namesAndIconsOfProducts}
                servicesPrice={vm.servicesPrice}
                supervisionPrice={vm.supervisionPrice}
                isProvidingSupervision={vm.isProvidingSupervision}
                everyPrice={vm.servicesPrice}
                everySize={vm.everySize}
                upTo={vm.upTo}
                isProvidingDesign={vm.isProvidingDesign}
            />
            <PersonsCard persons={vm.consultant.employees.data} />
        </div>
    );
});
