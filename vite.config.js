// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
            }
        },
    },
    preview: {
        port: 8080,
    },
    server: {
        port: 8080,
    },
})
