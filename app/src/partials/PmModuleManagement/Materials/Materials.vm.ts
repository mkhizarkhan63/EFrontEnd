import { action, runInAction } from 'mobx';
import type { Moment } from 'moment';
import { E, restQuery, Sorter } from '~/api';
import type {
    MaterialListItemType,
    MaterialProgressType,
    MaterialTaskProgressType,
    PmMaterialType,
    PmSowItemType,
    SubContractorType,
} from '~/models';
import { stores } from '~/stores';
import type { PmModuleVm } from '~/views';

export class MaterialsVm {
    isLoading = false;

    pmMaterial?: PmMaterialType;

    currentSowItem?: PmSowItemType;

    currentMaterialForClientApproval?: MaterialProgressType;

    isContractorForClientModal = false;

    currentClientForContractorMaterial?: MaterialListItemType;

    isItemModalOpened = false;

    currentSubContractor?: SubContractorType;

    isSubContractorModalOpened = false;

    isNewExpense = false;

    sorterSubContractor = new Sorter(
        () => (this.pmMaterial?.clientSubcontractors ?? []) as SubContractorType[],
        by => ({
            subContractorName: by.string('subContractorName'),
            stageOrder: by.number('stageOrder'),
            completeWorksBy: by.date('completeWorksBy'),
            sowItemName: by.string('sowItemName'),
        }),
        'stageOrder',
    );

    sorterClientForContractor = new Sorter(
        () => (this.pmMaterial?.clientForContractorInstallations ?? []) as MaterialListItemType[],
        by => ({
            name: by.string('sowItemName'),
            stageOrder: by.number('stageOrder'),
            siteDeliveryDate: by.date('siteDeliveryDate'),
            currentTask: by.string('currentTaskType'),
            status: by.string('currentTaskStatus'),
        }),
        'stageOrder',
    );

    sorterContractorForClient = new Sorter(
        () => (this.pmMaterial?.contractorForClientApprovals ?? []) as MaterialListItemType[],
        by => ({
            name: by.string('sowItemName'),
            stageOrder: by.number('stageOrder'),
            siteDeliveryDate: by.date('siteDeliveryDate'),
            taskName: by.string('currentTaskType'),
        }),
        'stageOrder',
    );

    constructor(public projectId: number, public startDate?: Moment, readonly parentVm?: PmModuleVm) {
        makeSafeObservable(this, {
            mount: false,
            openSowItemModal: false,
            closeSowItemModal: action,
            openContractorForClientModal: action,
            closeContractorForClientModal: action,
            openClientForContractorModal: action,
            closeClientForContractorModal: action,
            setMaterialForClient: action,
        });
    }

    get context() {
        return stores.profile.currentProfile.role;
    }

    get isClientContext() {
        return this.context === E.RoleInCompany.client;
    }

    get orderByContext() {
        if (this.context === E.RoleInCompany.contractor) {
            return [
                'clientForContractor',
                'contractorForClient',
                'clientSubContractors',
                'contractorMaterials',
            ] as const;
        }

        return [
            'clientSubContractors',
            'clientForContractor',
            'contractorForClient',
            'contractorMaterials',
        ] as const;
    }

    mount = async () => {
        if (this.isLoading) {
            return;
        }

        runInAction(() => {
            this.isLoading = true;
        });

        const result = await restQuery.getMaterials(this.projectId);

        if (!result) {
            runInAction(() => {
                this.isLoading = false;
            });

            return;
        }

        runInAction(() => {
            this.pmMaterial = result;
            this.isLoading = false;
        });
    };

    openSowItemModal = (id?: number) => {
        (async () => {
            if (!id) {
                return;
            }

            const sowItem = await restQuery.sow.getPmSowItem(id);

            if (!sowItem) {
                return;
            }

            runInAction(() => {
                this.currentSowItem = sowItem;
                this.isItemModalOpened = true;
            });
        })();
    };

    closeSowItemModal = () => {
        this.currentSowItem = undefined;
        this.isItemModalOpened = false;
    };

    openContractorForClientModal = (materialWorkflowSequenceId: number, reload = false) => {
        (async () => {
            const material = await restQuery.getMaterialProgress(materialWorkflowSequenceId, undefined, true);

            if (!material) {
                return;
            }

            runInAction(() => {
                this.currentMaterialForClientApproval = material;

                if (!reload) {
                    this.isContractorForClientModal = true;
                }

                this.pmMaterial?.contractorForClientApprovals
                    .find(item => item.materialWorkflowId === materialWorkflowSequenceId)
                    ?.currentTask.updateStatusForClient(material.currentTask);
            });
        })();
    };

    openSubContractorModal = (subContractor: SubContractorType) => {
        this.currentSubContractor = subContractor;
        this.isSubContractorModalOpened = true;
    };

    closeContractorForClientModal = () => {
        this.currentMaterialForClientApproval = undefined;
        this.isContractorForClientModal = false;
    };

    openClientForContractorModal = (material: MaterialListItemType) => {
        this.currentClientForContractorMaterial = material;
    };

    closeClientForContractorModal = (material?: MaterialListItemType) => {
        this.currentClientForContractorMaterial = material;
    };

    updateStatusByClientForContractor = (materialTask: MaterialTaskProgressType) => {
        this.currentClientForContractorMaterial?.currentTask
            .updateStatusForClient(materialTask);
    };

    setNewExpenceModal = () => {
        this.isNewExpense = true;
    };

    closeNewExpenceModal = () => {
        this.isNewExpense = false;
        this.isSubContractorModalOpened = false;
        this.currentSubContractor = undefined;
    };

    updateCurrentSubContractor = (subContractor: SubContractorType) => {
        this.pmMaterial?.addNewClientSubContractor(subContractor);
    };

    setMaterialForClient = (progress?: MaterialProgressType) => {
        if (!progress) {
            return;
        }

        this.pmMaterial?.contractorForClientApprovals
            .find(item => item.materialWorkflowId === progress.materialWorkflowSequenceId)
            ?.currentTask.updateStatusForClient(progress.currentTask);

        this.currentMaterialForClientApproval = progress;
    };
}
