// @ts-check
import antfu from '@antfu/eslint-config';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    antfu(
        {
            type: 'app',
            vue: true,
            typescript: true,
            formatters: true,
            stylistic: {
                indent: 4,
                quotes: 'single',
                semi: true,
                braceStyle: '1tbs',
            },
        },
        {
            ...eslintPluginBetterTailwindcss.configs.recommended,
            settings: {
                'better-tailwindcss': {
                    entryPoint: './app/assets/css/main.css',
                },
            },
        },
        {
            files: ['**/*.json'],
            rules: {
                'jsonc/indent': ['error', 2],
            },
        },
        {
            files: ['tsconfig.json'],
            rules: {
                'jsonc/sort-keys': ['off'],
            },
        },
        {
            files: ['**/*.css'],
            rules: {
                'format/prettier': ['error', { parser: 'css', singleQuote: false, tabWidth: 4 }],
            },
        },
        {
            rules: {
                'better-tailwindcss/enforce-consistent-line-wrapping': ['off'],
                'better-tailwindcss/no-unknown-classes': ['error', { detectComponentClasses: true }],
                'no-console': ['warn'],
                'node/no-process-env': ['error'],
                'node/prefer-global/process': ['off'],
                'perfectionist/sort-imports': ['error', { tsconfig: { rootDir: '.' } }],
                'style/arrow-parens': ['error', 'always'],
                'style/max-len': ['error', { code: 120, ignorePattern: 'class="[^"]*"' }],
                'ts/consistent-type-definitions': ['error', 'type'],
                'ts/no-redeclare': ['off'],
                'vue/attribute-hyphenation': ['error', 'never'],
                'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
                'vue/no-multiple-template-root': ['off'],
                'vue/prop-name-casing': ['error', 'camelCase'],
                'vue/v-on-event-hyphenation': ['error', 'never'],
            },
        },
    ),
);
