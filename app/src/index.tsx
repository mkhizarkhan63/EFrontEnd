import { render } from 'react-dom';
import { debug, storage, auth, lang } from '~/api';
import { Main } from './routers';

const main = async () => {
    const $el = document.getElementById('app');

    if (!$el) {
        return;
    }

    await lang.load();
    debug.enable();
    debug.init();
    storage.load();
    storage.session.load();
    await auth.restore();

    render(<Main />, $el);
};

main();
