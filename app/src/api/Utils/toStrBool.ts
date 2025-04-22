import { lang } from '~/api';

export const toStrBool = (par: boolean) => (par ? lang.dict.get('switchYes') : lang.dict.get('switchNo'));
