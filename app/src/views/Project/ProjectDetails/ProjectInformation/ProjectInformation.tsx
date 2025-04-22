import { observer } from 'mobx-react';
import { lang, utils } from '~/api';
import { If } from '~/bits';
import type { ProjectDetailsVm } from '../ProjectDetails.vm';

type ProjectInformationProps = {
    vm: ProjectDetailsVm;
};

type InfoBoxProps = {
    name: string;
    value: string;
    isDisplay?: boolean;
};

const InfoBox = ({ name, value, isDisplay = true }: InfoBoxProps) => (
    <If condition={isDisplay}>
        <div className="project-info-grid__item">
            <p className="project-info-grid__item-value">{value}</p>
            <p className="project-info-grid__item-label">{name}</p>
        </div>
    </If>
);

export const ProjectInformation = observer((props: ProjectInformationProps) => {
    const { vm } = props;

    return (
        <div className="project-info">
            <div className="project-info__header">{lang.dict.get('projectDetails')}</div>
            <div className="project-info-grid">
                <InfoBox
                    name={lang.dict.get('basement')}
                    value={String(vm.project.stage?.basement ?? 0)}
                />
                <InfoBox
                    name={lang.dict.get('additionalFloors')}
                    value={String(vm.project.stage?.additionalFloors ?? 0)}
                />
                <InfoBox
                    name={lang.dict.get('outerBlocks')}
                    value={String(vm.project.stage?.outerBlocks ?? 0)}
                />
                <InfoBox
                    name={lang.dict.get('penthouseFloor')}
                    value={utils.toStrBool(vm.project.stage?.penthouseFloor ?? false)}
                />
                <InfoBox
                    name={lang.dict.get('levellingFloor')}
                    value={utils.toStrBool(vm.project.stage?.levellingFloor ?? false)}
                />
                <InfoBox
                    name={lang.dict.get('pool')}
                    value={utils.toStrBool(vm.project.stage?.pool ?? false)}
                />
                <InfoBox
                    name={lang.dict.get('projectInfoAddedArea')}
                    value={String(vm.project.addedBuiltUpArea)}
                />
            </div>
        </div>
    );
});
