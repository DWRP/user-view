import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  html: {
    template: './public/index.html',
  },
  security: {
    nonce: 'CSP_NONCE_PLACEHOLDER',
  },
  plugins: [pluginReact()],
})
