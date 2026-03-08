# Dockerfile for CDT501 Blog
# 使用 Jekyll 构建和部署博客

FROM ruby:3.2

# 设置环境变量
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    JEKYLL_ENV=production

# 安装依赖
RUN apt-get update && apt-get install -y \
    build-essential \
    nodejs \
    && rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /srv/jekyll

# 复制 Gemfile
COPY Gemfile ./

# 安装 Ruby 依赖
RUN bundle install

# 复制博客文件
COPY . .

# 构建网站
RUN bundle exec jekyll build

# 暴露端口
EXPOSE 4000

# 启动命令
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4000"]
