import { observer } from 'mobx-react';
import { lang, utils } from '~/api';
import { If, Input } from '~/bits';
import { stores } from '~/stores';

type Props = {
    isNewFlow?: boolean;
};

export const Land = observer(({ isNewFlow }: Props) => {
    const { draft } = stores.projects;

    return (
        <>
            <If condition={!isNewFlow}>
                <div className="form__section-header">
                    {lang.dict.get('projectCreatorLandSection')}
                </div>
            </If>
            <div className="form__row">
                <Input.Select
                    name={lang.dict.get('projectCreatorGovernorate')}
                    value={draft.governorateId}
                    values={draft.governorates}
                    onChange={draft.setGovernorate}
                />
                <Input.Select
                    name={lang.dict.get('projectCreatorWilayat')}
                    value={draft.wilayatId}
                    values={draft.wilayats}
                    onChange={draft.setWilayat}
                />
            </div>
            <div className="form__row form__row--last">
                <Input.Text
                    name={lang.dict.get('projectCreatorLandArea')}
                    value={utils.toInputNumber(draft.landArea)}
                    onChange={draft.setArea}
                    placeHolder={lang.dict.get('inputPlaceholderNumber')}
                />
                <Input.Select
                    name={lang.dict.get('projectCreatorLandType')}
                    value={draft.landType}
                    values={draft.landTypes}
                    onChange={draft.setLandType}
                />
            </div>
        </>
    );
});
