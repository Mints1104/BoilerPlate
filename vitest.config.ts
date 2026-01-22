import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        '@test': resolve(__dirname, './src/test'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
      typecheck: {
        enabled: false, // Disable during tests to avoid build errors
      },
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'src/test/',
          '**/*.d.ts',
          '**/*.config.*',
          '**/mockData',
          'src/main.tsx',
        ],
      },
    },
  })
)
