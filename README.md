# XUN's Personal Blog

A modern, light-themed personal blog built with Jekyll and deployed on GitHub Pages.

![Tech Theme](screenshot.png)

## ✨ Features

- 🎨 **Light Tech Theme** - Clean, modern design with blue accents
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Fast Performance** - Minimal dependencies, optimized assets
- 🚀 **GitHub Pages Ready** - Automatic deployment with GitHub Actions
- 📝 **Blog System** - Easy-to-write posts with Markdown
- 🏷️ **Tag Support** - Organize posts with tags
- 🔍 **SEO Friendly** - Meta tags and semantic HTML

## 🛠 Tech Stack

- **Static Site Generator**: Jekyll
- **Language**: HTML, CSS, JavaScript
- **Hosting**: GitHub Pages
- **Version Control**: Git

## 🚀 Quick Start

### Prerequisites

- Ruby 3.1 or higher
- Bundler (`gem install bundler`)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/XUN-N/xun-n.git
   cd xun-n.git
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Start the development server**
   ```bash
   bundle exec jekyll serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4000`

### Creating a New Post

1. Create a new file in `_posts/` with the format:
   ```
   YYYY-MM-DD-title-of-post.md
   ```

2. Add front matter at the top:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   date: 2026-03-08 12:00:00 +0800
   tags: [tag1, tag2]
   excerpt: "Brief description"
   ---
   
   Your content here...
   ```

3. Write your post in Markdown

4. Commit and push - GitHub Pages will auto-deploy!

### Creating a Project

1. Create a new file in `_projects/`:
   ```
   project-name.md
   ```

2. Add front matter:
   ```yaml
   ---
   layout: project
   title: "Project Name"
   subtitle: "Brief tagline"
   tags: [tech1, tech2]
   github: https://github.com/your-repo
   excerpt: "Short description"
   ---
   
   Project details...
   ```

## 🎨 Customization

### Change Colors

Edit `assets/css/style.css` and modify the CSS variables:

```css
:root {
  --bg-primary: #f0f4f8;      /* Main background */
  --accent-blue: #3b82f6;     /* Primary accent */
  --text-primary: #1a202c;    /* Main text color */
}
```

### Update Site Info

Edit `_config.yml`:

```yaml
title: Your Blog Name
description: Your blog description
url: https://yourusername.github.io
social:
  github: https://github.com/yourusername
  email: your@email.com
```

### Modify Navigation

In `_config.yml`, update the `navigation` array:

```yaml
navigation:
  - title: Home
    link: /
  - title: Blog
    link: /blog.html
  # Add more items...
```

## 📁 Project Structure

```
.
├── _config.yml              # Site configuration
├── _layouts/                # HTML templates
│   ├── default.html        # Base layout
│   ├── post.html           # Blog post layout
│   └── project.html        # Project layout
├── _posts/                  # Blog posts
├── _projects/               # Project showcases
├── assets/
│   └── css/
│       └── style.css       # Custom styles
├── .github/
│   └── workflows/
│       └── jekyll.yml      # GitHub Actions
├── index.html              # Homepage
├── blog.html               # Blog listing
├── about.html              # About page
├── projects.html           # Projects page
└── README.md               # This file
```

## 🌐 Deployment

### Automatic (Recommended)

The site uses GitHub Actions for automatic deployment:

1. Push to the `main` branch
2. GitHub Actions builds the site
3. Deployed to GitHub Pages automatically

### Manual

1. Build the site:
   ```bash
   bundle exec jekyll build
   ```

2. Upload the `_site/` folder to your hosting

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use!

## 📬 Contact

- **GitHub**: [@XUN-N](https://github.com/XUN-N)
- **Email**: [xun@example.com](mailto:xun@example.com)

---

Built with ❤️ using Jekyll and GitHub Pages
