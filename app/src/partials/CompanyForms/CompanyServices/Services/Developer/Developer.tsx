import { observer } from "mobx-react";
import { Button, Icons, If, Input, Uploader } from "~/bits";
import { ProfileRegistrationVm } from "~/views/ProfileRegistration/ProfileRegistration.vm";
import { useEffect, useRef, type ReactElement } from "react";
import { E, lang, utils, type ErrorListHolder } from "~/api";

type Props = {
    ProfileVm: ProfileRegistrationVm
};

export const DeveloperService = observer((props: Props) => {



    const RealStateDevelopersForDeveloper = observer(({ ProfileVm }: Props) => {
        return (<>

            {ProfileVm?.realStateDeveloperServices.map((service) => (
                <label key={service.type} className="service-item">
                    <input
                        type="checkbox"
                        checked={service.isSelected}
                        onChange={() => { ProfileVm.toggleRealStateDeveloperServices(service.type) }}
                    />
                    <span className="service-label">{lang.dict.get(service.type)}</span>
                </label>
            ))}

        </>)
    });


    return (
        <div className="company-forms company-developer">
            <form className="form">
                <h2 className="form__header">{lang.dict.get("developer")}</h2>
                <div className="form__body">
                    <div className="real-estate-services">
                        <p className="title">{lang.dict.get("realEstateDeveloper")}</p>
                        <div className="services-grid">
                            <RealStateDevelopersForDeveloper ProfileVm={props.ProfileVm} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
});