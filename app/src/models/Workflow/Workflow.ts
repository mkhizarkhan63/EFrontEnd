import { action, runInAction, observable, reaction } from 'mobx';
import { stores } from '~/stores';
import { Id, restQuery } from '~/api';
import {
    Checklist,
} from './Data';

const DataEditors = {
    checklist: Checklist,
} as const;

export class Workflow {
    sowId = Id.none();

    sowSubItemId = Id.none();

    typeId = Id.none();

    tasksValues = new Map<number, InstanceType<typeof DataEditors[keyof typeof DataEditors]>>();

    isNeeded = false;

    isChanged = false;

    constructor() {
        makeSafeObservable(this, {
            tasksValues: observable.deep,
            setTypeId: action,
            setTask: action,
            getEditor: false,
            download: false,
            commit: false,
        });

        reaction(
            () => [
                this.combinedId,
                this.isNeeded,
            ],
            ([combinedId, isNeeded]) => {
                if (!combinedId || !isNeeded) {
                    return;
                }

                this.download();
            },
        );
    }

    get name() {
        return this.type?.nameEn ?? '';
    }

    get combinedIdAsStr() {
        return [
            this.typeId.asStr(),
            this.sowSubItemId.asStr(),
            this.sowId.asStr(),
        ].join('__');
    }

    get combinedId() {
        if (
            this.typeId.isType('internal') ||
            this.sowSubItemId.isType('internal') ||
            this.sowId.isType('internal')
        ) {
            return false;
        }

        return this.combinedIdAsStr;
    }

    get type() {
        return stores.workflows.workflows.get(this.typeId, true);
    }

    get isEmpty() {
        return (
            this.typeId.isNone() ||
            this.sowSubItemId.isNone() ||
            this.sowId.isNone() ||
            stores.workflows.workflows.get(this.typeId) === undefined
        );
    }

    get isEmptyButItemOptional() {
        return (
            this.typeId.isNone() ||
            this.sowId.isNone()
        );
    }

    markAsNeeded = () => {
        this.isNeeded = true;
    };

    markAsChanged = () => {
        this.isChanged = true;
    };

    download = async () => {
        runInAction(() => {
            this.isNeeded = false;
        });
        try {
            await restQuery.workflow.getWorkflowDetails(this, false);
        } catch (error) {
            // ignore coz maybe no needed
        }
    };

    commit = async () => {
        await restQuery.workflow.saveWorkflowActionsValues(this);
    };

    getStrignifyData = (id: number) => {
        const item = this.tasksValues.get(id);

        if (!item) {
            return '';
        }

        return item.strignify();
    };

    clear = () => {
        this.typeId.clear();
    };

    setTypeId = (id: Id) => {
        this.typeId.replaceWith(id);
    };

    setTask = (id: number, value?: string) => {
        if (!value) {
            return;
        }

        for (const Editor of Object.values(DataEditors)) {
            try {
                const editor = Editor.init(value);
                this.tasksValues.set(id, editor);
            } catch (error) {
                continue;
            }
        }
    };

    initEditor = (taskId: number, txt?: string) => {
        try {
            if (typeof txt !== 'string') {
                return;
            }

            const obj = JSON.parse(txt);

            if (typeof obj !== 'object' && obj !== null) {
                return;
            }

            if (!('type' in obj)) {
                return;
            }

            const type = obj.type as keyof typeof DataEditors;

            const e = DataEditors[type].init(txt);

            runInAction(() => {
                this.tasksValues.set(taskId, e);
            });
        } catch (error) {
            // ignored
        }
    };

    getEditor = <K extends keyof typeof DataEditors>(taskId: number, type: K) => {
        const obj = this.tasksValues.get(taskId);

        if (obj instanceof DataEditors[type]) {
            return obj;
        }

        const newObj = new DataEditors[type]();
        runInAction(() => {
            setTimeout(() => {
                this.tasksValues.set(taskId, newObj);
            });
        });
        return newObj;
    };
}
