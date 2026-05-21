---
description: Code review staged changes or a specific area of the codebase
---

# Code Review Workflow

Review staged changes or a specific area of the codebase, optionally delegating to a chosen agent.

## Steps

1. **Determine what to review**:
   - If a feature is specified — use Glob and Grep to find all files related to the described feature
   - If no feature is specified and there are staged changes — review the staged diff
   - If no feature is specified and there are NO staged changes — tell the user to stage changes or specify a feature

2. **Perform the review** by reading surrounding source files as needed to understand context. Organize findings by file, then by severity.

3. **Severity levels**:
   - 🔴 Critical — Bugs, security vulnerabilities, data loss risks, or crashes
   - 🟠 Error — Logic errors, missing error handling, broken edge cases
   - 🟡 Warning — Code smells, performance concerns, potential edge cases
   - 🔵 Suggestion — Better approaches, readability improvements
   - ⚪ Nitpick — Style, naming, formatting, minor preferences

4. **Output format**:
   - Group findings by severity with headings (e.g., `## 🔴 Critical`)
   - For each finding, include: file and line reference, concise description, suggested fix
   - Omit severity headings that have no findings
   - End with a `## Summary` section with overall assessment and count of findings per severity
