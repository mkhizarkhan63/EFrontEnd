import { ClientForContractor, type ClientForContractorProps } from './ClientForContractor';
import { ClientSubContractors, type ClientSubContractorsProps } from './ClientSubContractors';
import { ContractorForClient, type ContractorForClientProps } from './ContractorForClient';
import { ContractorMaterials, type ContractorMaterialsProps } from './ContractorMaterials';

type Props = (
    | ClientForContractorProps
    | ClientSubContractorsProps
    | ContractorForClientProps
    | ContractorMaterialsProps
);

export const MaterialComponents = (props: Props) => {
    switch (props.type) {
        case 'clientForContractor':
            return <ClientForContractor {...props} />;
        case 'contractorForClient':
            return <ContractorForClient {...props} />;
        case 'clientSubContractors':
            return <ClientSubContractors {...props} />;
        case 'contractorMaterials':
            return <ContractorMaterials {...props} />;
        default:
            return null;
    }
};
