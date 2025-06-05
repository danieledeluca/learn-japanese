/** @type {import('prettier').Config} */
export default {
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    printWidth: 100,
    quoteProps: 'consistent',
    overrides: [
        {
            files: '*.json',
            options: {
                tabWidth: 2,
            },
        },
    ],
};
