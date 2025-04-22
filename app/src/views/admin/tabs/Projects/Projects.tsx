import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, Icons, If, Input, SortedTable } from '~/bits';
import type { ProjectAdminType } from '~/models';
import { hook, utilsDate } from '~/utils';
import { ProjectsVm } from './Projects.vm';
import { DeleteModal } from '~/bits/DeleteModal';

const getColumnsConstruction = (vm: ProjectsVm) => SortedTable.createColumns<ProjectAdminType>(() => [
    {
        keyName: 'idIsAscending',
        displayName: lang.dict.get('project'),
        size: 3,
        render: item => <div className="project">{item.projectNumber}</div>,
    },
    {
        keyName: 'client',
        displayName: lang.dict.get('client'),
        size: 1.5,
        render: item => <div className="client">{item.clientName}</div>,
    },
    {
        keyName: 'contractor',
        displayName: lang.dict.get('contractor'),
        size: 1.8,
        render: item => <div className="contractor">{item.contractorName}</div>,
    },
    {
        keyName: 'modifiedDateIsAscending',
        displayName: lang.dict.get('updateOn'),
        size: .9,
        render: item => <div className="date">{utilsDate.printDate(item.modifiedDate)}</div>,
    },
    {
        keyName: 'projectStatusIsAscending',
        displayName: lang.dict.get('status'),
        size: 1.2,
        render: item => {
            const status = item.projectStatus === E.ProjectStatus.liveInPm
                ? lang.dict.get('signed')
                : lang.dict.enum('projectStatus', item.projectStatus);

            return (
                <div
                    className="status"
                    data-status={item.projectStatus}
                >
                    {status}
                </div>
            );
        },
    },
    {
        keyName: 'viewDetails',
        displayName: lang.dict.get('action'),
        align: 'right' as const,
        size: .6,
        render: item => (
            <>
                <Button
                    color="transparent"
                    value={lang.dict.get('viewDetail')}
                    onClick={vm.showConstructionProject(item.externalId)}
                />
                <If condition={item.canDeleteConstruction}>
                    <Button
                        color="transparent"
                        value={lang.dict.get('delete')}
                        onClick={() => vm.openDeleteModal(item.externalId)}
                    />
                </If>
                <If condition={item.canArchiveConstruction}>
                    <Button
                        color="transparent"
                        value={lang.dict.get('archive')}
                        onClick={() => vm.openArchiveModal(item.externalId)}
                    />
                </If>
                <If condition={item.canUnarchiveConstruction}>
                    <Button
                        color="transparent"
                        value={lang.dict.get('unarchive')}
                        onClick={() => vm.openArchiveModal(item.externalId, true)}
                    />
                </If>
            </>
        ),
    },
]);

const getColumnsDesign = (vm: ProjectsVm) => SortedTable.createColumns<ProjectAdminType>(() => [
    {
        keyName: 'idIsAscending',
        displayName: lang.dict.get('project'),
        size: 2,
        render: item => <div className="project">{item.projectNumber}</div>,
    },
    {
        keyName: 'client',
        displayName: lang.dict.get('client'),
        size: 2,
        render: item => <div className="client">{item.clientName}</div>,
    },
    {
        keyName: 'consultant',
        displayName: lang.dict.get('consultant'),
        size: 1.5,
        render: item => <div className="consultant">{item.consultantName}</div>,
    },
    {
        keyName: 'modifiedDateIsAscending',
        displayName: lang.dict.get('updateOn'),
        size: 1.1,
        render: item => <div className="date">{utilsDate.printDate(item.modifiedDate)}</div>,
    },
    {
        keyName: 'projectDesignStatusIsAscending',
        displayName: lang.dict.get('status'),
        size: 1.16,
        render: item => (
            <div
                className="status"
                data-status={item.designStatus}
            >
                {lang.dict.enum('projectStatusDesign', item.designStatus)}
            </div>
        ),
    },
    {
        keyName: 'viewDetails',
        displayName: lang.dict.get('action'),
        align: 'right' as const,
        size: .9,
        render: item => (
            <>
                <Button
                    color="transparent"
                    value={lang.dict.get('viewDetail')}
                    onClick={vm.showDesignProject(item.externalId)}
                />
                <If condition={item.canDeleteDesign}>
                    <Button
                        color="transparent"
                        value={lang.dict.get('delete')}
                        onClick={() => vm.openDeleteModal(item.externalId)}
                    />
                </If>
            </>
        ),
    },
]);

export const ProjectManagement = observer(() => {
    const vm = hook.useVm(() => new ProjectsVm());

    return (
        <div className="projects-list">
            <If condition={() => vm.isConstruction}>
                <div className="top-header">
                    <h1 className="top-header__text">
                        {lang.dict.get('projectManagement')}
                        <span className="top-header__text-optional">
                            ({vm.constructionProjectsAdmin.paging.rowCount})
                        </span>
                    </h1>
                    <div className="top-header__right">
                        <div className="search">
                            <Input.Text
                                value={vm.projectIdFilterConstruction}
                                placeHolder={lang.dict.get('projectId')}
                                onChange={vm.setProjectIdFilterConstruction}
                            />
                            <Icons icon="search" />
                        </div>
                        <div className="search">
                            <Input.Text
                                value={vm.projectNameConstruction}
                                placeHolder={lang.dict.get('name')}
                                onChange={vm.setProjectNameConstruction}
                            />
                            <Icons icon="search" />
                        </div>
                        <Button
                            color="blue"
                            leftImg="add"
                            value={lang.dict.get('createProject')}
                            onClick={vm.createProject}
                        />
                    </div>
                </div>
                <div className="projects-list__nav">
                    <div className="projects-list__nav-item" data-is-active={!vm.isConstruction}>
                        <Button
                            color="blue"
                            leftImg="design-menu-icon"
                            value={lang.dict.get('design')}
                            onClick={vm.toggleProject(E.ProjectStartingStep.design)}
                        />
                    </div>
                    <div className="projects-list__nav-item" data-is-active={vm.isConstruction}>
                        <Button
                            color="blue"
                            leftImg="price"
                            value={lang.dict.get('construction')}
                            onClick={vm.toggleProject(E.ProjectStartingStep.build)}
                        />
                    </div>
                </div>
                <div className="statuses">
                    <div
                        className="statuses__item statuses__item--first"
                        onClick={() => vm.setAdminProjectStatus(E.ProjectStatus.draft)}
                        data-is-selected={vm.isStatusSelected(E.ProjectStatus.draft)}
                    >
                        <p className="statuses__title">
                            1. {lang.dict.enum('projectStatus', E.ProjectStatus.draft)}
                        </p>
                        <span className="statuses__number statuses__number--yellow">
                            {vm.allProjectsStatistics?.draft}
                        </span>
                    </div>
                    <div
                        className="statuses__item"
                        onClick={() => vm.setAdminProjectStatus(E.ProjectStatus.reviewing)}
                        data-is-selected={vm.isStatusSelected(E.ProjectStatus.reviewing)}
                    >
                        <p className="statuses__title">
                            2. {lang.dict.enum('projectStatus', E.ProjectStatus.reviewing)}
                        </p>
                        <span className="statuses__number statuses__number--red">
                            {vm.allProjectsStatistics?.adminReview}
                        </span>
                    </div>
                    <div
                        className="statuses__item"
                        onClick={() => vm.setAdminProjectStatus(E.ProjectStatus.openBids)}
                        data-is-selected={vm.isStatusSelected(E.ProjectStatus.openBids)}
                    >
                        <p className="statuses__title">
                            3. {lang.dict.enum('projectStatus', E.ProjectStatus.openBids)}
                        </p>
                        <span className="statuses__number statuses__number--blue">
                            {vm.allProjectsStatistics?.contractBidding}
                        </span>
                    </div>
                    <div
                        className="statuses__item"
                        onClick={() => vm.setAdminProjectStatus(E.ProjectStatus.chooseContractor)}
                        data-is-selected={vm.isStatusSelected(E.ProjectStatus.chooseContractor)}
                    >
                        <p className="statuses__title">
                            4. {lang.dict.enum('projectStatus', E.ProjectStatus.chooseContractor)}
                        </p>
                        <span className="statuses__number statuses__number--blue">
                            {vm.allProjectsStatistics?.chooseContractor}
                        </span>
                    </div>
                    <div
                        className="statuses__item"
                        onClick={() => vm.setAdminProjectStatus(E.ProjectStatus.readyToSign)}
                        data-is-selected={vm.isStatusSelected(E.ProjectStatus.readyToSign)}
                    >
                        <p className="statuses__title">
                            5. {lang.dict.enum('projectStatus', E.ProjectStatus.readyToSign)}
                        </p>
                        <span className="statuses__number statuses__number--green">
                            {vm.allProjectsStatistics?.contractReady}
                        </span>
                    </div>
                    <div
                        className="statuses__item  statuses__item--penultimate"
                        onClick={() => vm.setAdminProjectStatus(E.ProjectStatus.signed)}
                        data-is-selected={vm.isStatusSelected(E.ProjectStatus.signed)}
                    >
                        <p className="statuses__title">
                            6. {lang.dict.enum('projectStatus', E.ProjectStatus.signed)}
                        </p>
                        <span className="statuses__number statuses__number--green">
                            {(vm.allProjectsStatistics?.signed ?? 0) + (vm.allProjectsStatistics?.liveInPm ?? 0)}
                        </span>
                    </div>
                    <div
                        className="statuses__item statuses__item--last"
                        onClick={() => vm.setAdminProjectStatus(E.ProjectStatus.archived)}
                        data-is-selected={vm.isStatusSelected(E.ProjectStatus.archived)}
                    >
                        <p className="statuses__title">
                            {lang.dict.enum('projectStatus', E.ProjectStatus.archived)}
                        </p>
                        <span className="statuses__number statuses__number--gray">
                            {vm.allProjectsStatistics?.archived}
                        </span>
                    </div>
                </div>
                <SortedTable
                    data={vm.constructionProjectsAdmin.data}
                    keyValue="id"
                    columns={getColumnsConstruction(vm)}
                    customHeader={vm.constructionSorter}
                    lazyLoad={vm.constructionProjectsAdmin}
                />
            </If>
            <If condition={() => !vm.isConstruction}>
                <div className="top-header">
                    <h1 className="top-header__text">
                        {lang.dict.get('projectManagement')}
                        <span className="top-header__text-optional">
                            ({vm.designProjectsAdmin.paging.rowCount})
                        </span>
                    </h1>
                    <div className="top-header__right">
                        <div className="search">
                            <Input.Text
                                value={vm.projectIdFilterDesign}
                                placeHolder={lang.dict.get('projectId')}
                                onChange={vm.setProjectIdFilterDesign}
                            />
                            <Icons icon="search" />
                        </div>
                        <div className="search">
                            <Input.Text
                                value={vm.projectNameDesign}
                                placeHolder={lang.dict.get('name')}
                                onChange={vm.setProjectNameDesign}
                            />
                            <Icons icon="search" />
                        </div>
                        <Button
                            color="blue"
                            leftImg="add"
                            value={lang.dict.get('createProject')}
                            onClick={vm.createProject}
                        />
                    </div>
                </div>
                <div className="projects-list__nav">
                    <div className="projects-list__nav-item" data-is-active={!vm.isConstruction}>
                        <Button
                            color="blue"
                            leftImg="design-menu-icon"
                            value={lang.dict.get('design')}
                            onClick={vm.toggleProject(E.ProjectStartingStep.design)}
                        />
                    </div>
                    <div className="projects-list__nav-item" data-is-active={vm.isConstruction}>
                        <Button
                            color="blue"
                            leftImg="price"
                            value={lang.dict.get('construction')}
                            onClick={vm.toggleProject(E.ProjectStartingStep.build)}
                        />
                    </div>
                </div>
                <div className="statuses statuses--design">
                    <div
                        className="statuses__item"
                        onClick={() => vm.setAdminProjectStatusDesign(E.DesignProjectStatus.noneDesign)}
                        data-is-selected={vm.isDesignStatusSelected(E.DesignProjectStatus.noneDesign)}
                    >
                        <p className="statuses__title">
                            1. {lang.dict.enum('projectStatusDesign', E.DesignProjectStatus.noneDesign)}
                        </p>
                        <span className="statuses__number statuses__number--yellow">
                            {vm.allProjectsStatistics?.designDraft}
                        </span>
                    </div>
                    <div
                        className="statuses__item"
                        onClick={() => vm.setAdminProjectStatusDesign(E.DesignProjectStatus.adminReviewDesign)}
                        data-is-selected={vm.isDesignStatusSelected(E.DesignProjectStatus.adminReviewDesign)}
                    >
                        <p className="statuses__title">
                            2. {lang.dict.enum('projectStatusDesign', E.DesignProjectStatus.adminReviewDesign)}
                        </p>
                        <span className="statuses__number statuses__number--red">
                            {vm.allProjectsStatistics?.designAdminReview}
                        </span>
                    </div>
                    <div
                        className="statuses__item"
                        onClick={() => vm.setAdminProjectStatusDesign(E.DesignProjectStatus.consultantReviewDesign)}
                        data-is-selected={vm.isDesignStatusSelected(E.DesignProjectStatus.consultantReviewDesign)}
                    >
                        <p className="statuses__title">
                            3. {lang.dict.enum('projectStatusDesign', E.DesignProjectStatus.consultantReviewDesign)}
                        </p>
                        <span className="statuses__number statuses__number--blue">
                            {vm.allProjectsStatistics?.designConsultantApprove}
                        </span>
                    </div>
                    <div
                        className="statuses__item"
                        onClick={() => vm.setAdminProjectStatusDesign(E.DesignProjectStatus.advancePaymentDesign)}
                        data-is-selected={vm.isDesignStatusSelected(E.DesignProjectStatus.advancePaymentDesign)}
                    >
                        <p className="statuses__title">
                            4. {lang.dict.enum('projectStatusDesign', E.DesignProjectStatus.advancePaymentDesign)}
                        </p>
                        <span className="statuses__number statuses__number--blue">
                            {vm.allProjectsStatistics?.designAdvancePayment}
                        </span>
                    </div>
                    <div
                        className="statuses__item"
                        onClick={() => vm.setAdminProjectStatusDesign(E.DesignProjectStatus.uploadDrawingsDesign)}
                        data-is-selected={vm.isDesignStatusSelected(E.DesignProjectStatus.uploadDrawingsDesign)}
                    >
                        <p className="statuses__title">
                            5. {lang.dict.enum('projectStatusDesign', E.DesignProjectStatus.uploadDrawingsDesign)}
                        </p>
                        <span className="statuses__number statuses__number--green">
                            {vm.allProjectsStatistics?.designUploadDrawings}
                        </span>
                    </div>
                    <div
                        className="statuses__item"
                        onClick={() => vm.setAdminProjectStatusDesign(E.DesignProjectStatus.finalPaymentDesign)}
                        data-is-selected={vm.isDesignStatusSelected(E.DesignProjectStatus.finalPaymentDesign)}
                    >
                        <p className="statuses__title">
                            6. {lang.dict.enum('projectStatusDesign', E.DesignProjectStatus.finalPaymentDesign)}
                        </p>
                        <span className="statuses__number statuses__number--green">
                            {vm.allProjectsStatistics?.designFinalPayment}
                        </span>
                    </div>
                    <div
                        className="statuses__item"
                        onClick={() => vm.setAdminProjectStatusDesign(E.DesignProjectStatus.completedDesign)}
                        data-is-selected={vm.isDesignStatusSelected(E.DesignProjectStatus.completedDesign)}
                    >
                        <p className="statuses__title">
                            7. {lang.dict.enum('projectStatusDesign', E.DesignProjectStatus.completedDesign)}
                        </p>
                        <span className="statuses__number statuses__number--gray">
                            {vm.allProjectsStatistics?.designCompleted}
                        </span>
                    </div>
                    <div
                        className="statuses__item"
                        onClick={() => vm.setAdminProjectStatusDesign(E.DesignProjectStatus.rejectedDesign)}
                        data-is-selected={vm.isDesignStatusSelected(E.DesignProjectStatus.rejectedDesign)}
                    >
                        <p className="statuses__title">
                            8. {lang.dict.enum('projectStatusDesign', E.DesignProjectStatus.rejectedDesign)}
                        </p>
                        <span className="statuses__number statuses__number--gray">
                            {vm.allProjectsStatistics?.designRejected}
                        </span>
                    </div>
                </div>
                <SortedTable
                    data={vm.designProjectsAdmin.data}
                    keyValue="id"
                    columns={getColumnsDesign(vm)}
                    customHeader={vm.designSorter}
                    lazyLoad={vm.designProjectsAdmin}
                />
            </If>
            <If condition={() => vm.isDeleteModalOpened}>
                <DeleteModal
                    onBlur={vm.closeDeleteModal}
                    onCancel={vm.closeDeleteModal}
                    onDelete={vm.deleteProject}
                    title={lang.dict.get('deleteProject')}
                    description={lang.dict.get('deleteWaring')}
                    buttonTitle={lang.dict.get('delete')}
                />
            </If>
            <If condition={() => vm.isArchiveModalOpened}>
                <DeleteModal
                    onBlur={vm.closeArchiveModal}
                    onCancel={vm.closeArchiveModal}
                    onDelete={vm.archiveProject}
                    title={vm.isUnarchiving ? lang.dict.get('unarchiveProject') : lang.dict.get('archiveProject')}
                    description={lang.dict.get('archiveWarning')}
                    buttonTitle={vm.isUnarchiving ? lang.dict.get('unarchive') : lang.dict.get('archive')}
                />
            </If>
        </div>
    );
});
