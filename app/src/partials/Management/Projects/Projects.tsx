import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, SortedTable } from '~/bits';
import type { Project } from '~/models';
import { hook } from '~/utils';
import { ProjectsVm } from './Projects.vm';

type Props = {
    projects: () => Project[];
    statistics?: number;
};

const getColumns = (vm: ProjectsVm) => SortedTable.createColumns<Project>(() => [
    {
        keyName: 'projectNumber',
        displayName: lang.dict.get('projectHash'),
        size: .73,
        render: item => <div>#{item.projectNumber}</div>,
    },
    {
        keyName: 'location',
        displayName: lang.dict.get('location'),
        size: 1.56,
        render: item => (
            <div className="location">
                {item.wilayatName}
                <p className="location__governorate">
                    {item.governorate?.displayName}
                </p>
            </div>
        ),
    },
    {
        keyName: 'builtUpArea',
        displayName: lang.dict.get('builtUpArea'),
        size: 1.2,
        render: item => <div>{`${item.addedBuiltUpArea} ${lang.dict.get('m2')}`}</div>,
    },
    {
        keyName: 'landType',
        displayName: lang.dict.get('landType'),
        render: item => <div>{lang.dict.enum('landType', item.landType)}</div>,
    },
    {
        keyName: 'floorLevels',
        displayName: lang.dict.get('projectTileFloorLevels'),
        size: .93,
        render: item => <div>{item.floorLevels}</div>,
    },
    {
        keyName: 'projectStatus',
        displayName: lang.dict.get('status'),
        render: item => (
            <div
                className="status"
                data-status={item.projectStatus}
            >
                {lang.dict.enum('projectStatus', item.projectStatus)}
            </div>
        ),
    },
    {
        keyName: 'viewDetails',
        displayName: lang.dict.get('action'),
        align: 'right',
        size: .7,
        render: item => (
            <Button
                color="transparent"
                value={lang.dict.get('viewDetail')}
                onClick={() => vm.goToProject(item.id, item.startingStep)}
            />
        ),
    },
]);

export const Projects = observer(({ projects, statistics }: Props) => {
    const vm = hook.useVm(() => new ProjectsVm(projects), [projects]);

    return (
        <div className="company-projects">
            <div className="top-header">
                <h2 className="top-header__text">
                    {lang.dict.get('projects')}
                    <span className="top-header__text-num">
                        {lang.dict.format('parentheses', [statistics ?? vm.projects().length])}
                    </span>
                </h2>
                <div className="top-header__right">
                    <div className="search">
                        <Button color="transparent" centerImg="search" />
                    </div>
                    <div className="filter" data-is-filter="filter">
                        <Button color="transparent" centerImg="filter" />
                    </div>
                </div>
            </div>
            <SortedTable
                data={vm.sorter.values}
                keyValue="id"
                columns={getColumns(vm)}
                sorter={vm.sorter}
            />
        </div>
    );
});
