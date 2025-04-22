import { observer } from "mobx-react";
import { Button, Icons, If, Input, Uploader } from "~/bits";
import { ProfileRegistrationVm } from "~/views/ProfileRegistration/ProfileRegistration.vm";
import { useEffect, useRef, type ReactElement } from "react";
import { E, lang, utils, type ErrorListHolder } from "~/api";

type Props = {
    ProfileVm: ProfileRegistrationVm
};

export const SupervisionService = observer((props: Props) => {


    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Close modal when clicked outside the modal
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                if (props.ProfileVm?.isGovernateModal)
                    handleAddSupervisionGovernate(); // Close modal

            }
        };

        // Add the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleAddSupervisionGovernate = () => {
        props.ProfileVm?.governateCloseModal(); // Open modal
    };


    return (
        <div className="company-forms company-supervision">
            <form className="form">
                <h2 className="form__header">{lang.dict.get("supervision")}</h2>
                <div className="form__body">
                    <div className="price-supervision-services">
                        <h3 className="section-title">{lang.dict.get("addPricesSupervisionService")}</h3>
                        <p className="section-content">
                            {lang.dict.get("pricesSupervisionServiceContent")}
                        </p>
                    </div>
                    <div className="governate">
                        <div className="section-title">
                            <h3 className="title">{lang.dict.get("addGovernate")}</h3>
                            <Button color="white" centerImg="add" isCircle={true} onClick={handleAddSupervisionGovernate} />
                            <div className="modal" ref={modalRef}>
                                <If condition={props.ProfileVm.isGovernateModal ? true : false}>
                                    <div className="modal-box">
                                        <Input.Select values={[]} placeHolder={lang.dict.get('selectGovernate')} />
                                        <Button color="blue" leftImg="tick" value={lang.dict.get('add')} />
                                    </div>
                                </If>
                            </div>

                        </div>
                        <div className="section-content">
                            <p className="content">{lang.dict.get("selectWillayaContent")}</p>
                            <div className="willaya-section">
                                <div className="card">
                                    <h3 className="card__title">Muscat</h3>
                                    <div className="card__grid-header-container">
                                        <div className="grid-item">{lang.dict.get('wilayat')} <span className="light">{lang.dict.get('addAtLeastOnePrice')}</span></div>
                                        <div className="grid-item">{lang.dict.get('priceMonthOMR')}</div>
                                    </div>
                                    <div className="card__grid-container">
                                        <div className="grid-item"><div className="title">Bawshar</div></div>
                                        <div className="grid-item">
                                            <Input.Text placeHolder="Write OMR/Visit" />
                                        </div>
                                        <div className="grid-item"><div className="title">Seeb</div></div>
                                        <div className="grid-item">
                                            <Input.Text placeHolder="Write OMR/Visit" />
                                        </div>
                                        <div className="grid-item"><div className="title">Musqat</div></div>
                                        <div className="grid-item">
                                            <Input.Text placeHolder="Write OMR/Visit" />
                                        </div>
                                        <div className="grid-item"><div className="title">Qurayyat</div></div>
                                        <div className="grid-item">
                                            <Input.Text placeHolder="Write OMR/Visit" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
});