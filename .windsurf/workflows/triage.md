---
description: Triage a branch or diff by grouping changed files into feature areas
---

# Triage Workflow

Triage a branch or diff by grouping changed files into feature areas, assigning each a risk tier (High/Medium/Low), and producing a scannable summary.

## Steps

1. **Get the diff** - Run `git diff --name-status <base>...HEAD` and `git diff <base>...HEAD`. If no changes, stop.

2. **Read the changed files** to understand what feature area they belong to and how risky they are.

3. **Group by feature area** - Group files by what the code does, not by file type. Examples: "Authentication", "Notification Delivery", "User Data Mutations". Each file appears in exactly one group.

4. **Assign a risk tier** (High/Medium/Low):
   - Always High if: touches auth/authz, mutates user data/payments, modifies permissions, handles sensitive data
   - Bump up one tier if: complex conditionals, external APIs, large amount of generated code
   - Otherwise: match the blast radius of the change

5. **Identify auto-generated files** for a "Skip" section (lockfiles, compiled assets, generated route/type definitions).

6. **Output the report**:
```
### ⚠️ High Risk

**[Feature Area Name]**
Reason: [one sentence]
- path/to/file.php (added/modified)

### Medium Risk

**[Feature Area Name]**
Reason: [one sentence]
- path/to/file.php (added)

### Low Risk

**[Feature Area Name]**
- path/to/file.php (modified)

### Skip

**Auto-generated**
- path/to/generated/files... (auto-generated — skip)
```

End with: `X groups, Y high-risk files to focus on`.

7. **Rules**:
   - Group by feature area, not by file type
   - One group per file
   - Group names: 2–4 words
   - One-line reason per group (High and Medium only)
   - Status suffix on each file: (added), (modified), or (deleted)
   - Order tiers from highest to lowest risk
   - Omit a tier section if empty
   - No suggestions or advice
