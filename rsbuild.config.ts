import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: './public/index.html',
  },
  output: {
    distPath: {
      root: 'build',
    },
    sourceMap: {
      js: 'source-map',
    },
  },

  source: {
    alias: {
      '@store': './src/store/',
    },
  },

  dev: {
    assetPrefix: true,
    progressBar: true,
  },
  performance: {
    removeConsole: true,
  },
})
