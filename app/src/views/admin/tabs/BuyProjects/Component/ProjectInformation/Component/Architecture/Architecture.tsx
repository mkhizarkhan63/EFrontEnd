import { observer } from "mobx-react";
import { lang } from "~/api";
import { Input } from "~/bits";
import { BuyProjectsVm } from "../../../../BuyProjects.vm";

type Props = {
    parentVm: BuyProjectsVm;
};

export const Architecture = observer(({ parentVm }: Props) => {



    return (

        <div className="buyproject_architect">
            <div className="buyproject_architect_flex">
                <div className="buyproject_architect_flex_normal">
                    <p>{lang.dict.get("projectInfoLandSizeLabel")}</p>
                    <div className="buyproject_architect_flex_sub">
                        <div className="minifields">
                            <Input.Text
                                placeHolder={lang.dict.get("projectInfoLSWidthPh")}
                            />
                            <span className="icon">m</span>

                        </div>
                        <div className="spacer"></div>
                        <div className="minifields">
                            <Input.Text
                                placeHolder={lang.dict.get("projectInfoLSHeightPh")}

                            />
                            <span className="icon">m</span>

                        </div>
                    </div>


                </div>
                <div className="buyproject_architect_flex_normal">
                    <p>{lang.dict.get("projectInfoESDTLabel")}</p>
                    <div className="normalfield monthfield">
                        <Input.Text
                            placeHolder={lang.dict.get("projectInfoESDTPh")}

                        />
                        <span className="icon">Months</span>
                    </div>
                </div>
            </div>
            <div className="buyproject_architect_flex">
                <div className="buyproject_architect_flex_normal">
                    <div className="normalfield">
                        <Input.Text
                            placeHolder={lang.dict.get("projectInfoRetailValuePlaceholder")}
                            name={lang.dict.get("projectInfoRetailValueLabel")}
                        />
                        <span className="icon">OMR</span>
                    </div>
                </div>
                <div className="buyproject_architect_flex_normal">
                    <p></p>
                    <div className="normalfield">
                        <Input.Text
                            placeHolder={lang.dict.get("projectInfoBookingFeesPh")}
                            name={lang.dict.get("projectInfoBookingFeesLabel")}
                        />
                        <span className="icon">OMR</span>
                    </div>
                </div>
            </div>
        </div>


    );



})