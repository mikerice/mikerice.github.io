// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
    {
      files: '*.mdx',
      options: {
        printWidth: 80, // Narrower width for better readability in MDX
        proseWrap: 'always', // Wrap markdown prose
        tabWidth: 2,
        singleQuote: true,
      },
    },
  ],
  // Common formatting options for all files
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 100,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
};
