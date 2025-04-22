import { observer } from "mobx-react";
import { E, lang } from "~/api";
import { Button, Icons, If, Input, SortedTable, Uploader } from "~/bits";
import { BuyProjectsVm } from "../../BuyProjects.vm";
import { SelectedChip } from "../SelectedChip/SelectedChip";

type Props = {
    parentVm: BuyProjectsVm;
};

export const ProjectImagesTags = observer(({ parentVm }: Props) => {



    const handleExteriorOnChange = (val: string) => {
        parentVm.exteriorTagName = val;
    }

    const handleExteriorArbicOnChange = (val: string) => {
        parentVm.exteriorTagNameArabic = val;
    }

    const handleInteriorOnChange = (val: string) => {
        parentVm.interiorTagName = val;
    }

    const handleInteriorArbicOnChange = (val: string) => {
        parentVm.interiorTagNameArabic = val;
    }

    const handleLayoutOnChange = (val: string) => {
        parentVm.layoutTagName = val;
    }

    const handleLayoutArabicOnChange = (val: string) => {
        parentVm.layoutTagNameArabic = val;
    }
    const handleExteriorAdd = () => {
        if (parentVm.exteriorTagName && parentVm.exteriorTagNameArabic)
            parentVm.setExteriorOnChange();
    }

    const handleInteriorAdd = () => {
        if (parentVm.interiorTagName && parentVm.interiorTagNameArabic)
            parentVm.setInteriorOnChange();
    }

    const handleLayoutAdd = () => {
        if (parentVm.layoutTagName && parentVm.layoutTagNameArabic)
            parentVm.setLayoutOnChange();
    }
    const handleFeatureNameChange = (value: string) => {

        parentVm.projectFeaturesName = value;
    };

    const handleFeatureNameArabicChange = (value: string) => {
        parentVm.projectFeaturesNameArabic = value;
    };
    const handleFeatureAdd = () => {
        if (parentVm.projectFeaturesName && parentVm.projectFeaturesNameArabic)
            parentVm.addProjectFeature();
    }
    const handleDelete = (type: string, value: string) => {
        switch (type) {
            case lang.dict.get("exterior"):
                parentVm.exteriorTagList = parentVm.exteriorTagList.filter(x => x !== value);
                break;
            case lang.dict.get("interior"):
                parentVm.interiorTagList = parentVm.interiorTagList.filter(x => x !== value);
                break;
            case lang.dict.get("layout"):
                parentVm.layoutTagList = parentVm.layoutTagList.filter(x => x !== value);
                break;
            case lang.dict.get("feature"):
                parentVm.projectFeaturesList = parentVm.projectFeaturesList.filter(x => x !== value);
                break;
            default:
                return null
        }

    }
    return (
        <>
            <div className="project-creator_cards_container__body_content">
                <div className="projectImages">
                    {/* Exterior */}
                    <div className="section">
                        <div className="form__section-field">
                            {lang.dict.get("exterior")}
                        </div>

                        <Uploader
                            description={lang.dict.get("uploaderPlaceHolder")}
                            fileList={parentVm.exteriorFiles}
                            onUpload={parentVm.uploadExteriorFile}
                            onRemove={parentVm.removingExteriorFile}
                            canDelete={true}
                            canDownloadAll={true}
                            isWithName={true}
                        />


                        <div className="form__section-field2">

                            <div className="form__section-field2_subfields">
                                <Input.Text
                                    name={lang.dict.get("exteriorName")}
                                    placeHolder={lang.dict.get("exteriorPlaceHolder")}
                                    value={parentVm.exteriorTagName}
                                    onChange={handleExteriorOnChange}
                                />
                            </div>
                            <div className="form__section-field2_subfields">
                                <Input.Text
                                    name={lang.dict.get("exteriorNameArabic")}
                                    placeHolder={lang.dict.get("exteriorPlaceHolder")}
                                    isArabic={true}
                                    value={parentVm.exteriorTagNameArabic}
                                    onChange={handleExteriorArbicOnChange}
                                />
                            </div>
                            <div className="form__section-field2_subfields_btn">
                                <Button
                                    color="white"
                                    leftImg="add"
                                    value={lang.dict.get("projectFeaturesAddbtn")}
                                    onClick={handleExteriorAdd}

                                />
                            </div>
                        </div>

                        <div className="form__section-chipflex">

                            {parentVm.exteriorTagList.map(x => (

                                <SelectedChip key={x}
                                    selectedChipVal={x}
                                    onDelete={() => { handleDelete(lang.dict.get("exterior"), x) }}
                                    parentVm={parentVm}
                                    chipType={E.BuyProjectChipType.single}
                                />

                            ))}
                        </div>
                    </div>


                    {/* Interior */}
                    <div className="section">
                        <div className="form__section-field">
                            {lang.dict.get("interior")}
                        </div>

                        <Uploader
                            description={lang.dict.get("uploaderPlaceHolder")}
                            fileList={parentVm.interiorFiles}
                            onUpload={parentVm.uploadInteriorFile}
                            onRemove={parentVm.removingInteriorFile}
                            canDelete={true}
                            canDownloadAll={true}
                            isWithName={true}
                        />

                        <div className="form__section-field2">

                            <div className="form__section-field2_subfields">
                                <Input.Text
                                    name={lang.dict.get("interiorName")}
                                    placeHolder={lang.dict.get("interiorPlaceHolder")}
                                    value={parentVm.interiorTagName}
                                    onChange={handleInteriorOnChange}
                                />
                            </div>
                            <div className="form__section-field2_subfields">
                                <Input.Text
                                    name={lang.dict.get("interiorNameArabic")}
                                    placeHolder={lang.dict.get("interiorPlaceHolder")}
                                    isArabic={true}
                                    value={parentVm.interiorTagNameArabic}
                                    onChange={handleInteriorArbicOnChange}
                                />
                            </div>
                            <div className="form__section-field2_subfields_btn">
                                <Button
                                    color="white"
                                    leftImg="add"
                                    value={lang.dict.get("projectFeaturesAddbtn")}
                                    onClick={handleInteriorAdd}

                                />
                            </div>
                        </div>

                        <div className="form__section-chipflex">

                            {parentVm.interiorTagList.map(x => (

                                <SelectedChip key={x}
                                    selectedChipVal={x}
                                    onDelete={() => { handleDelete(lang.dict.get("interior"), x) }}
                                    parentVm={parentVm}
                                    chipType={E.BuyProjectChipType.single}
                                />

                            ))}
                        </div>
                    </div>


                    {/* Layout */}
                    <div className="section">
                        <div className="form__section-field">
                            {lang.dict.get("layout")}
                        </div>

                        <Uploader
                            description={lang.dict.get("uploaderPlaceHolder")}
                            fileList={parentVm.layoutFiles}
                            onUpload={parentVm.uploadLayoutFile}
                            onRemove={parentVm.removingLayoutFile}
                            canDelete={true}
                            canDownloadAll={true}
                            isWithName={true}
                        />
                        <div className="form__section-field2">

                            <div className="form__section-field2_subfields">
                                <Input.Text
                                    name={lang.dict.get("layoutName")}
                                    placeHolder={lang.dict.get("layoutPlaceHolder")}
                                    value={parentVm.layoutTagName}
                                    onChange={handleLayoutOnChange}
                                />
                            </div>
                            <div className="form__section-field2_subfields">
                                <Input.Text
                                    name={lang.dict.get("layoutNameArabic")}
                                    placeHolder={lang.dict.get("layoutPlaceHolder")}
                                    isArabic={true}
                                    value={parentVm.layoutTagNameArabic}
                                    onChange={handleLayoutArabicOnChange}
                                />
                            </div>
                            <div className="form__section-field2_subfields_btn">
                                <Button
                                    color="white"
                                    leftImg="add"
                                    value={lang.dict.get("projectFeaturesAddbtn")}
                                    onClick={handleLayoutAdd}

                                />
                            </div>
                        </div>

                        <div className="form__section-chipflex">

                            {parentVm.layoutTagList.map(x => (

                                <SelectedChip key={x}
                                    selectedChipVal={x}
                                    onDelete={() => { handleDelete(lang.dict.get("layout"), x) }}
                                    parentVm={parentVm}
                                    chipType={E.BuyProjectChipType.single}
                                />

                            ))}
                        </div>
                    </div>

                    {/* Project Features */}
                    <div className="section">
                        <div className="form__section-field">
                            {lang.dict.get("featureTitle")}
                        </div>
                        <div className="form__section-content">
                            <p className="">{lang.dict.get("projectFeaturesContent")}</p>
                        </div>


                        <div className="form__section-field2">
                            <div className="form__section-field2_subfields">
                                <Input.Text
                                    name={lang.dict.get("nameFeature")}
                                    placeHolder={lang.dict.get("writeFeature")}
                                    value={parentVm.projectFeaturesName}
                                    onChange={handleFeatureNameChange}
                                />
                            </div>
                            <div className="form__section-field2_subfields">
                                <Input.Text
                                    name={lang.dict.get("nameFeatureArabic")}
                                    placeHolder={lang.dict.get("writeFeature")}
                                    value={parentVm.projectFeaturesNameArabic}
                                    onChange={handleFeatureNameArabicChange}
                                />
                            </div>
                            <div className="form__section-field2_subfields_btn">
                                <Button
                                    color="white"
                                    leftImg="add"
                                    value={lang.dict.get("projectFeaturesAddbtn")}
                                    onClick={handleFeatureAdd}

                                />
                            </div>
                        </div>

                        <div className="form__section-chipflex">

                            {parentVm.projectFeaturesList.map(x => (

                                <SelectedChip key={x}
                                    selectedChipVal={x}
                                    onDelete={() => { handleDelete(lang.dict.get("feature"), x) }}
                                    parentVm={parentVm}
                                    chipType={E.BuyProjectChipType.single}
                                />

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});