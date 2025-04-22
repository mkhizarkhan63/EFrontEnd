import { observer } from "mobx-react";
import { ListedProjectsVm } from './ListedProjects.vm';
import { hook, utilsDate } from '~/utils';
import { E, lang } from '~/api';
import { Button, Icons, If, Input, SortedTable } from '~/bits';
import { ProjectType } from "~/api/Rest/queries/project";

export const ListedProjects = observer(() => {
    const vm = hook.useVm(() => new ListedProjectsVm());


    const getColumnListedProject = (vm: ListedProjectsVm) => SortedTable.createColumns<ProjectType>(() => [
        {
            keyName: 'IdisAsc',
            displayName: lang.dict.get('Id'),
            size: 3,
            render: item => <div className="">{item.projectId}</div>

        },
        {
            keyName: 'projectName',
            displayName: lang.dict.get('projectName'),
            size: 3,
            render: item => <div className="project">{item.projectName}</div>,
        },
        {
            keyName: 'client',
            displayName: lang.dict.get('companyName'),
            size: 3,
            render: item => <div className="company">{item.companyName}</div>,
        },
        {
            keyName: 'likes',
            displayName: lang.dict.get('likes'),
            size: 1.8,
            render: item => <div className="likes">{item.likes}</div>,
        },
        {
            keyName: 'visits',
            displayName: lang.dict.get('projectListingVisits'),
            size: 1.8,
            render: item => <div className="visits">{item.visits}</div>,
        },
        {
            keyName: 'purchases',
            displayName: lang.dict.get('purchases'),
            size: 1.8,
            render: item => <div className="purchases">{item.purchases}</div>,
        },
        {
            keyName: 'publishedOn',
            displayName: lang.dict.get('publishedOn'),
            size: 3,
            render: item => <div className="date">{item.publishedOn}</div>,
        },
        {
            keyName: 'status',
            displayName: lang.dict.get('status'),
            size: 4,
            render: item => <div
                className="status"
                data-status={item.status.toLowerCase()}
            >
                {item.status}
            </div>,
        },
        {
            keyName: 'viewDetails',
            displayName: lang.dict.get('action'),
            align: 'right',
            size: 1.1,
            render: item => (
                <>
                    <Button
                        color="transparent"
                        value={lang.dict.get('view')}
                    />
                    <Button
                        color="transparent"
                        value={lang.dict.get('edit')}
                    />
                    <Button
                        color="transparent"
                        value={lang.dict.get('archive')}
                    />

                </>
            ),
        },


    ]);

    return (

        <>
            <div className="listedprojects-list">
                <div className="top-header">
                    <h1 className="top-header__text">
                        {lang.dict.get('listedProjects')}
                        <span className="top-header__text-optional">
                        </span>
                    </h1>
                    <div className="top-header__right">
                        <div className="search">
                            <Input.Text
                                // value={vm.projectIdFilterConstruction}
                                placeHolder={lang.dict.get('projectId')}
                            // onChange={vm.setProjectIdFilterConstruction}
                            />
                            <Icons icon="search" />
                        </div>
                        <div className="search">
                            <Input.Text
                                // value={vm.projectNameConstruction}
                                placeHolder={lang.dict.get('name')}
                            // onChange={vm.setProjectNameConstruction}
                            />
                            <Icons icon="search" />
                        </div>
                        <Button
                            color="blue"
                            leftImg="add"
                            value={lang.dict.get('addProjectBtn')}
                            onClick={vm.createProject}
                        />
                    </div>
                </div>
                <div className="statuses">
                    <div
                        className="statuses__item statuses__item--first"
                    // onClick={() => vm.setAdminProjectStatus(E.ProjectStatus.draft)}
                    // data-is-selected={vm.isStatusSelected(E.ProjectStatus.draft)}
                    >
                        <p className="statuses__title">
                            1. {lang.dict.enum('listedProjectsStatus', E.ListedProjectStatus.draft)}
                        </p>
                        <span className="statuses__number statuses__number--yellow">
                            02
                        </span>
                    </div>
                    <div
                        className="statuses__item"
                    // onClick={() => vm.setAdminProjectStatus(E.ProjectStatus.reviewing)}
                    // data-is-selected={vm.isStatusSelected(E.ProjectStatus.reviewing)}
                    >
                        <p className="statuses__title">
                            2. {lang.dict.enum('listedProjectsStatus', E.ListedProjectStatus.published)}
                        </p>
                        <span className="statuses__number statuses__number--blue">
                            03
                        </span>
                    </div>
                    <div
                        className="statuses__item"
                    // onClick={() => vm.setAdminProjectStatus(E.ProjectStatus.openBids)}
                    // data-is-selected={vm.isStatusSelected(E.ProjectStatus.openBids)}
                    >
                        <p className="statuses__title">
                            3. {lang.dict.enum('listedProjectsStatus', E.ListedProjectStatus.archived)}
                        </p>
                        <span className="statuses__number statuses__number--gray">
                            01
                        </span>
                    </div>

                </div>
                <SortedTable
                    data={vm.ProjectLists.data}
                    keyValue="id"
                    columns={getColumnListedProject(vm)}
                    // customHeader={vm.ListedProjectSorter}
                    lazyLoad={vm.ProjectLists}
                />
            </div>
        </>

    );

});