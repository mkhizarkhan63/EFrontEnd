import { Table } from '../Customs';
import { PdfCustomPage } from '../PdfPreview';
import type { ContractVm } from '../../Contract.vm';
import { E, lang } from '~/api';
import { If } from '~/bits';
import moment from 'moment';
import { utilsArray } from '~/utils';

type Props = {
    vm: ContractVm;
};

const LETTER = 'E';
const TYPE = 'Schedules';

const managerCommitment = `I  hereby consent by signing on this page to this commitment form in ascertainment of my comprehension and acknowledgment to adhere to its content; 
I hereby acknowledge to have more than 3 years of experience in the field of project management and that I have obtained an accreditation as an Engineer from the Oman Society of Engineers to practice my role. I understand and consent to the requirements set in this contract and per the instructions communicated by the Contractor; I consent to adhere to perform the delegated works subject to the Main Contract particulars, Contractor instructions and in accordance to the Applicable Law, ethical and professional standards. I confirm my responsibility to any invasion of legal, ethical and contractual standard upon which occurrence has been a direct/indirect result of my conduct and leading to a detriment affecting the Client, Contract, Consultant or the Company.
I, the undersigned, hereby declare my agreement to respect the legality, confidentiality and ethical standards of the work I am assigned to and will report any invasion of such immediately upon occurrence to the Contract.`;

const engineerCommitment = `I  hereby consent by signing on this page to this commitment form in ascertainment of my comprehension and acknowledgment to adhere to its content; 
I hereby acknowledge to have more than 3 years of experience in the field of project management and that I have obtained an accreditation as an Engineer from the Oman Society of Engineers to practice my role. I understand and consent to the requirements set in this contract and per the instructions communicated by the Consultant; I consent to adhere to perform the delegated works subject to the Main Contract particulars, Consultant instructions and in accordance to the Applicable Law, ethical and professional standards. I confirm my responsibility to any invasion of legal, ethical and contractual standard upon which occurrence has been a direct/indirect result of my conduct and leading to a detriment affecting the Client, Contract, Consultant or the Company.
I, the undersigned, hereby declare my agreement to respect the legality, confidentiality and ethical standards of the work I am assigned to and will report any invasion of such immediately upon occurrence to the Contract.`;

const E2 = ({ img, name, type }: { img?: string; name?: string; type?: string }) => (
    <div className="pdf-contact-table-row">
        <div className="pdf-contact-table-row__img">
            <img src={img ?? ''} alt="" />
        </div>
        <div className="pdf-contact-table-row__data">
            <span className="pdf-contact-table-row__type">{type}</span>
            <span className="pdf-contact-table-row__name">{name}</span>
        </div>
    </div>
);

const E1 = ({ title, date }: { title?: string; date?: string }) => (
    <div className="pdf-schedule-table__header">
        <span className="pdf-schedule-table__header-right">{title}</span>
        <span>{date}</span>
    </div>
);

export const Schedules = ({ vm }: Props) => {
    const project = vm.contract.project;
    const projectNumber = project.projectNumber;
    const contractorSubject = vm.contract.getSubject(E.ContractSubjects.contractor);
    const consultantSubject = vm.contract.getSubject(E.ContractSubjects.consultant);
    const clientSubject = vm.contract.getSubject(E.ContractSubjects.client);
    const clientSignature = vm.contract.clientSignature?.createdDate;
    const contractorSignature = vm.contract.contractorSignature?.createdDate;
    const consultantSignature = vm.contract.consultantSignature?.createdDate;

    const printSignatureDate = (date?: moment.Moment) => (date ? date.format('DD/MM/YYYY') : '-');

    const Page1 = PdfCustomPage.create({
        toc: 'E. Schedules',
        letter: LETTER,
        page: 1,
        pageFooter: 1,
        pageType: TYPE,
        projectNumber,
        tableName: 'Project Periods Diagram',
    });

    const Table1 = Table.create({
        spacing: [80, 20],
        alignments: ['left', 'right'],
        rows: [
            [Table.$b('Client Contract Signature'), printSignatureDate(clientSignature)],
            [Table.$b('Contractor Contract Signature & Project Manager Commitment'), printSignatureDate(contractorSignature)],
            [Table.$b('Consultant Contract Signature & Engineer Commitment'), printSignatureDate(consultantSignature)],
        ],
        tableAdd: <E1 title="Project Initiation Period" />,
    });

    const stage = vm.contract.stage.forPlanContract;

    let unitsCount = 1;
    const signatures = vm.contract.allSigned ? utilsArray.nonEmpty([contractorSignature, consultantSignature, clientSignature]) : [];
    const lastSignature = utilsArray.extract(signatures.sort((a, b) => b.diff(a)), 0, moment.invalid()).clone();
    const isDate = lastSignature.isValid();
    let totalDays = 0;

    const Table2Rows = stage.planParts.slice()
        .sort((a, b) => a.planStageRaw - b.planStageRaw)
        .flatMap(item => {
            if (item.planStage === E.StageTableNames.maintenance) {
                return [];
            }

            const start = unitsCount === 1 ? unitsCount : unitsCount + 1;
            const end = unitsCount === 1 ? item.units.length : unitsCount + item.units.length;
            unitsCount = end;
            const time = item.units.reduce((prev, curr) => prev + curr.forContract.timeOfStage, 0);
            totalDays+= time;
            const date = isDate ? lastSignature.add(time, 'day').format('DD/MM/YYYY') : '-';

            return [
                [
                    lang.dict.enum('planStage', item.planStage),
                    start === end ? start : `${start}-${end}`,
                    lang.dict.format('daysFormat', [time]),
                    date,
                ],
            ];
        });

    const Table2 = Table.create({
        spacing: [30, 30, 20, 20],
        alignments: ['left', 'right', 'right', 'right'],
        rows: Table2Rows,
        header: ['Category', 'Stages No.', 'Duration', 'Finish Date'],
        tableAdd: (
            <E1
                title="Project Construction Period"
                date={lang.dict.format('daysFormat', [totalDays])}
            />
        ),
    });

    const maintenanceUnits = stage.planParts.find(item => item.planStage === E.StageTableNames.maintenance)?.units;
    let maintenanceDuration = 0;

    const Table3Rows = maintenanceUnits?.map(unit => {
        const start = unitsCount + 1;
        unitsCount = start;
        const time = unit.forContract.timeOfStage;
        const date = isDate ? lastSignature.add(time, 'day').format('DD/MM/YYYY') : '-';
        maintenanceDuration+= time;

        return [
            unit.stageName,
            start,
            lang.dict.format('daysFormat', [time]),
            date,
        ];
    });

    const Table3 = Table.create({
        spacing: [30, 30, 20, 20],
        alignments: ['left', 'right', 'right', 'right'],
        rows: Table3Rows,
        header: ['Category', 'Stages No.', 'Duration', 'Finish Date'],
        tableAdd: <E1 title="Project Maintenance Period" date={lang.dict.format('daysFormat', [maintenanceDuration])} />,
    });

    const Page2 = PdfCustomPage.create({
        letter: LETTER,
        page: 2,
        pageFooter: 2,
        pageType: TYPE,
        projectNumber,
        tableName: 'Contact & Bank Details',
    });

    const [Table4, Table5] = [
        {
            contract: vm.contract.contractor,
            subject: contractorSubject,
            workerType: 'Project Manager',
            type: 'Contractor',
        },
        {
            contract: vm.contract.consultant,
            subject: consultantSubject,
            workerType: 'Engineer',
            type: 'Consultant',
        },
    ].map(({ contract, subject, workerType, type }) => Table.create({
        isHideBorders: true,
        spacing: [50, 50],
        tableAdd: <E2 img={contract?.logoUrl} name={contract?.name} type={type} />,
        rows: [
            ['Company Address', 'CR Number'],
            [
                Table.$b([
                    contract?.governorate?.displayName ?? '',
                    contract?.wilayat?.displayName ?? '',
                ].join(', ')),
                Table.$u(contract?.crNumber ?? ''),
            ],
            [
                Table.$b(workerType),
                Table.$b('Bank Detail'),
            ],
            [
                <>Name: {Table.$b(subject?.name)}</>,
                <>Bank Name: {Table.$b(subject?.bankName)}</>,
            ],
            [
                <>Phone: {Table.$b(subject?.phone)}</>,
                <>Account Holder Name: {Table.$b(subject?.accountName)}</>,
            ],
            [
                <>Email: {Table.$b(subject?.email)}</>,
                <>Account Number: {Table.$b(subject?.accountNumber)}</>,
            ],
        ],
    }));

    const Table6 = Table.create({
        isHideBorders: true,
        spacing: [50, 50],
        tableAdd: <E2 img={clientSubject?.img?.url} name={clientSubject?.name} type="Client" />,
        rows: [
            [
                Table.$b('Client details'),
                Table.$b('Land Detail'),
            ],
            [
                <>ID Number: {Table.$b(clientSubject?.idNumber)}</>,
                <>Land Type: {Table.$b(lang.dict.enum('landType', project.landType))}</>,
            ],
            [
                <>Phone: {Table.$b(clientSubject?.phone)}</>,
                <>Area: {Table.$b(lang.dict.format('squareMetersFormat', [project.landArea]))}</>,
            ],
            [
                <>Email: {Table.$b(clientSubject?.email)}</>,
                <>Location: {Table.$b(`${project.governorate?.displayName}, ${project.wilayat?.displayName}`)}</>,
            ],
        ],
    });

    const completionDate = lastSignature.isValid() ? lastSignature.format('DD/MM/YYYY') : '';

    return (
        <>
            <Page1>
                <div className="pdf-schedule-table pdf-schedule-table--first">
                    <Table1 />
                </div>
                <div className="pdf-schedule-table pdf-schedule-table--second">
                    <Table2 />
                </div>
                <div className="pdf-schedule-table pdf-schedule-table--third">
                    <Table3 />
                    <div className="pdf-schedule-table__header--last">
                        <E1 title="Project Completion Date" date={completionDate} />
                    </div>
                </div>
            </Page1>
            <Page2>
                <If condition={Boolean(contractorSubject)}>
                    <div className="pdf-contact-table pdf-contact-table--contractor">
                        <Table4 />
                    </div>
                </If>
                <If condition={Boolean(consultantSubject)}>
                    <div className="pdf-contact-table pdf-contact-table--consultant">
                        <Table5 />
                    </div>
                </If>
                <If condition={Boolean(clientSubject)}>
                    <div className="pdf-contact-table pdf-contact-table--client">
                        <Table6 />
                    </div>
                </If>
                <div className="pdf-contact-table pdf-contact-table--ebinaa">
                    <Table
                        headerImg="/assets/graphics/logo_sign.png"
                        isHideBorders={true}
                        spacing={[50, 50]}
                        header={['eBinaa', '']}
                        rows={[
                            [
                                'Company Address',
                                <>Bank Name: {Table.$b('Bank Muscat')}</>,
                            ],
                            [
                                Table.$b('406 North Salam Square, MSQ'),
                                <>Account Holder Name: {Table.$b('Binaa Professional Services LLC')}</>,
                            ],
                            [
                                <>CR Number: {Table.$b(1355332)}</>,
                                <>Account Number: {Table.$b('‎0315063513300018‎')}</>,
                            ],
                        ]}
                    />
                </div>
            </Page2>
            <PdfCustomPage
                letter={LETTER}
                page={3}
                pageFooter={3}
                pageType={TYPE}
                projectNumber={projectNumber}
                tableName="PM and Engineer Commitments"
            >
                <If condition={Boolean(consultantSubject)}>
                    <div className="pdf-commitment pdf-commitment--first">
                        <p className="pdf-commitment__text">{engineerCommitment}</p>
                        <div className="pdf-commitment__data">
                            <div className="pdf-commitment__images">
                                {vm.contract.consultant?.logoUrl && (
                                    <img
                                        src={vm.contract.consultant?.logoUrl}
                                        alt=""
                                    />
                                )}
                            </div>
                            <p className="pdf-commitment__person-label">
                                {lang.dict.get('engineer')}
                            </p>
                            <p className="pdf-commitment__person-name">
                                {consultantSubject?.name}
                            </p>
                        </div>
                    </div>
                </If>
                <If condition={Boolean(contractorSubject)}>
                    <div className="pdf-commitment">
                        <p className="pdf-commitment__text">{managerCommitment}</p>
                        <div className="pdf-commitment__data">
                            <div className="pdf-commitment__images">
                                {vm.contract.contractor?.logoUrl && (

                                    <img
                                        src={vm.contract.contractor?.logoUrl}
                                        alt=""
                                    />
                                )}
                            </div>
                            <p className="pdf-commitment__person-label">
                                {lang.dict.get('projectManager')}
                            </p>
                            <p className="pdf-commitment__person-name">
                                {contractorSubject?.name}
                            </p>
                        </div>
                    </div>
                </If>
            </PdfCustomPage>
            <PdfCustomPage
                letter={LETTER}
                page={4}
                pageFooter={4}
                pageType={TYPE}
                projectNumber={projectNumber}
                tableName="Project Document Templates"
            >
                <Table
                    header={['Doc ID', 'Document Name']}
                    spacing={[10, 90]}
                    rows={[
                        ['SI-001', Table.$u('Site Inspection Report')],
                        ['MT-001', Table.$u('Material Testing Report')],
                        ['DS-001', Table.$u('Document Submission Report')],
                        ['SU-001', Table.$u('Site Updates & Photos')],
                        ['CO-001', Table.$u('Client Observations')],
                        ['CS-001', Table.$u('Consultant Site Visit Report')],
                        ['CR-001', Table.$u('Contractor Requests')],
                    ]}
                />
            </PdfCustomPage>
            <PdfCustomPage
                letter={LETTER}
                page={5}
                pageFooter={5}
                pageType={TYPE}
                projectNumber={projectNumber}
                withoutHeader={true}
            >
                <div className="pdf-signboard-table">
                    <Table
                        isHideBorders={true}
                        spacing={[50, 50]}
                        alignments={['left', 'right']}
                        rows={[
                            ['Signboard 1', 'Foundation - RCC Concrete'],
                            ['Project Signboard', 'Frame - Steel'],
                            ['', 'Sheet - Acrylic'],
                        ]}
                    />
                </div>
                <img className="e5-image" src="/assets/contract/e5.png" alt="E5" />
            </PdfCustomPage>
            <PdfCustomPage
                letter={LETTER}
                page={6}
                pageFooter={6}
                pageType={TYPE}
                projectNumber={projectNumber}
                withoutHeader={true}
            >
                <div className="pdf-signboard-table">
                    <Table
                        isHideBorders={true}
                        spacing={[100]}
                        alignments={['left']}
                        rows={[['Signboard 2'], ['Safety Signboard']]}
                    />
                </div>
                <img className="e6-image" src="/assets/contract/e6.png" alt="E6" />
            </PdfCustomPage>
        </>
    );
};
