# frozen_string_literal: true

source "https://rubygems.org"

# GitHub Pages compatibility - includes Jekyll 3.x
# Note: Do NOT specify jekyll version directly when using github-pages
gem "github-pages", group: :jekyll_plugins

# Markdown processor
gem "kramdown", "~> 2.3"

# Syntax highlighting
gem "rouge", "~> 3.26"

# Development dependencies
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.15"
  gem "jekyll-sitemap", "~> 1.4"
end

# Windows specific dependencies
group :windows do
  gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
end
