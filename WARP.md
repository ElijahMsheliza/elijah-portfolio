# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a static portfolio website for Elijah Msheliza, an IT Support professional. The site is built with vanilla HTML, CSS, and JavaScript - no build tools or frameworks required. It features a modern, responsive design with smooth animations and is optimized for professional presentation.

## Development Commands

### Local Development
```bash
# Serve the site locally (Python 3)
python -m http.server 8000

# Serve the site locally (Python 2)
python -m SimpleHTTPServer 8000

# Alternative: Use Node.js serve package
npx serve .

# Open directly in browser (no server needed for basic functionality)
start index.html  # Windows
open index.html   # macOS
```

### Testing & Validation
```bash
# Validate HTML (using validator.nu)
curl -H "Content-Type: text/html; charset=utf-8" --data-binary @index.html https://validator.w3.org/nu/?out=text

# Check CSS for errors
npx stylelint css/styles.css

# Check JavaScript for errors
npx eslint js/script.js
```

## Architecture

### File Structure
- `index.html` - Single-page application with all content sections
- `css/styles.css` - All styling with CSS custom properties for theming
- `js/script.js` - Interactive features: navigation, animations, form handling
- `assets/` - Static assets (resume PDF, favicon) - directory may need creation

### Key Design Patterns

**CSS Architecture:**
- CSS custom properties in `:root` for consistent theming
- Mobile-first responsive design with progressive enhancement
- Component-based class naming (`.hero`, `.navbar`, `.project-card`, etc.)
- Grid and Flexbox layouts for responsive behavior

**JavaScript Architecture:**
- Event-driven DOM manipulation
- Intersection Observer for scroll animations
- Throttled scroll listeners for performance
- Form validation and submission handling

### Responsive Breakpoints
- Mobile: < 600px
- Tablet: 600px - 799px
- Desktop: 800px - 1023px
- Large Desktop: 1024px+

### Color Scheme
```css
--bg: #f8fafc;        /* Light gray background */
--surface: #ffffff;    /* White cards/surfaces */
--text: #0f172a;      /* Dark text */
--muted: #475569;     /* Muted text */
--primary: #0ea5e9;   /* Sky blue primary */
--accent: #14b8a6;    /* Teal accent */
```

## Development Guidelines

### Content Updates
- All content is directly in `index.html` - no CMS or dynamic data
- Project links currently use placeholder `#` - update with actual URLs
- Resume link points to `assets/resume.pdf` - ensure file exists
- Contact form currently shows alert on submission - integrate with email service if needed

### Performance Considerations
- Images are minimal (only Font Awesome icons and Google Fonts)
- JavaScript includes scroll throttling for performance
- CSS animations use `transform` and `opacity` for smooth performance
- All dependencies loaded from CDN (Font Awesome, Google Fonts)

### Browser Compatibility
- Modern browsers (ES6+ features used)
- CSS Grid and Flexbox required
- Intersection Observer API used (IE11+ or polyfill needed)

### Common Maintenance Tasks

**Adding New Projects:**
1. Copy existing `.project-card` div structure in `index.html`
2. Update icon class, title, description, and tech stack
3. Add real GitHub/demo links

**Updating Skills:**
1. Modify skill tags within `.skill-category` sections
2. Add new categories by copying existing structure

**Styling Changes:**
1. Modify CSS custom properties in `:root` for theme changes
2. Component styles are well-organized by section in `styles.css`

**Contact Information:**
1. Update email addresses, phone, LinkedIn URL in both hero and contact sections
2. Ensure social links in footer match contact section

## Deployment Notes

This is a static site that can be deployed to:
- GitHub Pages
- Netlify (drag & drop)
- Vercel
- Any static hosting service
- CDN with static hosting

No server-side processing required. The contact form currently uses client-side validation only - consider integrating with services like Formspree, Netlify Forms, or similar for actual email functionality.