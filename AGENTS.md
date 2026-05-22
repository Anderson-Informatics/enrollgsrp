# Development philosophy
- Prefer simple solutions over clever ones.
- Write code that is clear and self-explanatory.
- Build with the long term in mind.

# Stack
- Nuxt
- Vue.js
- NuxtUI (based on Tailwind CSS)
- MongoDB Atlas

# Conventions
- Always use the Composition API with `<script setup>`. Never use the Options API.
- Use `useFetch` or `useAsyncData` for data fetching. Never use raw `fetch` or `$fetch` directly in components for initial data loads.
- Use Nuxt's server routes (`server/api/`) for backend logic. Never write API logic in client-side code.
- Use Nuxt's auto-imports for composables, components, and utils. Never manually import what Nuxt auto-imports.
- Use Pinia for shared state that isn't tied to a single page's data. Never use hand-rolled global state.
- Use file-based routing. Never define routes manually in a config file unless you need to override behaviour.
- Use `definePageMeta` for page-level middleware and layout assignments. Never set these outside the page component.
- Use `NuxtLink` for internal navigation. Never use raw `<a>` tags or `navigateTo` for simple links.
- Use `useState()` for shared SSR-safe reactive state. Never use `ref()` at module scope outside `<script setup>` — it leaks state across server requests.
- Use `createError()` for error responses. Use `throw createError()` on the server and `createError({ fatal: true })` on the client for full-page errors.
- Use route middleware for navigation guards. Never use `useRoute()` inside middleware — use the `to`/`from` params instead.

# Project Documentation Reference Files
Always reference relevant files when working on changes.
- spec.html - The main specification document
- features.html - Feature list and descriptions
- implementation-plan.html - High-level implementation plan
- development-plan.html - Detailed development plan with tasks
- PROGRESS.html - Current development progress and status
- FEATURE_STATUS.html - Feature-by-feature status tracking
- DAILY_LOG.html - Daily work log and progress tracking
- KANBAN.html - Kanban board for task management

# Testing and Implementation Rule
Before writing any functionality, always write failing tests first, then begin implementation following a TDD model. All tests should be in structured folders in the tests folder in the root directory. Do not fix tests to simply get them to pass, rather first evaluate if the test is failing as a result of the implementation. Only if the test is poorly formed, should it be updated.

## Test Structure
- **Unit Tests**: `tests/unit/` - Pure functions and utilities, node environment
- **Integration Tests**: `tests/integration/` - Real HTTP against `pnpm dev` server via `fetch`

See `TDD_WORKFLOW.md` for details and rationale.

# Sprint Completion Checklist
When a sprint is finished, always update ALL of the following files before considering the sprint complete. Each file lives in `project-files/`.

1. **`PROGRESS.html`** — Move the finished sprint into "Last Completed Work". Update "Active Sprint" to the next sprint. Update "Next Steps" and "Weekly Summary".
2. **`FEATURE_STATUS.html`** — Update the status badge and progress-bar percentage for every feature touched in the sprint.
3. **`KANBAN.html`** — Move the current sprint board to "Previous Sprints" (all tasks checked). Set up the To Do column for the new sprint.
4. **`DAILY_LOG.html`** — Add a new log entry (most recent first) summarising what was completed, test totals, any blockers, and what is planned next.

# Verification
After making changes, always run the following checks and fix any issues before considering work complete:

1. **Build**: `pnpm build`
2. **Lint**: `pnpm lint:fix` (ESLint)
3. **Type check**: `pnpm typecheck`
4. **Unit tests**: `pnpm test:unit`
5. **Integration tests**: `pnpm test:integration` (requires `pnpm dev` running)
6. **Update project tracking files** — follow the Sprint Completion Checklist above