import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // repo name must match EXACTLY (case and hyphens matter)
  base: '/abhyush-portfolio/',
})
