import { action } from 'mobx';
import {
    E,
    LazyData,
    LazyDataScroller,
    restQuery,
    type Id,
    LazyModelScroller,
} from '~/api';
import { type UpdateQuestionAction } from '~/api/Rest/dtos/construction';
import {
    ProjectDraft, type Project,
    type ProjectBid, type QuestionType,
} from '~/models';
import { stores } from '.';
import { Locations } from './Locations';
import { deepReaction } from '~/utils';
import { getListedProjects } from '~/api/Rest/queries/project';

type FloorLevelsType = {
    basement: number;
    additionalFloors: number;
    outerBlocks: number;
    groundFloor: boolean;
    levellingFloor: boolean;
    penthouseFloor: boolean;
    pool: boolean;
};

export class Projects {
    filtersChanged = false;

    sorter = {
        modifiedDateIsAscending: undefined as boolean | undefined,
        idIsAscending: false as boolean | undefined,
        projectStatusIsAscending: undefined as boolean | undefined,
        projectDesignStatusIsAscending: undefined as boolean | undefined,
    };

    filters: Record<string, number | string | undefined> = {};

    statusFilter = E.ProjectStatus.none;

    adminStatusFilter: E.ProjectStatus[] | undefined = undefined;

    adminStatusFilterDesign: E.DesignProjectStatus[] | undefined = undefined;

    projectIdFilterConstruction = '';

    projectIdFilterDesign = '';

    projectNameConstruction = '';

    projectNameDesign = '';

    projects = new LazyDataScroller(
        'Projects list',
        restQuery.project.getProjects,
        18,
        this.sorter,
        restQuery.project.getProject,
    );
    listedProjects = new LazyModelScroller(
        'Project Listing',
        async (paging) => {
            if (!paging) return [];

            return await getListedProjects(paging);
        },
        18, // number of items to load per scroll
        this.sorter, // your sorting method, adjust as necessary
        undefined, // fallback or initial fetch if needed
    );

    adminProjectsConstruction = new LazyModelScroller(
        'Admin projects list',
        paging => restQuery.project.getProjectsForAdmin(
            E.AdminProjectView.construction,
            paging,
            this.projectIdFilterConstruction,
            this.projectNameConstruction,
            this.adminStatusFilter,
        ),
        18,
        this.sorter,
        restQuery.project.getProjectForAdmin,
    );

    adminProjectsDesign = new LazyModelScroller(
        'Admin projects list',
        paging => restQuery.project.getProjectsForAdmin(
            E.AdminProjectView.design,
            paging,
            this.projectIdFilterDesign,
            this.projectNameDesign,
            undefined,
            this.adminStatusFilterDesign,
        ),
        18,
        this.sorter,
        restQuery.project.getProjectForAdmin,
    );

    contractorNewProjects = new LazyDataScroller(
        'Contractor new projects list',
        paging => restQuery.project.getProjectsForContractor(
            this.statusFilter,
            E.ContractorViewType.newProjects,
            paging,
            this.contractorPref.governorates,
            this.contractorPref.minSize,
        ),
        18,
        undefined,
        restQuery.project.getProjectForContractor,
    );

    contractorInvitedProjects = new LazyDataScroller(
        'Contractor invited projects list',
        paging => restQuery.project.getProjectsForContractor(
            this.statusFilter,
            E.ContractorViewType.invitedNewProjects,
            paging,
        ),
        18,
        undefined,
        restQuery.project.getProjectForContractor,
    );

    consultantInvitedProjects = new LazyDataScroller(
        'Consultant invited projects list',
        paging => restQuery.project.getProjectsForConsultant(this.filters, paging, true),
        18,
        undefined,
        restQuery.project.getProjectForConsultant,
    );

    contractorMyProjects = new LazyDataScroller(
        'Contractor my projects list',
        paging => restQuery.project.getProjectsForContractor(
            this.statusFilter,
            E.ContractorViewType.myProjects,
            paging,
        ),
        18,
        undefined,
        restQuery.project.getProjectForContractor,
    );

    consultantMyProjects = new LazyDataScroller(
        'Consultant projects list',
        paging => restQuery.project.getProjectsForConsultant(this.filters, paging),
        18,
        undefined,
        restQuery.project.getProjectForConsultant,
    );

    consultantNewProjects = new LazyDataScroller(
        'Consultant new projects list',
        paging => restQuery.project.getProjectsForConsultant(this.filters, paging, true),
        18,
        undefined,
        restQuery.project.getProjectForConsultant,
    );

    adminProjectsStatistics = new LazyData(
        'AdminProjectsStatistics',
        restQuery.project.getAllProjectsStatistics,
        undefined,
    );

    locations = new Locations();

    draft = new ProjectDraft();

    lastViewedProject?: Project;

    constructor() {
        makeSafeObservable(this, {
            setLastViewedProject: action,
            setFilters: action,
            setStatusFilter: action,
            clearFilters: action,
            setProjectIdFilterConstruction: action,
            setProjectIdFilterDesign: action,
            setProjectNameConstruction: action,
            setProjectNameDesign: action,
            setAdminProjectStatus: action,
            setAdminProjectStatusDesign: action,
        });

        deepReaction(
            () => [this.projectIdFilterConstruction, this.projectNameConstruction, this.adminStatusFilter],
            () => {
                this.adminProjectsConstruction.reload();
            },
        );

        deepReaction(
            () => [this.projectIdFilterDesign, this.projectNameDesign, this.adminStatusFilterDesign],
            () => {
                this.adminProjectsDesign.reload();
            },
        );
    }

    get contractorPref() {
        const contractor = stores.profile.contractor;

        const governorates = contractor?.governorates.map(x => x.asNumber());
        governorates?.push(contractor?.headOfficeGovernorateId?.asNumber() ?? 0);

        return {
            governorates,
            minSize: contractor?.minimumProjectSize,
        };
    }

    setLastViewedProject = (project: Project) => {
        this.lastViewedProject = project;
    };

    setFilters = (key: string, value: string | number) => {
        this.filters[key] = value;
        this.filtersChanged = !this.filtersChanged;
    };

    resetDraft = () => {
        this.draft = new ProjectDraft();
    };

    setStatusFilter = (status: E.ProjectStatus) => {
        this.statusFilter = status;
    };

    clearFilters = () => {
        this.filters = {};

        this.filtersChanged = !this.filtersChanged;
    };

    setProjectIdFilterConstruction = (value: string) => {
        this.projectIdFilterConstruction = value;
    };

    setProjectIdFilterDesign = (value: string) => {
        this.projectIdFilterDesign = value;
    };

    setProjectNameConstruction = (value: string) => {
        this.projectNameConstruction = value;
    };

    setProjectNameDesign = (value: string) => {
        this.projectNameDesign = value;
    };

    setAdminProjectStatus = (value: E.ProjectStatus) => {
        if (this.adminStatusFilter?.includes(value)) {
            this.adminStatusFilter = undefined;
            return;
        }

        if (value === E.ProjectStatus.signed) {
            this.adminStatusFilter = [E.ProjectStatus.liveInPm, value];
            return;
        }

        this.adminStatusFilter = [value];
    };

    setAdminProjectStatusDesign = (value: E.DesignProjectStatus) => {
        if (this.adminStatusFilterDesign?.includes(value)) {
            this.adminStatusFilterDesign = undefined;
            return;
        }

        this.adminStatusFilterDesign = [value];
    };

    getStageTemplateByFloorSetup = async (floorLevels: FloorLevelsType) => await restQuery
        .stage.getStageTemplateByFloorSetup(floorLevels);

    getStageTemplatesBySetup = async (floorLevels: FloorLevelsType) => await restQuery
        .stage.getStageTemplatesBySetup(floorLevels);

    createStagePlan = async (projectId: Id, stageTemplateId: Id) => await restQuery
        .admin.createStagePlan(projectId, stageTemplateId);

    update = async (project: Project | ProjectDraft, publish = false) => await restQuery.project
        .updateProject(project, publish);

    postQuestion = async (question: QuestionType, projectId: number) => await restQuery.project
        .postQuestion(question, projectId);

    deleteQuestion = async (id: number) => await restQuery.project
        .deleteQuestion(id);

    modifyQuestion = async (question: QuestionType, questionAction: UpdateQuestionAction) => await restQuery.project.modifyQuestion(question, questionAction);

    updateProjectBid = async (projectBid: ProjectBid, publish = false) => await restQuery.project
        .updateProjectBid(projectBid, publish);
}
