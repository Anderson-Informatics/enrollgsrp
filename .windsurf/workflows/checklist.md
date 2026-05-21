---
description: Convert the current plan, code review, or structured content into a persistent markdown checklist file
---

# Checklist Workflow

Convert the most recent structured content in this conversation (plan, code review, task list, implementation steps, etc.) into a markdown checklist file saved to the project.

## Steps

1. **Identify the content** - Look at the current conversation context. Find the most recent plan, code review, implementation steps, or other structured content.

2. **Generate a name** - Derive a short, descriptive kebab-case name from the content's topic (e.g., `auth-refactor`, `api-migration`, `payment-integration`).

3. **Check for existing file** - Before writing, check if `.claude/plans/<name>-checklist.md` already exists. If it does, ask the user whether to overwrite, choose a different name, or cancel.

4. **Determine checklist granularity**:
   - If the content is a plan from plan mode: Keep the plan's text exactly as-is. Only add `- [ ]` markers to major implementation sections/steps.
   - If the content has clearly defined large steps: Add `- [ ]` markers at the level of those large steps.
   - If the content is unstructured: Ask the user how they'd like it broken up.

5. **Convert to checklist format**:
   - Preserve the original text exactly — keep all headings, sections, groupings, nesting, ordering, and wording intact
   - Only add `- [ ]` checkbox markers to top-level actionable sections
   - Keep non-actionable text as-is without checkboxes
   - Maintain heading hierarchy exactly as in the original

6. **Add the tracking header** at the very top of the file:
```markdown
<!-- CHECKLIST INSTRUCTIONS
IMPORTANT: When working on items in this checklist, you MUST check off each item
(change `- [ ]` to `- [x]`) AS SOON AS it is implemented/completed.
Do not wait until the end — check off each item immediately after finishing it.
This file is the source of truth for tracking progress.
-->
```

7. **Ensure the directory exists** - Create `.claude/plans/` if it doesn't already exist.

8. **Write the file** - Save the checklist to `.claude/plans/<name>-checklist.md`.

9. **Confirm** - Tell the user the file path and a brief summary of what was captured.
