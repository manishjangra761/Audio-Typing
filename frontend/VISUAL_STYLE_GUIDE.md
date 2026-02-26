# 🎨 Visual Style Guide

## Design Tokens

### Color Palette

#### Primary (Cyan - Action & Highlights)
```
50:  #f0f9fe
100: #e0f2fe
200: #bae6fd
300: #7dd3fc
400: #38bdf8
500: #0ea5e9 ← MAIN
600: #0284c7
700: #0369a1
800: #075985
900: #0c3d66
```

#### Accent (Purple - Secondary Actions)
```
50:  #faf5ff
100: #f3e8ff
200: #e9d5ff
300: #d8b4fe
400: #c084fc
500: #8b5cf6 ← MAIN
600: #7c3aed
700: #6d28d9
800: #5b21b6
900: #4c1d95
```

#### Neutral (Slate - Backgrounds & Text)
```
50:  #f9fafb
100: #f3f4f6
200: #e5e7eb
300: #d1d5db
400: #9ca3af
500: #6b7280
600: #4b5563
700: #374151
800: #1f2937
900: #111827
950: #030712 ← MAIN (Dark background)
```

---

## Typography System

### Font Family
**Poppins** (Google Fonts)
- Versatile, modern, friendly
- Weights: 400, 500, 600, 700, 800
- Spacing: Tight (good for headings), Normal (body)

### Type Scale
```
Display (Hero): 72px (text-7xl) | font-bold | Leading-tight
Title (H1):     60px (text-6xl) | font-bold | Leading-tight
Heading (H2):   48px (text-5xl) | font-700  | Leading-tight
Subheading (H3):36px (text-4xl) | font-700
Section (H4):   24px (text-2xl) | font-600
Body Large:     18px (text-lg)  | font-400 | Line-height: 1.625
Body:           16px (text-base)| font-400 | Line-height: 1.5
Small:          14px (text-sm)  | font-400 | Line-height: 1.5
Tiny:           12px (text-xs)  | font-400 | Line-height: 1.5
```

### Text Colors
```
Primary:        white (#ffffff)
Secondary:      neutral-300 (#d1d5db)
Tertiary:       neutral-400 (#9ca3af)
Disabled:       neutral-500 (#6b7280)
Links:          primary-400 (#38bdf8)
Hover:          primary-500 (#0ea5e9)
```

---

## Component Dimensions

### Buttons
```
Small:      px-4 py-2    | text-sm  | rounded-lg
Regular:    px-6 py-3    | text-base| rounded-xl
Large:      px-8 py-4    | text-lg  | rounded-xl
Full Width: w-full       | any size | rounded-xl
Loading:    pointer-events-none opacity-75 (disabled state)
```

### Input Fields
```
Height:         48px (py-3)
Padding:        px-4, pl-12 (with icon)
Border Radius:  rounded-xl
Background:     bg-white/5
Border:         border-white/10
Focus:          border-primary-500 bg-white/8
Placeholder:    text-white/60
```

### Cards
```
Standard:       p-6  | rounded-2xl
Large:          p-8  | rounded-3xl
Extra Large:    p-12 | rounded-3xl
Border:         border-white/10
Backdrop:       blur-md (12px) to blur-xl (24px)
Background:     bg-white/5 to bg-white/10
Shadow:         0 8px 32px rgba(0,0,0,0.1)
Hover Shadow:   0 16px 45px rgba(0,0,0,0.2)
```

### Spacing Scale (Tailwind 4px base)
```
2:   8px
3:   12px
4:   16px
5:   20px
6:   24px
8:   32px
10:  40px
12:  48px
16:  64px
20:  80px
24:  96px
```

---

## Glassmorphism Design

### Layer Structure
```
1. Base/Backdrop Layer
   → Fixed background with gradient mesh
   
2. Frosted Glass Layer
   → backdrop-filter: blur(12px to 24px)
   → background: rgba(255,255,255,0.05-0.10)
   
3. Border Layer
   → border: 1px solid rgba(255,255,255,0.10-0.20)
   
4. Content Layer
   → Solid text and icons
   
5. Interactive Layer
   → Hover effects, shadows, transforms
```

### Colors for Glass
```
Base:       bg-white/5      | border-white/10
Light:      bg-white/8      | border-white/15
Elevated:   bg-white/10     | border-white/20

Dark backgrounds:
Base:       bg-white/3      | border-white/5
With glow:  + radial-gradient overlay
```

### Blur Intensities
```
Glass:      blur-md  (12px)  - Normal Glass
Light:      blur-lg  (16px)  - Slightly more blur
Elevated:   blur-xl  (24px)  - Maximum blur
Background: blur-3xl (64px)  - Background elements
```

---

## Animation System

### Keyframes Library

#### Fade In Up
```
From:  opacity 0, transform translateY(20px)
To:    opacity 1, transform translateY(0)
Duration: 600ms
Easing: ease-out
```

#### Floating
```
0%:    transform translateY(0px)
50%:   transform translateY(-20px)
100%:  transform translateY(0px)
Duration: 3s infinite
Easing: ease-in-out
```

#### Shimmer (Loading)
```
0%:    background-position -1000px 0
100%:  background-position 1000px 0
Duration: 2s infinite
Background: gradient-animate
```

### Animation Timing
```
Micro:   200ms-300ms (subtle transitions)
Normal:  400ms-500ms (element entrance)
Macro:   1000ms+     (page transitions)
Loop:    3s          (continuous animations)
```

### Stagger Delay Pattern
```
First:   0.0s
Second:  0.1s
Third:   0.2s
Fourth:  0.3s
Formula: index * 0.1s

Usage:   style={{ animationDelay: `${0.1 * idx}s` }}
```

---

## Shadows & Depth

### Soft Shadow System
```
Glass Shadow:
  0 8px 32px rgba(0, 0, 0, 0.1)

Glass Hover Shadow:
  0 16px 45px rgba(0, 0, 0, 0.2)

Inset Shadow (neumorphism):
  inset 0 1px 0 rgba(255, 255, 255, 0.2) no-repeat,
  inset 0 2px 4px rgba(255, 255, 255, 0.1)

Glow Effect:
  0 0 20px rgba(14, 165, 233, 0.3)  // Primary
  0 0 30px rgba(139, 92, 246, 0.2)   // Accent
```

---

## Layout System

### Grid Layouts
```
Max-width:      max-w-7xl (80rem)
Full Bleed:     w-full
Padding:        px-4 md:px-8 lg:px-12
Gap:            gap-4 md:gap-6 lg:gap-8
```

### Responsive Grid
```
Mobile:   grid-cols-1
Tablet:   md:grid-cols-2
Desktop:  lg:grid-cols-3+ (varies)

Flexible: 
  grid-cols-auto-fit
  minmax(300px, 1fr)
```

### Common Layout Patterns
```
Hero:        Full-width, centered content, large headings
Card Grid:   Responsive grid, uniform height
Sidebar:     Sticky sidebar + scrollable content
Split:       50/50 on desktop, stacked mobile
Masonry:     Variable height cards, CSS grid
```

---

## Visual Hierarchy

### Size Hierarchy
```
Level 1 (Hero):  72px | 60px  → Draw attention
Level 2 (Title): 48px | 36px  → Section markers
Level 3 (Body):  18px | 16px  → Main content
Level 4 (Small): 14px | 12px  → Secondary info
```

### Color Hierarchy
```
Primary (Cyan):     Main actions, highlights
Accent (Purple):    Secondary actions, hover states
White:              Most important text
Neutral 300:        Secondary text
Neutral 400:        Tertiary text
Neutral 500:        Disabled states
```

### Weight Hierarchy
```
Bold (700-800):     Headings, important
Semibold (600):     Subheadings, labels
Normal (400-500):   Body text, descriptions
```

---

## Accessibility Standards

### Color Contrast
```
WCAG AA (4.5:1) - Required
white on neutral-950:     Excellent ✅
neutral-300 on neutral-950: Good ✅
primary-400 on neutral-950: Good ✅

WCAG AAA (7:1) - Enhanced
white on neutral-950:     Excellent ✅
```

### Focus States
```
Outline:  Visible 2px outline (primary-500)
Color:    Bright, contrasting color
Visible:  Must not disappear for mouse users
Keyboard: Must be accessible via Tab key
```

### Motion Safety
```
@media (prefers-reduced-motion: reduce):
  * { animation-duration: 0.01ms !important; }
```

---

## Micro-interactions

### Button States
```
Default:   opacity-100, scale-100
Hover:     opacity-100, scale-105, shadow-larger
Active:    scale-95
Disabled:  opacity-50, pointer-events-none
Loading:   opacity-75, pointer-events-none, spinner
```

### Input States
```
Default:   border-white/10, bg-white/5
Focus:     border-primary-500, bg-white/8, shadow-glow
Error:     border-red-500, bg-red-500/5
Valid:     border-green-500, bg-green-500/5
Disabled:  opacity-50, pointer-events-none
```

### Card Hover
```
Translate:  translateY(-8px)
Shadow:     Increase 2x
Border:     Increase opacity
Background: Slight increase opacity
Transition: 300ms ease-out
```

---

## Product Photography

### Image Guidelines
```
Format:    WebP or JPEG
Max Size:  1920x1080px for full-width
Optimize:  95-98% quality for JPEG
Aspect:    16:9 for full, 4:3 for cards
Loading:   Use blur-up technique
```

### Background Patterns
```
Gradient Mesh:
  6 radial gradients
  Mix blend mode: screen
  Blur: 3xl
  Opacity: 0.1-0.3
  Animation: Floating 3s infinite
```

---

## Dark Mode

### Background Colors
```
Primary:   neutral-950 (#030712)
Secondary: neutral-900 (#111827)
Tertiary:  neutral-800 (#1f2937)
```

### Text Colors
```
Primary:   white (#ffffff)
Secondary: neutral-300 (#d1d5db)
Tertiary:  neutral-400 (#9ca3af)
```

### Light Mode Fallback
```
Primary:   white (#ffffff)
Secondary: neutral-50 (#f9fafb)
Text:      neutral-900 (#111827)
Links:     primary-600 (#0284c7)
```

---

## File Organization

```
src/
├── styles/
│   ├── global.css          (Master stylesheet)
│   └── [component].css     (Component-specific - deprecated)
├── components/
│   ├── AuthLayout.jsx      (Pattern: Glass + Mesh)
│   ├── Login.jsx           (Pattern: Form)
│   ├── Header.jsx          (Pattern: Sticky Glass)
│   └── Dashboard/
│       └── DashboardLayout.jsx (Pattern: Grid + Sidebar)
└── tailwind.config.js      (Design tokens)
```

---

## Usage Examples

### Creating New Components
1. Use glass-card class as base
2. Add appropriate heading styles
3. Include hover effects
4. Support animations for entrance
5. Ensure responsive at md/lg breakpoints
6. Test keyboard/reduced-motion

### Color Decisions
- Bad: `#2b3a4c` (hard-coded color)
- Good: `text-neutral-300` or `text-primary-400`
- Use design tokens consistently

### Animation Decisions
- Bad: Multiple different timing values
- Good: Use 0.1s delays, 300ms transitions
- Use staggered pattern for groups

---

## Version & History
- **Version**: 1.0.0
- **Updated**: February 26, 2026
- **Designer**: Modern SaaS Design System
- **Status**: Production Ready ✅
