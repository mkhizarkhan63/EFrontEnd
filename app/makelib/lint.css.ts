import { $ } from './main';

export const lintCss = $.task('lint:css', async ctx => {
    const additionalArgs = ctx.isDev
        ? ['--cache-location', './node_modules/stylelint/.cache', '--cache']
        : [];

    await $.consume($.exec)('npm', [
        'run',
        '--silent',
        '__inner_stylelint',
        ...additionalArgs,
    ], {
        stdout: 'inherit',
        stderr: 'inherit',
        useShell: true,
    });
});
