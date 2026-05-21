---
description: Prepare a structured, scannable review checklist for a branch or diff
---

# Review Order Workflow

Prepare a structured, scannable review checklist for a branch or diff, grouped by feature change and applying the four-pass review order (Types, Data Flow, Business Logic, Edge Cases).

## Steps

1. **Get the diff** - Run `git diff <base>...HEAD` and `git diff --name-status <base>...HEAD`. If no changes, stop.

2. **Read the changed files** to categorize them. Skip auto-generated files (lockfiles, compiled assets, generated route/type definitions).

3. **Identify the feature changes** - Group the diff into distinct user-facing or behavioural changes. A feature is a coherent unit of behaviour, not a file or layer.

4. **Output the map** with the following structure per feature:
```
## Feature: [short name]

One sentence describing what behaviour this introduces or changes.

### 1. Types & Interfaces
- `path/file.php:LINE` — what's there

### 2. Data Flow
- `path/file.php:LINE` — entry/flow/exit points

### 3. Business Logic
- `path/file.php:LINE` — methods, guards, branches

### 4. Edge Cases
- `path/file.php:LINE` — edge-case surfaces
```

5. **Rules**:
   - Every bullet has a `file:line`
   - One short clause per bullet (~15 words after em-dash)
   - No suggestions, advice, or questions
   - No emojis
   - Description over prescription
   - Edge Cases name the surface, not the fix
   - Group by feature, not by review pass
   - Omit a pass within a feature if nothing fits it
   - Order features by blast radius (security/auth first, refactors last)
