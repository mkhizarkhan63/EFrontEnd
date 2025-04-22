import { $ } from './main';

export const test = $.task('test', $.consume(async () => {
    await $.exec('npm', ['run', '--silent', '__inner_cypress_test'], {
        stdout: 'inherit',
    });
}));