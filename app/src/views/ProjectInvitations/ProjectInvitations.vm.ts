import { action, makeAutoObservable, reaction, runInAction } from 'mobx';
import { E, ErrorListHolder, Id, Mobx, T, restQuery } from '~/api';
import { ProfileInCompany, ShortCompany, type Project, Input, type InputType } from '~/models';
import { stores } from '~/stores';

const struct = (isConsultant: boolean, isPrices: boolean) => T.type({
    name: T.name(),
    crNumber: T.crNumber(),
    governorate: T.instance(Id),
    wilayat: T.instance(Id),
    ...isConsultant
        ? {
            wilayatPrices: T.array(T.type(
                {
                    value: isPrices ? T.any() : T.customError('wilayatPrices'),
                },
            )),
        }
        : {},
});

export class ProjectInvitationsVm {
    isLoading = false;

    isProjectsLoaded = false;

    isRegistering = false;

    currentProfileType?: E.RoleInCompany;

    company = ShortCompany.create();

    contractorProjects: Project[] = [];

    consultantProjects: Project[] = [];

    wilayatPrices: InputType[] = [];

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(
            Boolean(this.currentProfileType === E.RoleInCompany.consultant),
            this.isPricesFilled,
        ),
    );

    constructor() {
        makeAutoObservable(this, {
            openRegistration: action,
            closeRegistration: action,
            createCompany: action,
            rejectInvitation: action,
        });

        reaction(
            () => [
                this.contractorProjects,
                this.consultantProjects,
            ],
            () => {
                if (this.contractorProjects.length === 0 && this.consultantProjects.length === 0) {
                    stores.profile.loadProfile();
                    stores.display.router.$.home.go({});
                }
            },
        );
    }

    get validationData() {
        return {
            name: this.company.companyName,
            nameAr: this.company.companyNameAr,
            crNumber: this.company.crNumber,
            governorate: this.company.headOfficeGovernorateId,
            wilayat: this.company.headOfficeWilayatId,
            wilayatPrices: this.wilayatPrices,
        };
    }

    get profileModes() {
        return stores.profile.currentProfile.profileModes;
    }

    get projectGovernorates() {
        return Array.from(new Set(this.consultantProjects.map(item => item.governorateId?.asNumber())));
    }

    get projectWilayats() {
        return Array.from(new Set(this.consultantProjects.map(item => item.wilayatId?.asNumber())));
    }

    get governoratesList() {
        return stores.locations.governorates
            .map(item => ({
                value: item.id,
                name: item.displayName,
            }));
    }

    get wilayatsList() {
        const { governorates } = stores.locations;

        const governorate = governorates
            .find(x => x.id.isEqual(this.company.headOfficeGovernorateId));

        if (!governorate) {
            return [];
        }

        return governorate.wilayats
            .map(item => ({
                value: item.id,
                name: item.displayName,
            }));
    }

    get canCreateContractorCompany() {
        if (!stores.display.profile.profileModes) {
            return false;
        }

        return stores.display.profile.profileModes
            ?.some(item => item.mode === E.SpecialProfileMode.simpleContractorCreation);
    }

    get canCreateConsultantCompany() {
        if (!stores.display.profile.profileModes) {
            return false;
        }

        return stores.display.profile.profileModes
            ?.some(item => item.mode === E.SpecialProfileMode.simpleConsultantCreation);
    }

    get isPricesFilled() {
        return !this.wilayatPrices.some(item => item.value.length <= 0);
    }

    mount = async () => {
        if (!this.profileModes) {
            return;
        }

        await Promise.all(this.profileModes.map(async item => {
            const project = await restQuery.project.getProject(item.projectId);

            if (!project) {
                return;
            }

            item.mode === E.SpecialProfileMode.simpleContractorCreation
                ? this.contractorProjects.push(project)
                : this.consultantProjects.push(project);
        }));

        this.isProjectsLoaded = true;
    };

    openRegistration = (type: E.RoleInCompany) => {
        this.currentProfileType = type;

        if (type === E.RoleInCompany.consultant) {
            this.projectWilayats.forEach(wilayat => this.wilayatPrices.push(Input.create({ id: wilayat })));
        }

        this.isRegistering = true;
    };

    closeRegistration = () => {
        this.wilayatPrices = [];
        this.company = ShortCompany.create();
        this.currentProfileType = undefined;
        this.isRegistering = false;
    };

    createCompany = () => {
        (async () => {
            if (this.isLoading || !this.currentProfileType || !this.errorListHolder.test()) {
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            const res = await restQuery.createShortCompany(this.company, this.currentProfileType, this.wilayatPrices);

            if (!res) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            runInAction(() => {
                this.isLoading = false;
            });

            this.completeRegistration(res);
        })();
    };

    completeRegistration = (createdContractorId: Id) => {
        const newCompany = new ProfileInCompany();

        Mobx.extendsObservable(newCompany, {
            id: Id.init(stores.idCollection.getInternal('context')),
            contextId: createdContractorId,
            companyName: this.company.companyName,
            role: this.currentProfileType,
        });

        stores.profile.currentProfile.addCompany(newCompany);
        stores.profile.currentProfile.selectCompany(newCompany.id);

        stores.profile.loadProfile();
        stores.display.router.$.home.go({});
    };

    rejectInvitation = (rejectAll?: boolean, mode?: E.SpecialProfileMode, projectId?: number) => {
        (async () => {
            const res = await restQuery.project.rejectProjectInvitation(rejectAll, projectId, mode);

            if (!res) {
                return;
            }

            if (rejectAll) {
                this.clearProjects(mode);
                return;
            }

            mode === E.SpecialProfileMode.simpleContractorCreation
                ? this.contractorProjects = this.contractorProjects.filter(item => item.id.asNumber() !== projectId)
                : this.consultantProjects = this.consultantProjects.filter(item => item.id.asNumber() !== projectId);
        })();
    };

    clearProjects = (mode?: E.SpecialProfileMode) => {
        if (!mode) {
            return;
        }

        mode === E.SpecialProfileMode.simpleContractorCreation
            ? this.contractorProjects = []
            : this.consultantProjects = [];
    };
}
