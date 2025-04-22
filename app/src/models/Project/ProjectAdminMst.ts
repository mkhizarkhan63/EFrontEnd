import { type Instance, types } from 'mobx-state-tree';
import { E, MstType, restQuery } from '~/api';
import { stores } from '~/stores';

export type ProjectAdminType = Instance<typeof ProjectAdminMst>;

export const ProjectAdminMst = types.model({
    id: stores.idCollection.getIdentifier('constructionProjectAdmin'),
    projectNumber: MstType.string,
    clientName: MstType.string,
    contractorName: MstType.string,
    consultantName: MstType.string,
    modifiedDate: MstType.Moment,
    projectStatus: types.enumeration<E.ProjectStatus>(
        'ProjectStatus',
        Object.values(E.ProjectStatus),
    ),
    designStatus: types.enumeration<E.DesignProjectStatus>(
        'DesignProjectStatus',
        Object.values(E.DesignProjectStatus),
    ),
}).views(self => ({
    get externalId() {
        return stores.idCollection.getExternal('constructionProjectAdmin', self.id);
    },

    get canDeleteConstruction() {
        return self.projectStatus === E.ProjectStatus.draft || self.projectStatus === E.ProjectStatus.reviewing;
    },

    get canArchiveConstruction() {
        return self.projectStatus === E.ProjectStatus.draft || self.projectStatus === E.ProjectStatus.chooseContractor || self.projectStatus === E.ProjectStatus.readyToSign;
    },

    get canUnarchiveConstruction() {
        return self.projectStatus === E.ProjectStatus.archived;
    },

    get canDeleteDesign() {
        return self.designStatus === E.DesignProjectStatus.adminReviewDesign || self.designStatus === E.DesignProjectStatus.noneDesign;
    },
})).actions(() => ({
    getProject: async (id: number) => await restQuery.project.getProjectForAdmin(id),
}));
