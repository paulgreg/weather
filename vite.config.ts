import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/weather/' : './',
  plugins: [
      svgr(),
      react({
          babel: {
              plugins: ['babel-plugin-react-compiler'],
          },
      }),
  ],
})
