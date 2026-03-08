# 快速部署命令

**状态**: ✅ 所有文件已准备就绪，等待推送到 GitHub

---

## 🚀 一键部署（选择一种方法）

### 方法 1: 使用 GitHub Token（推荐）

```bash
# 1. 创建 Token（首次需要）
# 访问：https://github.com/settings/tokens/new
# 选择 scopes: repo, workflow
# 复制生成的 Token

# 2. 推送（替换 YOUR_TOKEN）
cd /home/xun/xun-n-.github.io
git push https://YOUR_TOKEN@github.com/XUN-N/xun-n.git master
```

### 方法 2: 使用 SSH

```bash
# 1. 切换到 SSH（如果还没配置）
cd /home/xun/xun-n-.github.io
git remote set-url origin git@github.com:XUN-N/xun-n.git

# 2. 推送
git push origin master
```

### 方法 3: 使用 GitHub CLI

```bash
# 如果安装了 gh
cd /home/xun/xun-n-.github.io
gh auth login  # 首次需要登录
git push origin master
```

---

## ✅ 部署后

推送成功后：

1. **等待 2-3 分钟** - GitHub 自动构建
2. **访问网站** - https://xun-n.github.io/
3. **检查状态** - GitHub 仓库 → Settings → Pages

---

## 📊 当前状态

| 项目 | 状态 |
|------|------|
| 文件更新 | ✅ 完成 |
| Git 提交 | ✅ 完成 (66bc60b) |
| 推送 GitHub | ⏳ 等待认证 |
| GitHub Pages | ⏳ 等待部署 |

---

## 🎯 完成后的网站

访问：**https://xun-n.github.io/**

您将看到：
- ✅ 浅色科技风主页
- ✅ 博客列表（2 篇示例文章）
- ✅ 关于页面
- ✅ 项目展示
- ✅ 响应式设计

---

**打开 DEPLOY-GUIDE.html 查看详细指引！**
