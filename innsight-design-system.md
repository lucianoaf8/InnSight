# InnSight Design System Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Brand Identity](#brand-identity)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Layout & Spacing](#layout--spacing)
6. [Components](#components)
7. [Iconography](#iconography)
8. [Images & Illustrations](#images--illustrations)
9. [Animations & Transitions](#animations--transitions)
10. [Responsive Design](#responsive-design)
11. [Accessibility](#accessibility)
12. [Localization Design](#localization-design)
13. [Page-Specific Guidelines](#page-specific-guidelines)

---

## Introduction

InnSight is a personal mental health companion that helps users track their mood, log daily intentions, perform breathing exercises, and reflect over time. The design system prioritizes calm, clarity, and compassion to create a soothing digital environment that supports mental wellness.

### Design Principles

- **Serenity**: Create a calm, distraction-free environment using soft colors and ample whitespace
- **Clarity**: Use intuitive layouts and clear hierarchies that reduce cognitive load
- **Compassion**: Employ warm, supportive language and visuals that encourage self-care
- **Growth**: Reflect progress and personal development through thoughtful data visualization
- **Consistency**: Maintain unified design patterns across all aspects of the experience

---

## Brand Identity

### Logo & App Name

- **App Name**: InnSight
  - Pronunciation: /ɪn-saɪt/
  - Meaning: A play on "insight" with "Inn" suggesting an inner refuge or sanctuary
- **Logo Treatment**: 
  - The app name appears in the primary teal color (#2AB3B1 in light mode, #2EC8C4 in dark mode)
  - Font: Inter Bold
  - Size: 1.25rem (20px)

### Voice & Tone

- **Supportive**: Encourages without judgment
- **Clear**: Simple, straightforward language
- **Warm**: Friendly and conversational tone
- **Empowering**: Focuses on user agency and capacity for growth
- **Calm**: Avoids hyperbole or urgent language

---

## Color System

### Light Theme Palette

| Role    | Hex Color  | RGB           | Purpose                                            |
|---------|------------|---------------|---------------------------------------------------|
| Base BG | `#F5FAFD`  | (245,250,253) | Page backgrounds, keeps screens airy              |
| Primary | `#2AB3B1`  | (42,179,177)  | Buttons, active states, header                    |
| Accent  | `#F58F6C`  | (245,143,108) | Highlights, hover states, mood indicators         |
| Support | `#B8E6C1`  | (184,230,193) | Success states, positive indicators, secondary UI |
| Text    | `#1F262E`  | (31,38,46)    | Body text, headings                               |

### Dark Theme Palette

| Role     | Hex Color | RGB           | Purpose                                      |
|----------|-----------|---------------|----------------------------------------------|
| Base BG  | `#0B2540` | (11,37,64)    | Page backgrounds (deep navy)                 |
| BaseBG2  | `#0A1D30` | (10,29,48)    | Card backgrounds, slightly darker than base  |
| Text     | `#E7ECEF` | (231,236,239) | Body text, headings                          |
| Primary  | `#2EC8C4` | (46,200,196)  | Buttons, active states, header               |
| Accent   | `#C4B8FF` | (196,184,255) | Highlights, soft lavender for visual variety |
| Positive | `#3ED8A0` | (62,216,160)  | Success states, positive indicators          |

### Gradients

#### Light Mode Gradients
```css
/* Primary Gradient */
background: linear-gradient(135deg, #2AB3B1, #239997);

/* Accent Gradient */
background: linear-gradient(135deg, #F58F6C, #F47A56);

/* Support Gradient */
background: linear-gradient(135deg, #B8E6C1, #9ED0A8);
```

#### Dark Mode Gradients
```css
/* Primary Gradient */
background: linear-gradient(135deg, #2EC8C4, #26AEA9);

/* Accent Gradient */
background: linear-gradient(135deg, #C4B8FF, #B3A7E6);

/* Positive Gradient */
background: linear-gradient(135deg, #3ED8A0, #35BD8C);
```

### Color Usage Guidelines

- **Backgrounds**:
  - Use Base BG (`#F5FAFD` / `#0B2540`) for page backgrounds
  - Use white / `#0A1D30` for card backgrounds
  - Add 1px borders in light mode: `#E5E7EB`
  - Add 1px borders in dark mode: `#15324D`

- **Text Hierarchy**:
  - Primary text: Text color at 100% opacity
  - Secondary text: Text color at 70% opacity
  - Light mode secondary: `rgba(31,38,46,0.7)`
  - Dark mode secondary: `rgba(231,236,239,0.7)`

- **Interactive Elements**:
  - Buttons use primary gradient
  - Hover states add subtle scaling: `transform: scale(1.02)`
  - Active states add shadow: `box-shadow: 0 2px 4px rgba(0,0,0,0.1)`

- **Mood-Based Coloring**:
  - Positive moods: Support/Positive color
  - Neutral moods: Primary color
  - Challenging moods: Accent color

---

## Typography

### Font Family

```css
font-family: 'Inter', sans-serif;
```

Inter is the primary typeface for all text elements throughout the application. Fallback to system sans-serif if Inter is unavailable.

### Type Scale

| Element               | Size (rem/px) | Weight | Line Height | Case          |
|-----------------------|---------------|--------|-------------|---------------|
| App Title             | 1.25rem/20px  | 700    | 1.5         | Title Case    |
| Page Heading (H2)     | 1.5rem/24px   | 700    | 1.2         | Title Case    |
| Section Heading (H3)  | 1.125rem/18px | 700    | 1.3         | Title Case    |
| Subsection (H4)       | 1rem/16px     | 700    | 1.4         | Sentence case |
| Body Text             | 1rem/16px     | 400    | 1.5         | Sentence case |
| Small Text/Caption    | 0.875rem/14px | 400    | 1.5         | Sentence case |
| Extra Small/Metadata  | 0.75rem/12px  | 500    | 1.5         | Sentence case |

### Text Styles

```css
/* App Title */
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
}

/* Page Heading */
.page-heading {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

/* Section Heading */
.section-heading {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text);
}

/* Body Text */
.body-text {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-text);
}

/* Secondary Text */
.secondary-text {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

/* Metadata */
.metadata {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}
```

### Typography Guidelines

- Use sentence case for most UI text and buttons
- Left-align text generally; center-align buttons and some headings
- Keep line length between 50-75 characters for optimal readability
- Use font weight to create hierarchy rather than multiple font sizes
- Maintain sufficient contrast between text and background (minimum 4.5:1 for normal text)

---

## Layout & Spacing

### Grid System

The layout uses a 12-column grid system with responsive breakpoints.

#### Container Widths
- **Mobile**: 100% width with 16px padding (each side)
- **Tablet**: 100% width with 24px padding (each side) 
- **Desktop**: Max width of 1024px (64rem) centered with auto margins

### Spacing Scale

InnSight uses a consistent spacing scale based on 4px increments:

| Name   | Size (px) | Rem Value | Usage                           |
|--------|-----------|-----------|--------------------------------|
| 2xs    | 4px       | 0.25rem   | Minimal spacing between icons  |
| xs     | 8px       | 0.5rem    | Tight spacing, icons           |
| sm     | 12px      | 0.75rem   | Compact elements               |
| md     | 16px      | 1rem      | Standard spacing (base unit)   |
| lg     | 24px      | 1.5rem    | Section spacing                |
| xl     | 32px      | 2rem      | Major section divisions        |
| 2xl    | 48px      | 3rem      | Page section divisions         |

### Layout Guidelines

- **Header**:
  - Fixed height: 56px (3.5rem)
  - Shadow: subtle shadow to distinguish from content
  - Contains app name and utility buttons

- **Card Components**:
  - Border radius: 16px (1rem) - uses rounded-2xl
  - Padding: 20px (1.25rem)
  - Shadow: subtle elevation (0 1px 3px rgba(0,0,0,0.1))
  - Border: 1px solid border color or accent borders for emphasis

- **Content Containers**:
  - Max width: 768px for text-heavy content
  - Centered within the page
  - Bottom margin between sections: 24px (1.5rem)

- **Stacking/Z-index**:
  - Base content: z-index 0
  - Sticky headers: z-index 10
  - Modals/overlays: z-index 50
  - Notifications: z-index 100

---

## Components

### Cards

Cards are a primary UI element containing related content. All cards follow these guidelines:

```css
.card {
  background-color: white; /* Dark mode: #0A1D30 */
  border-radius: 1rem; /* 16px, rounded-2xl */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 1.25rem; /* 20px */
  margin-bottom: 1.5rem; /* 24px */
}

/* Cards with accent borders */
.card-accent {
  border-left: 3px solid var(--color-accent);
}

/* Interactive cards */
.card-interactive {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-interactive:hover {
  transform: scale(1.01);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
```

#### Card Variations

- **Standard Card**: Basic container with padding and rounded corners
- **Accent Card**: Left border uses color coding (3px width)
- **Interactive Card**: Includes hover state with slight scale and shadow
- **Stat Card**: Contains a metric with label, often with icon

### Buttons

```css
/* Primary Button */
.button-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.button-primary:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Secondary Button */
.button-secondary {
  background-color: rgba(31,38,46,0.05); /* Dark mode: rgba(231,236,239,0.05) */
  color: var(--color-text);
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: none;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.2s;
}

.button-secondary:hover {
  background-color: rgba(31,38,46,0.1); /* Dark mode: rgba(231,236,239,0.1) */
}

/* Icon Button */
.button-icon {
  background-color: transparent;
  color: var(--color-text);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.button-icon:hover {
  background-color: rgba(31,38,46,0.05); /* Dark mode: rgba(231,236,239,0.05) */
}
```

### Form Elements

```css
/* Text Input */
.input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #E5E7EB; /* Dark mode: #15324D */
  border-radius: 0.75rem;
  background-color: var(--color-base-bg);
  color: var(--color-text);
  transition: box-shadow 0.2s;
}

.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(42,179,177,0.25); /* Primary color at 25% opacity */
  border-color: var(--color-primary);
}

/* Select */
.select {
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* Custom dropdown arrow */
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
  /* Other styles match text input */
}
```

### Other Components

#### Streak Counter
```html
<div class="streak-counter">
  <Flame size={18} class="streak-icon" />
  <div>
    <p class="streak-label">Day streak</p>
    <p class="streak-count">5</p>
  </div>
</div>
```

```css
.streak-counter {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: white; /* Dark mode: #0A1D30 */
  border: 1px solid var(--color-accent);
}

.streak-icon {
  color: var(--color-accent);
  margin-right: 0.5rem;
}

.streak-label {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.streak-count {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
}
```

#### Mood Entry
```html
<div class="mood-entry">
  <div class="mood-entry-time">
    <p class="mood-entry-timestamp">19:30</p>
    <span class="mood-entry-period">🌙</span>
  </div>
  <div class="mood-entry-category">◆ Positive</div>
  <div class="mood-entry-emojis">😊 😌</div>
  <p class="mood-entry-journal">"Had a relaxing evening, completed my tasks without rushing."</p>
</div>
```

```css
.mood-entry {
  padding: 1.25rem;
  border-radius: 1rem;
  background-color: white; /* Dark mode: #0A1D30 */
  border-left: 3px solid var(--color-support); /* Varies based on mood */
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
  transition: transform 0.2s;
}

.mood-entry:hover {
  transform: scale(1.01);
}

.mood-entry-time {
  display: flex;
  align-items: center;
}

.mood-entry-timestamp {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-right: 0.5rem;
}

.mood-entry-category {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.mood-entry-emojis {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

.mood-entry-journal {
  font-size: 0.875rem;
  color: var(--color-text);
  font-style: italic;
}
```

#### Quote Card
```html
<div class="quote-card">
  <div class="quote-card-header">
    <Calendar size={18} class="quote-card-icon" />
    <p class="quote-card-label">Today's Reflection</p>
  </div>
  <p class="quote-card-text">"Be kind to yourself, for you are doing the best you can with what you know right now."</p>
</div>
```

```css
.quote-card {
  padding: 1.25rem;
  border-radius: 1rem;
  background-color: white; /* Dark mode: #0A1D30 */
  border-left: 3px solid var(--color-accent);
  margin-bottom: 1.5rem;
  transition: transform 0.3s;
}

.quote-card:hover {
  transform: scale(1.01);
}

.quote-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.quote-card-icon {
  color: var(--color-accent);
  margin-right: 0.5rem;
}

.quote-card-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.quote-card-text {
  font-size: 1rem;
  color: var(--color-text);
  font-style: italic;
}
```

---

## Iconography

InnSight uses the Lucide icon set, a modern icon library with a clean, consistent style.

### Icon Usage Guidelines

- **Size**: 
  - Standard UI icons: 20px
  - Small UI icons: 16px
  - Feature icons: 24px
  - Decorative/illustrative icons: 32px
  
- **Color**:
  - UI icons: Match text color
  - Accent icons: Use primary or accent colors
  - Interactive icons: Change color on hover/active states

- **Common Icon Patterns**:
  - Pair icons with labels for clarity
  - Use consistent icons for similar actions
  - Keep icons simple and recognizable
  - Maintain padding around icons (minimum 8px)

### Primary Icons and Their Usage

| Icon       | Description       | Usage                                      |
|------------|-------------------|-------------------------------------------|
| Globe      | Language toggle   | Header utility, language settings          |
| Moon/Sun   | Theme toggle      | Header utility, appearance settings        |
| Edit       | Edit content      | Interactive text areas, profile info       |
| Check      | Confirm/Complete  | Form submission, completed tasks           |
| X          | Cancel/Close      | Dialog close, form cancel                  |
| Flame      | Streak counter    | Dashboard stats, achievement metrics       |
| Calendar   | Date reference    | Quotes, date selectors, event markers      |
| ArrowRight | Proceed/Continue  | Action buttons, "view more" links          |
| ChevronRight | Expand/Collapse | Collapsible sections, detail views         |
| Clock      | Time reference    | Mood entries, reminders, scheduled events  |

---

## Images & Illustrations

InnSight primarily uses a clean UI with minimal imagery. When images or illustrations are used, they follow these guidelines:

### Image Guidelines

- Use subtle, calming imagery that reinforces mental wellness
- Avoid high-contrast or visually overwhelming photos
- Prefer abstract patterns over complex scenes
- Use imagery sparingly to maintain focus on functionality

### Illustration Style

When custom illustrations are needed:
- Use simple, line-based illustrations with limited color palette
- Rounded corners and soft shapes reinforce the friendly aesthetic
- Maintain sufficient whitespace around illustrations
- Ensure illustrations are accessible with adequate contrast

---

## Animations & Transitions

Animations in InnSight are subtle and purposeful, enhancing usability without distraction.

### Animation Principles

- **Subtle**: Animations should not distract from content
- **Purposeful**: Each animation should serve a functional purpose
- **Consistent**: Similar elements should animate in similar ways
- **Optional**: All animations respect user preferences for reduced motion

### Standard Transitions

```css
/* Standard transition for interactive elements */
.transition-standard {
  transition: all 0.2s ease;
}

/* Subtle hover effect for cards */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-hover:hover {
  transform: scale(1.01);
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}

/* Button hover effect */
.button-hover {
  transition: transform 0.2s ease;
}
.button-hover:hover {
  transform: scale(1.02);
}

/* Loading animation */
.loading-pulse {
  animation: pulse 1.5s ease infinite;
}
@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

## Responsive Design

InnSight adapts to various screen sizes while maintaining a consistent visual language.

### Breakpoints

| Name      | Size (px) | Description                        |
|-----------|-----------|----------------------------------- |
| xs        | < 640px   | Mobile phones                      |
| sm        | ≥ 640px   | Large phones, small tablets        |
| md        | ≥ 768px   | Tablets, small laptops             |
| lg        | ≥ 1024px  | Laptops, desktops                  |
| xl        | ≥ 1280px  | Large desktops                     |

### Responsive Patterns

- **Mobile-First Approach**: 
  - Design for mobile screens first, then scale up
  - Use `min-width` media queries to enhance layouts at larger sizes

- **Layout Changes**:
  - Single column on mobile (full width cards)
  - Two columns from tablet up (grid or sidebar)
  - Maximum content width on large screens (centered)

- **Component Adaptations**:
  - Cards stack vertically on mobile, displayed in grid on larger screens
  - Buttons expand to full width on very small screens
  - Text sizes remain consistent across breakpoints (with minor adjustments)
  - Navigation moves from bottom tabs (mobile) to top nav (desktop)

### Responsive Examples

```css
/* Basic card grid */
.card-grid {
  display: flex;
  flex-direction: column;
}

@media (min-width: 640px) {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Action buttons */
.action-buttons {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .action-buttons {
    grid-template-columns: 1fr 1fr;
  }
}
```

---

## Accessibility

InnSight is designed to be accessible to all users, including those with disabilities.

### Color Contrast

- Text maintains minimum contrast ratios:
  - Regular text: 4.5:1 (WCAG AA)
  - Large text: 3:1 (WCAG AA)
  - UI components: 3:1 (WCAG AA)
- Avoid using color alone to convey information
- Test all color combinations in both light and dark modes

### Focus States

- All interactive elements have visible focus indicators
- Focus indicators use the primary color with adequate contrast
- Focus order follows a logical sequence

```css
:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Semantic HTML

- Use proper heading structure (h1-h6)
- Apply appropriate landmarks (header, main, footer)
- Employ semantic elements (button, nav, article)
- Use ARIA attributes when necessary

### Text Alternatives

- All images have appropriate alt text
- Icons used for function have accessible names
- SVGs include title and description where appropriate

### Reduced Motion

- Respect prefers-reduced-motion media query
- Provide alternatives to motion-based interactions
- Keep essential animations subtle and brief

---

## Localization Design

InnSight supports multiple languages, with initial support for English and Portuguese.

### Text Considerations

- Allow for text expansion (Portuguese text can be 20-30% longer than English)
- Use flexible layouts that accommodate varying text lengths
- Avoid fixed-width containers for translatable text
- Test layouts with both languages to ensure proper display

### Date & Time Formatting

- Use locale-aware date formatting for each language
- Format dates according to regional conventions:
  - English (US): Month Day, Year (May 19, 2025)
  - Portuguese (BR): Day Month Year (19 de Maio de 2025)

### RTL Support (Future)

While not initially supported, the design system accommodates future RTL language support:
- Use logical properties where possible (start/end vs. left/right)
- Keep layouts symmetrical where feasible
- Avoid directional icons that would need mirroring

### Translation Keys

Use consistent naming conventions for translation keys:
- Namespace keys by feature area: `dashboard.greeting`
- Include context in key names: `common.save` vs. `form.save`
- Keep a master list of all translatable strings

---

## Page-Specific Guidelines

### Welcome/Login Page

- Clean, minimal design with prominent app name
- Simple login options with clear OAuth buttons
- Language toggle prominently displayed
- Theme toggle accessible but not dominant
- Welcoming imagery that establishes brand identity

### Dashboard

- Clear hierarchy with greeting and date at top
- Daily intention card with edit functionality
- Streak counter displayed alongside greeting
- Quote card for daily inspiration
- Primary actions (log mood, breathing) as prominent buttons
- Journey section with collapsible mood history
- Time-based mood entries grouped by date

### Mood Logging

- Simple, intuitive emoji picker
- Optional journal text area
- Time of day selection (morning/afternoon/evening)
- Clear save and cancel actions
- Non-judgmental UI that accepts all emotional states
- Confirmation feedback upon saving

### Breathing Exercise

- Minimal, distraction-free interface
- Clear visual timing indicator
- Simple animations that guide breathing rhythm
- Muted colors to promote calm
- Session completion acknowledgment
- Option to save or discard session results

### Settings

- Organized into logical sections (Account, Appearance, Notifications)
- Clear labeling of all options
- Preview of theme changes where applicable
- Confirmation for any significant changes
- Default values clearly indicated
