import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Relative base: the same build works on a GitHub Pages project URL
// (/vocal-group-utrecht/) and later on a custom domain root.
export default defineConfig({
  base: './',
  plugins: [vue()],
})
