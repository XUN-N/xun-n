# CDT501 Structure Documentation

## Overview

CDT501 (探索人工智能 / Exploring Artificial Intelligence) follows the same Jekyll-based structure as CDT502 for consistency and maintainability.

## Directory Structure

```
xun-n-.github.io/
├── cdt501/                     # Public course folder
│   ├── index.html             # Landing page (Jekyll processed)
│   └── README.md              # Course overview
├── _cdt501_pages/             # Lesson pages collection
│   └── (lesson files here)    # Individual lesson content
├── _config.yml                # Jekyll configuration
└── index.html                 # Main site with Courses section
```

## Jekyll Configuration

### Collection Setup (in `_config.yml`)

```yaml
collections:
  cdt501_pages:
    output: true
    permalink: /cdt501/pages/:name/
```

### Defaults (in `_config.yml`)

```yaml
defaults:
  - scope:
      path: ""
      type: "cdt501_pages"
    values:
      layout: default
```

## Navigation

The CDT501 link is added to the main navigation in `_config.yml`:

```yaml
navigation:
  - title: CDT501
    link: /cdt501/
```

## Creating New Lesson Pages

1. Create a new file in `_cdt501_pages/`
2. Use front matter:

```yaml
---
title: "Lesson Title"
lesson_number: 1
---
```

3. The page will be available at: `/cdt501/pages/filename/`

## Design Consistency

- **Color Scheme**: Blue #1a73e8 (same as CDT502)
- **CSS**: Uses site-wide styles from `/assets/css/`
- **Responsive**: Mobile-friendly design
- **Navigation**: Links back to main site

## URL Structure

| Page | URL |
|------|-----|
| Landing | `https://xun-n.github.io/xun-n/cdt501/` |
| Lessons | `https://xun-n.github.io/xun-n/cdt501/pages/lesson-name/` |

## Future Enhancements

Planned additions when content is ready:

1. **Lesson Pages**: Add markdown files to `_cdt501_pages/`
2. **Progress Tracking**: Consider adding step indicators
3. **Code Examples**: Link to GitHub repositories
4. **Interactive Elements**: Embeddable notebooks or demos

---
*Documentation: CDT501-README.md*
