import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import template from 'vite-plugin-template'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [template(), uni()],
})
