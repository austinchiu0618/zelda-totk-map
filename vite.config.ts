import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/zelda-totk-map/',
  plugins: [
    react(),
    AutoImport({
      include: [
        /\.tsx?$/ // .ts, .tsx, .js, .jsx
      ],
      dts: 'src/auto-imports.d.ts',
      imports: [
        'react',
        'react-router-dom',
        'react-i18next'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    host: 'localhost',
    port: 3001
  }
})
