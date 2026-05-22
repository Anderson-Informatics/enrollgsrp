import { beforeAll } from 'vitest'

export const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000'

beforeAll(async () => {
  // Verify the dev server is reachable before running integration tests
  try {
    const res = await fetch(`${BASE_URL}/api/health`)
    if (!res.ok) {
      throw new Error(`Health check returned ${res.status}`)
    }
  } catch (err) {
    throw new Error(
      `Integration tests require the Nuxt dev server running at ${BASE_URL}.\n`
      + `Start it with: pnpm dev\n`
      + `Original error: ${(err as Error).message}`
    )
  }
})
