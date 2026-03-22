# Deployment Guide - CDT501 Blog

This guide explains how to deploy your new Jekyll blog to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- A GitHub repository named `yourusername.github.io`

## 🚀 Quick Deploy (Recommended)

### Step 1: Push to GitHub

```bash
cd /home/xun/xun-n.git

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: CDT501 personal blog"

# Add your remote repository
git remote add origin https://github.com/XUN-N/xun-n.git

# Push to GitHub
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** → **Pages**
3. Under **Source**, select:
   - **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

### Step 3: Wait for Deployment

GitHub Actions will automatically:
1. Build your Jekyll site
2. Deploy it to GitHub Pages
3. Provide a live URL (usually `https://yourusername.github.io`)

You can check the deployment status in the **Actions** tab.

## 🔧 Manual Configuration

### Update Site URL

Edit `_config.yml` and change:

```yaml
url: https://XUN-N.github.io  # Replace with your username
```

### Update Social Links

```yaml
social:
  github: https://github.com/yourusername
  email: your@email.com
```

### Customize Navigation

Edit the `navigation` section in `_config.yml`:

```yaml
navigation:
  - title: Home
    link: /
  - title: Blog
    link: /blog.html
  - title: About
    link: /about.html
  - title: Projects
    link: /projects.html
```

## 📝 Making Updates

### Adding a Blog Post

1. Create a new file in `_posts/`:
   ```bash
   touch _posts/2026-03-09-my-new-post.md
   ```

2. Add front matter and content:
   ```markdown
   ---
   layout: post
   title: "My New Post"
   date: 2026-03-09 10:00:00 +0800
   tags: [tutorial, web-dev]
   excerpt: "Brief description"
   ---
   
   Your content here...
   ```

3. Commit and push:
   ```bash
   git add .
   git commit -m "Add new blog post"
   git push
   ```

4. Wait ~1-2 minutes for GitHub Pages to rebuild

### Adding a Project

1. Create a file in `_projects/`:
   ```bash
   touch _projects/my-project.md
   ```

2. Add project details:
   ```markdown
   ---
   layout: project
   title: "My Project"
   subtitle: "Cool project description"
   tags: [tech1, tech2]
   github: https://github.com/yourusername/project
   excerpt: "Short description"
   ---
   
   Project details...
   ```

3. Commit and push

## 🎨 Customizing the Design

### Change Colors

Edit `assets/css/style.css`:

```css
:root {
  --bg-primary: #f0f4f8;      /* Main background */
  --bg-secondary: #ffffff;     /* Card backgrounds */
  --accent-blue: #3b82f6;      /* Links and buttons */
  --text-primary: #1a202c;     /* Main text */
}
```

### Modify Layout

Edit files in `_layouts/`:
- `default.html` - Base template for all pages
- `post.html` - Blog post layout
- `project.html` - Project page layout

## 🐛 Troubleshooting

### Site Not Updating

1. Check **Actions** tab for build errors
2. Verify `_config.yml` syntax
3. Check for Markdown errors in recent posts

### Build Fails

Common issues:
- Missing closing tags in front matter (`---`)
- Invalid YAML syntax
- Special characters not escaped

### Local Testing (Optional)

If you want to test locally:

```bash
# Install Ruby and Bundler
# Ubuntu/Debian:
sudo apt install ruby-full build-essential zlib1g-dev

# macOS:
brew install ruby

# Install Jekyll
gem install bundler
bundle install

# Run local server
bundle exec jekyll serve

# Visit http://localhost:4000
```

## 📊 GitHub Actions Status

The workflow file is at `.github/workflows/jekyll.yml`

It automatically:
- ✅ Builds on every push to `main`
- ✅ Deploys to GitHub Pages
- ✅ Provides deployment URL

## 🎯 CDT501 Requirements Checklist

- [x] Blog-style website
- [x] Light color theme
- [x] Tech-inspired design
- [x] HTML/CSS/JavaScript (Jekyll generates static HTML)
- [x] GitHub Pages deployment
- [x] Responsive design
- [x] Sample content included

## 📞 Need Help?

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Docs](https://pages.github.com/)
- [GitHub Community](https://github.community/)

---

**Good luck with your CDT501 project! 🚀**
