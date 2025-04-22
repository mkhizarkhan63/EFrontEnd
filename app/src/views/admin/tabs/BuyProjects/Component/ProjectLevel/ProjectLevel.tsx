import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { defaultDict } from '~/api/Lang/Dict/Default';
import { Button, Icons, If, Input, SortedTable, InputCounter } from '~/bits';
import { BuyProjectsVm } from '../../BuyProjects.vm';
import { hook } from '~/utils';
import { FloorType } from './Component/Row/FloorType';
import { useCallback } from 'react';

type Props = {
    parentVm: BuyProjectsVm;
};

export const ProjectLevel = observer(({ parentVm }: Props) => {

    return (


        <div className='project-creator_cards_container__body_content'>


            <div className='buyprojectlevelContainer_levels'>
                <div className='buyprojectlevelContainer_levels_row'>
                    <InputCounter
                        onChange={parentVm.setBasement}
                        value={parentVm.filter.basement}
                        name={lang.dict.get('basement')}
                    />
                    <InputCounter
                        onChange={parentVm.setAdditionalFloors}
                        value={parentVm.filter.additionalFloors}
                        name={lang.dict.get('additionalFloors')}
                    />
                    <InputCounter
                        onChange={parentVm.setOuterBlocks}
                        value={parentVm.filter.outerBlocks}
                        name={lang.dict.get('outerBlocks')}
                    />


                </div>
                <div className="buyprojectlevelContainer_levels_checkboxgroup">

                    <Input.Checkbox
                        type="check"
                        onChange={() => { parentVm.filter.isGroundFloor ? parentVm.setGroundFloor(false) : parentVm.setGroundFloor(true) }}
                        isChecked={parentVm.filter.isGroundFloor}
                        name={lang.dict.get('groundFloor')}
                    />
                    <Input.Checkbox
                        type="check"
                        onChange={() => { parentVm.filter.isLevellingFloor ? parentVm.setLevellingFloor(false) : parentVm.setLevellingFloor(true) }}
                        isChecked={parentVm.filter.isLevellingFloor}
                        name={lang.dict.get('levellingFloor')}
                    />
                    <Input.Checkbox
                        type="check"
                        onChange={() => { parentVm.filter.isPentHourFloor ? parentVm.setPentHouseFloor(false) : parentVm.setPentHouseFloor(true) }}
                        isChecked={parentVm.filter.isPentHourFloor}
                        name={lang.dict.get('penthouseFloor')}
                    />
                    <Input.Checkbox
                        type="check"
                        onChange={() => { parentVm.filter.isPool ? parentVm.setPool(false) : parentVm.setPool(true) }}
                        isChecked={parentVm.filter.isPool}
                        name={lang.dict.get('pool')}
                    />
                    {/* <Button
                        color='blue'
                        rightImg='next'
                        value='Submit Levels'
                    /> */}
                </div>
            </div>


            <div className='gridContainer'>
                <div className='buyprojectlevelContainer_grid'>
                    {/* Header Row */}
                    <div className='buyprojectlevelContainer_grid__row'>
                        <div className='buyprojectlevelContainer_header fColumn'>
                            <div className='content'>
                                {lang.dict.get('floor')}
                            </div>
                        </div>
                        <div className='buyprojectlevelContainer_header sColumn'>
                            <div className='content'>
                                {lang.dict.get('builtUp')}
                            </div>
                        </div>
                        <div className='buyprojectlevelContainer_header tColumn'>
                            <div className='content '>
                                {lang.dict.get('addRoom')}
                            </div>
                        </div>
                        <div className='buyprojectlevelContainer_header lColumn'>
                            <div className='content'>
                                {lang.dict.get('action')}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            {parentVm.filter.basement !== 0 && (

                Array.from({ length: parentVm.filter.basement }).map((_, index) => {

                    if (!parentVm.selectedBasement[index]) {
                        parentVm.selectedBasement[index] = [];
                    }
                    if (typeof parentVm.basementAreas[index] === 'undefined') {
                        parentVm.basementAreas[index] = 0;
                    }

                    const selectedOptions = parentVm.selectedBasement[index];
                    const totalArea = parentVm.basementAreas[index];
                    return (
                        <FloorType
                            key={index}
                            parentVm={parentVm}
                            options={parentVm.basementOptions}
                            onChange={(selectedval) => parentVm.setBasementOnChange(index, selectedval)}
                            title={`${lang.dict.get('basement')} ${parentVm.filter.basement - index}`}
                            selectedOptions={selectedOptions}
                            onDelete={() => {
                                parentVm.deleteSelectedBasement(index);
                            }}
                            gridType={E.BuyProject_FloorType_gridType.simple}
                            totalArea={totalArea}
                            onTotalAreaChange={(value: number) => parentVm.setBasementArea(index, value)}
                        />
                    );
                })
            )}



            {parentVm.filter.isLevellingFloor ? <FloorType parentVm={parentVm} options={parentVm.levellingFloorOptions}
                selectedOptions={parentVm.selectedLevellingFloor}
                onChange={(selectedval) => parentVm.setMultiLevellingOnChange(selectedval)}
                title={lang.dict.get('levellingFloor')} onDelete={() => parentVm.setLevellingFloor(false)}
                gridType={E.BuyProject_FloorType_gridType.simple}
                totalArea={parentVm.levellingFloorArea || 0}
                onTotalAreaChange={(value: number) => parentVm.setLevellingFloorArea(value)}
            /> : <> </>
            }

            {parentVm.filter.isGroundFloor ? <FloorType parentVm={parentVm} options={parentVm.groundFloorOptions}
                onChange={(selectedval) => parentVm.setGroundFloorOnChange(selectedval)} title={lang.dict.get('groundFloor')}
                selectedOptions={parentVm.selectedGroundFloor}
                onDelete={() => parentVm.setGroundFloor(false)}
                gridType={E.BuyProject_FloorType_gridType.simple}
                totalArea={parentVm.groundFloorArea || 0}
                onTotalAreaChange={(value: number) => parentVm.setGroundFloorArea(value)}
            /> : <> </>}

            {parentVm.filter.additionalFloors !== 0 && (
                Array.from({ length: parentVm.filter.additionalFloors }).map((_, index) => {

                    if (!parentVm.selectedAdditionalFloor[index]) {
                        parentVm.selectedAdditionalFloor[index] = [];
                    }
                    if (typeof parentVm.additionalFloorAreas[index] === 'undefined') {
                        parentVm.additionalFloorAreas[index] = 0;
                    }

                    const selectedOptions = parentVm.selectedAdditionalFloor[index];
                    const totalArea = parentVm.additionalFloorAreas[index];
                    return (
                        <FloorType
                            key={index}
                            parentVm={parentVm}
                            options={parentVm.additionalFloorOptions}
                            onChange={(selectedval) => parentVm.setAdditionalFloorsOnChange(index, selectedval)}
                            title={`${lang.dict.get('additionalFloors')} ${parentVm.filter.additionalFloors - index}`}
                            selectedOptions={selectedOptions}
                            onDelete={() => parentVm.deletedSelectedAdditionalFloor(index)}
                            gridType={E.BuyProject_FloorType_gridType.simple}
                            totalArea={totalArea}
                            onTotalAreaChange={(value: number) => parentVm.setAdditionalFloorArea(index, value)}
                        />
                    )
                })

            )}


            {parentVm.filter.isPentHourFloor ? <FloorType parentVm={parentVm} options={parentVm.pentHouseOptions}
                selectedOptions={parentVm.selectedPentHouse}
                onChange={(selectedval) => parentVm.setPentHouseOnChange(selectedval)}
                title={lang.dict.get('penthouseFloor')} onDelete={() => parentVm.setPentHouseFloor(false)}
                gridType={E.BuyProject_FloorType_gridType.simple}
                totalArea={parentVm.pentHouseArea || 0}
                onTotalAreaChange={(value: number) => parentVm.setPentHouseArea(value)}
            /> : <> </>}


            {parentVm.filter.outerBlocks !== 0 && (
                Array.from({ length: parentVm.filter.outerBlocks }).map((_, index) => {
                    if (!parentVm.selectedOuterBlocks[index]) {
                        parentVm.selectedOuterBlocks[index] = [];
                    }
                    if (typeof parentVm.outerBlockAreas[index] === 'undefined') {
                        parentVm.outerBlockAreas[index] = 0;
                    }

                    const selectedOptions = parentVm.selectedOuterBlocks[index];
                    const totalArea = parentVm.outerBlockAreas[index];
                    return (
                        <FloorType
                            key={index}
                            parentVm={parentVm}
                            options={parentVm.outerBlockOptions}
                            onChange={(selectedval) => parentVm.setouterBlocksOnChange(index, selectedval)}
                            title={`${lang.dict.get('outerBlocks')} ${parentVm.filter.outerBlocks - index}`}
                            selectedOptions={selectedOptions}
                            onDelete={() => parentVm.deletedSelectedOuterBlocks(index)}
                            gridType={E.BuyProject_FloorType_gridType.simple}
                            totalArea={totalArea}
                            onTotalAreaChange={(value: number) => parentVm.setOuterBlockArea(index, value)}
                        />
                    )
                })

            )}



            {parentVm.filter.isPool ? <FloorType parentVm={parentVm} options={parentVm.poolOptions}
                selectedOptions={parentVm.selectedPool}
                onChange={(selectedval) => parentVm.setPoolOnChange(selectedval)}
                title={lang.dict.get('pool')} onDelete={() => parentVm.setPool(false)}
                gridType={E.BuyProject_FloorType_gridType.simple}
                totalArea={parentVm.poolArea || 0}
                onTotalAreaChange={(value: number) => parentVm.setPoolArea(value)}
            /> : <> </>}

            <div className='buyprojectlevelContainer_levels_footer'>
                <span>{lang.dict.get('projectLevelTotalBuiltUpArea')} - <b className='buyprojectlevelContainer_levels_footer_calculated'>{parentVm.totalArea} m2</b></span>
            </div>
        </div>


    );
})