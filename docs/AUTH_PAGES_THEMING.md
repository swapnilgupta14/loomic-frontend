# Auth Pages Theme Integration

## Overview

All authentication pages have been updated to fully integrate with the Loomic theme system using the `clr-` prefix color structure. This ensures consistent theming across all pages and automatic adaptation to theme changes.

## Updated Pages

### 1. Login Page (`/login`)
- **Route:** `/app/(auth)/login/page.tsx`
- **Features:**
  - Email and password inputs with validation
  - Password visibility toggle
  - Social login buttons (Google, GitHub)
  - Forgot password link
  - Sign up redirect
- **Theme Elements:**
  - Primary gradient title
  - Theme-aware error messages using `clr-danger`
  - Glassmorphism card with `glass-card` utility
  - Primary button using `btn-primary`
  - Ambient background glow using `clr-primary` and `clr-secondary`

### 2. Signup Page (`/signup`)
- **Route:** `/app/(auth)/signup/page.tsx`
- **Features:**
  - Full name, email, and password inputs
  - Password confirmation with matching validation
  - Password strength requirements
  - Social signup buttons
  - Terms and privacy policy links
- **Theme Elements:**
  - Secondary gradient title
  - Theme-aware validation messages
  - Consistent input styling with focus states
  - Primary CTA button
  - Icon background using `clr-secondary-subtle`

### 3. Forgot Password Page (`/forgot-password`)
- **Route:** `/app/(auth)/forgot-password/page.tsx`
- **Features:**
  - Email input for password reset
  - Success state with confirmation message
  - Retry functionality
  - Back to login navigation
- **Theme Elements:**
  - Accent gradient title
  - Success message using `clr-success-subtle`
  - Dynamic icon color based on state
  - Consistent button styling

## Theme Integration Details

### Color Tokens Used

#### Semantic Colors
- `clr-background` - Page background
- `clr-foreground` - Primary text
- `clr-muted-foreground` - Secondary text, placeholders
- `clr-border` - Borders and dividers
- `clr-surface` - Elevated surfaces (buttons, cards)
- `clr-surface-hover` - Hover states
- `clr-input` - Input field backgrounds

#### Brand Colors
- `clr-primary` - Primary brand color (violet)
  - `clr-primary-hover` - Hover state
  - `clr-primary-subtle` - Light background tint
  - `clr-primary-foreground` - Text on primary
- `clr-secondary` - Secondary brand color (teal)
  - `clr-secondary-hover` - Hover state
  - `clr-secondary-subtle` - Light background tint
- `clr-accent` - Accent color
  - `clr-accent-hover` - Hover state
  - `clr-accent-subtle` - Light background tint

#### Status Colors
- `clr-danger` - Error states
  - `clr-danger-subtle` - Error backgrounds
- `clr-success` - Success states
  - `clr-success-subtle` - Success backgrounds
- `clr-warning` - Warning states
- `clr-info` - Info states

#### Focus States
- `clr-ring` - Focus ring color

### Utility Classes Used

#### Gradients
- `gradient-primary` - Primary brand gradient (violet)
- `gradient-secondary` - Secondary brand gradient (teal)
- `gradient-accent` - Accent gradient

#### Buttons
- `btn-primary` - Primary button style with theme colors

#### Glass Effects
- `glass-card` - Glassmorphism card with backdrop blur

### Theme Adaptation

All auth pages automatically adapt to:

1. **Theme Changes**
   - Switching between Default, Ocean, Sunset, Forest, etc.
   - All colors update dynamically via CSS variables

2. **Light/Dark Mode**
   - Background colors adjust automatically
   - Text contrast maintained for accessibility
   - Ambient glow effects adapt to theme

3. **Custom Themes**
   - Any new theme defined in `themes.ts` works immediately
   - No code changes required for new color schemes

## Component Structure

### Common Elements Across All Auth Pages

```tsx
// Background with theme-aware ambient glow
<div className="bg-clr-background relative">
  <div className="bg-clr-primary/5 rounded-full blur-3xl animate-pulse" />
  <div className="bg-clr-secondary/5 rounded-full blur-3xl animate-pulse" />
</div>

// Glassmorphism card
<Card className="glass-card shadow-2xl">
  {/* Content */}
</Card>

// Icon container with theme color
<div className="bg-clr-primary-subtle border border-clr-border">
  <Icon className="text-clr-primary" />
</div>

// Gradient title
<CardTitle className="gradient-primary">Title</CardTitle>

// Error message
<div className="bg-clr-danger-subtle border border-clr-danger/20 text-clr-danger">
  Error message
</div>

// Input field
<Input className="bg-clr-input border-clr-border focus:border-clr-primary focus:ring-clr-ring/20" />

// Primary button
<Button className="btn-primary shadow-lg shadow-clr-primary/25">
  Submit
</Button>

// Social buttons
<Button className="border-clr-border bg-clr-surface hover:bg-clr-surface-hover">
  Social Login
</Button>
```

## Accessibility

### Contrast Ratios
All color combinations maintain WCAG AA standards:
- Primary text: High contrast on all backgrounds
- Error messages: Clear visibility with semantic colors
- Focus states: Visible ring with `clr-ring`
- Disabled states: Reduced opacity maintains context

### Interactive States
- **Hover:** Smooth transitions using `clr-*-hover` variants
- **Focus:** Clear focus rings using `clr-ring`
- **Active:** Proper feedback on interactions
- **Disabled:** Obvious visual indication

## Responsive Design

All auth pages are fully responsive:
- Mobile-first approach
- Breakpoint-specific adjustments
- Touch-friendly button sizes
- Readable text at all screen sizes

## Performance

### Optimizations
- CSS variables for instant theme switching
- No runtime JavaScript for theming
- Backdrop blur for glassmorphism
- Optimized animations with `animate-pulse`

### Loading States
- Spinner animations during API calls
- Disabled states during submission
- Loading text feedback

## Testing Themes

To test different themes on auth pages:

1. Navigate to any auth page
2. Use the theme switcher in the header
3. Observe:
   - Background colors change
   - Accent colors update
   - Gradients shift
   - Glass effects adapt
   - Ambient glows adjust

### Recommended Theme Testing
- **Default (Loomic):** Lime to cyan gradient
- **Ocean:** Deep blues and cyan
- **Sunset:** Warm peach tones
- **Forest:** Natural greens
- **Berry Wine:** Berry and plum
- **Emerald Glow:** Rich emerald with gold

## Future Enhancements

- [ ] Add theme-aware illustrations
- [ ] Animated gradient backgrounds
- [ ] Theme-specific animations
- [ ] More granular color customization
- [ ] Theme preview on auth pages
- [ ] Accessibility theme (high contrast)

## Best Practices

1. **Always use semantic tokens** - Never hardcode colors
2. **Test in multiple themes** - Ensure consistency
3. **Maintain contrast** - Check accessibility
4. **Use utility classes** - Leverage existing patterns
5. **Follow naming conventions** - Stick to `clr-` prefix

---

**Status:** ✅ Complete - All auth pages fully theme-integrated
**Last Updated:** November 2, 2025
**Maintained by:** Loomic Development Team

