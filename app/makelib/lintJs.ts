import { $ } from './main';

export const lintJs = $.task('lint:js', async ctx => {
    const additionalArgs = ctx.isDev
        ? ['--cache']
        : [];

    await $.consume($.exec)('npm', [
        'run',
        '--silent',
        '__inner_eslint',
        ...additionalArgs,
    ], {
        stdout: 'inherit',
        stderr: 'inherit',
        useShell: true,
    });
});
