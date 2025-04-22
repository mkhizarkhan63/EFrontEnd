
import { observer } from "mobx-react";
import { hook } from "~/utils";
import { E, lang } from '~/api';
import { Button, Icons, If, Input, MenuButton, SortedTable } from '~/bits';
import { CompanyManagementVm } from "../CompanyManagement.vm";
import { Page } from '~/partials';
import { TextEditor } from "~/bits/Input";

type props = {
    companyVm: CompanyManagementVm
}

export const CreateBadge = observer(() => {
    const vm = hook.useVm(() => new CompanyManagementVm());
    // Define the toolbar options
    const handleInputFieldOnChange = (value: string) => {
        vm.inputField = value;
    };

    const handleInputArabicFieldOnChange = (value: string) => {
        vm.inputFieldArabic = value;
    };

    const handleDocumentSubmissionOnChange = (value: string) => {
        vm.documentInformation = value;
    }

    const handleDocumentSubmissionArabicOnChange = (value: string) => {
        vm.documentInformationArabic = value;
    }

    const handleInputFieldAddOnClick = () => {
        if (vm.inputField && vm.inputFieldArabic) {

            vm.addInputFieldTags();
            vm.inputField = "";
            vm.inputFieldArabic = "";
        }
    }

    const handleDocumentSubmissionFieldAddOnClick = () => {
        if (vm.documentInformation && vm.documentInformationArabic) {

            vm.addDocumentSubmissionFieldTags();
            vm.documentInformation = "";
            vm.documentInformationArabic = "";
        }
    }
    const InputFieldTagList = observer(({ companyVm }: props) => {
        const list = companyVm.inputFieldTagList.map(x => (
            <>
                <div className="tag-box">
                    <div className="tag-box-flex">
                        {x}
                        <span onClick={() => { companyVm.deleteInputFieldTags(x) }}>
                            <Icons icon='close' />
                        </span>
                    </div>
                </div>
            </>

        ))
        return <>{list}</>
    });

    const DocumentSubmissionTagList = observer(({ companyVm }: props) => {
        const list = companyVm.documentSubmissionFieldTagList.map(x => (
            <>
                <div className="tag-box">
                    <div className="tag-box-flex">
                        {x}
                        <span onClick={() => { companyVm.deleteDocumentSubmissionFieldTags(x) }}>
                            <Icons icon='close' />
                        </span>
                    </div>

                </div>
            </>
        ))
        return <>{list}</>
    });

    return (

        <Page>
            <div
                className="create-badge"
            >
                <div className="create-badge__topheader">
                    <div className="create-badge__topheader-icon" onClick={vm.goBack} >
                        <Icons icon='return' />
                    </div>
                    <div className="create-badge__topheader-title">
                        <h2>
                            {lang.dict.get('createNewBadge')}
                        </h2>
                    </div>

                </div>
                <div className="create-badge__body">
                    <div className="content">
                        <div className="group-fields">
                            <div className="group-fields-input">
                                <Input.Text
                                    name={lang.dict.get("title")}
                                    placeHolder={lang.dict.get("write")}
                                    shouldCursorMove={true}
                                />
                            </div>
                            <div className="group-fields-input">
                                <Input.Select
                                    name={lang.dict.get('type')}
                                    placeHolder={lang.dict.get("select")}
                                    values={[]}

                                />
                            </div>
                            <div className="group-fields-input">
                                <Input.Select
                                    name={lang.dict.get('service')}
                                    placeHolder={lang.dict.get("select")}
                                    values={[]}

                                />
                            </div>
                        </div>
                        <div className="content-sub-header">
                            {lang.dict.get("requirementDescription")}
                        </div>
                        <div className="content__gridContainer">
                            <div className="row">
                                <p>{lang.dict.get('companySize')} </p>
                                <p>{lang.dict.get('description')}</p>
                                <p>{lang.dict.get('priceOMR')}</p>
                            </div>
                        </div>
                        <div className="content__gridContainer">
                            <div className="row">
                                <div className="title">{lang.dict.get("micro")}</div>
                                <div className="description">

                                    <TextEditor placeHolder={lang.dict.get("inputPlaceholderWrite")} />
                                </div>
                                <div className="price">
                                    <Input.Text
                                        placeHolder={lang.dict.get('priceOMR')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="content__gridContainer">
                            <div className="row">
                                <div className="title">{lang.dict.get("small")}</div>
                                <div className="description">

                                    <TextEditor placeHolder={lang.dict.get("inputPlaceholderWrite")} />

                                </div>
                                <div className="price">
                                    <Input.Text
                                        placeHolder={lang.dict.get('priceOMR')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="content__gridContainer">
                            <div className="row">
                                <div className="title">{lang.dict.get("medium")}</div>
                                <div className="description">

                                    <TextEditor placeHolder={lang.dict.get("inputPlaceholderWrite")} />

                                </div>
                                <div className="price">
                                    <Input.Text
                                        placeHolder={lang.dict.get('priceOMR')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="content__gridContainer">
                            <div className="row">
                                <div className="title">{lang.dict.get("large")}</div>
                                <div className="description">

                                    <TextEditor placeHolder={lang.dict.get("inputPlaceholderWrite")} />
                                </div>
                                <div className="price">
                                    <Input.Text
                                        placeHolder={lang.dict.get('priceOMR')}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="submissionform">
                            <div className="submissionform-sub-header">
                                {lang.dict.get("createSubmissionForm")}
                            </div>
                            <div className="submissionform-body">
                                <div className="flex">
                                    <div className="box">
                                        <Input.Text
                                            name={lang.dict.get("addInputField")}
                                            placeHolder={lang.dict.get("addNameHere")}
                                            onChange={handleInputFieldOnChange}
                                            value={vm.inputField}
                                        />
                                    </div>
                                    <div className="box">
                                        <Input.Text
                                            name={lang.dict.get("addInputFieldArabic")}
                                            placeHolder={lang.dict.get("addNameHere")}
                                            isArabic={true}
                                            onChange={handleInputArabicFieldOnChange}
                                            value={vm.inputFieldArabic}
                                        />
                                    </div>
                                    <div className="box-btn">
                                        <Button
                                            color="white"
                                            centerImg="add"
                                            isCircle={true}
                                            onClick={handleInputFieldAddOnClick}
                                        />
                                    </div>


                                </div>
                                <div className="flex">
                                    <div className="box">
                                        <Input.Text
                                            name={lang.dict.get("addDocumentSubmission")}
                                            placeHolder={lang.dict.get("addDocumentNameHere")}
                                            onChange={handleDocumentSubmissionOnChange}
                                            value={vm.documentInformation}
                                        />
                                    </div>
                                    <div className="box">
                                        <Input.Text
                                            name={lang.dict.get("addDocumentSubmissionArabic")}
                                            placeHolder={lang.dict.get("addDocumentNameHere")}
                                            isArabic={true}
                                            onChange={handleDocumentSubmissionArabicOnChange}
                                            value={vm.documentInformationArabic}
                                        />
                                    </div>
                                    <div className="box-btn">
                                        <Button
                                            color="white"
                                            centerImg="add"
                                            isCircle={true}
                                            onClick={handleDocumentSubmissionFieldAddOnClick}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="tags-list">
                                <div className="flex">
                                    <InputFieldTagList companyVm={vm} />
                                </div>
                                <div className="flex">
                                    <DocumentSubmissionTagList companyVm={vm} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create-badge__footer">
                    <Button
                        color="blue"
                        rightImg="next"
                        value={lang.dict.get('createBadge')}
                    />
                </div>
            </div>
        </Page>
    )


});