# frozen_string_literal: true

source "https://rubygems.org"

# Jekyll core
gem "jekyll", "~> 4.3"

# GitHub Pages compatibility
gem "github-pages", group: :jekyll_plugins

# Markdown processor
gem "kramdown", "~> 2.1"

# Syntax highlighting
gem "rouge", "~> 4.0"

# Development dependencies
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap", "~> 1.4"
end

# Windows specific dependencies
group :windows do
  gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
end
