// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    future: {
        compatibilityVersion: 4,
    },
    app: {
        head: {
            title: 'Learn Japanese',
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css',
                },
            ],
        },
    },
    css: ['~/assets/main.css'],
    ssr: false,
    modules: ['@nuxt/eslint', '@pinia/nuxt', '@vueuse/nuxt'],
});
