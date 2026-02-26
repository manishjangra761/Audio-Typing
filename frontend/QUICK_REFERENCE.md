# 🎯 Quick Reference Guide

## Tailwind CSS Classes

### Colors
```
Primary (Cyan):   primary-50 to primary-900  (main: 500)
Accent (Purple):  accent-50 to accent-900   (main: 500)  
Neutral (Slate):  neutral-50 to neutral-950 (main: 950)
```

### Common Spacing
```
p-4   = 1rem padding
px-6  = 1.5rem horizontal padding
py-3  = 0.75rem vertical padding
gap-6 = 1.5rem gap between items
mb-8  = 2rem margin bottom
```

### Typography
```
text-xs    = 0.75rem
text-sm    = 0.875rem
text-base  = 1rem
text-lg    = 1.125rem
text-xl    = 1.25rem
text-2xl   = 1.5rem  
text-3xl   = 1.875rem
text-4xl   = 2.25rem
text-5xl   = 3rem
text-6xl   = 3.75rem (headings)
text-7xl   = 4.5rem

font-400   = normal
font-500   = medium
font-600   = semibold
font-700   = bold
font-800   = extrabold
```

### Grid & Layout
```
grid md:grid-cols-2        = 1 col mobile, 2 col tablet
grid md:grid-cols-3 lg:grid-cols-4 = 1 col mobile, 3 col tablet, 4 col desktop

flex flex-col              = vertical stack
flex md:flex-row           = horizontal on desktop
gap-4                      = space between items
items-center               = vertical centering (flex)
justify-between            = space between extremes
```

### Visibility
```
hidden md:block             = hidden mobile, show desktop
hidden md:flex              = hidden mobile, flex desktop  
md:hidden                   = show mobile, hide desktop
lg:block                    = show on large screens
```

### Common Patterns
```
w-full                      = 100% width
h-full                      = 100% height
min-h-screen               = minimum viewport height
rounded-lg                 = 0.5rem border radius
rounded-xl                 = 0.75rem border radius
rounded-2xl                = 1rem border radius
rounded-3xl                = 1.5rem border radius
```

---

## Component Classes (In global.css)

### Glass Cards
```jsx
// Basic glass card
<div className="glass-card p-8 rounded-3xl">Content</div>

// With hover effect
<div className="glass-card p-8 hover:glass-light smooth-transition">Content</div>

// Different transparency levels
<div className="glass">Slightly transparent</div>
<div className="glass-light">More transparent</div>
<div className="glass-elevated">Most opaque</div>
```

### Buttons
```jsx
// Primary button
<button className="btn px-6 py-3 rounded-xl">Click Me</button>

// Secondary button  
<button className="btn-secondary px-6 py-3 rounded-xl">Secondary</button>

// Ghost button
<button className="btn-ghost px-6 py-3 rounded-xl">Ghost</button>

// Accent button
<button className="btn-accent px-6 py-3 rounded-xl">Accent</button>

// Disabled button
<button className="btn-disabled px-6 py-3 rounded-xl">Disabled</button>
```

### Input Fields
```jsx
// Text input
<input className="input-field" placeholder="Enter text" />

// With icon on left
<div className="relative">
  <FaIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
  <input className="input-field pl-12" />
</div>

// Textarea
<textarea className="input-field min-h-32 resize-none"></textarea>
```

### Badges
```jsx
<span className="badge">Default</span>
<span className="badge badge-primary">Primary</span>
<span className="badge badge-accent">Accent</span>
```

---

## Animations

### Animation Classes
```jsx
// Fade in with slight upward slide
<div className="animate-fadeInUp">Content</div>

// With delay (for staggered animations)
<div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
  Item 1
</div>
<div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
  Item 2
</div>

// Floating animation
<div className="floating">Floating element</div>

// Smooth transitions for hover states
<div className="smooth-transition hover:scale-105">Hover me</div>
```

### Custom Delays
```jsx
// Create staggered effect
{items.map((item, idx) => (
  <div 
    className="animate-fadeInUp"
    style={{ animationDelay: `${0.1 * idx}s` }}
    key={idx}
  >
    {item}
  </div>
))}
```

---

## Responsive Patterns

### Mobile First
```jsx
// Default (mobile), changes at breakpoints
<div className="text-sm md:text-base lg:text-lg">
  Text scales with screen size
</div>
```

### Grid Responsive
```jsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Sidebar/Content Layout
```jsx
<div className="flex flex-col md:flex-row gap-4">
  <aside className="w-full md:w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

---

## Utility Classes

```
.smooth-transition    = Smooth 300ms transitions
.glass               = Glassmorphic effect
.glass-light         = Lighter glass effect
.glass-elevated      = Elevated glass effect
.blur-glass          = Heavy backdrop blur
.text-balance        = Better text wrapping (h1)
.hide-scrollbar      = Custom scrollbar hiding
.floating            = Continuous floating animation
```

---

## Common Component Structure

### Page with Animated Header
```jsx
<div className="w-full min-h-screen bg-gradient-mesh overflow-hidden">
  {/* Background animations */}
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-screen filter blur-3xl floating"></div>
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full mix-blend-screen filter blur-3xl floating" style={{animationDelay: '-1s'}}></div>
  </div>

  <Navbar />
  
  {/* Main content */}
  <div className="relative pt-24 px-4 md:px-8 lg:px-12">
    <div className="max-w-7xl mx-auto">
      {/* Your content here */}
    </div>
  </div>
</div>
```

### Grid of Cards
```jsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item, idx) => (
    <div
      key={idx}
      className="glass-card p-8 rounded-3xl hover:glass-light smooth-transition animate-fadeInUp"
      style={{ animationDelay: `${0.1 * idx}s` }}
    >
      <h3 className="text-xl font-600 text-white mb-3">{item.title}</h3>
      <p className="text-neutral-300">{item.description}</p>
    </div>
  ))}
</div>
```

### Form Section
```jsx
<form className="glass-card p-8 rounded-3xl space-y-6">
  <h2 className="text-2xl font-bold text-white mb-8">Form Title</h2>
  
  <div>
    <label className="block text-sm font-600 text-neutral-300 mb-2">Label</label>
    <input className="input-field" />
  </div>
  
  <button type="submit" className="w-full btn py-3 rounded-xl">
    Submit
  </button>
</form>
```

---

## Color Usage Examples

### Text Colors
```
text-white             = Pure white
text-neutral-300       = Light gray (secondary text)
text-neutral-400       = Medium gray (tertiary text)
text-primary-400       = Light cyan (highlights)
text-accent-400        = Light purple (accent)
```

### Background Colors
```
bg-neutral-950         = Dark background
bg-primary-500/10      = Subtle cyan (semi-transparent)
bg-accent-500/20       = Subtle purple (semi-transparent)
bg-white/5             = Subtle white overlay
bg-white/10            = Stronger white overlay
```

### Border Colors
```
border-white/10        = Subtle white border
border-white/20        = Visible white border
border-primary-500     = Cyan border
border-accent-500      = Purple border
```

---

## Performance Tips

1. **Use Tailwind classes** - Not inline styles
2. **Avoid excessive animations** - Max 3-4 on one element
3. **Use `mix-blend-screen`** - For floating elements
4. **Apply `will-change`** - Only on animated elements
5. **Use `transform`** - For GPU acceleration
6. **Batch animations** - With staggered delays

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Colors not working | Check tailwind.config.js color names |
| Animations stuttering | Reduce blur or animation duration |
| Responsive not working | Check mobile-first (no `max-width`, just `min-width`) |
| Glass effect not visible | Ensure `backdrop-blur-lg` on any glass class |
| Text not readable | Check color contrast (min 4.5:1 for AA) |
| Button not clickable | Ensure parent doesn't have `pointer-events-none` |

---

## Resources

- Tailwind CSS: https://tailwindcss.com/docs
- Can I Use: https://caniuse.com (browser support)
- Web.dev: https://web.dev (performance, accessibility)
- WCAG: https://www.w3.org/WAI/WCAG21/quickref

---

## Version Info
- **Tailwind CSS**: 3.4.1
- **PostCSS**: 8.4.32
- **React**: 19.2.4
- **Last Updated**: February 26, 2026
