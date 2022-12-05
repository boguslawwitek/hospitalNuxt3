export default defineNuxtConfig({
    app: {
        baseURL: process.env.NUXT_PUBLIC_BASE_URL,
        head: {
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            title: 'hospitalnuxt3',
            link: [
                { rel: 'icon', href: process.env.NUXT_PUBLIC_FAVICON_URL }
            ],
            noscript: [
                { children: 'Javascript jest wymagany!' }
            ]
        }
    },
    runtimeConfig: {
        public: {
          baseUrl: '',
          apiUrl: 'https://example.com',
          faviconUrl: 'https://example.com/favicon.ico',
          logoUrl: 'https://example.com/logo.png'
        }
    },
    css: [
        '@/assets/styles/main.scss',
        '@fortawesome/fontawesome-svg-core/styles.css',
        'vue3-picture-swipe/dist/vue3-picture-swipe.css'
    ],
    build: {
        transpile: [
            '@fortawesome/vue-fontawesome',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/free-brands-svg-icons'
        ]
    },
    nitro: {
        preset: 'node_cluster'
    }
});
