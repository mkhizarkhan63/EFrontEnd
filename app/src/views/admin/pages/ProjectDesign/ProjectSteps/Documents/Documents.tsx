import { observer } from 'mobx-react';
import { lang } from '~/api';
import { ReviewFileList, If, Button } from '~/bits';
import { Checkbox } from '~/bits/Input';
import type { Project } from '~/models';
import { hook } from '~/utils';
import { DesignFileType, DocumentsVm } from './Documents.vm';

type Props = {
    project: Project;
};

export const Documents = observer(({ project }: Props) => {
    const vm = hook.useVm(() => new DocumentsVm(project), [project.id.asStr()]);

    return (
        <div className="project-docs-container">
            <div className="project-docs">
                <p className="project-docs__title">
                    {lang.dict.get('designDocuments')}&nbsp;
                    <span className="project-docs__title-num">({vm.krookieFilesLength})</span>
                </p>
                <div className="project-docs__select-all">
                    <Checkbox
                        isChecked={vm.isSelectedDesign}
                        type="check"
                        onChange={vm.toggleSelectDesign(DesignFileType.krookie)}
                        name="Select all"
                    />
                    <div className="project-docs__select-all-btn">
                        <Button
                            color="white"
                            rightImg="download"
                            onClick={() => vm.downloadFiles(DesignFileType.krookie)}
                        />
                    </div>
                </div>
                <ReviewFileList krookies={vm.krookieFiles} />
            </div>
            <If condition={() => Boolean(vm.drawingFilesLength)}>
                <div className="project-docs">
                    <p className="project-docs__title">
                        {lang.dict.get('municipalityApproved')}&nbsp;
                        <span className="project-docs__title-num">({vm.drawingFilesLength})</span>
                    </p>
                    <div className="project-docs__select-all">
                        <Checkbox
                            isChecked={vm.isSelectedDrawings}
                            type="check"
                            onChange={vm.toggleSelectDesign(DesignFileType.drawing)}
                            name="Select all"
                        />
                        <div className="project-docs__select-all-btn">
                            <Button
                                color="white"
                                rightImg="download"
                                onClick={() => vm.downloadFiles(DesignFileType.drawing)}
                            />
                        </div>
                    </div>
                    <ReviewFileList krookies={vm.drawingFiles} />
                </div>
            </If>
        </div>
    );
});
