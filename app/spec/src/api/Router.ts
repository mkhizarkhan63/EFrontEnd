import { describe, it, expect } from '~cypress';
import { createMemoryHistory } from 'history';
import { routing } from '~/api';
import { autorun } from 'mobx';

const {
    Router,
    param,
    route,
    zone,
} = routing;

const genParam = {
    id: () => param(
        'id',
        x => {
            const res = parseInt(x, 10);

            if (isNaN(res)) {
                return;
            }

            return res;
        },
        x => String(x),
    ),
    code3: () => param(
        'code',
        x => x.length === 3 ? x : undefined,
        x => x,
    ),
};

const createData = () => {
    const history = createMemoryHistory();
    const router = new Router(history, {
        home: route([]),
        user: zone(['user', genParam.id()], {
            profile: route([]),
            invite: route(['invite']),
            join: route(['code', genParam.code3()]),
        }),
        admin: zone(['admin'], {
            users: zone(['user', genParam.id()], {
                list: route([]),
                edit: route(['edit', genParam.code3()]),
            }),
        }),
    });

    return {
        history,
        router,
    };
}

describe('api/Router', () => {
    describe('paths reading', () => {
        it('/', () => {
            const { history, router } = createData();

            history.push('/');

            expect(router.$.home.match, 'home.match').to.be.eq(true);
            expect(router.$.admin.match, 'admin.match').to.be.eq(false);
        });

        it('/user/[id]', () => {
            const { history, router } = createData();

            const id = 10;
            const path = `/user/${id}`;

            cy.log(`goto: ${path}`).then(() => {
                history.push(path);

                expect(router.$.home.match, 'home.match').to.be.eq(false);
            });

            cy.log('-- zone --').then(() => {
                expect(router.$.user.match, 'user.match').to.be.eq(true);
                expect(router.$.user.params.id, 'user.match[id]').to.be.eq(id);
            });

            cy.log('-- route --').then(() => {
                expect(router.$.user.$.profile.match, 'user.profile.match').to.be.eq(true);
                expect(router.$.user.$.profile.params.id, 'user.profile[id]').to.be.eq(id);
            });
        });

        it('/user/[id]/invite', () => {
            const { history, router } = createData();

            const id = 11;
            const path = `/user/${id}/invite`;

            cy.log(`goto: ${path}`).then(() => {
                history.push(path);

                expect(router.$.home.match, 'home.match').to.be.eq(false);
            });

            cy.log('-- zone --').then(() => {
                expect(router.$.user.match, 'user.match').to.be.eq(true);
                expect(router.$.user.params.id, 'user[id]').to.be.eq(id);
            });

            cy.log('-- route --').then(() => {
                expect(router.$.user.$.invite.match, 'user.invite.match').to.be.eq(true);
                expect(router.$.user.$.invite.params.id, 'user.invite[id]').to.be.eq(id);
            });
        });

        it('/user/[id]/code/[code]', () => {
            const { history, router } = createData();

            const id = 12;
            const code = 'abc';
            const path = `/user/${id}/code/${code}`;

            cy.log(`goto: ${path}`).then(() => {
                history.push(path);

                expect(router.$.home.match).to.be.eq(false);
            });

            cy.log('-- zone --').then(() => {
                expect(router.$.user.match, 'user.match').to.be.eq(true);
                expect(router.$.user.params.id, 'user[id]').to.be.eq(id);
                expect((router.$.user.params as unknown as Record<string, unknown>).code, 'user[code]')
                    .to.be.not.eq(code);
            });

            cy.log('-- route --').then(() => {
                expect(router.$.user.$.join.match, 'user.join.match').to.be.eq(true);
                expect(router.$.user.$.join.params.id, 'user.join[id]').to.be.eq(id);
                expect(router.$.user.$.join.params.code, 'user.join[code]').to.be.eq(code);
            });
        });

        it('/admin/user/[id]/edit/[code]', () => {
            const { history, router } = createData();

            const id = 13;
            const code = 'zxc';
            const path = `/admin/user/${id}/edit/${code}`;

            cy.log(`goto: ${path}`).then(() => {
                history.push(path);

                expect(router.$.home.match).to.be.eq(false);
            });

            cy.log('-- zone:1 --').then(() => {
                expect(router.$.admin.match, 'admin.match').to.be.eq(true);
                expect((router.$.admin.params as unknown as Record<string, unknown>).id, 'admin[id]')
                    .to.be.not.eq(id);
                expect((router.$.admin.params as unknown as Record<string, unknown>).code, 'admin[code]')
                    .to.be.not.eq(code);
            });

            cy.log('-- zone:2 --').then(() => {
                expect(router.$.admin.$.users.match, 'admin.users.match').to.be.eq(true);
                expect(router.$.admin.$.users.params.id, 'admin.users[id]')
                    .to.be.eq(id);
                expect((router.$.admin.$.users.params as unknown as Record<string, unknown>).code, 'admin.users[code]')
                    .to.be.not.eq(code);
            });

            cy.log('-- route --').then(() => {
                expect(router.$.admin.$.users.$.edit.match, 'admin.users.edit.match').to.be.eq(true);
                expect(router.$.admin.$.users.$.edit.params.id, 'admin.users.edit[id]').to.be.eq(id);
                expect(router.$.admin.$.users.$.edit.params.code, 'admin.users.edit[code]').to.be.eq(code);
            });
        });
    });

    it('variables have to be valid', () => {
        const { history, router } = createData();

        const validId = 0;
        const invalidId = 'x';

        const validCode = 'abc';
        const invalidCode = 'abcabc';

        const path1 = `/user/${invalidId}/code/${invalidCode}`;
        const path2 = `/user/${validId}/code/${invalidCode}`;
        const path3 = `/user/${validId}/code/${validCode}`;

        cy.log(`goto: ${path1}`).then(() => {
            history.push(path1);

            expect(router.$.user.match, 'user.match').to.not.be.eq(true);
            expect(router.$.user.params.id, 'user[id]').to.not.be.eq(validId);
            expect(router.$.user.params.id, 'user[id]').to.not.be.eq(invalidId);

            expect(router.$.user.$.join.match, 'user.join.match').to.not.be.eq(true);
            expect(router.$.user.$.join.params.id, 'user.join[id]').to.not.be.eq(validId);
            expect(router.$.user.$.join.params.id, 'user.join[id]').to.not.be.eq(invalidId);
            expect(router.$.user.$.join.params.code, 'user.join[code]').to.not.be.eq(validCode);
            expect(router.$.user.$.join.params.code, 'user.join[code]').to.not.be.eq(invalidCode);
        });

        cy.log(`goto: ${path2}`).then(() => {
            history.push(path2);

            expect(router.$.user.match, 'user.match').to.be.eq(true);
            expect(router.$.user.params.id, 'user[id]').to.be.eq(validId);
            expect(router.$.user.params.id, 'user[id]').to.not.be.eq(invalidId);

            expect(router.$.user.$.join.match, 'user.join.match').to.not.be.eq(true);
            expect(router.$.user.$.join.params.id, 'user.join[id]').to.not.be.eq(validId);
            expect(router.$.user.$.join.params.id, 'user.join[id]').to.not.be.eq(invalidId);
            expect(router.$.user.$.join.params.code, 'user.join[code]').to.not.be.eq(validCode);
            expect(router.$.user.$.join.params.code, 'user.join[code]').to.not.be.eq(invalidCode);
        });

        cy.log(`goto: ${path3}`).then(() => {
            history.push(path3);

            expect(router.$.user.match, 'user.match').to.be.eq(true);
            expect(router.$.user.params.id, 'user[id]').to.be.eq(validId);
            expect(router.$.user.params.id, 'user[id]').to.not.be.eq(invalidId);

            expect(router.$.user.$.join.match, 'user.join.match').to.be.eq(true);
            expect(router.$.user.$.join.params.id, 'user.join[id]').to.be.eq(validId);
            expect(router.$.user.$.join.params.id, 'user.join[id]').to.not.be.eq(invalidId);
            expect(router.$.user.$.join.params.code, 'user.join[code]').to.be.eq(validCode);
            expect(router.$.user.$.join.params.code, 'user.join[code]').to.not.be.eq(invalidCode);
        });
    });

    it('routes have to be observable', () => {
        const { history, router } = createData();

        let isMatch = false;
        let code = '';

        const dispose = autorun(() => {
            isMatch = router.$.user.$.join.match;
            code = router.$.user.$.join.params.code;
        });

        const pathCode1 = 'abc';
        const path1 = `/user/0/code/${pathCode1}`;
        const pathCode2 = 'def';
        const path2 = `/user/0/code/${pathCode2}`;

        cy.log(`goto: ${path1}`).then(() => {
            history.push(path1);

            expect(isMatch, 'isMatch').to.be.eq(true);
            expect(code, 'code').to.be.eq(pathCode1);
        });

        cy.log(`goto: ${path2}`).then(() => {
            history.push(path2);

            expect(isMatch, 'isMatch').to.be.eq(true);
            expect(code, 'code').to.be.eq(pathCode2);
        });

        cy.wait(0).then(() => {
            dispose();
        });
    });

    it('path navigate by route', () => {
        const { history, router } = createData();

        let isMatch = false;
        let code = '';

        const dispose = autorun(() => {
            isMatch = router.$.user.$.join.match;
            code = router.$.user.$.join.params.code;
        });

        const validArgs = {
            id: 0,
            code: 'abc',
        };

        const invalidArgs = {
            id: 0,
            code: 'abcd',
        };

        cy.log('valid navigate', validArgs).then(() => {
            router.$.user.$.join.go(validArgs);

            expect(history.location.pathname, 'path')
                .to.be.eq(`/user/${validArgs.id}/code/${validArgs.code}`);
            expect(isMatch, 'isMatch').to.be.eq(true);
            expect(code, 'code').to.be.eq(validArgs.code);
        });

        cy.log('invalid navigate', invalidArgs).then(() => {
            router.$.user.$.join.go(invalidArgs);

            expect(history.location.pathname, 'path')
                .to.be.eq(`/user/${invalidArgs.id}/code/${invalidArgs.code}`);
            expect(isMatch, 'isMatch').to.be.eq(false);
            expect(code, 'code').to.not.be.eq(invalidArgs.code);
        });

        cy.wait(0).then(() => {
            dispose();
        });
    });
});
