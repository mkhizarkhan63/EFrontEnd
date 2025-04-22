import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { defaultDict } from '~/api/Lang/Dict/Default';
import { Button, Icons, If, Input, SortedTable } from '~/bits';
import { BuyProjectsVm } from '../../BuyProjects.vm';
import { hook } from '~/utils';
import { SelectedChip } from '../SelectedChip/SelectedChip';

type Props = {
    parentVm: BuyProjectsVm;
};

export const ProjectFeatures = observer(({ parentVm }: Props) => {

    // Handle feature name and Arabic name changes
    const handleFeatureNameChange = (value: string) => {

        parentVm.projectFeaturesName = value;
    };

    const handleFeatureNameArabicChange = (value: string) => {
        parentVm.projectFeaturesNameArabic = value;
    };

    const handleDelete = (value: string) => {
        parentVm.projectFeaturesList = parentVm.projectFeaturesList.filter(x => x !== value);
    }
    return (
        <>
            <div className='project-creator_cards_container__body_content'>
                <div className='projectFeatures'>
                    <p className='projectFeatures_content'>{lang.dict.get('projectFeaturesContent')}</p>

                    <div className='projectFeatures_body_flex'>

                        <Input.Text
                            name={lang.dict.get('nameFeature')}
                            placeHolder={lang.dict.get('writeFeature')}
                            value={parentVm.projectFeaturesName}
                            onChange={handleFeatureNameChange}
                        />
                        <Input.Text
                            name={lang.dict.get('nameFeatureArabic')}
                            placeHolder={lang.dict.get('writeFeature')}
                            value={parentVm.projectFeaturesNameArabic}
                            onChange={handleFeatureNameArabicChange}
                        />
                        <Button
                            color='white'
                            leftImg='add'
                            value={lang.dict.get('projectFeaturesAddbtn')}
                            onClick={parentVm.addProjectFeature}

                        />
                    </div>

                    <div className='projectFeatures_chip_flex'>

                        {parentVm.projectFeaturesList.map(x => (

                            <SelectedChip key={x}
                                selectedChipVal={x}
                                onDelete={() => handleDelete(x)}
                                parentVm={parentVm}
                                chipType={E.BuyProjectChipType.single}
                            />

                        ))}
                    </div>

                </div>
            </div>

        </>
    );
})