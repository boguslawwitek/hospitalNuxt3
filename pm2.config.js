module.exports = {
  apps: [
    {
        name: 'hospitalnuxt3',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs',
        env: {
            "NITRO_PORT": 9003,
            "NUXT_PUBLIC_BASE_URL": "/test",
            "NUXT_PUBLIC_API_URL": "https://example.com",
            "NUXT_PUBLIC_FAVICON_URL": "https://example.com/favicon.ico",
            "NUXT_PUBLIC_LOGO_URL": "https://example.com/logo.png"
        }
    }
  ]
}