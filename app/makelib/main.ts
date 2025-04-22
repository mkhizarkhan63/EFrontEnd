import type { BuildIncremental } from 'esbuild';
import { resolve } from 'node:path';
import { Bunbun } from '@nodi/bunbun';

const $ = new Bunbun({
    devPort: 3000,
    isWatching: false,
    isDev: false,
    createAnalyze: false,
    doLinting: true,
    builder: false as (BuildIncremental | false),
    isCypressDisabled: parseInt(process.env.CYPRESS_DISABLED || '0', 10) === 1,
});

$.fs.cwd = resolve(__dirname, '..');

export { $ };
export * as Esbuild from 'esbuild';
