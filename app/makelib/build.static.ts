import { $ } from './main';
import { dirname } from 'node:path';

export const buildStatic = $.task('build:static', async () => {
    await $.fs.ensureDir('./build');
    const files = await $.fs.list('./public/**/*');

    for (const file of files) {
        const nextFile = file.replace(/^\.\/public\//, './build/');
        await $.fs.ensureDir(dirname(nextFile));
        await $.fs.copy(file, nextFile);
    }

    await $.consume($.fs.edit)('./build/index.html', html => html.replace(/\[\[TIME]]/gi, String(Date.now())));
});
