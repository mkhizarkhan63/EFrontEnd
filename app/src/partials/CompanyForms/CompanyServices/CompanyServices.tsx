import { observer } from "mobx-react";
import { type ReactElement } from "react";
import { E, lang, utils, type ErrorListHolder } from "~/api";
import { Button, Icons, If, Input, Uploader } from "~/bits";
import { Contractor, type CompanyType } from "~/models";
import { ConsultantServices } from "./ConsultantServices";
import { ContractorServices } from "./ContractorServices";
import { ProfileRegistrationVm } from "~/views/ProfileRegistration/ProfileRegistration.vm";
import { ConstructionService } from "./Services/Construction/Construction";
import { SupervisionService } from "./Services/Supervision/Supervision";
import { DeveloperService } from "./Services/Developer/Developer";
import { DesignService } from "./Services/Design/Design";

type Props = {
    company: CompanyType;
    buttons: ReactElement;
    errorListHolder: ErrorListHolder;
    submitAction?: () => void;
    ProfileVm?: ProfileRegistrationVm
};

type ServiceBasedFormProps = {
    ProfileVm?: ProfileRegistrationVm;
    company?: CompanyType;
};

export const CompanyServices = observer((props: Props) => {


    const handleOwnOtherCompanyOption = () => {

        props.ProfileVm?.setOwnOtherCompanyChecked();

    }

    const AddOtherCompany = observer(() => {
        return (<div className="company-options">
            <div className="company-options-body">
                <div className="checkbox-flex">
                    <div className="checkbox-flex-field">
                        <Input.Checkbox
                            type="check"
                            name={lang.dict.get("joineryWorks")}
                            isChecked={false}
                        />
                    </div>
                    <div className="checkbox-flex-field">
                        <Input.Checkbox
                            type="check"
                            name={lang.dict.get("aluminiumWorks")}
                            isChecked={false}
                        />
                    </div>
                </div>

                <div className="checkbox-flex">
                    <div className="checkbox-flex-field">
                        <Input.Checkbox
                            type="check"
                            name={lang.dict.get("upvcWorks")}
                            isChecked={false}
                        />
                    </div>
                    <div className="checkbox-flex-field">
                        <Input.Checkbox
                            type="check"
                            name={lang.dict.get("soilTestingLab")}
                            isChecked={false}
                        />
                    </div>
                </div>
                <div className="checkbox-flex">
                    <div className="checkbox-flex-field">
                        <Input.Checkbox
                            type="check"
                            name={lang.dict.get("gypsumWorks")}
                            isChecked={false}
                        />
                    </div>
                    <div className="checkbox-flex-field">
                        <Input.Checkbox
                            type="check"
                            name={lang.dict.get("supplyOfPorceline")}
                            isChecked={false}
                        />
                    </div>
                </div>
            </div>

            <div className="other-specialized-box">
                <div className="other-specialized-box__header">
                    <p className="title"> Other Specialized works</p>
                    <Button isCircle={true} color="white" centerImg="add" onClick={() => { }} />
                </div>
                <div className="other-specialized-box__body">
                    <div className="input-field">
                        <Input.Text
                            name={lang.dict.get("englishTitle")}
                            placeHolder={lang.dict.get("inputWriteHere")}
                        />
                    </div>
                    <div className="input-field">
                        <Input.Text
                            name={lang.dict.get("arabicTitle")}
                            placeHolder={lang.dict.get("inputWriteHere")}
                            isArabic={true}
                        />
                    </div>
                    <div className="input-field">
                        <Button
                            color="white"
                            centerImg="close"
                            onClick={() => { }}
                            isCircle={true}
                        />
                    </div>
                </div>
            </div>
        </div>);

    })


    const ServiceBasedForm = observer(({ ProfileVm, company }: ServiceBasedFormProps) => {
        const selectedServices = ProfileVm?.selectedServices;
        if (ProfileVm) {
            const services = selectedServices?.map(x => {

                switch (x) {
                    case E.MembershipServiceType.supervision:
                        return (
                            <SupervisionService ProfileVm={ProfileVm} />
                        );
                    case E.MembershipServiceType.construction:
                        return (
                            <ConstructionService ProfileVm={ProfileVm} />
                        );
                    case E.MembershipServiceType.design:
                        return (
                            <DesignService ProfileVm={ProfileVm} />
                        );
                    case E.MembershipServiceType.developer:
                        return (
                            <DeveloperService ProfileVm={ProfileVm} />
                        );
                    default:
                        return null;
                }

            });
            return <div>{services}</div>;
        }
        return <></>

    });

    return (
        <>
            <div className="company-forms company-services">
                <form className="form">
                    <h2 className="form__header">{lang.dict.get("services")}
                    </h2>
                    <div className="form__body">
                        <div className="previous-work-box">
                            <p className="title">{lang.dict.get("previouslyWorkProjects")}</p>
                            <div className="checkbox-flex">
                                <div className="checkbox-flex-field">
                                    <Input.Checkbox
                                        type="check"
                                        name={lang.dict.get("residentialBuildings")}
                                        isChecked={false}
                                    />
                                </div>
                                <div className="checkbox-flex-field">
                                    <Input.Checkbox
                                        type="check"
                                        name={lang.dict.get("interiorFitOut")}
                                        isChecked={false}
                                    />
                                </div>
                            </div>
                            <div className="checkbox-flex">
                                <div className="checkbox-flex-field">
                                    <Input.Checkbox
                                        type="check"
                                        name={lang.dict.get("precastStructure")}
                                        isChecked={false}
                                    />
                                </div>
                                <div className="checkbox-flex-field">
                                    <Input.Checkbox
                                        type="check"
                                        name={lang.dict.get("multiStoreyBuildings")}
                                        isChecked={false}
                                    />
                                </div>
                            </div>
                            <div className="checkbox-flex">
                                <div className="checkbox-flex-field">
                                    <Input.Checkbox
                                        type="check"
                                        name={lang.dict.get("professionalLangscaping")}
                                        isChecked={false}
                                    />
                                </div>
                                <div className="checkbox-flex-field">
                                    <Input.Checkbox
                                        type="check"
                                        name={lang.dict.get("printing3d")}
                                        isChecked={false}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="ownother-companies-box">
                            <p className="title">{lang.dict.get("ownOtherCompanies")}</p>
                            <div className="options">
                                <Input.Checkbox
                                    type="radio"
                                    text={{
                                        first: lang.dict.get("switchYes"),
                                        second: lang.dict.get("switchNo"),
                                    }}
                                    isChecked={props.ProfileVm?.isOwnOtherCompany}
                                    onChange={handleOwnOtherCompanyOption}

                                />
                            </div>
                            {props?.ProfileVm?.isOwnOtherCompany ? <AddOtherCompany /> : null}

                        </div>
                    </div>

                </form>
            </div>
            {props.ProfileVm && <ServiceBasedForm ProfileVm={props.ProfileVm} company={props.company} />}
            <div className="services">
                <Button color="blue" rightImg="next" value={lang.dict.get('goNext')} onClick={props.ProfileVm?.goNextStep} />
            </div>
        </>
    )
});


// (Contractor.is(props.company)
//     ? (
//         <ContractorServices
//             {...props}
//             contractor={props.company}
//         />
//     )
//     : (
//         <ConsultantServices
//             {...props}
//             consultant={props.company}
//         />
//     )