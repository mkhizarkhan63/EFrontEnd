import { action, runInAction } from 'mobx';
import { debug } from '~/api';

export class Status {
    failed = false;

    succeeded = false;

    working = false;

    tasks: Array<{ name: string; key: symbol }> = [];

    get isDone() {
        return (this.failed || this.succeeded) && this.tasks.length === 0;
    }

    get isLoading() {
        return !this.isDone;
    }

    get isWorking() {
        return this.working || this.tasks.length > 0;
    }

    constructor(
        readonly name?: string,
    ) {
        makeSafeObservable(this, {
            start: action,
            ok: action,
            fail: action,
            reset: action,
            createTask: action,
        });
    }

    createTask = (name: string) => {
        const key = Symbol(name);

        this.tasks.push({ name, key });

        return () => {
            runInAction(() => {
                this.tasks = this.tasks
                    .filter(item => item.key !== key);
            });
        };
    };

    start = () => {
        this.working = true;
    };

    ok = () => {
        this.succeeded = true;
        this.working = false;
    };

    fail = (error?: unknown) => {
        this.failed = true;
        this.working = false;

        debug.print([
            `Task "${this.name ?? '[unnamed]'}" failed, status manager catch:`,
            error ?? '[without received error]',
        ], 'api/Status');
    };

    reset = () => {
        this.succeeded = false;
        this.failed = false;
        this.working = false;
    };
}
