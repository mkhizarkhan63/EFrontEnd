import { $ } from '../main';
import { typeCheckJs } from '../typeCheckJs';
import { buildCss } from '../build.css';
import { buildStatic } from '../build.static';
import { lintJs } from '../lintJs';
import { build } from '../build';

export const dev_watch = $.task('dev/watch', ctx => {
    ctx.isWatching = true;

    const js = $.debouce($.rescue(async () => {
        await $.run(build);
    }));

    const css = $.debouce($.rescue(async () => {
        await $.run(buildCss);
    }));

    const assets = $.debouce($.rescue(async () => {
        await $.run(buildStatic);
    }));

    if (ctx.doLinting) {
        const types = $.debouce(async () => {
            await Promise.all([
                $.rescue($.run)(typeCheckJs),
                $.rescue($.run)(lintJs),
            ]);
        });
        types();
        $.fs.watch('./src/**/*.{ts,tsx}', types);
    }
    js();
    css();
    assets();

    $.fs.watch('./src/**/*.{ts,tsx}', js);
    $.fs.watch('./src/**/*.{scss,css}', css);
    $.fs.watch([
        '!./src/**/*.{ts,tsx,scss,css}',
        './src/**/*',
        './public/**/*',
    ], assets);
});
