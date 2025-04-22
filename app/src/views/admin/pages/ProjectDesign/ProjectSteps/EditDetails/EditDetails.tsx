import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, ErrorList, If, Input, SortedTable } from '~/bits';
import type { StageUnit } from '~/models';
import { hook } from '~/utils';
import type { ProjectDesignVm } from '../../ProjectDesign.vm';
import { EditDetailsVm } from './EditDetails.vm';

type Props = {
    projectVm: ProjectDesignVm;
};

const getColumns = () => SortedTable.createColumns<StageUnit>(() => [
    {
        keyName: 'sequence',
        displayName: lang.dict.get('sequence'),
        size: .45,
        render: (item, index) => <div className="sequence">{index + 1}</div>,
    },
    {
        keyName: 'name',
        displayName: lang.dict.get('name'),
        size: 5,
        render: item => <div className="name">{item.stageName}</div>,
    },
    {
        keyName: 'suggested',
        displayName: lang.dict.get('suggested'),
        align: 'right',
        render: item => <div className="suggested">{item.suggestedPercentage.value}</div>,
    },
    {
        keyName: 'suggestedTime',
        displayName: lang.dict.get('suggestedTime'),
        align: 'right',
        render: item => <div className="suggested">{item.suggestedTime.value}</div>,
    },
    {
        keyName: 'noOfItems',
        displayName: lang.dict.get('noOfItems'),
        size: .7,
        align: 'right',
        render: item => <div className="items">{item.sowItems.length}</div>,
    },
]);

export const EditDetails = observer(({ projectVm }: Props) => {
    const vm = hook.useVm(() => new EditDetailsVm(projectVm), [projectVm]);
    const projectAdmin = projectVm.project.forAdmin;

    return (
        <div className="project-detail-container" data-is-edit={projectAdmin.project.isEditableDesign}>
            <div className="project-detail">
                <div className="project-detail__top">
                    <div className="project-detail__header">
                        <p className="project-detail__title">
                            {lang.dict.get('projectDetail')}
                        </p>
                        <If condition={() => projectAdmin.project.isEditableDesign}>
                            <div className="project-detail__header-right">
                                <Button
                                    color="blue"
                                    value={lang.dict.get('reject')}
                                    rightImg="next"
                                    onClick={vm.reject}
                                />
                                <Button
                                    color="green"
                                    value={lang.dict.get('approveDesign')}
                                    rightImg="next"
                                    onClick={vm.save}
                                />
                            </div>
                        </If>
                    </div>
                    <div className="project-detail__row">
                        <div className="project-detail__project">
                            <p className="project-detail__subtitle">{lang.dict.get('projectChoice')}</p>
                            <p className="project-detail__choice">{projectAdmin.design?.title}</p>
                            <Button
                                color="transparent"
                                value={lang.dict.get('viewProject')}
                                onClick={vm.goToDesign}
                            />
                        </div>
                        <div className="project-detail__person-container">
                            <div className="project-detail__person project-detail__person--consultant">
                                <p className="project-detail__subtitle">{lang.dict.get('consultantDetails')}</p>
                                <div className="project-detail__person-col">
                                    <img
                                        className="project-detail__person-img"
                                        src={projectVm.project.designConsultant?.avatar?.url}
                                        alt="Avatar"
                                    />
                                    <div className="project-detail__person-desc">
                                        <p className="project-detail__person-name">
                                            {projectVm.project.designConsultant?.name}
                                        </p>
                                        <a
                                            href={`tel:${projectVm.project.designConsultant?.phone}`}
                                            className="project-detail__person-mobile"
                                        >
                                            {projectVm.project.designConsultant?.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="project-detail__person project-detail__person--architect">
                                <p className="project-detail__subtitle">{lang.dict.get('architectDetail')}</p>
                                <div className="project-detail__person-col">
                                    <img
                                        className="project-detail__person-img"
                                        src={projectAdmin.design?.architect?.avatar?.url}
                                        alt="Avatar"
                                    />
                                    <div className="project-detail__person-desc">
                                        <p className="project-detail__person-name">
                                            {projectAdmin.design?.architect?.name}
                                        </p>
                                        <a
                                            href={`tel:${projectAdmin.design?.architect?.phone}`}
                                            className="project-detail__person-mobile"
                                        >
                                            {projectAdmin.design?.architect?.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <If condition={() => projectAdmin.project.isEditableDesign}>
                            <Input.Textarea
                                name={lang.dict.get('projectCreatorAdditionalCommentOptional')}
                                value={vm.commentsAdditional}
                                onChange={vm.setComment}
                                placeHolder={lang.dict.get('fieldWriteDescription')}
                                isReadOnly={!projectAdmin.project.isEditable}
                            />
                        </If>
                    </div>
                </div>
                <div className="land-details">
                    <p className="land-details__title">
                        {lang.dict.get('landDetails')}
                    </p>
                    <div className="land-details__info">
                        <span className="land-details__info-value">
                            {projectAdmin.project.governorate?.displayName}
                        </span>
                        <p className="land-details__info-label">
                            {lang.dict.get('projectCreatorGovernorate')}
                        </p>
                    </div>
                    <div className="land-details__info">
                        <span className="land-details__info-value">
                            {projectAdmin.project.wilayat?.displayName}
                        </span>
                        <p className="land-details__info-label">
                            {lang.dict.get('projectCreatorWilayat')}
                        </p>
                    </div>
                    <div className="land-details__info">
                        <span className="land-details__info-value">
                            {projectAdmin.project.landType}
                        </span>
                        <p className="land-details__info-label">
                            {lang.dict.get('projectUse')}
                        </p>
                    </div>
                    <div className="land-details__info">
                        <span className="land-details__info-value">
                            {projectAdmin.project.landArea}
                        </span>
                        <p className="land-details__info-label">
                            {lang.dict.get('plotArea')}
                        </p>
                    </div>
                    <div className="land-details__info">
                        <p className="land-details__info-file">
                            <span className="land-details__info-file-name">
                                {projectAdmin.project.krookieFiles[0]?.name}
                            </span>
                            <img
                                className="land-details__info-file-img"
                                src="/assets/graphics/download.svg"
                                alt="download-icon"
                                onClick={e => projectAdmin.project.downloadKrookieFiles(e)}
                            />
                        </p>
                        <p className="land-details__info-label">
                            {lang.dict.get('krookieFiles')}
                        </p>
                    </div>
                </div>
            </div>
            <div className="project-sow">
                <div className="form__title form__title-with-addition">
                    <div>
                        <p className="project-detail__title">
                            {lang.dict.get('sow')}
                        </p>
                        <p className="project-sow__name">
                            {projectAdmin.sowName}
                        </p>
                        <p className="project-sow__label">
                            {lang.dict.enum('constructionType', E.ConstructionType.turnKey)}
                        </p>
                    </div>
                </div>
                <SortedTable
                    data={projectAdmin.project.stageDesign}
                    keyValue="id"
                    columns={getColumns()}
                />
            </div>
            <ErrorList errors={vm.errorListHolder} />
        </div>
    );
});
