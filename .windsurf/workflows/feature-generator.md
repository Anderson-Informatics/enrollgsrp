---
description: Generate a detailed features.html document from a spec.html
---

# Feature Generator Workflow

Generate a detailed features.html document from a spec.html, or sync changes between spec.html and features.html.

## Steps

1. **Check for spec.html** - Verify that `spec.html` exists. If not, tell the user they need to create one first.

2. **Generating features.html**:
   - Read spec.html fully
   - Extract every discrete piece of functionality implied by the spec
   - Order features by implementation dependency (foundation first, then simple flows, then dependent features, then admin features, then cross-cutting concerns)
   - Produce `features.html` following the format with numbered features, user flows, and UI overviews

3. **Syncing changes** (when user modifies either file):
   - If spec.html was modified: Update only relevant features in features.html, add new features in correct order, remove features that no longer exist
   - If features.html was modified: Update only relevant sections of spec.html, preserve all other content
   - Always confirm with the user what changed before syncing

4. **Save** the output to `project-files/` in the root directory.
