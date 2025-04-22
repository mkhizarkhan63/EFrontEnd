/// <reference types="cypress" />
/// <reference types="cypress-file-upload" />

import 'cypress-file-upload';
import 'cypress-plugin-tab';

import type { EventEmitter } from 'events';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';
import { xRef } from '~/utils';

const w = window as any;
type cy = Cypress.cy & EventEmitter;
type Cypress = Cypress.Cypress & EventEmitter;
export const cy: cy = w.cy;
export const Cypress: Cypress = w.Cypress;
export const expect: Chai.ExpectStatic = w.expect;
export const assert: Chai.AssertStatic = w.assert;
export const describe: Mocha.SuiteFunction = w.describe;
export const context: Mocha.SuiteFunction = w.context;
export const xdescribe: Mocha.PendingSuiteFunction = w.xdescribe;
export const xcontext: Mocha.PendingSuiteFunction = w.xcontext;
export const before: Mocha.HookFunction = w.before;
export const beforeEach: Mocha.HookFunction = w.beforeEach;
export const after: Mocha.HookFunction = w.after;
export const afterEach: Mocha.HookFunction = w.afterEach;
export const it: Mocha.TestFunction = w.it;
export const test: Mocha.TestFunction = w.test;
export const xit: Mocha.PendingTestFunction = w.xit;

const css = {
	lastUpdate: 0,
	content: '',
};

(window as any).__cy_document = {};

/** @deprecated use `mount` instead */
export const preMount = (component: React.ReactElement) => {
	throw new Error('Don\'t use "preMount".');
	return mount(() => component);
};

export const mount = (component: () => React.ReactElement) => {
	cy
		.reload({ log: false })
		.document({ log: false }).then(doc => {
			(window as any).__cy_document = doc;
		});

	if (Date.now() - css.lastUpdate > 500) {
		cy.readFile('./build/index.css', { log: false }).then(data => {
			css.lastUpdate = Date.now();
			css.content = data;
		});
	}

	return cy
		.document({ log: false })
		.then(doc => {
			(window as any).__cy_document = doc;
			doc.head.innerHTML = '';
			doc.body.innerHTML = `<div id="__cy_root"></div><style>${css.content}</style>`;
		})
		.log('@preparation')
		.document({ log: false })
		.then(doc => {
			render(React.createElement(observer(component)), doc.getElementById('__cy_root'));
		})
		.get('#__cy_root *', { log: false })
		.log('@mounted');
};

export const e2e = {
	host: () => {
		cy.task('host').then(port => {
			cy.log('port', port);
			Cypress.config('baseUrl', `http://localhost:${port}`);
		});
	}
};

/** @deprecated use `mount` instead */
export const observeAndMount = <T extends Record<string, unknown>>(
	dataGenerator: () => T,
	fn: (data: T) => JSX.Element,
) => {
	throw new Error('Don\'t use "observeAndMount".');
	const data = makeAutoObservable(dataGenerator());
	mount(observer(() => fn(data)));
	return data;
};

// --- command: setter for checkbox
declare global {
	namespace Cypress {
		interface Chainable {
			setCheck(check: boolean): Chainable;

			getRef<Key extends string>(xref: xRef.Connector<Key>, key: Key): Chainable<JQuery<HTMLElement>>;

			login(phoneNumber: string, code: string): Chainable;

			errorlessVisit(url: string): Chainable;
		}
	}
}
Cypress.Commands.add('setCheck', check => {
	const cmd = check
		? 'check' as const
		: 'uncheck' as const;
	return cy[cmd]();
});

Cypress.Commands.add('getRef', (ref, key) => {

	Cypress.log({
		name: 'getRef',
		displayName: 'getRef',
		message: `[${key}]`,
	});

	cy.then(() => {
		const el = ref.get(key) as unknown as HTMLElement;

		cy.wrap(el, { log: false }).then($el => {
			Cypress.log({
				$el,
				name: 'getRef',
				displayName: 'getRef',
				message: $el,
			});
		});
	});
});

Cypress.Commands.add('login', (phoneNumber, code) => {
	const args = {
		phoneNumber,
		code,
	};

	cy.origin('https://ebinaa-auth.test.softwarespace.io/', { args }, args => {
		const cx = (window.parent as any)['cy'] as cy;

		cx.intercept('https://ebina-api.test.softwarespace.io/profile/getprofilequery').as('profileQuery');
		cx.intercept('https://ebinaa-auth.test.softwarespace.io/connect/token').as('token');
		cx.intercept('https://ebinaa-auth.test.softwarespace.io/connect/userinfo').as('userInfo');

		cx.visit('/Identity/Account/Login');

		cx.get('.auth-form__input').type(args.phoneNumber);
		cx.get('.auth-form__btn').click();

		cx.get('#Input_CodeFirstDigit').type(args.code[0]);
		cx.get('#Input_CodeSecondDigit').type(args.code[1]);
		cx.get('#Input_CodeThirdDigit').type(args.code[2]);
		cx.get('#Input_CodeFourthDigit').type(args.code[3]);

		cx.get('.auth-form__btn').click();

		cx.wait(['@token', '@userInfo']);
		cx.wait('@profileQuery');
	});
});

Cypress.Commands.add('errorlessVisit', url => {
	cy.visit(url, {
		onBeforeLoad: win => cy.spy(win.console, 'error').as('consoleError'),
	});
});


