import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts', 'tests/**/*.spec.ts'],
    exclude: ['node_modules', '.git', 'dist', 'tests/integration'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'server/models/']
    }
  },
  esbuild: {
    target: 'node18'
  },
  resolve: {
    alias: {
      '@': '/home/anderoy/enrollgsrp'
    }
  }
})
