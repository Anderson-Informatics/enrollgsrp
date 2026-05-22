import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/integration/**/*.test.ts', 'tests/integration/**/*.spec.ts'],
    exclude: ['node_modules', '.git', 'dist'],
    testTimeout: 30000,
    hookTimeout: 30000,
    setupFiles: ['./tests/integration/setup.ts']
  },
  esbuild: {
    target: 'node18'
  }
})
