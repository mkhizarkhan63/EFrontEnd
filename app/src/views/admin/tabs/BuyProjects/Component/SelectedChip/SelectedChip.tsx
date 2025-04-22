import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, Icons, If, Input, SortedTable, InputCounter } from '~/bits';
import { BuyProjectsVm } from '~/views/admin/tabs/BuyProjects/BuyProjects.vm';
import { useState } from 'react';

type Props = {
    parentVm: BuyProjectsVm ;
    selectedChipVal: options | string;
    onDelete: (value: number | string) => void;
    chipType: E.BuyProjectChipType;

};

type options = {
    value: number;
    name: string;
}
export const SelectedChip = observer(({ parentVm, selectedChipVal, onDelete, chipType }: Props) => {
    const [chipSelect, setChipSelected] = useState(1);
    const isOption = (val: options | string): val is options => {
        return typeof val !== 'string';
    };
    return (
        <>
            {chipType === E.BuyProjectChipType.multiple ? (
                <div className='selectedChips-multiple'>
                    {isOption(selectedChipVal) ? (
                        <>
                            <div className='selectedChips-multiple_content'>

                                <span className='selectedOption'>x {selectedChipVal.name}</span>

                                <Input.Select
                                    values={parentVm.chipdropdown}
                                    placeHolder=''
                                    onChange={(val) => setChipSelected(val)}
                                    value={chipSelect}
                                />
                                <span className='icon-setting' onClick={() => { onDelete(selectedChipVal.value) }}>
                                    <Icons icon='close' />
                                </span>
                            </div>

                        </>
                    ) : (
                        // Handle the case where selectedChipVal is a string
                        <span className='selectedOption'>x {selectedChipVal}</span>
                    )}
                </div>
            ) : (
                <div className='selected-chips-single'>
                    <div className='selected-chips-single_content'>
                        {isOption(selectedChipVal) ? (
                            <>
                                <span className='selectedChips-single_selectedOption'>{selectedChipVal.name}</span>
                                <span className='icon-setting' onClick={() => { onDelete(selectedChipVal.value) }}>
                                    <Icons icon='close' />
                                </span>
                            </>
                        ) : (
                            // Handle the case where selectedChipVal is a string
                            <>
                                <div className='singleValueTag'>
                                    <span className='selectedChips-single_selectedOption'>{selectedChipVal}</span>
                                    <span className='icon-setting' onClick={() => { onDelete(selectedChipVal) }}>
                                        <Icons icon='close' />
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
})