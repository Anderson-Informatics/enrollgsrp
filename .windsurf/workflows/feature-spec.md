---
description: Extract a single feature from features.html into a detailed TDD-focused feature specification document in HTML format
---

# Feature Spec Workflow

Extract a single feature from `features.html` into a detailed, TDD-focused feature specification document in HTML format that includes requirements, technical decisions, constraints, implementation steps, and tests. Follow an iterative process with user feedback at each stage.

This produces a **feature spec** for a single feature, not a full product spec or features list.

## Prerequisites
- `features.html` exists in the project with feature definitions
- `spec.html` exists for additional context
- User knows which feature to extract (by name or number)

## Steps

1. **Identify the feature**
   - Ask the user which feature to extract from `features.html` (by name or number)
   - Read both `features.html` and `spec.html` to understand full context
   - Present the feature content for confirmation

2. **Extract and draft initial spec**
   - Extract the feature content from `features.html`
   - Pull in relevant context from `spec.html` (requirements, constraints, assumptions, dependencies, edge cases)
   - Draft initial spec with Summary, Goals, and Requirements sections
   - **STOP and present to user for feedback before proceeding**

3. **Add technical decisions section**
   - Add Technical Decisions section based on the feature document only
   - Provide high-level architectural decisions, not implementation details
   - Ask: "How might I build this based on this feature document only?"
   - **STOP and present to user for feedback before proceeding**

4. **Add constraints section**
   - Add Constraints section for things to explicitly avoid
   - Ask: "What helpful additions might I sprinkle in that we don't want?"
   - **STOP and present to user for feedback before proceeding**

5. **Break into implementation steps with TDD prompts and tests**
   - Break the feature into smaller, ordered implementation steps
   - Each step should be independently reviewable and testable
   - Steps should follow logical dependency order
   - For each implementation step, add:
     - A bulleted list of tests for the step
     - A Cascade prompt for writing failing tests using Vitest (TDD: write tests first)
     - A Cascade prompt for implementing the step to make tests pass
   - **STOP and present to user for feedback before proceeding**

6. **Format and save as HTML and update navigation**
   - Format the entire spec as an HTML file that matches the project-files format
   - Include the same HTML structure and CSS styling as features.html and spec.html
   - Include a sidebar with navigation links to other project documents
   - Format all sections as HTML elements (h1, h2, h3, h4, p, ul, li, etc.)
   - Save the feature spec as `project-files/feature-[FEATURE-NAME].html` (use kebab-case)
   - Add the new feature spec to the navigation sidebar in all existing HTML files in project-files
   - Add a link to the new feature spec under a "Feature Specs" section or appropriate location
   - Provide a brief summary (1-2 sentences max) noting any significant assumptions or decisions

## Writing Guidelines

- **Preserve original intent** - Maintain the same purpose and scope as defined in `features.html`
- **Pull in relevant context** - Search `spec.html` for related requirements, constraints, assumptions, dependencies, and edge cases
- **Be specific, not vague** - Instead of "users can see their status", write "parents can view current enrollment stage, progress bar, and available actions on their dashboard"
- **Avoid solution design initially** - Requirements should describe what the feature does, not how it's implemented
- **Keep steps reviewable** - Implementation steps should be large enough to add meaningful functionality but small enough for comfortable code review (typically 2-4 hours of work)
- **Use Vitest for tests** - All test prompts should use Vitest as the testing framework
- **Match project-files format** - Output HTML files that match the styling and structure of existing project-files

## Output Format

Save the feature spec as `project-files/feature-[FEATURE-NAME].html` using kebab-case for the feature name. The HTML file should match the styling and structure of features.html and spec.html with a sidebar navigation and main content area. Present the file to the user after each feedback checkpoint.

## Notes

- This is an iterative process - always wait for user feedback before proceeding to the next step
- The feature spec focuses on a single feature, not the entire product
- Tests should use Vitest, consistent with the project's technology stack
- Each implementation step should be independently testable and reviewable
- Output must be HTML format to match project-files, not markdown
