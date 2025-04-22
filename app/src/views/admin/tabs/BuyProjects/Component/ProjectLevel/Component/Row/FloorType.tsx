import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { defaultDict } from '~/api/Lang/Dict/Default';
import { Button, Icons, If, Input, SortedTable, InputCounter } from '~/bits';
import { BuyProjectsVm } from '../../../../BuyProjects.vm';
import { hook, xRef } from '~/utils';
import { SelectedChip } from '../../../SelectedChip/SelectedChip';
import { useEffect, useMemo, useRef, useState } from 'react';
type Props = {
    parentVm: BuyProjectsVm;
    title: string;
    onDelete: () => void;
    options: Array<{ value: number; name: string }>;
    onChange: (selectedValues: number[]) => void;
    selectedOptions?: number[];
    gridType?: E.BuyProject_FloorType_gridType;
    totalArea: number;
    onTotalAreaChange: (val: number) => void;
};


export const FloorType = observer(({ parentVm, totalArea, onTotalAreaChange, title, onDelete, options, onChange, gridType = E.BuyProject_FloorType_gridType.checkbox, selectedOptions = [] }: Props) => {
    const [localTotalArea, setLocalTotalArea] = useState(totalArea);
    
    const filteredOptions = useMemo(() => {
        return options.filter(x => selectedOptions.includes(x.value));
    }, [options, selectedOptions]);


    const DeleteChip = (val: number) => {
        const newSelectedOptions = selectedOptions.filter(v => v !== val);
        onChange(newSelectedOptions);
    };

   

    useEffect(() => {
        setLocalTotalArea(totalArea);
    }, [totalArea]);

   


    return (
        <>
            <div className='gridContainer'>
                <div className='buyprojectlevelContainer_grid'>
                    <div className='buyprojectlevelContainer_grid__row'>
                        <div className='buyprojectlevelContainer_header'>
                            <div className='title'>{title}</div>
                        </div>
                        <div className='buyprojectlevelContainer_header'>
                            <div className="buyprojectlevelContainer_header_inputTextWithIcon">
                                <div className='buyprojectlevelContainer_header_inputTextWithIcon__inputtxt'>
                                    <Input.Text placeHolder="e.g.300"
                                        value={localTotalArea.toString()}
                                        onChange={(value) => onTotalAreaChange(Number(value))}
                                       // onBlur={handleBlur}
                                    />
                                    <span className='icon'>m</span>
                                </div>
                            </div>
                        </div>
                        <div className='buyprojectlevelContainer_header'>
                            <div className='buyprojectlevelContainer_header_inputTextWithIcon_searchfield'>
                                <Input.SearcMulti
                                    values={options}
                                    onChange={onChange} // Handle selection change
                                    value={selectedOptions}
                                />

                                <Icons icon="search" />
                            </div>
                            <div className='buyprojectlevelContainer_header_flex'>
                                {filteredOptions.map(x => (
                                    <SelectedChip
                                        key={x.value}
                                        selectedChipVal={x}
                                        onDelete={() => DeleteChip(x.value)}
                                        parentVm={parentVm}
                                        chipType={E.BuyProjectChipType.multiple}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='buyprojectlevelContainer_header'>
                            <div className='buyprojectlevelContainer_header_delete_icon' onClick={onDelete}>
                                <Icons icon="delete" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});
