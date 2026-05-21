# Wayne County PreK Enrollment System - Design Framework

This document defines the complete design system for the Wayne County PreK Enrollment System. Use this as a reference when implementing any features or components.

---

## Typography

### Font Family
- **Primary Font**: Commissioner (Google Fonts)
- **Fallback Stack**: `-apple-system, BlinkMacSystemFont, sans-serif`
- **Import**: `@import url('https://fonts.googleapis.com/css2?family=Commissioner:wght@400;500;600;700&display=swap');`

### Font Weights
- **Regular**: 400 (body text, inputs)
- **Medium**: 500 (labels, navigation items)
- **Semibold**: 600 (headings, buttons, important text)
- **Bold**: 700 (emphasis, strong headings)

### Type Scale
```css
/* Headings */
h1: 2xl (1.5rem/24px) - font-weight: 600
h2: xl (1.25rem/20px) - font-weight: 600
h3: lg (1.125rem/18px) - font-weight: 600
h4: base (1rem/16px) - font-weight: 600

/* Body */
body: base (1rem/16px) - font-weight: 400
small: sm (0.875rem/14px) - font-weight: 400
tiny: xs (0.75rem/12px) - font-weight: 400

/* UI Elements */
labels: base - font-weight: 600
buttons: base - font-weight: 600
input: base - font-weight: 400
```

### Line Height
- **Tight**: 1.25 (headings)
- **Normal**: 1.5 (body, UI elements)
- **Relaxed**: 1.75 (long-form content)

---

## Color System

### Primary Colors
```css
--primary: #2563eb (Blue 600)
--primary-dark: #1d4ed8 (Blue 700)
--primary-foreground: #ffffff (White)
```

**Usage**: Primary actions, links, active states, brand elements

### Background Colors
```css
--background: #f9fafb (Gray 50)
--card: #ffffff (White)
--popover: #ffffff (White)
```

### Foreground Colors
```css
--foreground: #111827 (Gray 900)
--card-foreground: #111827 (Gray 900)
--muted-foreground: #6b7280 (Gray 500)
```

### Border & Input
```css
--border: #e5e7eb (Gray 200)
--input: #e5e7eb (Gray 200)
--input-background: #ffffff (White)
```

### Semantic Colors
```css
/* Success - Green */
--success: #10b981 (Emerald 500)
--success-foreground: #ffffff (White)

/* Warning - Yellow/Amber */
--warning: #f59e0b (Amber 500)
--warning-foreground: #ffffff (White)

/* Destructive - Red */
--destructive: #dc2626 (Red 600)
--destructive-foreground: #ffffff (White)

/* Info - Blue */
--info: #3b82f6 (Blue 500)
--info-foreground: #ffffff (White)
```

### Muted & Accent
```css
--muted: #f3f4f6 (Gray 100)
--accent: #f3f4f6 (Gray 100)
--secondary: #f3f4f6 (Gray 100)
```

---

## Spacing System

Use Tailwind's default spacing scale (4px base unit):

### Common Spacing Values
```
1 = 0.25rem (4px)
2 = 0.5rem (8px)
3 = 0.75rem (12px)
4 = 1rem (16px)
6 = 1.5rem (24px)
8 = 2rem (32px)
12 = 3rem (48px)
16 = 4rem (64px)
```

### Component Padding
- **Small cards/elements**: `p-4` (16px)
- **Medium cards**: `p-6` (24px)
- **Large cards**: `p-8` (32px)
- **Buttons**: `px-4 py-2` or `px-6 py-2`
- **Inputs**: `px-4 py-2`

### Layout Gaps
- **Tight**: `gap-2` (8px)
- **Normal**: `gap-4` (16px)
- **Relaxed**: `gap-6` (24px)

---

## Border Radius

```css
--radius: 0.375rem (6px)
--radius-sm: calc(var(--radius) - 4px) (2px)
--radius-md: calc(var(--radius) - 2px) (4px)
--radius-lg: var(--radius) (6px)
--radius-xl: calc(var(--radius) + 4px) (10px)
```

### Usage
- **Buttons**: `rounded-md` (6px)
- **Cards**: `rounded-lg` (6px)
- **Inputs**: `rounded-md` (6px)
- **Badges**: `rounded-full` or `rounded` (6px)
- **Avatars**: `rounded-full`

---

## Responsive Breakpoints

```css
sm: 640px   /* Small tablets and large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops and desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large screens */
```

### Mobile-First Approach
- Default styles target mobile (< 640px)
- Use `sm:`, `md:`, `lg:` prefixes for larger screens
- Sidebar becomes overlay on `< lg` breakpoint

---

## Layout Patterns

### Dashboard Layout
```
┌─────────────────────────────────────┐
│ Sidebar (fixed) │ Main Content      │
│ 256px           │ flex-1            │
│                 │                   │
│                 │ ┌───────────────┐ │
│                 │ │ Header        │ │
│                 │ └───────────────┘ │
│                 │ ┌───────────────┐ │
│                 │ │ Content       │ │
│                 │ │ (scrollable)  │ │
│                 │ └───────────────┘ │
└─────────────────────────────────────┘
```

**Mobile**: Sidebar slides in from left as overlay

### Form Layout
```
┌─────────────────────────────────────┐
│ Header (sticky)                     │
├─────────────────────────────────────┤
│ Progress Bar                        │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Form Card (max-w-4xl)         │ │
│  │ centered                      │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### Detail View Layout
```
┌─────────────────────────────────────┐
│ Header with Actions                 │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────┬─────────┐          │
│ │ Main        │ Sidebar │          │
│ │ (2/3)       │ (1/3)   │          │
│ │             │         │          │
│ └─────────────┴─────────┘          │
└─────────────────────────────────────┘
```

**Mobile**: Stacks to single column

---

## Component Patterns

### Buttons

#### Primary Button
```vue
<UButton color="primary">
  Button Text
</UButton>
```

#### Secondary Button
```vue
<UButton variant="outline">
  Button Text
</UButton>
```

#### Icon Button
```vue
<UButton icon="i-heroicons-menu" variant="ghost" />
```

#### Sizes
- **Small**: `px-3 py-1.5 text-sm`
- **Medium** (default): `px-4 py-2`
- **Large**: `px-6 py-3`

---

### Cards

#### Standard Card
```vue
<UCard>
  <template #header>
    <h3 class="text-lg font-semibold">Card Title</h3>
  </template>
  <div class="space-y-4">
    <!-- Card content -->
  </div>
</UCard>
```

#### Stat Card
```vue
<UCard>
  <div class="flex items-center justify-between mb-2">
    <p class="text-sm text-muted-foreground">Label</p>
    <UIcon name="i-heroicons-chart-bar" class="w-4 h-4 text-primary" />
  </div>
  <p class="text-3xl font-semibold">Value</p>
  <p class="text-xs text-muted-foreground mt-2">Subtext</p>
</UCard>
```

---

### Badges

#### Status Badges
```vue
<!-- Intake -->
<UBadge color="blue" variant="soft">Intake</UBadge>

<!-- Enrollment Paperwork -->
<UBadge color="yellow" variant="soft">Enrollment Paperwork</UBadge>

<!-- Enrolled -->
<UBadge color="green" variant="soft">Enrolled</UBadge>

<!-- Site Visit -->
<UBadge color="purple" variant="soft">Site Visit</UBadge>
```

#### Priority Badges
```vue
<!-- IEP -->
<UBadge color="purple" variant="outline">IEP</UBadge>

<!-- Tier 1 -->
<UBadge color="green" variant="outline">Tier 1</UBadge>

<!-- Tier 2 -->
<UBadge color="blue" variant="outline">Tier 2</UBadge>

<!-- Tier 3 -->
<UBadge color="gray" variant="outline">Tier 3</UBadge>
```

---

### Form Elements

#### Text Input
```vue
<UFormGroup label="Label">
  <UInput
    type="text"
    placeholder="Placeholder text"
  />
</UFormGroup>
```

#### Select Dropdown
```vue
<UFormGroup label="Label">
  <USelect
    :options="['Option 1', 'Option 2']"
  />
</UFormGroup>
```

#### Checkbox
```vue
<UCheckbox
  label="Checkbox Label"
  description="Helper text"
/>
```

---

### Navigation

#### Sidebar Navigation Item
```vue
<!-- Active -->
<NuxtLink
  to="/dashboard"
  class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground"
>
  <UIcon name="i-heroicons-home" class="w-4 h-4" />
  Dashboard
</NuxtLink>

<!-- Inactive -->
<NuxtLink
  to="/applications"
  class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-accent"
>
  <UIcon name="i-heroicons-document-text" class="w-4 h-4" />
  Applications
</NuxtLink>
```

---

### Tables

#### Desktop Table
```vue
<UTable
  :columns="columns"
  :rows="rows"
  class="w-full"
/>
```

#### Mobile Card Alternative
```vue
<div class="lg:hidden divide-y divide-border">
  <UCard
    v-for="row in rows"
    :key="row.id"
    class="hover:bg-muted/30"
  >
    <!-- Card layout with stacked information -->
  </UCard>
</div>
```

---

### Icons

**Library**: NuxtUI icons (Heroicons by default, auto-imported as `UIcon` with `i-heroicons-*` prefix)

**Common Icon Sizes**:
- Small: `w-4 h-4` (16px)
- Medium: `w-5 h-5` (20px)
- Large: `w-6 h-6` (24px)

**Icon Colors**: Match text color or use semantic colors

---

## Interaction Patterns

### Hover States
- **Buttons**: Background color darkens
- **Cards**: Subtle background change `hover:bg-muted/30`
- **Navigation**: Background becomes accent color
- **Table Rows**: Background becomes muted

### Focus States
- **Inputs**: 2px ring in primary color
- **Buttons**: Outline in ring color
- Use `focus:outline-none focus:ring-2 focus:ring-ring`

### Active States
- **Navigation**: Primary background with white text
- **Tabs**: Border bottom in primary color
- **Buttons**: Slightly darker background

---

## Shadows

Use sparingly for elevation and depth:

```css
/* Cards and popovers */
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
```

**Usage**:
- Dropdown menus: `shadow-lg`
- Cards: `border` instead of shadow (flat design)
- Modals/Dialogs: `shadow-xl`
- Prototype controls: `shadow-lg`

---

## Mobile Patterns

### Mobile Menu
```vue
<!-- Mobile Menu Overlay -->
<div
  v-if="isMobileMenuOpen"
  class="fixed inset-0 bg-black/50 z-40 lg:hidden"
  @click="isMobileMenuOpen = false"
/>

<!-- Sidebar with slide-in -->
<aside :class="[
  'fixed lg:static inset-y-0 left-0 z-50',
  'w-64 bg-card border-r border-border',
  'transform transition-transform duration-300',
  isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
]">
  <!-- Sidebar content -->
</aside>

<!-- Mobile menu button -->
<UButton
  icon="i-heroicons-menu"
  variant="ghost"
  class="lg:hidden"
  @click="isMobileMenuOpen = !isMobileMenuOpen"
/>
```

### Responsive Grid Patterns
```vue
<!-- 4 columns → 2 columns → 1 column -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

<!-- 3 columns → 1 column -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

<!-- 2 columns → 1 column -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
```

### Hide/Show by Breakpoint
```vue
<!-- Show only on desktop -->
<div class="hidden lg:block">Desktop content</div>

<!-- Show only on mobile -->
<div class="lg:hidden">Mobile content</div>

<!-- Responsive text -->
<h1 class="text-xl lg:text-2xl">Title</h1>
```

---

## Animation & Transitions

### Default Transitions
```css
transition-colors: color, background-color, border-color
transition-transform: transform
transition-all: all properties

duration-150: 150ms
duration-200: 200ms
duration-300: 300ms
```

### Common Uses
- **Hover effects**: `transition-colors duration-200`
- **Mobile menu**: `transition-transform duration-300`
- **Modals/Overlays**: `transition-opacity duration-200`

---

## Accessibility

### Contrast Requirements
- **Normal text**: Minimum 4.5:1 ratio
- **Large text**: Minimum 3:1 ratio
- **UI components**: Minimum 3:1 ratio

### Focus Indicators
Always provide visible focus states:
```css
focus:outline-none focus:ring-2 focus:ring-ring
```

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3)
- Use `<button>` for actions, `<a>` for navigation
- Include `alt` text for images
- Use `<label>` with form inputs

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Logical tab order
- Modal traps focus while open

---

## Implementation Guidelines

### File Structure
```
├── app.vue                  # Root app component
├── nuxt.config.ts           # Nuxt configuration
├── components/
│   ├── ui/                  # NuxtUI components (auto-imported)
│   ├── forms/               # Form components
│   └── layout/              # Layout components
├── pages/                   # File-based routing
│   ├── index.vue
│   ├── applications/
│   └── dashboard/
├── composables/             # Vue composables (auto-imported)
├── stores/                  # Pinia stores (auto-imported)
├── assets/
│   └── css/
│       └── main.css         # Global styles
└── public/                  # Static assets
```

### Component Naming
- Use PascalCase: `StatusBadge`, `ApplicationCard`
- Prefix layout components: `DashboardLayout`, `FormLayout`
- NuxtUI components are available as `<UButton>`, `<UInput>`, `<USelect>`, etc.
- Custom components are auto-imported from `/components`

### CSS Approach
- **NuxtUI**: Use NuxtUI components with Tailwind classes
- **Tailwind CSS**: Utility-first approach
- **CSS Variables**: For theme values (configured in nuxt.config.ts)
- **No custom CSS**: Unless absolutely necessary

### State Management
- Local state with `ref()` and `reactive()` for component state
- Pinia stores in `/stores` for global state (auto-imported)
- `useFetch` and `$fetch` for server state and API calls
- Nuxt auto-imports composables from `/composables`

---

## Design Tokens Reference

All design tokens are configured in `nuxt.config.ts` via NuxtUI's theme configuration. NuxtUI components automatically use these tokens.

### Quick Reference
```css
/* Colors */
bg-background, text-foreground
bg-card, text-card-foreground
bg-primary, text-primary-foreground
bg-muted, text-muted-foreground
border-border, ring-ring

/* Spacing */
p-4, p-6, p-8
gap-4, gap-6
space-y-4, space-y-6

/* Typography */
text-sm, text-base, text-lg
font-medium, font-semibold

/* Borders */
rounded-md, rounded-lg, rounded-full
border, border-2
```

---

## Best Practices

1. **Mobile First**: Design for mobile, enhance for desktop
2. **Consistency**: Use design tokens and patterns consistently
3. **Accessibility**: Always consider keyboard, screen reader, and color contrast
4. **Performance**: Optimize images, lazy load components
5. **Semantic HTML**: Use appropriate HTML elements
6. **Spacing**: Use the spacing scale, avoid arbitrary values
7. **Colors**: Use semantic color tokens, not hardcoded values
8. **Typography**: Stick to the type scale
9. **Icons**: Use consistent sizes and the same icon library
10. **Testing**: Test on multiple screen sizes and devices

---

## Examples

See `/pages/index.vue` and component files for complete implementation examples of:
- Dashboard layout with sidebar
- Application form with multi-step progress
- Application detail view with 2-column layout
- Responsive table with mobile card fallback
- Status and priority badges
- Form elements and validation patterns

---

## Version

**Version**: 1.0  
**Last Updated**: 2024  
**Font**: Commissioner (Google Fonts)  
**Color Scheme**: Blue (#2563eb)  
**Framework**: Nuxt 3 + NuxtUI + Tailwind CSS
