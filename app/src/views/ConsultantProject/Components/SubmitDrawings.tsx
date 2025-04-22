import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, If, Input, Uploader } from '~/bits';
import type { ConsultantProjectVm } from '../ConsultantProject.vm';

type Props = {
    vm: ConsultantProjectVm;
};

export const SubmitDrawings = observer(({ vm }: Props) => {
    const textAreaName = (
        <p className="form__textarea-name">
            {lang.dict.get('describeChanges')}
        </p>
    );

    return (
        <div className="consultant-project-box submit-drawings">
            <p className="submit-drawings__header">
                {lang.dict.get('uploadMunicipalityApprovedDrawings')}
            </p>
            <Uploader
                description={lang.dict.get('uploadDrawingsOrDragDrop')}
                fileList={vm.drawingsFiles}
                onUpload={vm.uploadDrawingFile}
                onRemove={vm.removeDrawingFile}
                canDelete={true}
                canDownloadAll={true}
                isWithName={true}
            />
            <p className="submit-drawings__title">
                {lang.dict.get('didClientMakeAnyChanges')}
            </p>
            <Input.Checkbox
                type="radio"
                text={{
                    first: lang.dict.get('switchYes'),
                    second: lang.dict.get('switchNo'),
                }}
                isChecked={vm.areAnyChanges}
                onChange={vm.toggleAreAnyChanges}
            />
            <If condition={() => vm.areAnyChanges}>
                <Input.Textarea
                    name={textAreaName}
                    placeHolder={lang.dict.get('fieldWriteComment')}
                    value={vm.changesDescription}
                    onChange={vm.setChangesDescription}
                />
            </If>
            <div className="submit-drawings__buttons">
                <Button
                    color="blue"
                    value={lang.dict.get('save')}
                    onClick={vm.saveDrawings}
                    isLoading={vm.isSaving}
                />
                <Button
                    color="green"
                    value={lang.dict.get('uploadDrawings')}
                    rightImg="next"
                    isDisabled={!vm.isPossibleToUpload}
                    onClick={vm.uploadDrawings}
                    isLoading={vm.isSaving}
                />
            </div>
        </div>
    );
});
