import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { defaultDict } from '~/api/Lang/Dict/Default';
import { Button, Icons, If, Input, SortedTable, Loading } from '~/bits';
import { BuyProjectsVm } from '../../BuyProjects.vm';
import { hook } from '~/utils';
import { Architecture } from './Component/Architecture/Architecture';
import { Developer } from './Component/Developer/Developer';

type Props = {
    parentVm: BuyProjectsVm;
};

export const ProjectInformation = observer(({ parentVm }: Props) => {

    return (

        <div className='buyproject-cards-container_body_content'>
            <div className='infofieldgroup'>
                <div className='projectinfo_field'>
                    {/* <p className="infotitle">{lang.dict.get('assignProjectToCompany')} </p> */}
                    <div className='infoselect'>
                        <Input.Select
                            name={lang.dict.get('writeCompanyName')}
                            values={[
                                { value: 'option1', name: 'Option 1' },
                                { value: 'option2', name: 'Option 2' },
                                { value: 'option3', name: 'Option 3' },
                            ]}
                            value={(parentVm.companySelect) ? parentVm.companySelect : undefined}
                            onChange={parentVm.companySelectOnchange}

                        />
                        <Icons icon="search" />

                    </div>
                </div>

                <div className='projectinfo_field'>

                    <div className='projectinfo_field_flex'>
                        <Input.Text
                            name={lang.dict.get('nameOfProjectEn')}
                            placeHolder={lang.dict.get('nameOfProjectPlaceholder')}
                            shouldCursorMove={true}
                        />

                        <Input.Text
                            name={lang.dict.get('nameOfProjectAr')}
                            placeHolder={lang.dict.get('nameOfProjectPlaceholder')}
                            shouldCursorMove={true}
                            isArabic={true}
                        />
                    </div>
                </div>
                <div className='projectinfo_field'>
                    <div className='projectinfo_field_flex'>
                        <Input.Text
                            name={lang.dict.get('descriptionEn')}
                            placeHolder={lang.dict.get('descriptionPlaceholder')}
                            shouldCursorMove={true}
                        />

                        <Input.Text
                            name={lang.dict.get('descriptionAr')}
                            shouldCursorMove={true}
                            placeHolder={lang.dict.get('descriptionPlaceholder')}
                            isArabic={true}
                        />
                    </div>
                </div>
            </div>



            {/* Radios */}
            <p className="infotitle">
                {lang.dict.get('projectInfoFourLabel')}
            </p>
            <div className="inforadios">
                <label>
                    <input
                        type="radio"
                        name={"unitType"}
                        disabled={false}
                        className="checkbox-radio-input"
                    />
                    <span className="checkbox-radio-title" >
                        {lang.dict.get('projectInfoVilla')}
                    </span>
                </label>

                <label>
                    <input
                        type="radio"
                        name={"unitType"}
                        disabled={false}
                        className="checkbox-radio-input"
                    />
                    <span className="checkbox-radio-title" >
                        {lang.dict.get('projectInfoTwinVilla')}
                    </span>
                </label>
                <label>
                    <input
                        type="radio"
                        name={"unitType"}
                        disabled={false}
                        className="checkbox-radio-input"
                    />
                    <span className="checkbox-radio-title" >
                        {lang.dict.get('projectInfoApartment')}
                    </span>
                </label>
                <label>
                    <input
                        type="radio"
                        name={"unitType"}
                        disabled={false}
                        className="checkbox-radio-input"
                    />
                    <span className="checkbox-radio-title" >
                        {lang.dict.get('projectInfoTownHouse')}
                    </span>
                </label>
                <label>
                    <input
                        type="radio"
                        name={"unitType"}
                        disabled={false}
                        className="checkbox-radio-input"
                    />
                    <span className="checkbox-radio-title" >
                        {lang.dict.get('projectInfoFarmHouse')}
                    </span>
                </label>
            </div>


            <p className="infotitle">{lang.dict.get('projectInfoDeveloperOrArchi')}</p>

            <div className='info_developOrArchiContainer'>
                <div className='info_developOrArchiContainer__Box'
                    data-is-active={parentVm.filter.isArchitect} onClick={() => parentVm.selectProjectType(E.BuyProject_ProjectType.architecture)}>
                    <div className='info_developOrArchiContainer__Box__Body'>
                        <div className='info_developOrArchiContainer__Box__Body__icon'>
                            <svg >
                                <image xlinkHref="/assets/graphics/Architect.svg" />
                            </svg>
                        </div>
                        <div className='info_developOrArchiContainer__Box__Body__title'>
                            {lang.dict.get('Architect')}
                        </div>
                    </div>
                    <div className='info_developOrArchiContainer__Box__Content'>
                        <ul className="box-list">
                            <li className="list-item">Theft &amp; Burglary</li>
                            <li className="list-item">Failure of Temporary works</li>
                            <li className="list-item">Fires &amp; Electric Shocks</li>
                            <li className="list-item">Natural Disasters</li>
                            <li className="list-item">Any Negligence at Site</li>
                        </ul>

                    </div>
                </div>
                <div className='info_developOrArchiContainer__Box' data-is-active={parentVm.filter.isDeveloper}
                    onClick={() => parentVm.selectProjectType(E.BuyProject_ProjectType.developer)}>
                    <div className='info_developOrArchiContainer__Box__Body'>
                        <div className='info_developOrArchiContainer__Box__Body__icon'>
                            <svg >
                                <image xlinkHref="/assets/graphics/Developer.svg" />
                            </svg>
                        </div>
                        <div className='info_developOrArchiContainer__Box__Body__title'>
                            {lang.dict.get('Developer')}
                        </div>
                    </div>
                    <div className='info_developOrArchiContainer__Box__Content'>
                        <ul className="box-list">
                            <li className="list-item">Theft &amp; Burglary</li>
                            <li className="list-item">Failure of Temporary works</li>
                            <li className="list-item">Fires &amp; Electric Shocks</li>
                            <li className="list-item">Natural Disasters</li>
                            <li className="list-item">Any Negligence at Site</li>
                        </ul>

                    </div>
                </div>
            </div>
            {(parentVm.filter.isArchitect) ? <Architecture parentVm={parentVm} /> : <Developer parentVm={parentVm} />}
        </div>

    );
})