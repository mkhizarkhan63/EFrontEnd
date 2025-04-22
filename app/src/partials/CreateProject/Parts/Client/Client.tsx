import { observer } from 'mobx-react';
import { lang } from '~/api';
import { If, Input } from '~/bits';
import { stores } from '~/stores';

type Props = {
    withoutName?: boolean;
};

export const Client = observer(({ withoutName = false }: Props) => {
    const { draft } = stores.projects;

    return (
        <>
            <div className="form__section-header">
                {lang.dict.get('clientDetails')}
            </div>
            <div className="form__row form__row--client-details">
                <Input.Text
                    name={lang.dict.get('phone')}
                    value={draft.forAdmin.client.mobile}
                    onChange={draft.forAdmin.setClientMobile}
                    placeHolder={lang.dict.get('fieldWritePhonePlaceholder')}
                />
                <If condition={!withoutName}>
                    <Input.Text
                        name={lang.dict.get('name')}
                        value={draft.forAdmin.client.name}
                        onChange={draft.forAdmin.setClientName}
                        placeHolder={lang.dict.get('fieldWriteNamePlaceholder')}
                    />
                </If>
            </div>
        </>
    );
});
