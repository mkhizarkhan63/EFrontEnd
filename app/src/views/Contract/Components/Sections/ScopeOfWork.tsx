import moment from 'moment';
import { lang } from '~/api';
import type { SowItem, WorkflowType } from '~/models';
import { utilsArray } from '~/utils';
import type { ContractVm } from '../../Contract.vm';
import { Table, type TableRowProps } from '../Customs';
import { PdfCustomPage, type PdfCustomPageRawProps } from '../PdfPreview';
import { If } from '~/bits';
import { dateValidation } from '~/utils/date';

type Props = {
    vm: ContractVm;
};

type AmountRows = {
    max: number;
};

type Material = {
    materials?: boolean;
    sowItems?: SowItem[];
    workflows?: WorkflowType[];
    warning?: string;
};

type CreatePagesProps = TableRowProps & PdfCustomPageRawProps & AmountRows & Material;

const LETTER = 'B';
const TYPE = 'Scope of Work';

export const CreatePages = (props: CreatePagesProps) => {
    if (props.materials && props.sowItems) {
        const amountOfPage = props.sowItems?.length / props.max;

        if (amountOfPage === 1) {
            const Page1 = PdfCustomPage.create({
                letter: props.letter,
                page: props.page,
                tableName: props.tableName,
                pageType: props.pageType,
                projectNumber: props.projectNumber,
                tableItems: props.tableItems,
                pageFooter: props.page + 1,
            });

            const dupa = props.sowItems?.flatMap((el, order) => {
                const sowSubItems = el.forContract.sowSubItemList
                    .map((item, i) => [
                        `${order + 1}.${i + 1}`,
                        <>
                            <span className="pdf-material-specs__desc">
                                {item.titleEnglish}:
                            </span>
                            {item.englishDescription}
                            <If condition={item.hasWorkflow}>
                                <p className="pdf-material-specs__accept">
                                    Acceptance Criteria: {Table.$u(props.workflows?.find(wf => wf.id.isEqual(item.workflow.typeId))?.nameEn ?? '')}
                                </p>
                            </If>
                        </>,
                        item.supplier.length > 0 ? item.supplier : '-',
                        item.rate ?? '-',
                    ]);

                return (
                    <>
                        <div className="pdf-table-subheader">
                            {`${order + 1}. ${el.englishName}`}
                        </div>
                        <Table
                            header={['Section', 'Description', 'Supplier', 'Rate']}
                            spacing={[10, 55, 15, 10]}
                            alignments={['left', 'left', 'left', 'right']}
                            rows={sowSubItems}
                        />
                    </>
                );

            },

            );

            return (
                <Page1 toc={props.toc}>
                    {dupa}
                </Page1>
            );
        }
        const pages = [];

        for (let i = 0; i < props.sowItems.length; i += props.max) {
            pages.push(props.sowItems.slice(i, i + props.max));
        }

        return (
            <>
                {pages.flatMap((itemek, j) => {
                    const Page1 = PdfCustomPage.create({
                        letter: j === 0 ? props.letter : undefined,
                        page: props.page,
                        tableName: props.tableName,
                        pageType: props.pageType,
                        projectNumber: j === 0 ? props.projectNumber : '',
                        tableItems: j === 0 ? props.tableItems : undefined,
                        pageFooter: j === 0 ? props.pageFooter : props.pageFooter + j,
                    });

                    let count = j === 0 ? 1 : 4;

                    const dupa = itemek.flatMap(el => {
                        const sowSubItems = el.forContract.sowSubItemList
                            .map((item, i) => [
                                `${count}.${i + 1}`,
                                <>
                                    <span className="pdf-material-specs__desc">
                                        {item.titleEnglish}:
                                    </span>
                                    {item.englishDescription}
                                    <If condition={item.hasWorkflow}>
                                        <p className="pdf-material-specs__accept">
                                            Acceptance Criteria: {Table.$u(props.workflows?.find(wf => wf.id.isEqual(item.workflow.typeId))?.nameEn ?? '')}
                                        </p>
                                    </If>
                                </>,
                                item.supplier.length > 0 ? item.supplier : '-',
                                item.rate ?? '-',
                            ]);
                        count += 1;
                        return (
                            <>
                                <div className="pdf-table-subheader">
                                    {`${count - 1}. ${el.englishName}`}
                                </div>
                                <Table
                                    header={['Section', 'Description', 'Supplier', 'Rate']}
                                    spacing={[10, 55, 15, 10]}
                                    alignments={['left', 'left', 'left', 'right']}
                                    rows={sowSubItems}
                                />
                            </>
                        );

                    },

                    );

                    return (
                        <Page1 toc={props.toc}>
                            {dupa}
                        </Page1>
                    );
                })}
            </>
        );
    }

    if (!props.rows) {
        const Page1 = PdfCustomPage.create({
            letter: props.letter,
            page: props.page,
            tableName: props.tableName,
            pageType: props.pageType,
            projectNumber: props.projectNumber,
            tableItems: props.tableItems,
            pageFooter: props.page,
        });

        const Table1 = Table.create({
            header: props.header,
            spacing: props.spacing,
            alignments: props.alignments,
            rows: props.rows,
        });

        return (
            <Page1 toc={props.toc}>
                <Table1 />
            </Page1>
        );
    }
    const amountOfPage = props.rows.length / props.max;

    if (amountOfPage === 1) {
        const Page1 = PdfCustomPage.create({
            letter: props.letter,
            page: props.page + 1,
            tableName: props.tableName,
            pageType: props.pageType,
            projectNumber: props.projectNumber,
            tableItems: props.tableItems,
            pageFooter: props.page + 1,
        });

        const Table1 = Table.create({
            header: props.header,
            spacing: props.spacing,
            alignments: props.alignments,
            rows: props.rows,
        });

        return (
            <Page1 toc={props.toc}>
                <If condition={Boolean(props.warning)}>
                    <div className="pdf-warning">{props.warning}</div>
                </If>
                <Table1 />
            </Page1>
        );
    }

    const pages = [];

    for (let i = 0; i < props.rows.length; i += props.max) {
        pages.push(props.rows.slice(i, i + props.max));
    }

    return (
        <>
            {pages.flatMap((item, i) => {
                const Page1 = PdfCustomPage.create({
                    letter: i === 0 ? props.letter : undefined,
                    page: i === 0 ? props.page : i + 2,
                    tableName: props.tableName,
                    pageType: props.pageType,
                    projectNumber: i === 0 ? props.projectNumber : '',
                    tableItems: i === 0 ? props.tableItems : undefined,
                    pageFooter: i === 0 ? props.pageFooter : props.pageFooter + i,
                });

                const Table1 = Table.create({
                    header: i === 0 ? props.header : undefined,
                    spacing: props.spacing,
                    alignments: props.alignments,
                    rows: item,
                });

                return (
                    <Page1 toc={i === 0 ? props.toc : undefined}>
                        <If condition={Boolean(props.warning)}>
                            <div className="pdf-warning">{props.warning}</div>
                        </If>
                        <Table1 />
                    </Page1>
                );
            })}
        </>
    );
};

export const ScopeOfWork = ({ vm }: Props) => {
    const { projectNumber } = vm.contract.project;

    const allTasks = utilsArray.sum(
        vm.contract.stage.forPlanContract.units,
        item => item.forContract.numberOfTasks,
    );

    let projectStartDate = vm.contract.projectStartDate;

    const timeOfStage = (days: number) => {
        if (!dateValidation(projectStartDate)) {
            return '-';
        }

        projectStartDate = projectStartDate.clone().add(days, 'days');

        return projectStartDate.format('DD/MM/YYYY');
    };

    const programOfWorkflows = vm.contract.stage.forPlanContract.units
        .map(x => [
            x.orderNumber,
            x.stageName,
            `${x.forContract.timeOfStage} Days`,
            timeOfStage(x.forContract.timeOfStage),
            x.forContract.numberOfTasks,
        ]);

    let materialCount = 0;

    const materials = (mats: SowItem[], isContractor = false) => mats.map((item, index) => {
        if (isContractor && index + 1 === mats.length) {
            materialCount = mats.length + 1;
        }

        const count = isContractor ? index + 1 : materialCount + index;

        const isApproval = item.forContract.approval ? 'Required' : 'Not Required';

        return [
            item.englishName,
            Table.$u(count),
            <span
                key={item.id.asStr()}
                className={`value-${isApproval}`}
            >
                {`${isApproval}`}
            </span>,
            item.forContract.materialExecutionStage.join(', '),
        ];
    });

    const contractorMaterials = materials(vm.contract.contractorMaterials, true);

    const clientMaterials = materials(vm.contract.clientMaterials);

    const acceptanceCriteria = (() => {
        if (!vm.contract.workflows) {
            return undefined;
        }

        return vm.contract.workflows.flatMap(item => item.tasks.map((task, i) => [
            `${i === 0 ? item.nameEn : ''}`,
            `${i + 1}`,
            `${task.nameEn}`,
            `${lang.dict.enum('workflowTaskActor', task.actorType)}`,
            `${moment.duration(task.defaultTaskTime).asDays()}`,
        ],
        ));
    })();

    const materialSpecifications = vm.contract.materialSpecifications
        .filter(el => el.forContract.sowSubItemList.length > 0);

    const getPageCount = (unitsNumber: number, maxUnits: number) => Math.ceil(unitsNumber / maxUnits);

    const programOfWorkflowsPageCount = getPageCount(programOfWorkflows.length, 14);
    const acceptanceCriteriaPageCount = acceptanceCriteria ? getPageCount(acceptanceCriteria.length, 13) + programOfWorkflowsPageCount : 1;
    const contractorMaterialsPageCount = getPageCount(contractorMaterials.length, 18) + acceptanceCriteriaPageCount;
    const clientMaterialsPageCount = getPageCount(clientMaterials.length, 18) + contractorMaterialsPageCount;

    return (
        <>
            <CreatePages
                toc="B. Scope of Work"
                max={Infinity}
                letter={LETTER}
                page={1}
                pageFooter={1}
                tableName="Program of Works"
                pageType={TYPE}
                projectNumber={projectNumber}
                tableItems={[
                    {
                        name: 'No. of Tasks',
                        count: allTasks,
                    },
                    {
                        name: 'No. of Stages',
                        count: vm.contract.stage.forPlanContract.units.length,
                    },
                    {
                        name: 'Total Duration',
                        count: vm.contract.bid.totalDays,
                    },
                ]}
                header={['Stage No.', 'Stage Name', 'Stage Duration', 'Finish Date', 'No. of Tasks']}
                spacing={[12, 35, 20, 18, 15]}
                alignments={['left', 'left', 'right', 'right', 'right']}
                rows={programOfWorkflows}
            />
            <CreatePages
                max={Infinity}
                letter={LETTER}
                page={2}
                pageFooter={programOfWorkflowsPageCount + 1}
                tableName="Acceptance Criteria"
                pageType={TYPE}
                projectNumber={projectNumber}
                note="Notice - All tasks must be completed within each stage as per material specification requirements."
                isHideBorders={true}
                header={['Acceptance Criteria', 'Task No', 'Task', 'Party', 'Duration (Days)']}
                spacing={[20, 10, 20, 20, 30]}
                alignments={['left', 'left', 'right', 'right', 'right']}
                rows={acceptanceCriteria}
            />
            <CreatePages
                max={Infinity}
                letter={LETTER}
                page={3}
                pageFooter={acceptanceCriteriaPageCount + 1}
                tableName="Contractor Materials"
                pageType={TYPE}
                projectNumber={projectNumber}
                header={['Item.', 'Specification No.', 'Client Approval', 'Material Execution Stage']}
                spacing={[25, 25, 25, 25]}
                alignments={['left', 'right', 'right', 'right']}
                rows={contractorMaterials}
            />
            <CreatePages
                max={Infinity}
                letter={LETTER}
                page={4}
                pageFooter={contractorMaterialsPageCount + 1}
                tableName="Client Materials"
                pageType={TYPE}
                projectNumber={projectNumber}
                header={['Item.', 'Specification No.', 'Contractor Installation', 'Site Delivery Stage']}
                spacing={[40, 20, 20, 20]}
                alignments={['left', 'right', 'right', 'right']}
                rows={clientMaterials}
            />
            <CreatePages
                max={Infinity}
                letter={LETTER}
                page={5}
                pageFooter={clientMaterialsPageCount + 1}
                tableName="Material Specifications"
                pageType={TYPE}
                projectNumber={projectNumber}
                header={['Section', 'Description', 'Supplier', 'Rate']}
                spacing={[10, 55, 15, 10]}
                alignments={['left', 'left', 'left', 'right']}
                sowItems={materialSpecifications}
                workflows={vm.contract.workflows}
                materials={true}
            />
        </>
    );
};
