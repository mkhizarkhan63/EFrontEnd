import { observer } from "mobx-react";
import { Button, Icons, If, Input, Uploader } from "~/bits";
import { ProfileRegistrationVm } from "~/views/ProfileRegistration/ProfileRegistration.vm";
import { useEffect, useRef, type ReactElement } from "react";
import { E, lang, utils, type ErrorListHolder } from "~/api";

type Props = {
    ProfileVm: ProfileRegistrationVm
};

export const DesignService = observer((props: Props) => {


    const itemsToRender = props.ProfileVm.isRegisteredMunicipality
        ? props.ProfileVm.municipalityConsultantServices // Show all items if true
        : props.ProfileVm.municipalityConsultantServices.slice(0, 2); // Show only the first two if false

    const handleRegisteredMunicipalityOption = () => {
        props.ProfileVm?.setRegisteredMunicipalityChecked();
    }

    //Serivces Options
    const AdditionalServicesForDesign = observer(() => {
        return (<>
            <div className="flex">
                <Input.Checkbox isChecked={false} type="check" />
                <div className="icon"><Icons icon="interiorDesign" /> <span>{lang.dict.get("interiorDesign")}</span></div>
                <Input.Text placeHolder={lang.dict.get("omrM2")} />
            </div>
            <div className="flex">
                <Input.Checkbox isChecked={false} type="check" />
                <div className="icon"><Icons icon="landscapeDesign" /> <span>{lang.dict.get("landscapeDesign")}</span></div>
                <Input.Text placeHolder={lang.dict.get("omrM2")} />
            </div>
            <div className="flex">
                <Input.Checkbox isChecked={false} type="check" />
                <div className="icon"><Icons icon="quantitySurveying" /> <span>{lang.dict.get("quantitySurveying")}</span></div>
                <Input.Text placeHolder={lang.dict.get("omrM2")} />
            </div>
            <div className="flex">
                <Input.Checkbox isChecked={false} type="check" />
                <div className="icon"><Icons icon="authorityApprovals" /> <span>{lang.dict.get("authorityApprovals")}</span></div>
                <Input.Text placeHolder={lang.dict.get("omrM2")} />
            </div>
        </>)
    })

    return (
        <div className="company-forms company-design">
            <form className="form">
                <h2 className="form__header">{lang.dict.get("design")}</h2>
                <div className="form__body">
                    <p className="title">{lang.dict.get("registeredMunicipality")}</p>
                    <Input.Checkbox
                        type="radio"
                        text={{
                            first: lang.dict.get("switchYes"),
                            second: lang.dict.get("switchNo"),
                        }}
                        isChecked={props.ProfileVm?.isRegisteredMunicipality}
                        onChange={handleRegisteredMunicipalityOption}
                    />

                    <div className="municipality-container">
                        <div className="left-box">
                            {
                                itemsToRender?.map((item) => (
                                    <div
                                        key={item.type}
                                        onClick={() => { }}
                                        className="services-content"
                                    >
                                        <div className="services-content__flex">
                                            <div className="icon-image">
                                                <Icons icon={item.image} />
                                            </div>
                                            <div className="icon-text">
                                                {lang.dict.get(item.type)}
                                            </div>
                                        </div>

                                    </div>))
                            }

                        </div>
                        <div className="right-box">
                            <div className="content">
                                <h4 className="content__title">{lang.dict.get("projectArea500")}</h4>
                                <p className="content__text">{lang.dict.get("priceWillDisplayed")}</p>
                                <Input.Text placeHolder={lang.dict.get("fieldOmr")} />
                            </div>
                        </div>
                    </div>

                    <div className="additionalservices-container">
                        <div className="title"><span>{lang.dict.get("additionalServices")}</span> {lang.dict.get("fieldOptional")}</div>
                        <div className="content">
                            <AdditionalServicesForDesign />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
});