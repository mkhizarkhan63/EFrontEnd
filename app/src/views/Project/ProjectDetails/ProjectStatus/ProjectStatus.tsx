import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import type { ProjectDetailsVm } from '../ProjectDetails.vm';
import { Button, Close, SideModal, Uploader } from '~/bits';
import { downloadAll } from '~/utils';

type Props = {
    vm: ProjectDetailsVm;
    onClose: VoidFunction;
};

export const ProjectStatus = observer(({ vm, onClose }: Props) => {
    const area = vm.project?.landArea
        ? lang.dict.format('squareMetersFormat', [vm.project.landArea])
        : undefined;

    const landType = vm.project.landType
        ? lang.dict.get(vm.project?.landType)
        : undefined;

    const builtUpArea = vm.project.addedBuiltUpArea
        ? lang.dict.format('squareMetersFormat', [vm.project.addedBuiltUpArea])
        : undefined;

    const projectType = vm.project.constructionType === E.ConstructionType.structureOnly
        ? lang.dict.get('constReqStructure')
        : lang.dict.get('constReqTurnKey');

    return (
        <SideModal onBlur={onClose} variant="project-details">
            <div className="side-modal__header">
                <Close onClick={onClose} />
                <p className="side-modal__header-title">
                    {lang.dict.get('projectDetails')}
                </p>
            </div>
            <div className="side-modal__content">
                <div className="box-info">
                    <div className="box-info__item">
                        <p className="box-info__item-title">{lang.dict.get('location')}</p>
                        <p>{lang.dict.format('locationFormat', [vm.project?.wilayat?.displayName, vm.project?.governorate?.displayName])}</p>
                    </div>
                    <div className="box-info__item">
                        <p className="box-info__item-title">{lang.dict.get('landType')}</p>
                        <p className="box-info__item-value">{landType}</p>
                    </div>
                    <div className="box-info__item">
                        <p className="box-info__item-title">{lang.dict.get('landArea')}</p>
                        <p className="box-info__item-value">{area}</p>
                    </div>
                    <div className="box-info__item">
                        <p className="box-info__item-title">{lang.dict.get('builtUpArea')}</p>
                        <p className="box-info__item-value">{builtUpArea}</p>
                    </div>
                    <div className="box-info__item">
                        <p className="box-info__item-title">{lang.dict.get('projectCreatorProjectType')}</p>
                        <p className="box-info__item-value">{projectType}</p>
                    </div>
                    <div className="box-info__item">
                        <p className="box-info__item-title">{lang.dict.get('projectId')}</p>
                        <p className="box-info__item-value">{vm.project.projectNumber}</p>
                    </div>
                </div>
                <div className="select-all">
                    <Button
                        color="white"
                        rightImg="download"
                        value={lang.dict.get('clientReviewsDownloadAll')}
                        onClick={downloadAll(vm.project.files)}
                    />
                </div>
                <Uploader
                    description={lang.dict.get('downloadDocuments')}
                    acceptExtensions={['application/pdf', 'image/*']}
                    fileList={vm.project.files}
                    isWithName={true}
                    isLocked={true}
                    onRemove={() => { /* */ }}
                    onUpload={() => { /* */ }}
                />
            </div>
        </SideModal>
    );
});
