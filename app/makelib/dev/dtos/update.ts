import { $ } from '../../main';
import https from 'node:https';
import http from 'node:http';
import * as T from 'superstruct';

import { dev_dtos_morph } from './morph';

const API_LIST = 'https://ebina-api.test.softwarespace.io/catalog/services';

const download = async (url?: string) => new Promise<string>((resolve, reject) => {
    if (!url) {
        return;
    }

    const chunks: Buffer[] = [];

    const protocolProvider = /^https/i.test(url)
        ? https
        : http;

    protocolProvider.get(url, async res => {
        if ([302, 308].includes(res.statusCode || 0)) {
            resolve(await download(res.headers.location));
            return;
        }

        res.on('error', error => {
            reject(error);
        });

        res.on('data', (chunk: Buffer) => {
            chunks.push(chunk);
        });

        res.on('end', () => {
            resolve(Buffer.concat(chunks as unknown as Uint8Array[]).toString());
        });
    });
});

export const dev_dtos_update = $.task('dev/dtos/update', async () => {
    // const body = await download(API_LIST);
    // const jsonBodyList = JSON.parse(body);

    const jsonBodyList = [
        'http://ebinaa-api.rccloud.app/construction/types/typescript',
        'http://ebinaa-api.rccloud.app/contract/types/typescript',
        'http://ebinaa-api.rccloud.app/contractor/types/typescript',
        'http://ebinaa-api.rccloud.app/profile/types/typescript',
        'http://ebinaa-api.rccloud.app/workflow/types/typescript',
        'http://ebinaa-api.rccloud.app/notification/types/typescript',
        'http://ebinaa-api.rccloud.app/log/types/typescript',
        'http://ebinaa-api.rccloud.app/file/types/typescript',
        'http://ebinaa-api.rccloud.app/design/types/typescript',
        'http://ebinaa-api.rccloud.app/pm/types/typescript',
    ];

    T.assert(jsonBodyList, T.array(T.string()));

    const list = jsonBodyList
        .map(url => ({
            url,
            name: url
                .replace(/.+\/([\da-z]+)(?:\/types){2}cript\/?$/gi, '$1')
                .replace(/^[a-z]/i, x => x.toUpperCase()),
            content: '',
        }))
        .map(x => ({
            ...x,
            lcName: x.name.replace(/^./, y => y.toLowerCase()),
        }))
        .filter(entry => entry.name !== entry.url);

    $.logger.print`Found services: ${list.map(x => x.name)}`;

    for (const file of list) {
        file.content = await download(file.url);
    }

    await $.fs.remove('./src/api/**/*.dtos.ts');

    for (const file of list) {
        await $.fs.write(`./src/api/Rest/dtos/${file.lcName}.dtos.ts`, file.content);
    }

    await $.run(dev_dtos_morph);

    await $.fs.write(
        './src/api/Rest/dtos/index.ts',
        list
            .map(item => `export * as ${item.lcName} from './${item.lcName}';\n`)
            .join(''),
    );

    for (const file of list) {
        await $.fs.edit(`./src/api/Rest/dtos/${file.lcName}.dtos.ts`,
            text => `// @ts-ignore\n// @ts-nocheck\n${text}`,
        );
    }
});
