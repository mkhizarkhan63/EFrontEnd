import { observer } from 'mobx-react';
import { lang } from '~/api';
import type { EmployeeType } from '~/models';

type Props = {
    persons: EmployeeType[];
};

export const PersonsCard = observer((props: Props) => {
    const personsData = props.persons.map((item, index) => (
        <div
            key={`${item.name}-${index}`}
            className="engineers__item"
        >
            <img src={item.avatar?.url} className="engineers__item-img" alt=" " />
            <div className="engineers__item-text">
                <p className="engineers__item-name">
                    {item.name}
                </p>
                <p className="engineers__item-role">
                    {lang.dict.enum('affiliationType', item.affiliationType)}
                </p>
            </div>
        </div>
    ));
    return (
        <div className="engineers">
            <p className="engineers__title">
                {lang.dict.get('architectsEngineers')}
                <span className="engineers__title-num">({props.persons.length})</span>
            </p>
            <div className="engineers__grid">
                {personsData}
            </div>
        </div>
    );
});

