import type { ContractVm } from '../../Contract.vm';
import { Table } from '../Customs';
import { CreatePages } from './ScopeOfWork';

type Props = {
    vm: ContractVm;
};

const LETTER = 'D';
const TYPE = 'Drawings & Permits';

export const Drawings = ({ vm }: Props) => {
    const projectNumber = vm.contract.project.projectNumber;
    const documents = vm.contract.project.files
        .map((doc, index) => [`${index + 1}.`, Table.$u(doc.name)]);

    return (
        <CreatePages
            toc="D. Drawings & Permits"
            max={Infinity}
            letter={LETTER}
            page={1}
            pageFooter={1}
            tableName="Contractor Payment Plan"
            pageType={TYPE}
            projectNumber={projectNumber}
            header={['Doc ID', 'Document Name']}
            spacing={[10, 90]}
            rows={documents}
        />
    );
};
