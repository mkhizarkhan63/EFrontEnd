import { $, Esbuild } from './main';

export const buildJs = $.task('build:js', async ctx => {
    ctx.isDev = ctx.isWatching || ctx.isDev;

    const currentJsFiles = await $.fs.list('./build/**/*.{js,js.map}');

    // remove only in case if its not static file
    for (const file of currentJsFiles) {
        const staticFile = file.replace(/^\.\/build\//, './public/');
        const isStatic = await $.fs.exists(staticFile, 'file');

        if (!isStatic) {
            await $.fs.remove(file);
        }
    }

    await $.fs.ensureDir('./build');
    await $.fs.ensureDir('./shims');

    if (ctx.builder) {
        await ctx.builder.rebuild();

        if (ctx.builder.metafile && ctx.createAnalyze) {
            await $.fs.write('./analyze.metafile', JSON.stringify(ctx.builder.metafile));
        }
        return;
    }

    const shims = (await $.fs.list('./shims/**.*'))
        .filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'));

    const builder = await Esbuild.build({
        incremental: ctx.isWatching,
        format: 'esm',
        entryPoints: [$.fs.resolve('./src/index.tsx')],
        inject: [...shims],
        outdir: $.fs.resolve('./build'),
        bundle: true,
        keepNames: Boolean(ctx.isDev),
        minify: true,
        write: true,
        splitting: true,
        sourcemap: ctx.isDev ? 'linked' : false,
        target: 'es6',
        define: {
            'process.env.NODE_ENV': '"production"',
        },
        legalComments: 'none',
        treeShaking: true,
    });

    if (ctx.isDev && ctx.createAnalyze && builder.metafile) {
        await $.fs.write('./analyze.metafile', JSON.stringify(builder.metafile));
    }

    ctx.builder = builder as Esbuild.BuildIncremental;
});