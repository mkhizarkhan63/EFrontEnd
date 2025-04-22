import { $ } from './main';
import { typeCheckJs } from './typeCheckJs';

export const typeCheck = $.task('type-check', async () => {
    await $.run(typeCheckJs);
});
