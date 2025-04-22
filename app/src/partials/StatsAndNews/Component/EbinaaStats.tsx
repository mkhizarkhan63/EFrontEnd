import { lang } from '~/api';
import { Icons } from '~/bits';

type Props = {
    totalProjects: number;
    projectsInConstruction: number;
    projectInDesign: number;
    totalContractors: number;
    totalConsultants: number;
    totalValueOfProject: string;
};

export const EbinaaStats = (props: Props) => (
    <div className="sidebar__item-container">
        <h3 className="sidebar__title">
            {lang.dict.get('ebinaaStats')}
        </h3>
        <div className="sidebar__item">
            <div className="sidebar__item-icon sidebar__item-icon--home">
                <Icons icon="home" />
            </div>
            <div className="sidebar__item-description">
                <p className="sidebar__item-title">
                    {lang.dict.get('totalProjects')}
                </p>
                <p className="sidebar__item-amount">
                    {props.totalProjects}
                </p>
            </div>
        </div>
        <div className="sidebar__item">
            <div className="sidebar__item-icon sidebar__item-icon--brickwall">
                <Icons icon="brickwall" />
            </div>
            <div className="sidebar__item-description">
                <p className="sidebar__item-title">
                    {lang.dict.get('projectsInConstruction')}
                </p>
                <p className="sidebar__item-amount">
                    {props.projectsInConstruction}
                </p>
            </div>
        </div>
        <div className="sidebar__item">
            <div className="sidebar__item-icon sidebar__item-icon--design">
                <Icons icon="project-in-design" />
            </div>
            <div className="sidebar__item-description">
                <p className="sidebar__item-title">
                    {lang.dict.get('projectsInDesign')}
                </p>
                <p className="sidebar__item-amount">
                    {props.projectInDesign}
                </p>
            </div>
        </div>
        <div className="sidebar__item">
            <div className="sidebar__item-icon sidebar__item-icon--contractor">
                <Icons icon="contractor-navy" />
            </div>
            <div className="sidebar__item-description">
                <p className="sidebar__item-title">
                    {lang.dict.get('totalContractors')}
                </p>
                <p className="sidebar__item-amount">
                    {props.totalContractors}
                </p>
            </div>
        </div>
        <div className="sidebar__item">
            <div className="sidebar__item-icon sidebar__item-icon--consultant">
                <Icons icon="consultant-navy" />
            </div>
            <div className="sidebar__item-description">
                <p className="sidebar__item-title">
                    {lang.dict.get('totalConsultants')}
                </p>
                <p className="sidebar__item-amount">
                    {props.totalConsultants}
                </p>
            </div>
        </div>
        <div className="sidebar__item sidebar__item--last">
            <div className="sidebar__item-icon sidebar__item-icon--omr">
                <Icons icon="value-in-OMR" />
            </div>
            <div className="sidebar__item-description">
                <p className="sidebar__item-title">
                    {lang.dict.get('totalValueOfProject')}
                </p>
                <p className="sidebar__item-amount sidebar__item-amount--value">
                    {props.totalValueOfProject} {lang.dict.get('fieldOmr')}
                </p>
            </div>
        </div>
    </div>
);
