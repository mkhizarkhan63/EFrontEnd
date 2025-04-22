import type { StageUnit } from '~/models';
import { toCurrency } from '~/utils/number';
import type { ContractVm } from '../../Contract.vm';
import { Table } from '../Customs';
import { CreatePages } from './ScopeOfWork';
import { lang } from '~/api';

type Props = {
    vm: ContractVm;
};

const LETTER = 'C';
const TYPE = 'Payment';

export const Payments = ({ vm }: Props) => {
    const projectNumber = vm.contract.project.projectNumber;

    const pricePerVisits = vm.contract.consultant?.pricePerVisits;

    const contactorPaymentPlan = vm.contract.stage.forPlanContract.units
        .map(item => item.forContract);

    const allVisits = vm.contract.stage.forPlanContract.units
        .reduce((prev, current) => prev + current.consultantVisits, 0);

    const totalPrice = Math.round(vm.contract.stage.forPlanContract.units.slice(1, -2).map(item => item.forContract.timeOfStage).reduce((prev, curr) => prev + curr) / 30 * (pricePerVisits ?? 0));

    const consultantPaymentPlan = vm.contract.stage.forPlanContract.units
        .map(item => (item.consultantVisits !== 0 ? item : undefined))
        .filter(x => x) as StageUnit[];

    return (
        <>
            <CreatePages
                toc="C. Payment"
                warning={lang.dict.get('taxWarningContractor')}
                max={Infinity}
                letter={LETTER}
                page={1}
                pageFooter={1}
                tableName="Contractor Payment Plan"
                pageType={TYPE}
                projectNumber={projectNumber}
                tableItems={[
                    {
                        name: 'Total Price (VAT inclusive)',
                        count: `${toCurrency(vm.contract.bid.totalPrice, 0, 3)} OMR`,
                    },
                ]}
                header={[
                    'Stage No.',
                    'Stage Name',
                    'Stage Value (%)',
                    'Payments (OMR)',
                ]}
                spacing={[12, 48, 20, 20]}
                alignments={['left', 'left', 'right', 'right']}
                rows={contactorPaymentPlan.map((item, i) => [
                    i + 1,
                    Table.$b(item.stageName),
                    `${item.valueOfStageInPercentage}%`,
                    toCurrency(item.valueOfStageInOmr),
                ])}
            />
            <CreatePages
                max={Infinity}
                warning={`${lang.dict.get('invoicesWarning')} ${lang.dict.get('taxWarningConsultant')}`}
                letter={LETTER}
                page={2}
                pageFooter={2}
                tableName="Consultant Payment Plan"
                pageType={TYPE}
                projectNumber={projectNumber}
                tableItems={[
                    {
                        name: 'No. of Inspections',
                        count: allVisits,
                    },
                    {
                        name: 'Price/Month',
                        count: `${toCurrency(pricePerVisits, 0, 3)} OMR`,
                    },
                    {
                        name: 'Total Price (VAT inclusive)',
                        count: `${toCurrency(totalPrice, 0, 3)} OMR`,
                    },
                ]}
                header={[
                    'Stage No.',
                    'Stage Name',
                    'No. of Inspections',
                ]}
                spacing={[12, 48, 20, 20]}
                alignments={['left', 'left', 'right', 'right']}
                rows={consultantPaymentPlan.map((item, i) => [
                    i + 1,
                    Table.$b(item.stageName),
                    item.consultantVisits,
                ])}
            />;
        </>
    );
};
