import { defineConfig } from 'vitest/config'

export default defineConfig(() => {

  return {
    test: {
      globals: false,
      include: ['./src/**/*.spec.ts'],
      exclude: ['**/*.int.spec.ts', "**/*.e2e.spec.ts"],
      testTimeout: 10000,
      coverage: {
        reportsDirectory: './coverage/unit'
      }
    }
  }
})