module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'tsconfigRootDir': __dirname,
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12,
		'sourceType': 'module',
		'project': 'tsconfig.json',
	},
	'plugins': [
		'react',
		'@typescript-eslint',
		'array-func',
		'import',
		'no-constructor-bind',
		'no-unsanitized',
		'promise',
		'react',
		'unicorn',
	],
	'settings': {
		'react': {
			'version': 'detect',
		},
	},
	"globals": {
		"getDocument": "readonly",
		"makeSafeObservable": "readonly",
		"JSX": "readonly",
	},
	'rules': {
		'linebreak-style': ['error', 'unix'],
		'quotes': ['error', 'single'],
		'@typescript-eslint/adjacent-overload-signatures': ['error'],
		'@typescript-eslint/array-type': ['error', {
			'default': 'array-simple',
			'readonly': 'array-simple',
		}],
		'@typescript-eslint/await-thenable': 'off',
		'@typescript-eslint/ban-ts-comment': ['error'],
		'@typescript-eslint/ban-tslint-comment': ['error'],
		'@typescript-eslint/ban-types': ['error', {
			'types': {
				'String': {
					'message': 'Use string instead',
					'fixWith': 'string',
				},
				'Boolean': {
					'message': 'Use boolean instead',
					'fixWith': 'boolean',
				},
				'Number': {
					'message': 'Use number instead',
					'fixWith': 'number',
				},
				'Symbol': {
					'message': 'Use symbol instead',
					'fixWith': 'symbol',
				},
				'Function': {
					'message': [
						'The `Function` type accepts any function-like value.',
						'It provides no type safety when calling the function, which can be a common source of bugs.',
						'It also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.',
						'If you are expecting the function to accept certain arguments, you should explicitly define the function shape.',
					].join('\n'),
					'fixWith': '() => void',
				},
				'Object': {
					'message': [
						'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
						'- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
						'- If you want a type meaning "any value", you probably want `unknown` instead.',
					].join('\n'),
					'fixWith': 'Record<string, unknown>',
				},
				'{}': {
					'message': [
						'`{}` actually means "any non-nullish value".',
						'- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
						'- If you want a type meaning "any value", you probably want `unknown` instead.',
					].join('\n'),
					'fixWith': 'Record<string, unknown>',
				},
			}
		}],
		'@typescript-eslint/brace-style': ['error', '1tbs', {
			'allowSingleLine': true,
		}],
		'@typescript-eslint/class-literal-property-style': ["error", "fields"],
		'@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
		'@typescript-eslint/comma-spacing': ['error', {
			'before': false,
			'after': true,
		}],
		'@typescript-eslint/consistent-indexed-object-style': ['error'],
		'@typescript-eslint/consistent-type-assertions': ['error', {
			'assertionStyle': 'as',
			'objectLiteralTypeAssertions': 'never',
		}],
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/consistent-type-exports': ['error', {
			'fixMixedExportsWithInlineTypeSpecifier': true,
		}],
		'@typescript-eslint/consistent-type-imports': ['error', {
			'prefer': 'type-imports',
		}],
		'@typescript-eslint/prefer-optional-chain': 'off',
		'unicorn/no-array-push-push': 'off',
		'@typescript-eslint/default-param-last': ['error'],
		'@typescript-eslint/dot-notation': ['error', {
			'allowPrivateClassPropertyAccess': false,
			'allowProtectedClassPropertyAccess': false,
			'allowIndexSignaturePropertyAccess': true,
		}],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': ['error', {
			'accessibility': 'no-public',
		}],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/func-call-spacing': ['error', 'never'],
		'@typescript-eslint/indent': ['error', 4, {
			'SwitchCase': 1,
			'VariableDeclarator': 1,
			'outerIIFEBody': 1,
			'MemberExpression': 1,
			'FunctionDeclaration': {
				'body': 1,
				'parameters': 2
			},
			'CallExpression': {
				'arguments': 1
			},
			'ArrayExpression': 1,
			'ObjectExpression': 1,
			'ImportDeclaration': 1,
			'flatTernaryExpressions': false,
			'ignoreComments': false,
		}],
		'@typescript-eslint/init-declarations': 'off',
		'@typescript-eslint/keyword-spacing': ['error', {
			'after': true,
			'before': true,
		}],
		'@typescript-eslint/lines-between-class-members': ['error', 'always'],
		'@typescript-eslint/member-delimiter-style': ['error', {
			'multiline': {
				'delimiter': 'semi',
				'requireLast': true,
			},
			'singleline': {
				'delimiter': 'semi',
				'requireLast': false,
			},
			'multilineDetection': 'brackets',
		}],
		'@typescript-eslint/member-ordering': 'off',
		'@typescript-eslint/method-signature-style': ['error', 'property'],
		'@typescript-eslint/naming-convention': ['error',
			{
				'selector': 'default',
				'format': ['strictCamelCase', 'PascalCase'],
				'leadingUnderscore': 'allow',
				'trailingUnderscore': 'allow',
			},
			{
				'selector': 'variableLike',
				'format': ['strictCamelCase'],
			},
			{
				'selector': 'variable',
				'format': ['camelCase', 'UPPER_CASE', 'PascalCase'],
				'leadingUnderscore': 'allow',
				'trailingUnderscore': 'allow',
			},
			{
				'selector': 'memberLike',
				'format': ['strictCamelCase'],
			},
			{
				'selector': 'method',
				'format': ['strictCamelCase', 'PascalCase'],
			},
			{
				'selector': 'property',
				'format': ['strictCamelCase'],
			},
			{
				'selector': 'typeLike',
				'format': ['PascalCase'],
			},
			{
				'selector': 'class',
				'format': ['PascalCase'],
			},
		],
		'@typescript-eslint/no-array-constructor': 'error',
		'@typescript-eslint/no-base-to-string': 'off',
		'@typescript-eslint/no-confusing-non-null-assertion': 'off',
		'@typescript-eslint/no-confusing-void-expression': 'off',
		'@typescript-eslint/no-dupe-class-members': 'off',
		'@typescript-eslint/no-duplicate-imports': 'off',
		'@typescript-eslint/no-dynamic-delete': 'off',
		'@typescript-eslint/no-empty-function': 'warn',
		'@typescript-eslint/no-empty-interface': 'warn',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-extra-non-null-assertion': 'error',
		'@typescript-eslint/no-extra-parens': ['warn', 'all', {
			'ignoreJSX': 'multi-line',
			'enforceForArrowConditionals': false,
			'enforceForNewInMemberExpressions': true,
		}],
		'@typescript-eslint/no-extra-semi': 'error',
		'@typescript-eslint/no-extraneous-class': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/no-for-in-array': 'error',
		'@typescript-eslint/no-implied-eval': 'error',
		'@typescript-eslint/no-inferrable-types': 'error',
		'@typescript-eslint/no-invalid-this': 'error',
		'@typescript-eslint/no-invalid-void-type': ['error', {
			'allowInGenericTypeArguments': true,
			'allowAsThisParameter': true,
		}],
		'@typescript-eslint/no-loop-func': 'warn',
		'@typescript-eslint/no-loss-of-precision': 'error',
		'@typescript-eslint/no-magic-numbers': 'off',
		'@typescript-eslint/no-meaningless-void-operator': 'error',
		'@typescript-eslint/no-misused-new': 'error',
		'@typescript-eslint/no-misused-promises': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
		'@typescript-eslint/no-non-null-assertion': 'error',
		'@typescript-eslint/no-parameter-properties': 'off',
		'@typescript-eslint/no-redeclare': 'error',
		'@typescript-eslint/no-require-imports': 'error',
		'@typescript-eslint/no-restricted-imports': 'off',
		'@typescript-eslint/no-shadow': 'warn',
		'@typescript-eslint/no-this-alias': 'off',
		'@typescript-eslint/no-throw-literal': 'off',
		'@typescript-eslint/no-type-alias': 'off',
		'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
		'@typescript-eslint/no-unnecessary-condition': 'off',
		'@typescript-eslint/no-unnecessary-qualifier': 'off',
		'@typescript-eslint/no-unnecessary-type-arguments': 'warn',
		'@typescript-eslint/no-unnecessary-type-assertion': 'off',
		'@typescript-eslint/no-unnecessary-type-constraint': 'off',
		'@typescript-eslint/no-unsafe-argument': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-unused-expressions': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-useless-constructor': 'error',
		'@typescript-eslint/no-var-requires': 'error',
		'@typescript-eslint/non-nullable-type-assertion-style': 'error',
		'@typescript-eslint/object-curly-spacing': ['error', 'always'],
		'@typescript-eslint/padding-line-between-statements': 'off',
		'@typescript-eslint/prefer-as-const': 'error',
		'@typescript-eslint/prefer-enum-initializers': 'error',
		'@typescript-eslint/prefer-for-of': 'warn',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/prefer-includes': 'error',
		'@typescript-eslint/prefer-literal-enum-member': 'error',
		'@typescript-eslint/prefer-namespace-keyword': 'off',
		'@typescript-eslint/prefer-nullish-coalescing': 'warn',
		'@typescript-eslint/prefer-readonly': 'off',
		'@typescript-eslint/prefer-readonly-parameter-types': 'off',
		'@typescript-eslint/prefer-reduce-type-parameter': 'error',
		'@typescript-eslint/prefer-regexp-exec': 'off',
		'@typescript-eslint/prefer-return-this-type': 'warn',
		'@typescript-eslint/prefer-string-starts-ends-with': 'error',
		'@typescript-eslint/prefer-ts-expect-error': 'off',
		'@typescript-eslint/promise-function-async': 'off',
		'@typescript-eslint/quotes': ['error', 'single', {
			'avoidEscape': true
		}],
		'@typescript-eslint/require-array-sort-compare': 'error',
		'@typescript-eslint/require-await': 'error',
		'@typescript-eslint/restrict-plus-operands': 'error',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/return-await': 'off',
		'@typescript-eslint/semi': ['error', 'always'],
		'@typescript-eslint/sort-type-union-intersection-members': 'off',
		'@typescript-eslint/space-before-function-paren': ['error', {
			'anonymous': 'never',
			'named': 'never',
			'asyncArrow': 'always',
		}],
		'@typescript-eslint/space-infix-ops': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/switch-exhaustiveness-check': 'off',
		'@typescript-eslint/triple-slash-reference': 'off',
		'@typescript-eslint/type-annotation-spacing': ['error', {
			'before': false,
			'after': true,
			'overrides': {
				'colon': {
					'before': false,
					'after': true,
				},
				'arrow': {
					'before': true,
					'after': true,
				},
			},
		}],
		'@typescript-eslint/typedef': 'off',
		'@typescript-eslint/unbound-method': 'error',
		'@typescript-eslint/unified-signatures': 'off',
		'accessor-pairs': 'off',
		'array-bracket-newline': ['error', {
			'multiline': true,
		}],
		'array-bracket-spacing': ['error', 'never'],
		'array-callback-return': 'warn',
		'array-element-newline': ['error', 'consistent'],
		'array-func/avoid-reverse': 'error',
		'array-func/from-map': 'off',
		'array-func/no-unnecessary-this-arg': 'error',
		'array-func/prefer-array-from': 'error',
		'array-func/prefer-flat': 'error',
		'array-func/prefer-flat-map': 'error',
		'arrow-body-style': ['warn', 'as-needed'],
		'arrow-parens': ['error', 'as-needed'],
		'arrow-spacing': ['error', {
			'before': true,
			'after': true
		}],
		'block-scoped-var': 'off',
		'block-spacing': ['error', 'always'],
		'brace-style': 'off',
		'camelcase': 'error',
		'capitalized-comments': 'off',
		'class-methods-use-this': 'off',
		'comma-dangle': 'off',
		'comma-spacing': 'off',
		'comma-style': ['error', 'last'],
		'complexity': 'off',
		'computed-property-spacing': ['error', 'never'],
		'consistent-return': 'off',
		'consistent-this': 'off',
		'constructor-super': 'error',
		'curly': ['error', 'all'],
		'default-case': 'off',
		'default-case-last': 'error',
		'default-param-last': 'off',
		'dot-location': ['error', 'property'],
		'dot-notation': 'off',
		'eol-last': ['error', 'always'],
		'eqeqeq': ['error', 'always', {
			'null': 'always',
		}],
		'for-direction': 'error',
		'func-call-spacing': 'off',
		'func-name-matching': 'off',
		'func-names': 'off',
		'func-style': 'off',
		'function-call-argument-newline': ['error', 'consistent'],
		'function-paren-newline': 'off',
		'generator-star-spacing': 'off',
		'getter-return': 'error',
		'grouped-accessor-pairs': 'error',
		'guard-for-in': 'off',
		'id-denylist': 'off',
		'id-length': 'off',
		'id-match': 'off',
		'implicit-arrow-linebreak': ['error', 'beside'],
		'import/default': 'error',
		'import/dynamic-import-chunkname': 'off',
		'import/export': 'error',
		'import/exports-last': 'off',
		'import/extensions': 'off',
		'import/first': 'error',
		'import/group-exports': 'off',
		'import/max-dependencies': 'off',
		'import/named': 'off',
		'import/namespace': 'off',
		'import/newline-after-import': 'error',
		'import/no-absolute-path': 'error',
		'import/no-amd': 'error',
		'import/no-anonymous-default-export': 'error',
		'import/no-commonjs': 'error',
		'import/no-cycle': 'off',
		'import/no-default-export': 'error',
		'import/no-deprecated': 'off',
		'import/no-duplicates': 'error',
		'import/no-dynamic-require': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/no-import-module-exports': 'off',
		'import/no-internal-modules': 'off',
		'import/no-mutable-exports': 'off',
		'import/no-named-as-default': 'off',
		'import/no-named-as-default-member': 'off',
		'import/no-named-default': 'off',
		'import/no-named-export': 'off',
		'import/no-namespace': 'off',
		'import/no-nodejs-modules': 'off',
		'import/no-relative-packages': 'off',
		'import/no-relative-parent-imports': 'off',
		'import/no-restricted-paths': 'off',
		'import/no-self-import': 'off',
		'import/no-unassigned-import': 'off',
		'import/no-unresolved': 'off',
		'import/no-unused-modules': 'off',
		'import/no-useless-path-segments': 'error',
		'import/no-webpack-loader-syntax': 'error',
		'import/order': 'off',
		'import/prefer-default-export': 'off',
		'import/unambiguous': 'off',
		'indent': 'off',
		'init-declarations': 'off',
		'jsx-quotes': ['error', 'prefer-double'],
		'key-spacing': ['error', {
			'beforeColon': false,
			'afterColon': true,
			'mode': 'strict'
		}],
		'keyword-spacing': ['error', {
			'before': true,
			'after': true,
		}],
		'line-comment-position': 'off',
		'linebreak-style': 'off',
		'lines-around-comment': 'off',
		'lines-between-class-members': ['error', 'always'],
		'max-classes-per-file': 'off',
		'max-depth': 'off',
		'max-len': ['error', 800],
		'max-lines': 'off',
		'max-lines-per-function': 'off',
		'max-nested-callbacks': 'off',
		'max-params': 'off',
		'max-statements': 'off',
		'max-statements-per-line': 'off',
		'multiline-comment-style': 'off',
		'multiline-ternary': ['error', 'always-multiline'],
		'new-cap': 'off',
		'new-parens': ['error', 'always'],
		'newline-per-chained-call': 'off',
		'no-alert': 'off', // because `confirm` is kinda useful
		'no-array-constructor': 'off',
		'no-async-promise-executor': 'error',
		'no-await-in-loop': 'off',
		'no-bitwise': 'off',
		'no-caller': 'error',
		'no-case-declarations': 'off',
		'no-class-assign': 'error',
		'no-compare-neg-zero': 'error',
		'no-cond-assign': 'error',
		'no-confusing-arrow': 'warn',
		'no-console': 'off',
		'no-const-assign': 'error',
		'no-constant-condition': 'warn',
		'no-constructor-bind/no-constructor-bind': 'error',
		'no-constructor-bind/no-constructor-state': 'error',
		'no-constructor-return': 'error',
		'no-continue': 'off',
		'no-control-regex': 'off',
		'no-debugger': 'error',
		'no-delete-var': 'warn',
		'no-div-regex': 'off',
		'no-dupe-args': 'off',
		'no-dupe-class-members': 'off',
		'no-dupe-else-if': 'error',
		'no-dupe-keys': 'off',
		'no-duplicate-case': 'error',
		'no-duplicate-imports': 'error',
		'no-else-return': 'error',
		'no-empty': 'error',
		'no-empty-character-class': 'off',
		'no-empty-function': 'off',
		'no-empty-pattern': 'error',
		'no-eq-null': 'error',
		'no-eval': 'error',
		'no-ex-assign': 'error',
		'no-extend-native': 'error',
		'no-extra-bind': 'error',
		'no-extra-boolean-cast': 'error',
		'no-extra-label': 'error',
		'no-extra-parens': 'off',
		'no-extra-semi': 'off',
		'no-fallthrough': 'warn',
		'no-floating-decimal': 'off',
		'no-func-assign': 'error',
		'no-global-assign': 'off',
		'no-implicit-coercion': 'error',
		'no-implicit-globals': 'off',
		'no-implied-eval': 'off',
		'no-import-assign': 'error',
		'no-inline-comments': 'off',
		'no-inner-declarations': 'error',
		'no-invalid-regexp': 'error',
		'no-invalid-this': 'off',
		'no-irregular-whitespace': 'error',
		'no-iterator': 'error',
		'no-label-var': 'error',
		'no-labels': 'error',
		'no-lone-blocks': 'error',
		'no-lonely-if': 'error',
		'no-loop-func': 'off',
		'no-loss-of-precision': 'off',
		'no-magic-numbers': 'off',
		'no-misleading-character-class': 'error',
		'no-mixed-operators': 'error',
		'no-mixed-spaces-and-tabs': 'error',
		'no-multi-assign': 'error',
		'no-multi-spaces': 'error',
		'no-multi-str': 'error',
		'no-multiple-empty-lines': ['error', {
			'max': 1,
			'maxEOF': 1,
			'maxBOF': 1,
		}],
		'no-negated-condition': 'off',
		'no-nested-ternary': 'error',
		'no-new': 'off',
		'no-new-func': 'error',
		'no-new-object': 'error',
		'no-new-symbol': 'error',
		'no-new-wrappers': 'error',
		'no-nonoctal-decimal-escape': 'error',
		'no-obj-calls': 'error',
		'no-octal': 'off',
		'no-octal-escape': 'off',
		'no-param-reassign': 'off',
		'no-plusplus': 'off',
		'no-promise-executor-return': 'off',
		'no-proto': 'off',
		'no-prototype-builtins': 'off',
		'no-redeclare': 'off',
		'no-regex-spaces': 'off',
		'no-restricted-exports': 'off',
		'no-restricted-globals': 'off',
		'no-restricted-imports': 'off',
		'no-restricted-properties': 'off',
		'no-restricted-syntax': 'off',
		'no-return-assign': 'error',
		'no-return-await': 'off',
		'no-script-url': 'error',
		'no-self-assign': 'off',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-setter-return': 'error',
		'no-shadow': 'off',
		'no-shadow-restricted-names': 'off',
		'no-sparse-arrays': 'off',
		'no-tabs': 'error',
		'no-template-curly-in-string': 'off',
		'no-ternary': 'off',
		'no-this-before-super': 'error',
		'no-throw-literal': 'off',
		'no-trailing-spaces': 'error',
		'no-undef': 'error',
		'no-undef-init': 'error',
		'no-undefined': 'off',
		'no-underscore-dangle': 'off',
		'no-unexpected-multiline': 'error',
		'no-unmodified-loop-condition': 'warn',
		'no-unneeded-ternary': 'warn',
		'no-unreachable': 'warn',
		'no-unreachable-loop': 'warn',
		'no-unsafe-finally': 'error',
		'no-unsafe-negation': 'error',
		'no-unsafe-optional-chaining': 'error',
		'no-unsanitized/method': 'warn',
		'no-unsanitized/property': 'warn',
		'no-unused-expressions': 'off',
		'no-unused-labels': 'error',
		'no-unused-private-class-members': 'warn',
		'no-unused-vars': 'off',
		'no-use-before-define': 'off',
		'no-useless-backreference': 'off',
		'no-useless-call': 'warn',
		'no-useless-catch': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-concat': 'error',
		'no-useless-constructor': 'off',
		'no-useless-escape': 'error',
		'no-useless-rename': 'error',
		'no-useless-return': 'error',
		'no-var': 'error',
		'no-void': 'error',
		'no-warning-comments': 'off',
		'no-whitespace-before-property': 'error',
		'no-with': 'error',
		'nonblock-statement-body-position': 'off',
		'object-curly-newline': 'off',
		'object-curly-spacing': 'off',
		'object-property-newline': 'off',
		'object-shorthand': 'off',
		'one-var': 'off',
		'one-var-declaration-per-line': 'off',
		'operator-assignment': 'off',
		'operator-linebreak': 'off',
		'padded-blocks': 'off',
		'padding-line-between-statements': 'off',
		'prefer-arrow-callback': 'error',
		'prefer-const': 'error',
		'prefer-destructuring': 'off',
		'prefer-exponentiation-operator': 'off',
		'prefer-named-capture-group': 'off',
		'prefer-numeric-literals': 'off',
		'prefer-object-has-own': 'off',
		'prefer-object-spread': 'error',
		'prefer-promise-reject-errors': 'off',
		'prefer-regex-literals': 'error',
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'promise/always-return': 'off',
		'promise/avoid-new': 'off',
		'promise/catch-or-return': 'off',
		'promise/no-callback-in-promise': 'error',
		'promise/no-native': 'off',
		'promise/no-nesting': 'error',
		'promise/no-new-statics': 'error',
		'promise/no-promise-in-callback': 'off',
		'promise/no-return-in-finally': 'warn',
		'promise/no-return-wrap': 'off',
		'promise/param-names': 'off',
		'promise/prefer-await-to-callbacks': 'off',
		'promise/prefer-await-to-then': 'off',
		'promise/valid-params': 'warn',
		'quote-props': ['error', 'as-needed'],
		'quotes': 'off',
		'radix': 'error',
		'react/boolean-prop-naming': ['error', {
			'rule': '^(is|should|has|can|did|will)',
		}],
		'react/button-has-type': 'off',
		'react/default-props-match-prop-types': 'off',
		'react/destructuring-assignment': 'off',
		'react/display-name': 'off',
		'react/forbid-component-props': 'off',
		'react/forbid-dom-props': 'off',
		'react/forbid-elements': 'off',
		'react/forbid-foreign-prop-types': 'off',
		'react/forbid-prop-types': 'off',
		'react/function-component-definition': 'off',
		'react/jsx-boolean-value': ['error', 'always'],
		'react/jsx-child-element-spacing': 'off',
		'react/jsx-closing-bracket-location': ['warn', 'line-aligned'],
		'react/jsx-closing-tag-location': ['warn', 'line-aligned'],
		'react/jsx-curly-brace-presence': ['error', {
			'props': 'never',
			'children': 'never',
		}],
		'react/jsx-curly-newline': ['error', {
			'multiline': 'consistent',
			'singleline': 'consistent',
		}],
		'react/jsx-curly-spacing': ['error', {
			'when': 'never',
		}],
		'react/jsx-equals-spacing': ['error', 'never'],
		'react/jsx-filename-extension': 'off',
		'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
		'react/jsx-fragments': ['error', 'syntax'],
		'react/jsx-handler-names': 'off',
		'react/jsx-indent': ['error', 4],
		'react/jsx-indent-props': ['error', 4],
		'react/jsx-key': 'error',
		'react/jsx-max-depth': 'off',
		'react/jsx-max-props-per-line': 'off',
		'react/jsx-newline': 'off',
		'react/jsx-no-bind': ['error', {
			'ignoreDOMComponents': false,
			'ignoreRefs': true,
			'allowArrowFunctions': true,
			'allowFunctions': false,
			'allowBind': false,
		}],
		'react/jsx-no-comment-textnodes': 'error',
		'react/jsx-no-constructed-context-values': 'off',
		'react/jsx-no-duplicate-props': 'error',
		'react/jsx-no-literals': 'off',
		'react/jsx-no-script-url': 'off',
		'react/jsx-no-target-blank': 'off',
		'react/jsx-no-undef': 'warn',
		'react/jsx-no-useless-fragment': 'off',
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-pascal-case': 'error',
		'react/jsx-props-no-multi-spaces': 'error',
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-sort-default-props': 'off',
		'react/jsx-sort-props': 'off',
		'react/jsx-tag-spacing': ['error', {
			'beforeSelfClosing': 'always',
			'afterOpening': 'never',
			'beforeClosing': 'allow',
			'closingSlash': 'never',
		}],
		'react/jsx-uses-react': 'off',
		'react/jsx-uses-vars': 'off',
		'react/jsx-wrap-multilines': ['error', {
			'declaration': 'parens-new-line',
			'assignment': 'parens-new-line',
			'return': 'parens-new-line',
			'arrow': 'parens-new-line',
			'condition': 'parens-new-line',
			'logical': 'parens-new-line',
			'prop': 'parens-new-line',
		}],
		'react/no-access-state-in-setstate': 'error',
		'react/no-adjacent-inline-elements': 'off',
		'react/no-array-index-key': 'off',
		'react/no-arrow-function-lifecycle': 'error',
		'react/no-children-prop': 'error',
		'react/no-danger': 'off',
		'react/no-danger-with-children': 'off',
		'react/no-deprecated': 'off',
		'react/no-did-mount-set-state': 'warn',
		'react/no-did-update-set-state': 'error',
		'react/no-direct-mutation-state': 'error',
		'react/no-find-dom-node': 'error',
		'react/no-invalid-html-attribute': 'off',
		'react/no-is-mounted': 'error',
		'react/no-multi-comp': 'off',
		'react/no-namespace': 'off',
		'react/no-redundant-should-component-update': 'off',
		'react/no-render-return-value': 'error',
		'react/no-set-state': 'off',
		'react/no-string-refs': 'error',
		'react/no-this-in-sfc': 'warn',
		'react/no-typos': 'warn',
		'react/no-unescaped-entities': 'error',
		'react/no-unknown-property': 'off',
		'react/no-unsafe': 'error',
		'react/no-unstable-nested-components': 'warn',
		'react/no-unused-class-component-methods': 'off',
		'react/no-unused-prop-types': 'error',
		'react/no-unused-state': 'off',
		'react/no-will-update-set-state': 'off',
		'react/prefer-es6-class': ['error', 'always'],
		'react/prefer-exact-props': 'off',
		'react/prefer-read-only-props': 'off',
		'react/prefer-stateless-function': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/require-default-props': 'off',
		'react/require-optimization': 'off',
		'react/require-render-return': 'error',
		'react/self-closing-comp': ['error', {
			'component': true,
			'html': true,
		}],
		'react/sort-comp': 'off',
		'react/sort-prop-types': 'off',
		'react/state-in-constructor': 'off',
		'react/static-property-placement': 'off',
		'react/style-prop-object': 'error',
		'react/void-dom-elements-no-children': 'error',
		'require-atomic-updates': 'off',
		'require-await': 'off',
		'require-unicode-regexp': 'off',
		'require-yield': 'off',
		'rest-spread-spacing': 'off',
		'semi': 'off',
		'semi-spacing': ['error', {
			'before': false,
			'after': true,
		}],
		'semi-style': 'off',
		'sort-imports': 'off',
		'sort-keys': 'off',
		'sort-vars': 'off',
		'space-before-blocks': ['error', 'always'],
		'space-before-function-paren': 'off',
		'space-in-parens': ['error', 'never'],
		'space-infix-ops': 'off',
		'space-unary-ops': 'off',
		'spaced-comment': 'off',
		'strict': ['error', 'never'],
		'switch-colon-spacing': ['error', {
			'after': true,
			'before': false,
		}],
		'symbol-description': 'error',
		'template-curly-spacing': ['error', 'never'],
		'template-tag-spacing': ['error', 'never'],
		'unicode-bom': ['error', 'never'],
		'unicorn/better-regex': 'warn',
		'unicorn/catch-error-name': 'error',
		'unicorn/consistent-destructuring': 'error',
		'unicorn/consistent-function-scoping': 'off',
		'unicorn/custom-error-definition': 'error',
		'unicorn/empty-brace-spaces': 'error',
		'unicorn/error-message': 'error',
		'unicorn/escape-case': 'off',
		'unicorn/expiring-todo-comments': 'off',
		'unicorn/explicit-length-check': 'warn',
		'unicorn/filename-case': 'off',
		'unicorn/import-index': 'error',
		'unicorn/import-style': 'off',
		'unicorn/new-for-builtins': 'off',
		'unicorn/no-abusive-eslint-disable': 'error',
		'unicorn/no-array-callback-reference': 'off',
		'unicorn/no-array-for-each': 'off',
		'unicorn/no-array-method-this-argument': 'error',
		'unicorn/no-array-push-push': 'off',
		'unicorn/no-array-reduce': 'off',
		'unicorn/no-await-expression-member': 'warn',
		'unicorn/no-console-spaces': 'warn',
		'unicorn/no-document-cookie': 'warn',
		'unicorn/no-empty-file': 'warn',
		'unicorn/no-for-loop': 'error',
		'unicorn/no-hex-escape': 'off',
		'unicorn/no-instanceof-array': 'error',
		'unicorn/no-invalid-remove-event-listener': 'error',
		'unicorn/no-keyword-prefix': 'off',
		'unicorn/no-lonely-if': 'off',
		'unicorn/no-nested-ternary': 'off',
		'unicorn/no-new-array': 'error',
		'unicorn/no-new-buffer': 'error',
		'unicorn/no-null': 'off',
		'unicorn/no-object-as-default-parameter': 'error',
		'unicorn/no-process-exit': 'error',
		'unicorn/no-static-only-class': 'off',
		'unicorn/no-thenable': 'off',
		'unicorn/no-this-assignment': 'error',
		'unicorn/no-unreadable-array-destructuring': 'off',
		'unicorn/no-unsafe-regex': 'off',
		'unicorn/no-unused-properties': 'off',
		'unicorn/no-useless-fallback-in-spread': 'off',
		'unicorn/no-useless-length-check': 'off',
		'unicorn/no-useless-promise-resolve-reject': 'off',
		'unicorn/no-useless-spread': 'warn',
		'unicorn/no-useless-undefined': 'off',
		'unicorn/no-zero-fractions': 'error',
		'unicorn/number-literal-case': 'off',
		'unicorn/numeric-separators-style': 'off',
		'unicorn/prefer-add-event-listener': 'error',
		'unicorn/prefer-array-find': 'error',
		'unicorn/prefer-array-flat': 'error',
		'unicorn/prefer-array-flat-map': 'error',
		'unicorn/prefer-array-index-of': 'off',
		'unicorn/prefer-array-some': 'error',
		'unicorn/prefer-at': 'off',
		'unicorn/prefer-code-point': 'off',
		'unicorn/prefer-date-now': 'off',
		'unicorn/prefer-default-parameters': 'off',
		'unicorn/prefer-dom-node-append': 'off',
		'unicorn/prefer-dom-node-dataset': 'off',
		'unicorn/prefer-dom-node-remove': 'off',
		'unicorn/prefer-dom-node-text-content': 'off',
		'unicorn/prefer-export-from': 'warn',
		'unicorn/prefer-includes': 'error',
		'unicorn/prefer-json-parse-buffer': 'off',
		'unicorn/prefer-keyboard-event-key': 'off',
		'unicorn/prefer-math-trunc': 'off',
		'unicorn/prefer-modern-dom-apis': 'off',
		'unicorn/prefer-module': 'off',
		'unicorn/prefer-negative-index': 'off',
		'unicorn/prefer-node-protocol': 'off',
		'unicorn/prefer-number-properties': 'off',
		'unicorn/prefer-object-from-entries': 'off',
		'unicorn/prefer-optional-catch-binding': 'off',
		'unicorn/prefer-prototype-methods': 'off',
		'unicorn/prefer-query-selector': 'off',
		'unicorn/prefer-reflect-apply': 'off',
		'unicorn/prefer-regexp-test': 'off',
		'unicorn/prefer-set-has': 'off',
		'unicorn/prefer-spread': 'off',
		'unicorn/prefer-string-replace-all': 'off',
		'unicorn/prefer-string-slice': 'off',
		'unicorn/prefer-string-starts-ends-with': 'off',
		'unicorn/prefer-string-trim-start-end': 'off',
		'unicorn/prefer-switch': 'off',
		'unicorn/prefer-ternary': 'off',
		'unicorn/prefer-top-level-await': 'off',
		'unicorn/prefer-type-error': 'off',
		'unicorn/prevent-abbreviations': 'off',
		'unicorn/relative-url-style': 'off',
		'unicorn/require-array-join-separator': 'off',
		'unicorn/require-number-to-fixed-digits-argument': 'off',
		'unicorn/require-post-message-target-origin': 'off',
		'unicorn/string-content': 'off',
		'unicorn/template-indent': 'off',
		'unicorn/throw-new-error': 'off',
		'use-isnan': 'error',
		'valid-typeof': 'error',
		'vars-on-top': 'off',
		'wrap-iife': 'off',
		'wrap-regex': 'off',
		'yield-star-spacing': 'off',
		'yoda': 'off',
	}
};
