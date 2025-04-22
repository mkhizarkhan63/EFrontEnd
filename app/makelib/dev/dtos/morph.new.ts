import { type Bunbun } from '@nodi/bunbun';

type FileContext = {
    comments: string[];
};

type File = {
    path: string;
    content: string;
    ctx: FileContext;
};

type Context = {
    files: File[];
};

const createFileContext = () => ({
    comments: [],
});

enum EatingFlag {
    NIL,
    ML_COMMENT,
}

type ReaderContext = {
    eating: EatingFlag;
};

const WS = /^[\s\r\n]+/
const SL_COMMENT = /^\/{2}\s*(.*)\s*\r?\n/;
const ML_COMMENT = /^\/\*\s*([^]*?(?<!\\)(?:\\\\)*)\s*\*\/$/mi;

const readFile = async (file: File) => {
    let { content, ctx } = file;
    let m: RegExpExecArray | null = null;

    const rctx: ReaderContext = {
        eating: EatingFlag.NIL,
    };

    while (content.length) {
        m = null;

        if (m = WS.exec(content)) {
            content = content.slice(m[0].length);
            continue;
        }

        if (m = SL_COMMENT.exec(content)) {
            content = content.slice(m[0].length);
            ctx.comments.push(m[1]);
            continue;
        }

        if (m = ML_COMMENT.exec(content)) {
            content = content.slice(m[0].length);
            ctx.comments.push(m[1]);
            continue;
        }

        return;
        throw new Error('Cannot understand part of code...');
    }
};

export const morph = async ($: Bunbun<unknown>, files: string[]) => {
    const ctx: Context = {
        files: [],
    };

    await Promise.all(files.map(async path => {
        const content = await $.fs.read(path);
        ctx.files.push({
            content,
            path,
            ctx: createFileContext(),
        });
    }));

    for (const file of ctx.files) {
        await readFile(file);
        console.log(file.ctx);
        // for testing purpose only ^
    }

    // await Promise.all(ctx.files.map(async file => await readFile(file)));
};
