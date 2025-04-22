import { $ } from './main';

/**
 * Allows to (optionally) link global cypress to current package
 */
export const linkCypress = $.task('link-cypress', async ctx => {
    const fckCypress = await $.fs.exists('./.fckcypress', 'file');

    if (fckCypress) {
        $.logger.log('Well, f*ck cypress if you say so');
        return;
    }

    if (ctx.isCypressDisabled) {
        $.logger.log('Omitted');
        return;
    }

    await $.consume($.exec)('npm', ['link', 'cypress@9.6'], {
        useShell: true,
    });
});
