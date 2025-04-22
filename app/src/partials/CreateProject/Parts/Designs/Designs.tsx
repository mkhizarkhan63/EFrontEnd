import { observer } from 'mobx-react';
import { lang, utils } from '~/api';
import { Input, Uploader } from '~/bits';
import { stores } from '~/stores';

export const Designs = observer(() => {
    const { draft } = stores.projects;

    return (
        <>
            <div className="form__section-col">
                <div className="form__section-subheader">
                    {lang.dict.get('projectCreatorDrawingsQuestion')}
                </div>
                <Input.Checkbox
                    type="radio"
                    text={{
                        first: lang.dict.get('switchYes'),
                        second: lang.dict.get('switchNo'),
                    }}
                    isChecked={draft.buildingAllAreaInTheDrawings}
                    onChange={draft.setBuildingAllFloors}
                />
                <div className="form__row form__row--subsection">
                    <Input.Text
                        name={lang.dict.get('projectCreatorBuildUpArea')}
                        value={utils.toInputNumber(draft.addedBuiltUpArea)}
                        onChange={draft.setBuiltUpArea}
                        placeHolder={lang.dict.get('inputPlaceholderNumber')}
                    />
                </div>
            </div>
            <div className="form__section-col uploader-col">
                <div className="form__section-subheader">
                    {lang.dict.get('uploadMunicipalityApprovedDrawings')}
                </div>
                <Uploader
                    description={lang.dict.get('projectCreatorDrawingsUpload')}
                    fileList={draft.drawingsFiles}
                    onUpload={draft.uploadDrawingFile}
                    onRemove={draft.removeDrawingFile}
                    canDelete={true}
                    canDownloadAll={true}
                    isWithName={true}
                />
                <p className="form__section-info">
                    {lang.dict.get('drawingsWarning')}
                </p>
            </div>
        </>
    );
});
