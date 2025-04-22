import { $ } from '../main';

export const dev_serve = $.task('dev/serve', ctx => {
    $.server.listen('./build', ctx.devPort);
});
