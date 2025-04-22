import { observer } from 'mobx-react';
import { lang } from '~/api';

type Props = {
    text: string;
    phone: number;
};

export const ContactDetail = observer(({ text, phone }: Props) => (
    <div>
        <p>{lang.dict.get('clientDetail')}</p>
        <p>{text}</p>
        <p>{phone}</p>
    </div>
));
