---
description: Scan a branch or diff against the First Five checklist
---

# First Five Workflow

Scan a branch or diff against the First Five checklist (Error Handling, Input Boundaries, External Calls, State Mutations, Assumed Dependencies) and report only genuine concerns.

## Steps

1. **Get the diff** - Run `git diff <base>...HEAD` and `git diff --name-status <base>...HEAD`. If no changes, stop.

2. **Scan changed files** against the five checks:
   - Error Handling — empty catches, missing error paths, swallowed exceptions
   - Input Boundaries — missing validation on user input, unbounded inputs
   - External Calls — calls to methods/APIs that may not exist or behave incorrectly
   - State Mutations — destructive or surprising writes other code relies on
   - Assumed Dependencies — imports, classes, files, routes that may not exist

3. **Verify before flagging**:
   - Use `find` or `ls` to confirm missing files/classes actually don't exist
   - Grep for methods to confirm they aren't defined
   - Check validation before flagging input boundary issues
   - Only flag if genuinely wrong or risky

4. **Output the report** with sections for each check that has findings:
   - Use format: `**Check Name**` followed by bullets with `⚠️ file:line — description`
   - Only include sections that have something to flag
   - End with `**X items across Y files.**`
   - If clean, output exactly: `✅ Nothing flagged.`

5. **Rules**:
   - Only flag things that are actually wrong or risky
   - Use ⚠️ for high severity only (data loss, security, silent failures, missing files)
   - Always include `file:line` at the start of each bullet
   - One line per finding
   - Verify Assumed Dependencies before flagging
   - Skip auto-generated files (lockfiles, compiled assets, generated definitions)
