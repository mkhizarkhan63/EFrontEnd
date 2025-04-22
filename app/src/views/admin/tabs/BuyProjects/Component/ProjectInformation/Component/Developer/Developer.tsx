import { observer } from "mobx-react";
import { E, lang } from "~/api";
import { Input } from "~/bits";
import { BuyProjectsVm } from "../../../../BuyProjects.vm";

type Props = {
    parentVm: BuyProjectsVm;
};

export const Developer = observer(({ parentVm }: Props) => {



    return (

        <div className="buyproject_developer">
            <div className="buyproject_developer_flex">

                <div className="inputText">
                    <div className="inputText__field">
                        <Input.Select
                            name={lang.dict.get("governate")}
                            values={[
                                { value: "option1", name: "Option 1" },
                                { value: "option2", name: "Option 2" },
                                { value: "option3", name: "Option 3" },
                            ]}

                        />
                    </div>

                </div>

                <div className="inputText">
                    <div className="inputText__field">
                        <Input.Select
                            name={lang.dict.get("wilayat")}
                            values={[
                                { value: "option1", name: "Option 1" },
                                { value: "option2", name: "Option 2" },
                                { value: "option3", name: "Option 3" },
                            ]}

                        />
                    </div>

                </div>


            </div>

            <div className="buyproject_developer_flex">

                <div className="inputText">
                    <div className="inputText__field">
                        <Input.Text
                            name={lang.dict.get("projectInfoNeighbourhoodName")}
                            placeHolder={lang.dict.get("inputPlaceholderWrite")}
                        />
                    </div>

                </div>

                <div className="inputText">
                    <div className="inputText__field">
                        <Input.Text
                            name={lang.dict.get("projectInfoNeighbourhoodNameArabic")}
                            placeHolder={lang.dict.get("inputPlaceholderWrite")}
                        />
                    </div>

                </div>


            </div>

            <div className="buyproject_developer_flex">

                <div className="inputText">
                    <div className="inputText__field">
                        <Input.Text
                            name={lang.dict.get("projectInfoLandAreaLabel")}
                            placeHolder={lang.dict.get("projectInfoLandAreaPh")}
                        />
                    </div>

                </div>

                <div className="inputText">
                    <p>{lang.dict.get("projectInfoDeliveryDate")}</p>
                    <div className="inputDate__field_flex">

                        <div className="inputDate__field_flex__dd">
                            <div className="inputText__field">
                                <Input.Select
                                    values={[]}
                                    placeHolder={lang.dict.get("projectInfoDeliveryDateMonth")}
                                />

                            </div>
                        </div>
                        <div className="spacer"></div>
                        <div className="inputDate__field_flex__dd">
                            <div className="inputText__field">
                                <Input.Select
                                    values={[]}
                                    placeHolder={lang.dict.get("projectInfoDeliveryDateYear")}
                                />
                            </div>
                        </div>
                    </div>


                </div>


            </div>


            <div className="buyproject_developer_flex">

                <div className="inputText">
                    <div className="inputText__field">
                        <Input.Text
                            name={lang.dict.get("projectInfoRetailValueLabel")}
                            placeHolder={lang.dict.get("projectInfoRetailValuePlaceholder")}

                        />
                    </div>

                </div>

                <div className="inputText">
                    <div className="inputText__field">
                        <Input.Text
                            name={lang.dict.get("projectInfoBookingFeesLabel")}
                            placeHolder={lang.dict.get("projectInfoBookingFeesPh")}
                        />
                    </div>
                </div>


            </div>

            <div className="buyproject_developer_flex">

                <div className="inputText">
                    <div className="inputText__field">
                        <Input.Text
                            name={lang.dict.get("projectInfoSubsidizedValueofProject")}
                            placeHolder={lang.dict.get("projectInfoSubsidizedValueofProjectPlaceholder")}

                        />
                    </div>

                </div>

                <div className="inputText">
                    <div className="inputText__field">
                        <Input.Text
                            name={lang.dict.get("projectInfoSubsidizedBookingFees")}
                            placeHolder={lang.dict.get("projectInfoSubsidizedBookingFeesPlaceholder")}
                        />
                    </div>
                </div>


            </div>
        </div>

    );



})