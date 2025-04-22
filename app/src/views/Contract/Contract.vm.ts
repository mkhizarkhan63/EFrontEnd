import { action, runInAction } from 'mobx';
import { E, lang, restClient, restQuery, Id, ErrorListHolder, T, routing } from '~/api';
import { Contract, FileData, type Project } from '~/models';
import { stores } from '~/stores';
import { toCurrency } from '~/utils/number';

export type Header = {
    title: string;
    page: string;
};

type ActiveTab = 'document' | 'titles';

const struct = (subject: E.ContractSubjects) => {
    const base = {
        name: T.nonempty(T.string()),
        nameInArabic: T.nonempty(T.string()),
        idNumber: T.nonempty(T.string()),
    };

    const forCompany = {
        bankName: T.nonempty(T.string()),
        accountHolderName: T.nonempty(T.string()),
        accountNumber: T.nonempty(T.string()),
        engineer: T.instance(Id),
    };

    return T.type({
        ...base,
        ...subject === E.ContractSubjects.client
            ? {}
            : forCompany,
    });
};

export class ContractVm {
    isLoading = false;

    isUpdating = false;

    contract = new Contract();

    indexOfCurrentPage = 0;

    indexOfCurrentHeader = 0;

    isModifyContract = false;

    isProjectManagerDetails = true;

    isBankDetails = true;

    isOwnerDetails = true;

    step = E.ContractStep.pricePlan;

    isSubmitPmCommitment = false;

    isCommitmentAccepted = true;

    projectForAdmin: Project | false = false;

    isContractDivided = false;

    titlesData: Header[] = [
        {
            title: '',
            page: '',
        },
    ];

    lastPdfPrint = 0;

    activeTab: ActiveTab = 'titles';

    signatureFile = FileData.create({
        name: 'signature.png',
    });

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(this.contract.subject),
    );

    constructor() {
        makeSafeObservable(this, {
            goToDetails: action,
            submitSubjectData: action,
            onDocument: action,
            onTitles: action,
            openModifyContract: action,
            closeModifyContract: action,
            toggleBankDetails: action,
            toggleProjectManagerDetails: action,
            toggleOwnerDetails: action,
            setIndexOfPage: action,
            goToPricePlane: action,
            setTitlesData: action,
            closeSubmitPmCommitment: action,
            setIndexOfCurrentHeader: action,
            acceptTheCommitment: action,
            setAcceptThePmCommitment: action,
            setSignature: action,
            printPdf: action,
            mount: false,
            loadContractById: action,
            bumpLastPdfPrint: action,
            setIsContractDivided: action,
        });
    }

    mount = () => {
        const id = stores.display.router.$.context.$.project.$.contract.params.id
            ?? stores.display.router.$.project.$.sub.params.id;

        this.loadContractById(id);
    };

    get validationData() {
        const subject = this.contract.getSubject();

        return {
            name: subject?.ownerName,
            nameInArabic: subject?.ownerNameInArabic,
            idNumber: subject?.ownerNameInArabic,
            bankName: subject?.bankName,
            accountHolderName: subject?.accountName,
            accountNumber: subject?.accountNumber,
            engineer: Id.tryInit(subject?.employeeId),
        };
    }

    get price() {
        return this.contract.project.forContractor.bid?.bidCosts;
    }

    get totalPrice() {
        return this.contract.project.forContractor.bid?.totalPrice;
    }

    get project() {
        const id = stores.display.router.$.project.$.sub.$.contract.params.id;
        return stores.projects.projects.get(Id.init(id, 'external'));
    }

    get planData() {
        const panelValue = this.contract.stage.forPlanContract.planParts.slice()
            .sort((a, b) => a.planStageRaw - b.planStageRaw)
            .flatMap(part => {
                if (part.planStage === E.StageTableNames.maintenance) {
                    return [];
                }

                return {
                    name: lang.dict.enum('planStage', part.planStage),
                    value: part.units.reduce((sum, item) => sum + item.forContract.timeOfStage, 0),
                    unit: lang.dict.get('days'),
                };
            });

        const totalDays = {
            unit: lang.dict.get('days'),
            name: lang.dict.get('totalDays'),
            value: panelValue
                .reduce((prev, curr) => curr.value + prev, 0),
        };

        const maintenanceDuration = this.contract.stage.forPlanContract.planParts.find(item => item.planStage === E.StageTableNames.maintenance)
            ?.units.reduce((sum, item) => sum + item.forContract.timeOfStage, 0);

        const maintenance = {
            name: lang.dict.get('maintenance'),
            value: maintenanceDuration ?? 0,
            unit: lang.dict.get('days'),
        };

        return panelValue.concat([totalDays, maintenance]).map(item => ({
            name: item.name,
            value: item.value.toString(),
            unit: item.unit,
        }));
    }

    get priceData() {
        const pricePerMonth = this.contract.consultant?.pricePerVisits;

        const totalDays = this.contract.stage.forPlanContract.planParts.flatMap(part => {
            if (part.planStage === E.StageTableNames.maintenance) {
                return [];
            }

            if (part.planStage === E.StageTableNames.mobilization) {
                return part.units.filter(item => item.orderNumber !== 1).reduce((sum, item) => sum + item.forContract.timeOfStage, 0);
            }

            return part.units.reduce((sum, item) => sum + item.forContract.timeOfStage, 0);
        }).reduce((prev, curr) => curr + prev, 0);

        const totalPrice = Math.round((pricePerMonth ?? 0) * (totalDays / 30));

        return [
            {
                name: lang.dict.get('construction'),
                value: toCurrency(this.contract.constructionPrice, 0, 3),
                unit: lang.dict.get('fieldOmr'),
            },
            {
                name: lang.dict.get('consultancy'),
                value: toCurrency(totalPrice, 0, 3),
                unit: lang.dict.get('fieldOmr'),
            },
            // {
            //     name: lang.dict.get('constructionLaboratory'),
            //     value: 0,
            //     unit: lang.dict.get('fieldOmr'),
            // },
            {
                name: lang.dict.get('total'),
                value: toCurrency(this.contract.constructionPrice + totalPrice, 0, 3),
                unit: lang.dict.get('fieldOmr'),
            },
        ];
    }

    get r() {
        return stores.display.router;
    }

    setTitlesData = (headers: Header[]) => {
        this.titlesData = headers.map(element => ({
            title: element.title,
            page: element.page,
        }));
    };

    setSignature = async (dataUrl?: string) => {
        if (!dataUrl) {
            this.signatureFile.removeFile();
            return;
        }

        const res = await fetch(dataUrl);
        const data = await res.blob();

        this.signatureFile.setFile(new File([data], 'signature.png'));
    };

    loadContractById = async (contractId?: number) => {
        if (!contractId) {
            this.goBack();
            return;
        }

        this.isLoading = true;

        const contract = await restQuery.contract.getContract(contractId);

        if (!contract) {
            this.goBack();
            return;
        }

        runInAction(() => {
            this.isLoading = false;
            this.contract = contract;

            switch (restClient.getType()) {
                case E.RoleInCompany.consultant:
                    this.contract.setSubject(E.ContractSubjects.consultant);
                    break;
                case E.RoleInCompany.contractor:
                    this.contract.setSubject(E.ContractSubjects.contractor);
                    break;
                default:
                    this.contract.setSubject(E.ContractSubjects.client);
            }

            if (contract.getSubject()?.isExternal) {
                this.step = E.ContractStep.summary;
            }
        });
    };

    onDocument = () => {
        this.activeTab = 'document';
    };

    onTitles = () => {
        this.activeTab = 'titles';
    };

    openModifyContract = () => {
        this.isModifyContract = true;
    };

    closeModifyContract = () => {
        this.isModifyContract = false;
    };

    toggleProjectManagerDetails = () => {
        this.isProjectManagerDetails = !this.isProjectManagerDetails;
    };

    toggleBankDetails = () => {
        this.isBankDetails = !this.isBankDetails;
    };

    toggleOwnerDetails = () => {
        this.isOwnerDetails = !this.isOwnerDetails;
    };

    submitSubjectData = async () => {
        if (!this.errorListHolder.test() || this.isUpdating) {
            return;
        }

        this.isUpdating = true;

        if (this.contract.allSubjects) {
            this.step = E.ContractStep.summary;
            return;
        }

        const res = await restQuery.contract.postSubjectData(this.contract);
        this.contract.getSubject()?.makeExternal();

        if (!res) {
            runInAction(() => {
                this.isUpdating = false;
            });
            return;
        }

        runInAction(() => {
            this.isUpdating = false;
            this.step = E.ContractStep.summary;
        });
    };

    goToManagement = async () => {
        const route = routing.joinedRoutes([
            this.r.$.project.$.sub,
            this.r.$.admin.$.projects.$.sub,
            this.r.$.context.$.project,
        ]);

        if (!('management' in route.$)) {
            return;
        }

        if (this.isUpdating) {
            return;
        }

        this.isUpdating = true;

        if (this.contract.status !== E.ContractStatus.liveInPm) {
            const res = await restQuery.project.updateStatusToLiveInPm(this.contract.id.asNumber());

            if (!res) {
                this.isUpdating = false;
                return;
            }
        }

        this.isUpdating = false;

        route.$.management.go({
            type: this.r.$.context.$.project.params.type,
            id: this.contract.project.id.asNumber(),
            tab: E.PmModuleMenu.tasks,
        });
    };

    signContract = () => {
        if (this.contract.allSigned) {
            this.goToManagement();
            return;
        }

        if (typeof this.signatureFile.file === 'undefined') {
            alert(lang.dict.get('nonEmptySignature'));
            return;
        }

        if (this.isUpdating) {
            return;
        }

        (async () => {
            this.isUpdating = true;
            await restQuery.contract.postSignature(this.contract, this.signatureFile);
            this.isUpdating = false;
        })();
    };

    goToDetails = () => {
        this.step = E.ContractStep.details;

        if (this.contract.getSubject()) {
            return;
        }

        this.contract.createSubject();
    };

    goToPricePlane = () => {
        this.step = E.ContractStep.pricePlan;
    };

    setIndexOfPage = (index: number) => {
        this.indexOfCurrentPage = index;
    };

    closeSubmitPmCommitment = () => {
        this.isSubmitPmCommitment = false;
    };

    setIndexOfCurrentHeader = (index: number) => {
        this.indexOfCurrentHeader = index;
    };

    setAcceptThePmCommitment = () => {
        this.isCommitmentAccepted = !this.isCommitmentAccepted;
    };

    printPdf = () => print();

    goBack = () => {
        if (!stores.display.runBackFrom('contract')) {
            return stores.display.router.$.home.go({});
        }
    };

    get pdfUrl() {
        return this.contract.filePath;
    }

    downloadPdf = () => { /* ToDo */ };

    acceptTheCommitment = () => { /* ToDo */ };

    bumpLastPdfPrint = () => {
        this.lastPdfPrint = Date.now();
    };

    setIsContractDivided = () => {
        this.isContractDivided = true;
    };
}
