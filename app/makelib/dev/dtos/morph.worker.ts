import { $ } from '../../main';
import {
    Project,
    SourceFile,
    ClassDeclaration,
    InterfaceDeclaration,
    EnumDeclaration,
    ts,
} from 'ts-morph';
import { expose } from 'threads';

type Route = boolean | {
    path: string;
    method: string;
    responseType: string;
};

type Entry = {
    name: string;
    type: 'interface' | 'class' | 'enum';
    range: [a: number, b: number];
    route: Route;
    refsPos: number[];
};

type ContentfulEntry = {
    name: string;
    type: 'class';
    route: Route;
    props: Array<{
        name: string;
        isOptional: boolean;
        isArray: boolean;
        type: string;
    }>;
} | {
    name: string;
    type: 'enum';
    props: Array<{
        name: string;
        value: string | number | undefined;
    }>;
} | {
    name: string;
    type: 'interface';
    props: Array<{
        name: string;
        isOptional: boolean;
        isArray: boolean;
        type: string;
    }>;
};

type Context = {
    entries: Entry[];
    data: ContentfulEntry[];
    responses: Record<string, string>;
};

type Declarations =
    | ClassDeclaration
    | InterfaceDeclaration
    | EnumDeclaration;

// --- Templates ---

const filePrefix =
    `
import * as T from 'superstruct';
import { restClient } from '~/api';

const tSpecialOptional = <T, S>(struct: T.Struct<T, S>): T.Struct<T | undefined, S> => new T.Struct({
    ...struct,
    coercer: (value, ctx) => struct.coercer(value === null ? undefined : value, ctx),
    validator: (value, ctx) =>
        value === undefined || struct.validator(value, ctx),
    refiner: (value, ctx) =>
        value === undefined || struct.refiner(value, ctx),
});

const voidStruct = T.unknown;

const ObjectStruct = () => T.type({});

const BlobStruct = () => T.instance(Blob);
`.trim();

const lcFirstChar = (text: string) => text.replace(/./, char => char.toLowerCase());

const lcAllUpper = (text: string) => text === text.toUpperCase() ? text.toLowerCase() : text;

const nameToStruct = (name: string) => `${name}Struct`;

const createOptional = (kind: string, isOptional: boolean) => isOptional
    ? `tSpecialOptional(${kind})`
    : kind;

const typeToStructType = (type: string, isOptional: boolean, isArray: boolean, parentName = ''): string => {
    if (/[^a-z0-9_]/i.test(type) && type !== '{}') {
        return 'T.unknown()';
    }

    if (parentName === type) {
        return `T.lazy(() => ${typeToStructType(type, isOptional, isArray)})`
    }

    if (isOptional) {
        return createOptional(typeToStructType(type, false, isArray), true);
    }

    if (isArray) {
        return `T.array(${typeToStructType(type, false, false)})`;
    }

    // record
    if (type.toLowerCase() === 'object' || type === '{}') {
        return 'T.record(T.string(), T.unknown())';
    }

    // natives
    for (const nativeType of ['string', 'number', 'boolean', 'unknown']) {
        if (type === nativeType) {
            return `T.${nativeType}()`
        }
    }

    // custom
    return `${nameToStruct(type)}()`;
};

const typeToType = (type: string) => {
    if (type.toLowerCase() === 'object') {
        return 'Record<string, unknown>';
    }

    return type;
};

const writeClassType = (data: ContentfulEntry & { type: 'class' | 'interface' }) => {
    if (data.props.length === 0) {
        return `export type ${data.name} = undefined;\n`;
    }

    const props = data.props.map(x => [
        '    ',
        x.name,
        x.isOptional ? '?' : '',
        ': ',
        typeToType(x.type),
        x.isArray ? '[];' : ';'
    ].join('')).join('\n');

    return [
        'export type ',
        data.name,
        ' = {\n',
        props,
        '\n};\n',
    ].join('');
};

const writeClassStruct = (data: ContentfulEntry & { type: 'class' | 'interface' }) => {
    if (data.props.length === 0) {
        return `export const ${nameToStruct(data.name)} = () => T.literal(undefined);\n`;
    }

    const props = data.props.map(x => [
        '    ',
        x.name,
        ': ',
        typeToStructType(x.type, x.isOptional, x.isArray, data.name),
        ',',
    ].join('')).join('\n');

    return [
        'export const ',
        nameToStruct(data.name),
        ' = (): T.Describe<',
        data.name,
        '> => (T.type({\n',
        props,
        '\n}) as unknown as T.Describe<',
        data.name,
        '>);\n',
    ].join('');
};

const writeClass = (data: ContentfulEntry & { type: 'class' | 'interface' }) => {
    return [
        writeClassType(data),
        writeClassStruct(data),
    ].join('\n');
};

const writeEnumStruct = (data: ContentfulEntry & { type: 'enum' }) => {
    const props = data.props.map(x => [
        '    ',
        data.name,
        '.',
        lcFirstChar(lcAllUpper(x.name)),
        ',',
    ].join('')).join('\n');

    return [
        'export const ',
        nameToStruct(data.name),
        ' = () => T.enums([\n',
        props,
        '\n]);\n',
    ].join('');
};

const writeEnumType = (data: ContentfulEntry & { type: 'enum' }) => {
    const props = data.props.map(x => [
        '    ',
        lcFirstChar(lcAllUpper(x.name)),
        ' = ',
        x.value,
        ','
    ].join('')).join('\n');

    return [
        'export enum ',
        data.name,
        ' {\n',
        props,
        '\n}\n',
    ].join('');
};

const writeEnum = (data: ContentfulEntry & { type: 'enum' }) => {
    return [
        writeEnumType(data),
        writeEnumStruct(data),
    ].join('\n');
};

const write = (data: ContentfulEntry) => {
    switch (data.type) {
        case 'class':
        case 'interface':
            return writeClass(data);

        case 'enum':
            return writeEnum(data);

        default:
            return '';
    }
};

const writeRoutes = (data: ContentfulEntry) => {
    if (data.type !== 'class' || typeof data.route === 'boolean') {
        return '';
    }

    const r = data.route;
    const methods = r.method
        .toLowerCase()
        .replace(/^\s+|\s+$/g, '')
        .split(/\s+/);

    const getNameOf = (method: string) => methods.length > 1
        ? `${data.name}${method.replace(/^(.)/, ch => ch.toUpperCase())}`
        : data.name

    return methods.map(method => [
        `export const exec${getNameOf(method)} = restClient.encloseQuery<${data.name}, ${r.responseType}>(`,
        `  props => T.create(props, ${nameToStruct(data.name)}()),`,
        `  async props => {`,
        `  return await restClient.execute(`,
        `    '${method}',`,
        `    '${r.path}',`,
        `    props,`,
        `  );`,
        ` },`,
        ` result => T.create(result, ${nameToStruct(r.responseType)}()),`,
        `);\n`
    ].join('\n')).join('\n\n');
};

// --- Parsing ---

const readInterface = (ctx: Context, entry: Entry, item: InterfaceDeclaration) => {
    ctx.data.push({
        name: entry.name,
        type: 'interface',
        props: item.getProperties()
            .map(item => ({
                name: item.getName(),
                isOptional: item.hasQuestionToken(),
                isArray: item.getType().isArray(),
                type: item.getType().getText()
                    .replace(/\[\]$/, ''),
            }))
            .map(item => {
                if (/[^a-z0-9_]+/i.test(item.type)) {
                    item.type = 'unknown';
                }
                return item;
            }),
    });
};

const readEnum = (ctx: Context, entry: Entry, item: EnumDeclaration) => {
    ctx.data.push({
        name: entry.name,
        type: 'enum',
        props: item.getMembers().map(item => ({
            name: item.getName(),
            value: item.getValue(),
        })),
    });
};

const readClass = (ctx: Context, entry: Entry, item: ClassDeclaration) => {
    ctx.data.push({
        name: entry.name,
        type: 'class',
        route: entry.route,
        props: item.getProperties()
            .map(item => ({
                name: item.getName(),
                isOptional: item.hasQuestionToken(),
                isArray: item.getType().isArray(),
                type: item.getType().getText().replace(/\[\]$/, ''),
            }))
            .map(item => {
                if (/[^a-z0-9_]+/i.test(item.type)) {
                    item.type = 'unknown';
                }
                return item;
            }),
    });
};

const getRouteInfo = (item: ClassDeclaration, responseType = 'unknown') => {
    let route: Route = false;

    for (const comment of item.getLeadingCommentRanges()) {
        const m = comment.getText().match(/\/{2}\s*@Route\("(.+?)"\s*,\s*"(.+?)"\)/);

        if (!m) {
            continue;
        }

        route = {
            path: String(m[1] || ''),
            method: String(m[2] || ''),
            responseType,
        };
    }

    if (!route) {
        return false;
    }

    return route;
};

const getRefsPos = (item: Declarations) => {
    const refsPos: number[] = [];

    const selfStart = item.getStart();
    const selfEnd = item.getEnd();

    for (const refs of item.findReferences()) {
        for (const ref of refs.getReferences()) {
            const pos = ref.getNode().getPos();

            if (pos >= selfStart && pos <= selfEnd) {
                continue;
            }

            refsPos.push(pos);
        }
    }

    return refsPos;
};

const addEntry = (
    ctx: Context,
    item: Declarations,
    type: Entry['type'],
) => {
    const name = item.getName();

    if (!name) {
        return;
    }

    const response = ctx.responses[name];

    ctx.entries.push({
        name,
        type,
        range: [
            item.getStart(),
            item.getEnd(),
        ],
        route: type === 'class'
            ? getRouteInfo(item as ClassDeclaration, response)
            : false,
        refsPos: getRefsPos(item),
    });
};

const entryInEntry = (a: Entry, b: Entry) => {
    for (const ref of a.refsPos) {
        if (ref >= b.range[0] && ref <= b.range[1]) {
            return true;
        }
    }

    return false;
};

const resolveAll = (item: Declarations) => {
    item.toggleModifier('export', false);
};

const resolveClass = (item: ClassDeclaration) => {
    item.getMethods().forEach(x => x.remove());

    item.getConstructors().forEach(x => x.remove());

    item.getProperties().forEach(x =>
        x.toggleModifier('public', false)
    );

    const props = item.getType().getProperties()
        .concat(item.getImplements().filter(x => x.getTypeArguments().length === 0).flatMap(x => x.getType().getProperties()));

    for (const prop of props) {
        const name = prop.getName();

        const isOptional = prop
            .getDeclarations()
            .map(x => x.getText().includes('?'))
            .some(x => x === true);

        if (item.getProperty(name) || item.getMethod(name)) {
            continue;
        }

        const resolvedType = prop.getTypeAtLocation(item);

        item.addProperty({
            name,
            type: resolvedType.getText(),
            hasQuestionToken: resolvedType.isNullable() || isOptional,
        });
    }

    item.removeExtends();

    item.getImplements()
        .map((el, i) => i)
        .forEach(i => item.removeImplements(0));
};

const removeUnused = (file: SourceFile, ctx: Context) => {
    const passed = ctx.entries.filter(e => e.route);

    passed.forEach(x => {
        const responseType = typeof x.route !== 'boolean' && x.route.responseType;

        if (!responseType) {
            return;
        }

        const responseEntry = ctx.entries.find(el => el.name === responseType);

        if (!responseEntry || passed.includes(responseEntry)) {
            return;
        }

        passed.push(responseEntry);
    })

    let pass = false;

    do {
        pass = false;
        const entries = ctx.entries.filter(e => !passed.includes(e));

        promoting:
        for (const promoter of passed) {
            for (const recruit of entries) {
                if (entryInEntry(recruit, promoter)) {
                    passed.push(recruit);
                    pass = true;
                    break promoting;
                }
            }
        }
    } while (pass);

    for (const entry of ctx.entries) {
        if (passed.includes(entry)) {
            continue;
        }

        if (entry.type === 'class') {
            file.getClass(entry.name)?.remove();
            continue;
        }

        if (entry.type === 'enum') {
            file.getEnum(entry.name)?.remove();
            continue;
        }

        if (entry.type === 'interface') {
            file.getInterface(entry.name)?.remove();
            continue;
        }
    }
};

const readResponseType = (ctx: Context, item: ClassDeclaration) => {
    const name = item.getName();
    const response = item.getMethod('createResponse');

    if (response && name) {
        ctx.responses[name] = response.getReturnType().getText() || 'unknown';
    }
};

const parseFile = (file: SourceFile) => {
    const ctx: Context = {
        entries: [],
        data: [],
        responses: {},
    };

    // clear
    file.getChildrenOfKind(ts.SyntaxKind.ClassDeclaration)
        .forEach(item => resolveAll(item));

    file.getChildrenOfKind(ts.SyntaxKind.InterfaceDeclaration)
        .forEach(item => resolveAll(item));

    file.getChildrenOfKind(ts.SyntaxKind.EnumDeclaration)
        .forEach(item => resolveAll(item));

    // responseType
    file.getChildrenOfKind(ts.SyntaxKind.ClassDeclaration)
        .forEach(item => readResponseType(ctx, item));

    // resolve
    file.getChildrenOfKind(ts.SyntaxKind.ClassDeclaration)
        .forEach(item => resolveClass(item));

    // reference
    file.getChildrenOfKind(ts.SyntaxKind.ClassDeclaration)
        .forEach(item => addEntry(ctx, item, 'class'));

    file.getChildrenOfKind(ts.SyntaxKind.InterfaceDeclaration)
        .forEach(item => addEntry(ctx, item, 'interface'));

    file.getChildrenOfKind(ts.SyntaxKind.EnumDeclaration)
        .forEach(item => addEntry(ctx, item, 'enum'));

    removeUnused(file, ctx);

    for (const entry of ctx.entries) {
        if (entry.type === 'class') {
            const dataItem = file.getClass(entry.name);

            if (dataItem) {
                readClass(ctx, entry, dataItem);
            }

            continue;
        }

        if (entry.type === 'enum') {
            const dataItem = file.getEnum(entry.name);

            if (dataItem) {
                readEnum(ctx, entry, dataItem);
            }

            continue;
        }

        if (entry.type === 'interface') {
            const dataItem = file.getInterface(entry.name);

            if (dataItem) {
                readInterface(ctx, entry, dataItem);
            }

            continue;
        }
    }

    return ctx.data;
};

const morphSourceFile = async (file: SourceFile) => {
    const path = file.getFilePath();
    $.logger.print`+ [Thread] Parsing: ${path}`;
    const data = parseFile(file);

    const content = [
        filePrefix,
        '\n\n',
        data.map(write).join('\n').trim(),
        '\n\n',
        data.map(writeRoutes).filter(x => x).join('\n').trim(),
        '\n',
    ]
        .join('')
        .replace(/BaseSingleResponse\<([^>]+)\>Struct\(\)/gi, 'T.type({ result: T.$1(), })')
        .replace(/BaseSingleResponse\<([^>]+)\>/gi, '{ result: $1; }');

    await $.fs.write(path, content);
};

const morphFile = async (file: string) => {
    const project = new Project({
        skipAddingFilesFromTsConfig: true,
    });

    const content = await $.fs.read(file);
    const targetFile = file.replace(/\.dtos\.ts$/i, '.ts');

    await $.fs.write(
        targetFile,
        content
            .replace(/IReadOnlyCollection<(.*?)>/gi, '$1[]')
            .replace(/(class\s+JsonPatchElement[^{]+{[^}]+value\s*:\s*)Object(\s*;[^}]+})/gi, '$1unknown$2'),
    );

    project.addSourceFilesAtPaths(targetFile);

    for (const file of project.getSourceFiles()) {
        await morphSourceFile(file);
    }
};

const main = async (file: string) => {
    await morphFile(file);
};

expose({
    async morph(file: string) {
        await main(file);
    },
});
