import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Close, SideModal } from '~/bits';
import type { EmployeeType, LogType } from '~/models';

type Props = {
    employee?: EmployeeType;
    logs?: LogType[];
    closeModal: () => void;
};

export const Logs = observer(({ closeModal, employee, logs }: Props) => {
    if (!employee || !logs) {
        return null;
    }

    const items = logs.map(log => (
        <div className="activities-list__item" key={log.id}>
            <p className="activities-list__item-desc">
                {lang.currentLanguage === 'en' ? log.description : log.descriptionArabic}
            </p>
            <p className="activities-list__item-date">{log.date.format('DD/MM/YYYY LT')}</p>
        </div>
    ));

    return (
        <SideModal variant="view-activity" onBlur={closeModal}>
            <div className="side-modal__header">
                <Close onClick={closeModal} />
                <p className="side-modal__header-title">
                    {lang.dict.get('employeesViewActivity')}
                </p>
            </div>
            <div className="side-modal__content">
                <div className="employee-box">
                    <img className="employee-box__img" src={employee.avatar?.url} alt="avatar" />
                    <div className="employee-box__data">
                        <p className="employee-box__name">{employee.name}</p>
                        <p className="employee-box__role">{lang.dict.enum('affiliationType', employee.affiliationType)}</p>
                    </div>
                </div>
                <p className="activities-length">{logs.length} {lang.dict.get('activities')}</p>
                <div className="activities-list">
                    {items}
                </div>
            </div>
        </SideModal>
    );
});
