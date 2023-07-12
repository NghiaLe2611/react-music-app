/* eslint-env node */

module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
	],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: { react: { version: '18.2' } },
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'no-unused-vars': 'warn',
		'react/prop-types': 'off',
		// 'node/no-missing-require': 'warn',
		// 'node/no-unsupported-features/es-syntax': 'warn',
		'react/jsx-no-target-blank': 'warn',
	},
};
