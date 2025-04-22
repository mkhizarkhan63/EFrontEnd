import { $ } from './main';

export const typeCheckJs = $.task('type-check:js', async () => {
    await $.consume($.exec)('npm', ['run', '--silent', '__inner_test_types'], {
        stdout: 'inherit',
        stderr: 'inherit',
        useShell: true,
    });
});
