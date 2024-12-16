import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'
import template from 'vite-plugin-uni-pages2dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [template(), uni()],
})
