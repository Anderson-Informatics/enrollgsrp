# TDD Workflow

## Test layout

```
tests/
├── unit/                # node env, no Nuxt runtime
│   ├── utils/
│   └── models/
└── integration/         # exercises a running Nuxt dev server via fetch
    ├── setup.ts         # verifies server is reachable at TEST_BASE_URL
    ├── helpers.ts       # apiRequest(), uniqueEmail()
    ├── api/
    └── middleware/
```

## Commands

| Command | Description |
| --- | --- |
| `pnpm test:unit` | Vitest unit tests (`vitest.config.ts`) |
| `pnpm test:integration` | Integration tests (`vitest.integration.config.ts`) — requires `pnpm dev` running |
| `pnpm test:all` | Unit, then integration |
| `pnpm test` | Watch mode (unit only) |

## Loop

1. Add a failing test in `tests/unit/...` or `tests/integration/...`.
2. Run the relevant suite, confirm red.
3. Implement the smallest change to go green.
4. Refactor.
5. Run `pnpm test:all` before committing.

## Integration testing approach

Rather than fighting `@nuxt/test-utils`' Bun-specific imports, integration tests run against the Nuxt dev server (`pnpm dev`) using `globalThis.fetch`. Configure with `TEST_BASE_URL` if not on `http://localhost:3000`.

`tests/integration/setup.ts` runs once per suite and performs a health check; tests fail fast with a clear message if the server isn't running.

This gives us:
- Real H3 + Nitro request handling (`defineEventHandler`, `readBody`, `createError`, etc.)
- Real MongoDB through the configured `MONGODB_URI`
- Real middleware order, route resolution, auth flow

Trade-off: tests can pollute the configured database with `*@integration.test` users. Use a dedicated test DB by setting `MONGODB_DB_NAME=enrollgsrp_test` in `.env` before running integration tests in CI.

## When to write which kind

| Concern | Test type |
| --- | --- |
| Pure helpers, presets, parsers | Unit |
| Mongoose schema validations | Unit (with in-memory mongo) or integration |
| API route behavior, status codes, JSON shapes | Integration |
| Middleware (auth, permissions) | Integration |
| Permission enforcement on routes | Integration |
