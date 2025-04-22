import { $ } from '../../main';
import { spawn, Thread, Worker } from 'threads';
import { dev_dtos_lintFix } from './lintFix';
import { morph } from './morph.new';

export const dev_dtos_morph = $.task('dev/dtos/morph', async () => {
    const files = await $.fs.list('./src/api/**/*.dtos.ts');
    // await morph($, files);
    // return; // :P

    const threads: Array<Promise<void>> = [];

    for (const file of files) {
        threads.push((async () => {
            const worker = await spawn(new Worker('./morph.worker.ts'));
            await worker.morph(file);
            await Thread.terminate(worker);
        })());
    }

    await Promise.all(threads);

    await $.run(dev_dtos_lintFix);
});