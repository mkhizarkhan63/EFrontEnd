import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import type { MyProjectsCompanyVm } from '../../MyProjectsCompany.vm';

type Props = {
    vm: MyProjectsCompanyVm;
};

export const StatusFilter = observer(({ vm }: Props) => {
    const filterKeys = [
        E.ProjectStatus.liveInPm,
        E.ProjectStatus.chooseContractor,
        E.ProjectStatus.signed,
        E.ProjectStatus.readyToSign,
        E.ProjectStatus.archived,
    ] as const;

    const filters = filterKeys.map(key => (
        <div
            key={key}
            className="my-projects-company__menu-step"
            data-is-active={vm.isActive(key)}
            onClick={() => vm.setProjectStatusFilter(key)}
        >
            <p className="my-projects-company__menu-step-name">
                {lang.dict.enum('projectCompanyStatus', key)}
            </p>
            <span className="my-projects-company__menu-step-num">
                ({vm.filterCount[key]})
            </span>
        </div>
    ));

    return (
        <div className="my-projects-company__menu">
            <div
                className="my-projects-company__menu-step"
                data-is-active={vm.isActive(E.ProjectStatus.none)}
                onClick={() => vm.setProjectStatusFilter(E.ProjectStatus.none)}
            >
                <p className="my-projects-company__menu-step-name">
                    {lang.dict.get('all')}
                </p>
                <span className="my-projects-company__menu-step-num">
                    ({vm.filterCount.all})
                </span>
            </div>
            {filters}
        </div>
    );
});
