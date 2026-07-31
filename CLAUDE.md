## Project Overview

This is the personal portfolio site for Kittipong Sorasuchart (kittipong.org), built on the
**Untitled UI React** component library:

- **Next.js 16** with the App Router (Turbopack, fully static output)
- **React 19** with TypeScript
- **Tailwind CSS v4.2** for styling
- **React Aria Components** as the foundation for accessibility and behavior

This file covers conventions. For how the *site* is put together — routes, SEO
single-source-of-truth, social cards, adding a case study — see [README.md](README.md).

**The repo is pruned to what the site actually uses.** It began as the Untitled UI Next.js
starter kit; every file and dependency not reachable from a route has been removed (457
source files → 48, 37 runtime deps → 13). Only `src/components/base/{badges,buttons}` and
`src/components/foundations/` remain vendored. When you need another Untitled UI component,
copy in just that component rather than restoring the kit, and do not add a dependency
without an import to justify it.

## Key Architecture Principles

### Component Foundation

- Components are built on **React Aria Components** for consistent accessibility and behavior
- TypeScript is used throughout for type safety
- Every file under `src/` must be reachable from a route; nothing is kept "just in case"

### Import Naming Convention

**CRITICAL**: All imports from `react-aria-components` must be prefixed with `Aria*` for clarity and consistency:

```typescript
// ✅ Correct
import { Button as AriaButton, TextField as AriaTextField } from "react-aria-components";
// ❌ Incorrect
import { Button, TextField } from "react-aria-components";
```

This convention:

- Prevents naming conflicts with custom components
- Makes it clear when using base React Aria components
- Maintains consistency across the entire codebase

### File Naming Convention

**IMPORTANT**: All files must be named in **kebab-case** for consistency:

```
✅ Correct:
- date-picker.tsx
- user-profile.tsx
- api-client.ts
- auth-context.tsx

❌ Incorrect:
- DatePicker.tsx
- userProfile.tsx
- apiClient.ts
- AuthContext.tsx
```

This applies to all file types including:

- Component files (.tsx, .jsx)
- TypeScript/JavaScript files (.ts, .js)
- Style files (.css, .scss)
- Test files (.test.ts, .spec.tsx)
- Configuration files (when creating new ones)

## Development Commands

```bash
npm run dev         # Next.js dev server with Turbopack (http://localhost:3000)
npm run build       # Production build (Next.js + TypeScript compilation)
npm start           # Serve the production build
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint (flat config)
npm run format      # Prettier write
```

## Project Structure

### Application Architecture

```
src/
├── app/                   # Next.js App Router routes (NOT a `pages/` directory)
├── components/
│   ├── portfolio/         # Site-specific: header, footer, theme toggle, hero grid
│   ├── base/              # Untitled UI primitives in use: badges, buttons
│   └── foundations/       # Untitled UI: dot icon, social icons
├── hooks/                 # use-fade-up, use-mounted
├── lib/                   # Site config + schema.org builders (site.ts)
├── providers/             # React context providers (theme, router)
├── styles/                # Global styles and theme
└── utils/                 # cx(), view-transition navigation, helpers
```

## Styling Guidelines

### Tailwind CSS v4.2

- Uses the latest Tailwind CSS v4.2 features
- Custom design tokens defined in theme configuration
- Consistent spacing, colors, and typography scales

### Brand Color Customization

To change the main brand color across the entire application:

1. **Update Brand Color Variables**: Edit `src/styles/theme.css` and modify the `--color-brand-*` variables
2. **Maintain Color Scale**: Ensure you provide a complete color scale from 25 to 950 with proper contrast ratios
3. **Example Brand Color Scale**:
    ```css
    --color-brand-25: rgb(252 250 255); /* Lightest tint */
    --color-brand-50: rgb(249 245 255);
    --color-brand-100: rgb(244 235 255);
    --color-brand-200: rgb(233 215 254);
    --color-brand-300: rgb(214 187 251);
    --color-brand-400: rgb(182 146 246);
    --color-brand-500: rgb(158 119 237); /* Base brand color */
    --color-brand-600: rgb(127 86 217); /* Primary interactive color */
    --color-brand-700: rgb(105 65 198);
    --color-brand-800: rgb(83 56 158);
    --color-brand-900: rgb(66 48 125);
    --color-brand-950: rgb(44 28 95); /* Darkest shade */
    ```

The color scale automatically adapts to both light and dark modes through the CSS variable system.

### Style Organization

```typescript
export const styles = sortCx({
    common: {
        root: "base-classes-here",
        icon: "icon-classes-here",
    },
    sizes: {
        sm: { root: "small-size-classes" },
        md: { root: "medium-size-classes" },
    },
    colors: {
        primary: { root: "primary-color-classes" },
        secondary: { root: "secondary-color-classes" },
    },
});
```

### Utility Functions

- `cx()` - Class name utility (from `@/utils/cx`)
- `sortCx()` - Organized style objects
- `isReactComponent()` - Component type checking

## Icon Usage

### Import & Usage

```typescript
// Recommended: Named imports (tree-shakeable)
import { Home01, Settings01, ChevronDown } from "@untitledui/icons";

// Component props - pass as reference
<Button iconLeading={ChevronDown}>Options</Button>

// Standalone usage — semantic tokens only, never raw palette classes
<Home01 className="size-5 text-tertiary" />

// As JSX element - MUST include data-icon
<Button iconLeading={<ChevronDown data-icon className="size-4" />}>Options</Button>
```

### Styling

```typescript
// Size: use size-4 (16px), size-5 (20px), size-6 (24px)
<Home01 className="size-5" />

// Color: use semantic text colors
<Home01 className="size-5 text-brand-600" />

// Stroke width (line icons only)
<Home01 className="size-5" strokeWidth={2} />

// Accessibility: decorative icons need aria-hidden
<Home01 className="size-5" aria-hidden="true" />
```

## Animation and Interactions

### CSS Transitions

For default small transition actions (hover states, color changes, etc.), use:

```typescript
className = "transition duration-100 ease-linear";
```

This provides a snappy 100ms linear transition that feels responsive without being jarring.

### Loading States

- `Button` supports `isLoading` (and `showTextWhileLoading`) with a built-in spinner
- Proper disabled states during loading

### Disabled states

All components use `opacity-50` for disabled states instead of individual disabled color tokens:

```typescript
// Correct (v8)
"disabled:cursor-not-allowed disabled:opacity-50"

// Incorrect (v7 pattern, do not use)
"disabled:bg-disabled_subtle disabled:text-disabled disabled:ring-disabled"
```

## Common Patterns

### Conditional Rendering

```typescript
{badge && <Badge color="brand">{badge}</Badge>}
{project.videoSrc ? <video src={project.videoSrc} /> : <Image src={project.image} alt={project.alt} />}
```

### Scroll reveals

Content that animates in on scroll opts in with the `fade-up` class; `useFadeUp()` returns a
ref to place on the section root, and its `IntersectionObserver` adds `visible`.

```typescript
const ref = useFadeUp();
return (
    <div ref={ref}>
        <h2 className="fade-up">Heading</h2>
        <p className="fade-up delay-1">Body</p>
    </div>
);
```

`prefers-reduced-motion: reduce` is handled centrally in `src/styles/portfolio.css` — it
forces `.fade-up` to its final state. Never gate *content visibility* on JavaScript alone.

## State Management

### Component State

- Use React Aria's built-in state management
- Local state for component-specific data
- Context for shared component state (theme, router)

### Global State

- Theme context in `src/providers/theme.tsx`
- Router context in `src/providers/router-provider.tsx`

## Key Files and Utilities

### Core Utilities

- `src/utils/cx.ts` - Class name utilities
- `src/utils/is-react-component.ts` - Component type checking
- `src/hooks/` - Custom React hooks

### Style Configuration

- `src/styles/globals.css` - Global styles
- `src/styles/theme.css` - Theme definitions
- `src/styles/typography.css` - Typography styles

## Best Practices for AI Assistance

### When Adding New Components

1. Follow the existing component structure
2. Use React Aria Components as foundation
3. Implement proper TypeScript types
4. Add size and color variants where applicable
5. Include accessibility features
6. Follow the naming conventions
7. Add components to appropriate folders (`base/`, `application/`, etc.)

## Most Used Components Reference

### Button

The Button component is the most frequently used interactive element across the library.

**Import:**

```typescript
import { Button } from "@/components/base/buttons/button";
```

**Common Props:**

- `size`: `"xs" | "sm" | "md" | "lg" | "xl"` - Button size (default: `"sm"`)
- `color`: `"primary" | "secondary" | "tertiary" | "link-gray" | "link-color" | "primary-destructive" | "secondary-destructive" | "tertiary-destructive" | "link-destructive"` - Button color variant (default: `"primary"`)
- `iconLeading`: `FC | ReactNode` - Icon or component to display before text
- `iconTrailing`: `FC | ReactNode` - Icon or component to display after text
- `isDisabled`: `boolean` - Disabled state
- `isLoading`: `boolean` - Loading state with spinner
- `showTextWhileLoading`: `boolean` - Keep text visible during loading
- `children`: `ReactNode` - Button content

**Examples:**

```typescript
// Basic button
<Button size="md">Save</Button>

// With leading icon
<Button iconLeading={Check} color="primary">Save</Button>

// Loading state
<Button isLoading showTextWhileLoading>Submitting...</Button>

// Destructive action
<Button color="primary-destructive" iconLeading={Trash02}>Delete</Button>
```

### Badge

Badge components for status indicators and labels.

**Import:**

```typescript
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
```

**Common Props:**

- `size`: `"sm" | "md" | "lg"` - Badge size
- `color`: `"gray" | "brand" | "error" | "warning" | "success" | "slate" | "sky" | "blue" | "indigo" | "purple" | "pink" | "rose" | "orange"` - Color theme
- `type`: `"pill-color" | "color" | "modern"` - Badge style variant

**Examples:**

```typescript
// Basic badge
<Badge color="brand" size="md">New</Badge>

// With dot indicator
<BadgeWithDot color="success" type="pill-color">Active</BadgeWithDot>

// With icon
<BadgeWithIcon iconLeading={ArrowUp} color="success">12%</BadgeWithIcon>
```

### Link

**Note**: There is no dedicated Link component. Instead, use the Button component with an `href` prop and link-specific color variants.

**Import:**

```typescript
import { Button } from "@/components/base/buttons/button";
```

**Link Colors:**

- `link-gray` - Gray link styling
- `link-color` - Brand color link styling
- `link-destructive` - Destructive link styling

**Examples:**

```typescript
// Basic link
<Button href="/dashboard" color="link-color">View Dashboard</Button>

// With icon
<Button href="/settings" color="link-gray" iconLeading={Settings01}>
  Settings
</Button>

// Destructive link
<Button href="/delete" color="link-destructive" iconLeading={Trash02}>
  Delete Account
</Button>

// External link
<Button href="https://example.com" color="link-color" iconTrailing={ExternalLink01}>
  Visit Site
</Button>
```

### Common Component Patterns

1. **Size Variants**: Most components support `sm`, `md`, `lg` sizes
2. **State Props**: `isDisabled`, `isLoading`, `isInvalid`, `isRequired` are common
3. **Icon Support**: Components accept icons as both components (`Icon`) or elements (`<Icon />`)
4. **Compound Components**: Where a component has sub-parts, the Untitled UI kit exposes them
   with dot notation (`Select.Item`). None of the components currently vendored here use that
   pattern — expect it if you copy in a larger one.
5. **Accessibility**: All components include proper ARIA attributes and keyboard support

### Icon Usage

When passing icons to components:

```typescript
// As component reference (preferred)
<Button iconLeading={ChevronDown}>Options</Button>

// As element (must include data-icon)
<Button iconLeading={<ChevronDown data-icon className="size-4" />}>Options</Button>
```

## COLORS

MUST use color classes to style elements.

Bad:

- text-gray-900
- text-gray-600
- bg-blue-700

Good:

- text-primary
- text-secondary
- bg-primary

### Text Color

Use text color variables to manage all text fill colors in your designs across light and dark modes.

| Name                       | Usage                                                                                                                                                                |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text-primary               | Primary text such as page headings.                                                                                                                                  |
| text-primary_on-brand      | Primary text when used on solid brand color backgrounds. Commonly used for brand theme website sections (e.g. CTA sections).                                         |
| text-secondary             | Secondary text such as labels and section headings.                                                                                                                  |
| text-secondary_hover       | Secondary text when in hover state.                                                                                                                                  |
| text-secondary_on-brand    | Secondary text when used on solid brand color backgrounds. Commonly used for brand theme website sections (e.g. CTA sections).                                       |
| text-tertiary              | Tertiary text such as supporting text and paragraph text.                                                                                                            |
| text-tertiary_hover        | Tertiary text when in hover state.                                                                                                                                   |
| text-tertiary_on-brand     | Tertiary text when used on solid brand color backgrounds. Commonly used for brand theme website sections (e.g. CTA sections).                                        |
| text-quaternary            | Quaternary text for more subtle and lower-contrast text, such as footer column headings.                                                                             |
| text-quaternary_on-brand   | Quaternary text when used on solid brand color backgrounds. Commonly used for brand theme website sections (e.g. footers).                                           |
| text-white                 | Text that is always white, regardless of the mode.                                                                                                                   |
| text-placeholder           | Default color for placeholder text such as input field placeholders. This can be changed to gray-400, but gray-500 is more accessible because it is higher contrast. |
| text-brand-primary         | Primary brand text useful for headings (e.g. cards in pricing page headers).                                                                                         |
| text-brand-secondary       | Secondary brand text for brand buttons, as well as accented text, highlights, and subheadings (e.g. subheadings in blog post cards).                                 |
| text-brand-secondary_hover | Secondary brand text when in hover state (e.g. brand buttons).                                                                                                       |
| text-brand-tertiary        | Tertiary brand text for lighter accented text and highlights (e.g. numbers in metric cards).                                                                         |
| text-brand-tertiary_alt    | An alternative to tertiary brand text that is lighter in dark mode (e.g. numbers in metric cards).                                                                   |
| text-error-primary         | Default error state semantic text color (e.g. input field error states).                                                                                             |
| text-warning-primary       | Default warning state semantic text color.                                                                                                                           |
| text-success-primary       | Default success state semantic text color.                                                                                                                           |

### Border Color

Use border color variables to manage all stroke colors in your designs across light and dark modes. You can use the same values for `ring-` and `outline-` as well (i.e. `ring-primary` `outline-secondary`).

| Name                 | Usage                                                                                                                                                                                   |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| border-primary       | High contrast borders. These are used for components such as input fields, button groups, and checkboxes.                                                                               |
| border-secondary     | Medium contrast borders. This is the most commonly used border color and is the default for most components (e.g. file uploaders), cards (such as tables), and content dividers.        |
| border-secondary_alt | An alternative to secondary border that uses alpha transparency. This is used exclusively for floating menus such as input dropdowns and notifications to create sharper bottom border. |
| border-tertiary      | Low contrast borders useful for very subtle dividers and borders such as line and bar chart axis dividers.                                                                              |
| border-brand         | Default brand border color. Useful for active states in components such as input fields.                                                                                                |
| border-brand_alt     | An brand border color that switches to gray when in dark mode. Useful for components such as brand-style variants of banners and footers.                                               |
| border-error         | Default error state semantic border color. Useful for error states in components such as input fields and file uploaders.                                                               |
| border-error_subtle  | A more subtle (lower contrast) alternative for error state semantic borders such as error state input fields.                                                                           |

### Foreground Color

Use foreground color variables to manage all non-text foreground elements in your designs across light and dark modes. Can be used via `text-`, `bg-`, `ring-`, `outline-`, `stroke-`, `fill-`, etc.

| Name                   | Usage                                                                                                                                                         |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| fg-primary             | Highest contrast non-text foreground elements such as icons.                                                                                                  |
| fg-secondary           | High contrast non-text foreground elements such as icons.                                                                                                     |
| fg-secondary_hover     | Secondary foreground elements when in hover state.                                                                                                            |
| fg-tertiary            | Medium contrast non-text foreground elements such as icons.                                                                                                   |
| fg-tertiary_hover      | Tertiary foreground elements when in hover state.                                                                                                             |
| fg-quaternary          | Low contrast non-text foreground elements such as icons in buttons, help icons and icons used in input fields.                                                |
| fg-quaternary_hover    | Quaternary foreground elements when in hover state, such as help icons.                                                                                       |
| fg-white               | Foreground elements that are always white, regardless of the mode.                                                                                            |
| fg-brand-primary       | Primary brand color non-text foreground elements such as featured icons and progress bars.                                                                    |
| fg-brand-primary_alt   | An alternative for primary brand color non-text foreground elements that switches to gray when in dark mode such as active horizontal tabs.                   |
| fg-brand-secondary     | Secondary brand color non-text foreground elements such as accents and arrows in marketing site sections (e.g. hero header sections).                         |
| fg-brand-secondary_alt | An alternative for secondary brand color non-text foreground elements that switches to gray when in dark mode such as brand buttons.                          |
| fg-error-primary       | Primary error state color for non-text foreground elements such as featured icons.                                                                            |
| fg-error-secondary     | Secondary error state color for non-text foreground elements such as icons in error state input fields and negative metrics item charts and icons.            |
| fg-warning-primary     | Primary warning state color for non-text foreground elements such as featured icons.                                                                          |
| fg-warning-secondary   | Secondary warning state color for non-text foreground elements.                                                                                               |
| fg-success-primary     | Primary success state color for non-text foreground elements such as featured icons.                                                                          |
| fg-success-secondary   | Secondary success state color for non-text foreground elements such as button dots, avatar online indicator dots, and positive metrics item charts and icons. |

### Background Color

Use background color variables to manage all fill colors for elements in your designs across light and dark modes.

| Name                    | Usage                                                                                                                                                                                         |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bg-primary              | The primary background color (white) used across all layouts and components.                                                                                                                  |
| bg-primary_alt          | An alternative primary background color (white) that switches to bg-secondary when in dark mode.                                                                                              |
| bg-primary_hover        | Primary background hover color. This acts as the default hover state background color for components with white backgrounds (e.g. input dropdown menu items).                                 |
| bg-primary-solid        | The primary dark background color used across layouts and components. This switches to bg-secondary when in dark mode and is useful for components such as tooltips and Text editor tooltips. |
| bg-secondary            | The secondary background color used to create contrast against white backgrounds, such as website section backgrounds.                                                                        |
| bg-secondary_alt        | An alternative secondary background color that switches to bg-primary when in dark mode. Useful for components such as border-style horizontal tabs.                                          |
| bg-secondary_hover      | Secondary background hover color. Useful for hover states for components with gray-50 backgrounds such as active states (e.g. navigation items and date pickers).                             |
| bg-secondary_subtle     | An alternative secondary background color that is slightly lighter and more subtle in light mode. This is useful for components such as banners.                                              |
| bg-secondary-solid      | The secondary dark background color used across layouts and components. This is useful for components such as featured icons.                                                                 |
| bg-tertiary             | The tertiary background color used to create contrast against light backgrounds such as toggles.                                                                                              |
| bg-quaternary           | The quaternary background color used to create contrast against light backgrounds, such as sliders and progress bars.                                                                         |
| bg-active               | Default active background color for components such as selected menu items in input dropdowns.                                                                                                |
| bg-overlay              | Default background color for background overlays. These are useful for overlay components such as modals.                                                                                     |
| bg-brand-primary        | The primary brand background color. Useful for components such as check icons.                                                                                                                |
| bg-brand-primary_alt    | An alternative primary brand background color that switches to bg-secondary when in dark mode. Useful for components such as active horizontal tabs.                                          |
| bg-brand-secondary      | The secondary brand background color. Useful for components such as featured icons.                                                                                                           |
| bg-brand-solid          | Default solid (dark) brand background color. Useful for components such as toggles and messages.                                                                                              |
| bg-brand-solid_hover    | Solid brand background color when in hover state. Useful for components such as toggles.                                                                                                      |
| bg-brand-section        | This is the default dark brand color background used for website sections such as CTA sections and testimonials. Switches to bg-secondary when in dark mode.                                  |
| bg-brand-section_subtle | An alternative brand section background color to provide contrast for website sections such as FAQ sections. Switches to bg-primary when in dark mode.                                        |
| bg-error-primary        | Primary error state background color for components such as buttons.                                                                                                                          |
| bg-error-secondary      | Secondary error state background color for components such as featured icons.                                                                                                                 |
| bg-error-solid          | Default solid (dark) error state background color for components such as buttons, featured icons and metric items.                                                                            |
| bg-error-solid_hover    | Default solid (dark) error hover state background color for components such as buttons.                                                                                                       |
| bg-warning-primary      | Primary warning state background color for components.                                                                                                                                        |
| bg-warning-secondary    | Secondary warning state background color for components such as featured icons.                                                                                                               |
| bg-warning-solid        | Default solid (dark) warning state background color for components such as featured icons.                                                                                                    |
| bg-success-primary      | Primary success state background color for components.                                                                                                                                        |
| bg-success-secondary    | Secondary success state background color for components such as featured icons.                                                                                                               |
| bg-success-solid        | Default solid (dark) success state background color for components such as featured icons and metric items.                                                                                   |
