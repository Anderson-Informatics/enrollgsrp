---
description: Scaffold the overall app layout for EnrollGSRP including logo, navigation, and main content area
---

# Scaffold App Layout

This workflow creates the design-based app layout structure for EnrollGSRP. This is a boilerplate scaffolding step - no functionality is implemented yet, only the visual layout.

## Prerequisites
- Nuxt 4 project initialized with NuxtUI and Tailwind CSS
- Design framework already configured (see DESIGN_FRAMEWORK.md)

## Steps

1. **Create the main layout component**
   - Create `app.vue` as the root layout
   - Implement a responsive sidebar navigation (256px width on desktop, slide-in overlay on mobile)
   - Add a text-based logo "EnrollGSRP" in the sidebar using the Commissioner font
   - Style the logo with primary color (#2563eb) and bold weight

2. **Create sidebar navigation structure**
   - Add navigation menu items based on user roles (these will be role-conditionally shown later):
     - Dashboard (icon: home)
     - Applications (icon: document-text)
     - Students (icon: academic-cap)
     - Communications (icon: chat-bubble)
     - Reports (icon: chart-bar)
     - Settings (icon: cog)
   - Use NuxtUI navigation pattern from DESIGN_FRAMEWORK.md
   - Implement active state highlighting with primary background
   - Add hover states with accent background

3. **Add "New Suggestion" button**
   - Place a prominent "New Suggestion" button in the sidebar (below navigation items)
   - Use primary button styling from NuxtUI
   - Add a plus icon (i-heroicons-plus)
   - Position it to stand out from regular navigation

4. **Create main content slot area**
   - Add a main content area that takes remaining width (flex-1)
   - Include a header bar at the top of the main content with:
     - Page title (dynamic based on route)
     - User profile/avatar placeholder
   - Add a scrollable content area below the header
   - Use the Dashboard Layout pattern from DESIGN_FRAMEWORK.md

5. **Implement responsive mobile menu**
   - Add a mobile menu toggle button (hamburger icon) visible on < lg breakpoint
   - Implement slide-in sidebar from left on mobile
   - Add backdrop overlay when mobile menu is open
   - Follow the Mobile Menu pattern from DESIGN_FRAMEWORK.md

6. **Apply design system styling**
   - Use colors from design framework (primary: #2563eb, background: #f9fafb, etc.)
   - Apply proper spacing (p-4, p-6, gap-4, etc.)
   - Use rounded corners (rounded-md, rounded-lg)
   - Ensure proper typography (Commissioner font, correct weights)
   - Add subtle hover and focus states

7. **Set up basic routing structure**
   - Create placeholder pages for each navigation item:
     - `pages/index.vue` (Dashboard)
     - `pages/applications/index.vue`
     - `pages/students/index.vue`
     - `pages/communications/index.vue`
     - `pages/reports/index.vue`
     - `pages/settings/index.vue`
   - Each page should have a simple heading indicating the page name

8. **Configure Nuxt layout**
   - Set up Nuxt 4 to use the app.vue as the default layout
   - Ensure NuxtUI components are auto-imported
   - Configure Tailwind CSS with design system colors in nuxt.config.ts

## Design References
- Typography: Commissioner font, weights as specified in DESIGN_FRAMEWORK.md
- Colors: Primary (#2563eb), Background (#f9fafb), Card (#ffffff)
- Spacing: Use Tailwind spacing scale (4, 6, 8, etc.)
- Border radius: 6px (rounded-md/rounded-lg)
- Icons: NuxtUI Heroicons (i-heroicons-*)

## Notes
- This is design-only scaffolding - no authentication, data fetching, or business logic
- Menu items will be role-conditionally rendered in future implementation
- The "New Suggestion" button functionality will be implemented later
- All navigation links currently point to placeholder pages
- Follow the mobile-first responsive approach
