---
description: Suggest tests worth writing for a feature using the ZOMBIES heuristic
---

# ZOMBIES Workflow

Suggest tests worth writing for a feature using the ZOMBIES heuristic (Zero, One, Many, Boundaries, Interface, Exceptions, Simple scenarios).

## Steps

1. **Locate the feature**:
   - With args: search codebase with Grep/Glob for files matching the description
   - Without args: run `git diff --name-status main...HEAD` and `git diff main...HEAD`
   - Read implementation files and existing test file if one exists
   - Skip auto-generated files

2. **Generate ZOMBIES suggestions** for each letter:
   - **Z**ero — no inputs / empty state
   - **O**ne — a single input / the happy path
   - **M**any — multiple inputs, ordering, pagination, concurrency
   - **B**oundaries — limits, off-by-one, min/max lengths, timing edges
   - **I**nterface — contract/shape of public API (return types, status codes)
   - **E**xceptions — invalid input, failures, expired/used/missing state
   - **S**imple scenarios — common everyday usage paths

   Only list tests that are genuinely worth writing — skip categories that don't apply.

3. **Output the report** grouped by feature area, then by ZOMBIES letter:
```
## [Feature Area]

**Boundaries**
- Email field rejects values longer than 255 chars

**Exceptions**
- Expired code returns a validation error

**Simple**
- Requesting a code emails the user
```

End with: `X test ideas.`

If nothing worth testing, output exactly: `✅ Nothing worth writing tests for.`

4. **Rules**:
   - Don't stub the tests — output ideas only
   - Skip ZOMBIES letters that don't apply
   - Be specific — reference actual lengths, timings, statuses from code
   - One behaviour per bullet
   - No implementation hints
   - Group by feature first, then by letter
