---
description: Generate a detailed product specification document from a vague idea
---

# Spec Generator Workflow

Turn a vague product idea into a clear, well-structured product specification document.

## Steps

1. **Gather and understand inputs**:
   - Take stock of verbal description, uploaded files, images
   - Review everything provided and identify gaps
   - Ask about intended technical stack if not provided
   - Ask other questions that cannot be reasonably inferred

2. **Draft the spec** using the template:
```markdown
# [Product Name] — Specification

> **Context:** [1–2 sentences on why this is being built]

## Overview

[2–4 sentences. What is this? Who uses it? What problem does it solve? What is it NOT?]

---

## Goals

- [Concrete, measurable goal]
- [Another goal]

---

## User Roles

### [Role Name]
- [What they can do]
- [What they cannot do]
- [How they authenticate]

---

## Core Features

### 1. [Feature Name]
[Description. Be specific about what the user does, what happens, constraints.]

---

## Technical Stack

- **[Layer]** — [Technology]
```

3. **Writing guidelines**:
   - Be specific, not vague
   - Resolve ambiguity with a sensible default
   - Separate customer-facing from internal
   - Flag implicit constraints
   - Technical Stack is optional — only include if known or strongly implied
   - Never include an "Out of Scope" section

4. **Save** the spec as an `.html` file to `project-files/` in the root directory.

5. **Provide a brief summary** (1–2 sentences max) noting any significant assumptions made.
