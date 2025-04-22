import { createBrowserHistory } from 'history';
import { action, autorun } from 'mobx';
import { E, lang, restClient } from '~/api';
import * as routing from '~/api/Router';
import { isEnum, utilsString } from '~/utils';
import { stores } from '.';

const {
    Router,
    param,
    route,
    zone,
} = routing;

const genParam = {
    numId: <T extends string>(k: T) => param(k, utilsString.toNumber, String),
    strId: <T extends string>(k: T) => param(k, x => x, x => x),
    enum: <Enum extends Record<string, string>>(e: Enum) => <T extends string>(k: T) => param(k, x => (isEnum(e)(x) ? x : undefined), x => x),
};

export class Display {
    isLoading = false;

    isAdmin = false;

    isSuperAdmin = false;

    step?: number;

    isConstructionType = true;

    backFrom: {
        consultantProject?: () => void;
        designProject?: () => void;
        contract?: () => void;
        stage?: () => void;
        bid?: () => void;
        userManagementProfile?: () => void;
        companiesManagementProfile?: () => void;
        inviteContractor?: () => void;
        previous?: () => void;
        buy?: () => void;
    } = {};

    router = new Router(createBrowserHistory(), {
        home: route([]),
        newProjects: route(['new-projects']),
        notifications: route(['notifications']),
        invitations: route(['invitations']),
        buy: route(['buy']),
        clientDesign: route(['clientDesign']),
        build: route(['build']),
        invites: route(['invites']),
        project: zone(['project'], {
            list: route([]),
            create: route(['create']),
            sub: zone([genParam.numId('id')], {
                details: route(['details']),
                contract: route(['contract']),
                design: route(['design', genParam.numId('designId')]),
                management: route(['management', genParam.enum(E.PmModuleMenu)('tab')]),
            }),
        }),
        design: route(['design', genParam.numId('designId')]),
        admin: zone(['admin'], {
            home: route([]),
            dashboard: route(['dashboard']),
            listedprojects: zone(['listedprojects'], {
                buyprojects: route(['buyprojects']),
            }),
            projects: zone(['project'], {
                create: route(['create']),
                sub: zone([genParam.numId('id')], {
                    details: zone(['details'], {
                        stageList: zone(['stage'], {
                            details: route([genParam.numId('stageId')]),
                        }),
                    }),
                    notesTasks: route(['notes-tasks']),
                    log: route(['log']),
                    bids: route(['bids']),
                    bidsQuestions: route(['bids-questions']),
                    contract: route(['contract']),
                    design: zone(['design'], {
                        designDetails: route(['details']),
                        designNotesTasks: route(['notes-tasks']),
                        designLog: route(['log']),
                        designDocuments: route(['documents']),
                    }),
                    management: route(['management', genParam.enum(E.PmModuleMenu)('tab')]),
                }),
            }),
            companies: zone(['companies'], {
                sub: route(
                    [
                        genParam.enum(E.ProfileType)('type'),
                        genParam.numId('companyId'),
                        genParam.enum(E.CompanyMenu)('menu'),
                    ],
                ),
            }),
            users: zone(['users'], {
                sub: zone([genParam.numId('id')], {
                    projects: route(['projects']),
                    companyAssociations: route(['company-associations']),
                    invoices: route(['invoices']),
                    reviews: route(['reviews']),
                    notesTasks: route(['notes-tasks']),
                    log: route(['log']),
                }),
            }),
            invoices: route(['invoices']),
            sow: zone(['sow'], {
                create: route(['create']),
                details: route([
                    genParam.numId('sowId'),
                    'details',
                ]),
                createItem: route([
                    genParam.numId('sowId'),
                    'item',
                    'create',
                ]),
                item: route([
                    genParam.numId('sowId'),
                    'item',
                    genParam.numId('itemId'),
                ]),
            }),
            contract: route(['contract']),
            stage: zone(['stage'], {
                create: route(['create']),
                details: route([
                    genParam.numId('stageId'),
                    'details',
                ]),
            }),
            content: route(['content']),
            company: zone(['company'], {
                createbadge: route(['createbadge'])
            }),
            reviews: route(['reviews']),
            help: route(['help']),
        }),
        settings: route(['settings', genParam.strId('tab')]),
        company: zone(['company'], {
            register: route(['register']),
            edit: route(['edit', genParam.enum(E.ProfileType)('type'), genParam.numId('id'), genParam.enum(E.CompanySteps)('step')]),
        }),
        client: route(['client']),
        context: zone([genParam.enum(E.RoleInCompany)('type')], {
            details: route(['view', genParam.numId('id')]),
            project: zone(['project', genParam.numId('id')], {
                contract: route(['contract']),
                management: route(['management', genParam.enum(E.PmModuleMenu)('tab')]),
            }),
        }),
        authCallback: route(['auth', 'callback']),
    });

    constructor() {
        makeSafeObservable(this, {
            setLoading: action,
            setAdmin: action,
            setSuperAdmin: action,
            setStep: action,
            resetStep: action,
            resetBackFrom: action,
        });

        restClient.setOnAdminRoute(() => this.router.$.admin.match);

        autorun(() => {
            if (this.router.$.admin.match) {
                lang.setForced('en');
                return;
            }

            lang.removeForced();
        });
    }

    get profile() {
        return stores.profile.currentProfile;
    }

    setLoading = (value: boolean) => {
        this.isLoading = value;
    };

    setAdmin = () => {
        this.isAdmin = true;
    };

    setSuperAdmin = () => {
        this.isAdmin = true;
        this.isSuperAdmin = true;
    };

    registerBackFrom = (name: keyof Display['backFrom'], fn: () => void) => {
        this.backFrom[name] = fn;
    };

    runBackFrom = (name: keyof Display['backFrom']) => {
        const fn = this.backFrom[name];

        if (fn) {
            fn();
            this.backFrom[name] = undefined;

            return true;
        }

        return false;
    };

    resetBackFrom = (name: keyof Display['backFrom']) => {
        this.backFrom[name] = undefined;
    };

    setStep = () => {
        this.step = 3;
    };

    resetStep = () => {
        this.step = undefined;
    };

    setConstructionType = (isConstruction: boolean) => {
        this.isConstructionType = isConstruction;
    };
}
