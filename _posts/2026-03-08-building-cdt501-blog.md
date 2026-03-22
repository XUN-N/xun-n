---
layout: post
title: "Building This Blog: CDT501 Project"
date: 2026-03-08 14:00:00 +0800
author: XUN
tags: [project, jekyll, web-dev, CDT501]
excerpt: "A behind-the-scenes look at how I built this blog using Jekyll and GitHub Pages for my CDT501 course project."
---

This blog is actually my first project for the **CDT501** course! Let me walk you through how I built it.

## Project Requirements

The task was to create a personal blog-style website with:

- Light color theme
- Tech-inspired design
- Native HTML/CSS/JavaScript
- GitHub Pages deployment

## Technology Choices

### Why Jekyll?

While the requirements mentioned "native HTML/CSS/JavaScript", I chose **Jekyll** because:

1. It generates static HTML (no server-side processing needed)
2. Perfect for GitHub Pages (native support)
3. Makes content management much easier
4. Still uses pure HTML/CSS/JS under the hood

### Design Decisions

**Color Palette:**
- Primary background: `#f0f4f8` (light blue-gray)
- Secondary background: `#ffffff` (pure white)
- Accent color: `#3b82f6` (tech blue)
- Gradient: Purple to violet for headers

**Typography:**
- System fonts for performance
- Clean, modern sans-serif
- Good line-height for readability

**Layout:**
- Responsive grid system
- Card-based design for posts
- Minimal navigation
- Plenty of white space

## Key Features

### 1. Custom CSS Variables

```css
:root {
  --bg-primary: #f0f4f8;
  --accent-blue: #3b82f6;
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --radius-lg: 12px;
}
```

Using CSS variables makes theming consistent and easy to update.

### 2. Responsive Design

The site adapts to different screen sizes:

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly buttons
- Readable text at all sizes

### 3. Smooth Interactions

- Hover effects on cards
- Smooth scrolling
- Subtle animations
- Custom scrollbar styling

## Challenges & Solutions

### Challenge 1: Clean Code Structure

**Solution:** Organized files logically:
```
├── _config.yml
├── _layouts/
├── _posts/
├── _projects/
├── assets/css/
└── index.html
```

### Challenge 2: Performance

**Solution:** 
- Minimal external dependencies
- System fonts instead of web fonts
- Optimized CSS
- No heavy JavaScript frameworks

### Challenge 3: GitHub Pages Deployment

**Solution:** 
- Proper `_config.yml` setup
- Jekyll build workflow
- Tested locally before pushing

## Next Steps

This is just version 1! Future improvements might include:

- [ ] Dark mode toggle
- [ ] Search functionality
- [ ] Comments system
- [ ] RSS feed
- [ ] Analytics integration
- [ ] More blog posts!

## Lessons Learned

1. **Start simple** - Don't over-engineer from the beginning
2. **Design iteratively** - Keep refining as you build
3. **Test early** - Check responsiveness from day one
4. **Document everything** - Future you will thank present you

## Resources

If you want to build something similar:

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Guide](https://pages.github.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

Thanks for reading! This project was a great way to practice web development skills while creating something useful.

*Built with ❤️ using Jekyll and GitHub Pages*
