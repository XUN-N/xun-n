# Quick Start Guide - CDT501 Blog

## 🚀 Deploy in 3 Steps

```bash
# 1. Navigate to the project
cd /home/xun/xun-n.git

# 2. Commit and push to GitHub
git add .
git commit -m "Deploy CDT501 personal blog"
git push origin main

# 3. Enable GitHub Pages
# Go to: https://github.com/XUN-N/xun-n.git/settings/pages
# Select: Source = Deploy from branch (main, root folder)
```

That's it! Your site will be live in 1-2 minutes.

---

## ✏️ Add a Blog Post

```bash
# Create new post file
touch _posts/2026-03-09-my-first-post.md

# Edit with your content
code _posts/2026-03-09-my-first-post.md
```

**Template:**
```markdown
---
layout: post
title: "Your Title"
date: 2026-03-09 10:00:00 +0800
tags: [tag1, tag2]
excerpt: "Brief description"
---

Your content here...
```

**Deploy:**
```bash
git add .
git commit -m "Add new blog post"
git push
```

---

## 🎨 Customize Colors

Edit `assets/css/style.css`:

```css
:root {
  --bg-primary: #f0f4f8;      /* Change main background */
  --accent-blue: #3b82f6;     /* Change accent color */
  --text-primary: #1a202c;    /* Change text color */
}
```

---

## 📝 Update Site Info

Edit `_config.yml`:

```yaml
title: Your Blog Name
description: Your description
url: https://XUN-N.github.io

social:
  github: https://github.com/yourusername
  email: your@email.com
```

---

## 🔍 Test Locally (Optional)

```bash
# Install dependencies (first time only)
bundle install

# Start local server
bundle exec jekyll serve

# Open browser to http://localhost:4000
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `_config.yml` | Site configuration |
| `assets/css/style.css` | Theme styles |
| `_posts/` | Blog posts go here |
| `_projects/` | Project showcases |
| `index.html` | Homepage |
| `README.md` | Full documentation |
| `DEPLOYMENT.md` | Detailed deployment guide |

---

## ✅ Checklist

Before deploying:

- [ ] Update `_config.yml` with your info
- [ ] Customize colors in `style.css` (optional)
- [ ] Add at least one blog post
- [ ] Add at least one project
- [ ] Update social links
- [ ] Review all pages
- [ ] Commit and push to GitHub
- [ ] Enable GitHub Pages in settings

---

## 🆘 Troubleshooting

**Site not updating?**
- Check GitHub Actions tab for errors
- Verify `_config.yml` syntax
- Wait 1-2 minutes for rebuild

**Build fails?**
- Check for YAML syntax errors
- Ensure front matter has `---` at top and bottom
- Look for unclosed tags

**Need help?**
- Read `DEPLOYMENT.md` for detailed guide
- Check `README.md` for full documentation
- Review `PROJECT-SUMMARY.md` for overview

---

## 🎯 You're Done!

Your CDT501 blog is ready. Push to GitHub and share it with the world! 🌟

**Live URL**: https://XUN-N.github.io
