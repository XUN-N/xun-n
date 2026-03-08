# Docker 部署指南

**版本**: 1.0  
**创建时间**: 2026-03-08  
**适用**: CDT501 博客 Docker 部署

---

## 📋 前提条件

### 需要安装的软件

1. **Docker** (必需)
2. **Docker Compose** (推荐)

---

## 🚀 快速开始

### 方法一：使用 Docker Compose（推荐）

#### 1. 启动开发环境

```bash
cd /home/xun/xun-n-.github.io
docker-compose up
```

**访问**: http://localhost:4000

**特点**:
- ✅ 自动热重载
- ✅ 实时预览更改
- ✅ 适合开发

#### 2. 构建生产版本

```bash
docker-compose run --rm jekyll-build
```

**输出**: `_site/` 目录

---

### 方法二：使用 Docker

#### 1. 构建镜像

```bash
docker build -t cdt501-blog .
```

#### 2. 运行容器

```bash
docker run -d \
  -p 4000:4000 \
  -v $(pwd):/srv/jekyll \
  --name blog-dev \
  cdt501-blog
```

**访问**: http://localhost:4000

#### 3. 查看日志

```bash
docker logs -f blog-dev
```

#### 4. 停止容器

```bash
docker stop blog-dev
docker rm blog-dev
```

---

## 🛠️ 常用命令

### 开发命令

```bash
# 启动开发服务器
docker-compose up

# 后台运行
docker-compose up -d

# 停止服务
docker-compose down

# 重建镜像
docker-compose up --build

# 查看日志
docker-compose logs -f

# 进入容器
docker-compose exec jekyll bash
```

### 构建命令

```bash
# 构建生产版本
docker-compose run --rm jekyll-build

# 清理临时文件
docker-compose down -v

# 清理未使用的镜像
docker image prune -a
```

---

## 📂 目录结构

```
cdt501-blog/
├── Dockerfile           # Docker 镜像配置
├── docker-compose.yml   # Docker Compose 配置
├── DOCKER-SETUP.md     # 本文件
├── Gemfile             # Ruby 依赖
├── _config.yml         # Jekyll 配置
├── _posts/             # 博客文章
├── _layouts/           # 布局模板
├── assets/             # 静态资源
└── _site/              # 构建输出（Git 忽略）
```

---

## 🔧 故障排除

### 问题 1: 端口被占用

**错误**: `Error starting userland proxy: bind: address already in use`

**解决**:
```bash
# 查找占用端口的进程
lsof -i :4000

# 杀死进程
kill -9 <PID>

# 或者使用其他端口
docker-compose up --abort-on-container-exit
# 修改 docker-compose.yml 中的端口映射
```

### 问题 2: 权限问题

**错误**: `Permission denied`

**解决**:
```bash
# 修复目录权限
sudo chown -R $(whoami):$(whoami) .

# 或者在 Docker 中运行
docker-compose run --user root jekyll bash
```

### 问题 3: 构建缓慢

**解决**:
```bash
# 清理未使用的镜像
docker image prune -a

# 使用国内镜像源
# 编辑 /etc/docker/daemon.json
{
  "registry-mirrors": [
    "https://registry.docker-cn.com"
  ]
}
```

### 问题 4: 中文乱码

**解决**:
```bash
# 确保 Dockerfile 中设置了正确的编码
ENV LANG=C.UTF-8
LC_ALL=C.UTF-8
```

---

## 🎯 生产部署

### 部署到服务器

#### 1. 上传文件

```bash
scp -r . user@server:/path/to/blog
```

#### 2. 在服务器上构建

```bash
cd /path/to/blog
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

#### 3. 配置 Nginx（可选）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 📊 镜像大小优化

### 当前镜像大小

```bash
docker images cdt501-blog
```

### 优化建议

1. **使用多阶段构建**
2. **清理缓存**
3. **使用 Alpine 基础镜像**

示例（多阶段构建）:

```dockerfile
# 构建阶段
FROM ruby:3.2 as builder
WORKDIR /srv/jekyll
COPY Gemfile ./
RUN bundle install
COPY . .
RUN bundle exec jekyll build

# 生产阶段
FROM nginx:alpine
COPY --from=builder /srv/jekyll/_site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🔗 相关资源

- [Docker 官方文档](https://docs.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
- [Jekyll Docker 镜像](https://github.com/envygeeks/jekyll-docker)
- [CDT501 Lecture 8](/blog/2026/03/08/cdt501-lecture8-ai-learning.html)

---

## 📝 更新日志

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-03-08 | 1.0 | 初始版本，支持开发和生产构建 |

---

*最后更新：2026-03-08*
