import { $ } from './main';
import Utils from 'util';
import PostCss from 'postcss';
import PostCssPrefixer from 'autoprefixer';
import PostCssRtlCss from 'postcss-rtlcss';
import Sass from 'sass';
import NodeSassGlob from 'node-sass-glob-importer';

export const buildCss = $.task('build:css', async () => {
    await $.fs.ensureDir('./build');

    const scssResult = await Utils.promisify(Sass.render)({
        file: $.fs.resolve('./src/index.scss'),
        includePaths: [$.fs.resolve('./src')],
        sourceMap: true,
        sourceMapContents: true,
        outFile: 'index.css',
        outputStyle: 'compressed',
        importer: NodeSassGlob(),
    });

    if (!scssResult || !scssResult.map || !scssResult.css) {
        throw new Error('SCSS building result (object, css or map) is empty');
    }

    const fixedMaps = { sources: [], ...JSON.parse(String(scssResult.map)) };
    fixedMaps.sources = fixedMaps.sources.map((path: string) =>
        path.replace(/(^\w+:|^)\/\//, '').substring($.fs.resolve('./').length + 1)
    );

    const mapsStr = JSON.stringify(fixedMaps);

    const css = scssResult.css.toString('utf-8');
    const cssMap = mapsStr;

    const postCssResult = await PostCss([
        PostCssPrefixer,
        PostCssRtlCss(),
    ]).process(css, {
        from: 'index.css',
        to: 'index.css',
        map: {
            prev: cssMap,
        },
    });

    await Promise.all([
        $.fs.write($.fs.resolve('./build/index.css'), postCssResult.css),
        $.fs.write($.fs.resolve('./build/index.css.map'), postCssResult.map.toString()),
    ]);
});