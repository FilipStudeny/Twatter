const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, ".prettierrc.json"), "utf8"));

module.exports = {
	root: true,
	env: { browser: true, es2021: true, es6: true },
	overrides: [
		{
			files: ["**/*.ts?(x)"],
			rules: {
				"@typescript-eslint/explicit-function-return-type": "off",
				"max-lines": "off",
				"max-lines-per-function": "off",
				"no-magic-numbers": "off",
				"no-undef": "off",
			},
		},
	],
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "airbnb", "prettier"],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["prettier", "unused-imports"],
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".ts"],
				moduleDirectory: ["src", "node_modules"],
			},
		},
	},
	rules: {
		"@typescript-eslint/no-non-null-assertion": "error",
		"prettier/prettier": ["warn", { prettierOptions }],
		"@typescript-eslint/no-explicit-any": "off",
		"no-unused-vars": "off",
		"no-use-before-define": "off",
		"import/prefer-default-export": 1,
		"import/no-default-export": 0,
		"@typescript-eslint/no-use-before-define": ["error"],
		"import/no-unresolved": "off",
		"no-shadow": "off",
		"@typescript-eslint/no-shadow": "off",
		"no-loop-func": "off",
		"no-param-reassign": "off",
		"no-nested-ternary": "off",
		"import/no-extraneous-dependencies": "off",
		"no-useless-constructor": "off",
		"max-classes-per-file": "off",
		"no-empty-function": "off",
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				js: "never",
				ts: "never",
			},
		],
		"import/order": [
			"warn",
			{
				groups: [
					["builtin", "external"],
					"internal",
					["parent", "sibling", "index"],
					"object",
					"type",
				],
				"newlines-between": "always",
				alphabetize: {
					order: "asc",
				},
				pathGroups: [
					{
						pattern: "./**/*.less",
						group: "object",
					},
					{
						pattern: "**/*.less",
						group: "object",
					},
					{
						pattern: "./**/*.{jpg,jpeg,png,gif,svg,ico}",
						group: "type",
					},
					{
						pattern: "**/*.{jpg,jpeg,png,gif,svg,ico}",
						group: "type",
					},
				],
			},
		],
	},
};
