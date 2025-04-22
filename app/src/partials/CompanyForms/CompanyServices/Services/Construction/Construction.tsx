import { observer } from "mobx-react";
import { Button, Icons, If, Input, Uploader } from "~/bits";
import { ProfileRegistrationVm } from "~/views/ProfileRegistration/ProfileRegistration.vm";
import { useEffect, useRef, type ReactElement } from "react";
import { E, lang, utils, type ErrorListHolder } from "~/api";

type Props = {
    ProfileVm: ProfileRegistrationVm
};

export const ConstructionService = observer((props: Props) => {

    const handleAddConstructionGovernate = () => {
        props.ProfileVm?.locationCloseModal();
    }

    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Close modal when clicked outside the modal
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {

                if (props.ProfileVm.isLocationModal)
                    handleAddConstructionGovernate();
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (<div className="company-forms company-construction">
        <form className="form">
            <h2 className="form__header">{lang.dict.get("construction")}</h2>
            <div className="form__body">
                <div className="location">
                    <div className="section-title">
                        <p className="title">{lang.dict.get("locationWorkIn")}</p>
                        <Button color="white" centerImg="add" isCircle={true} onClick={handleAddConstructionGovernate} />
                        <div className="modal" ref={modalRef}>
                            <If condition={props.ProfileVm.isLocationModal}>
                                <div className="modal-box">
                                    <Input.Select values={[]} placeHolder={lang.dict.get('selectGovernate')} />
                                    <Button color="blue" leftImg="tick" value={lang.dict.get('add')} />
                                </div>
                            </If>
                        </div>
                    </div>

                    <div className="section-content">
                        <div className="willaya-section">
                            <div className="card">
                                <h3 className="card__title">Muscat</h3>
                                <div className="card__grid-header-container">
                                    <div className="grid-item">{lang.dict.get('wilayat')} <span className="light">{lang.dict.get('selectAtLeastOne')}</span></div>
                                </div>
                                <div className="card__grid-container">
                                    <div className="grid-item">
                                        <Input.Checkbox type="check" isChecked={false} name="Bawshar" />
                                    </div>
                                    <div className="grid-item">
                                        <Input.Checkbox type="check" isChecked={false} name="Bawshar" />
                                    </div>
                                    <div className="grid-item">
                                        <Input.Checkbox type="check" isChecked={false} name="Bawshar" />
                                    </div>
                                    <div className="grid-item">
                                        <Input.Checkbox type="check" isChecked={false} name="Bawshar" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>);
});