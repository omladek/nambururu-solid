import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'
import stylelint from 'vite-plugin-stylelint'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  base: '/nambururu-solid/',
  build: {
    target: 'esnext',
  },
  plugins: [
    solid(),
    VitePWA({
      registerType: 'autoUpdate',
    }),
    stylelint(),
    eslint(),
  ],
})
