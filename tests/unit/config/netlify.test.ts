import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Netlify deployment configuration', () => {
  it('publishes the Nitro Netlify public output directory', () => {
    const config = readFileSync(resolve(process.cwd(), 'netlify.toml'), 'utf8')

    expect(config).toMatch(/^\s*publish\s*=\s*"dist"\s*$/m)
    expect(config).toMatch(/^\s*NITRO_PRESET\s*=\s*"netlify"\s*$/m)
  })
})
