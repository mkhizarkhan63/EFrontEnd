import { $ } from '../../main';

export const dev_dtos_lintFix = $.task('dev/dtos/lint-fix', async () => {
    const files = await $.fs.list('./src/api/**/*.dtos.ts');
    const fixedFiles = files
        .map(x => x.replace(/\.dtos\./i, '.'));
    await $.exec('eslint', ['--fix', ...fixedFiles]);
});