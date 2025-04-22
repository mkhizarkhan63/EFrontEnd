/// <reference types="cypress" />

import { preprocessor } from './preprocessor';
import { Bunbun } from '@nodi/bunbun';

const $ = new Bunbun({
    serverPort: 3000,
    isHosted: false,
});

const host = async () => {
    if (!$.context.isHosted) {
        await $.consume($.server.listen)('./build', $.context.serverPort);
        $.context.isHosted = true;
    }
    return $.context.serverPort;
};

export default async (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
    const shims = (await $.fs.list('./shims/**.*'))
        .filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'));

    on('file:preprocessor', await preprocessor({
        inject: [...shims],
        bundle: true,
        minify: true,
        write: true,
        sourcemap: true,
        target: 'chrome58',
    }, $));

    on('before:browser:launch', (res, config) => {
        config.args.push('--disable-web-security');
    });

    on('task', {
        host,
    });

    return config;
};