// vite.config.js

import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import glob from 'glob'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '',
    root: './src',
    publicDir: '../public',
    build: {
        rollupOptions: {
            input: Object.fromEntries(
                glob.sync('src/**/index.html').map((file) => [
                    file.replace('src/', '').replace('/index.html', ''),
                    path.resolve(fileURLToPath(import.meta.url), '..', file),
                ])
            ),
        },
    },
    preview: {
        port: 8080,
    },
    server: {
        port: 8080,
    },
})
