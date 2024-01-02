/** @type {import("@types/prettier").Options} */
// Extracted from `webdev-configs` (https://github.com/JulianCataldo/web-garden/tree/develop/configs)

module.exports = {
	printWidth: 80,
	semi: true,
	singleQuote: true,
	tabWidth: 1,
	trailingComma: 'all',

	// See: https://github.com/prettier/prettier/issues/7475
	useTabs: false,

	plugins: ['./node_modules/prettier-plugin-astro'],
	overrides: [
		{
			files: '*.astro',
			semi: true,
			options: {
				parser: 'astro',
				printWidth: 80,
			},
		},
	],
};
