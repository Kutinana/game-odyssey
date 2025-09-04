# task.md
**Eleventy + Tailwind Game Project Aggregation Platform (MVP) 分步计划**  
目标：最小化版本的项目聚合门户，支持瀑布流展示，基于 GitHub Pages 部署，采用 Fork/PR 流程投稿。  

---

## 阶段 1：基础环境搭建
### 任务 1.1 初始化项目仓库
- 开始条件：新建一个空 GitHub Repo
- 步骤：`git init` → 添加 `.gitignore` (Node.js) → 初始 `README.md`
- 完成标志：本地与远程仓库建立连接，推送成功

### 任务 1.2 初始化 Node.js 项目
- 开始条件：仓库已建立
- 步骤：运行 `npm init -y`
- 完成标志：仓库中生成 `package.json`

### 任务 1.3 安装 Eleventy
- 开始条件：已存在 `package.json`
- 步骤：`npm install @11ty/eleventy --save-dev`
- 完成标志：运行 `npx @11ty/eleventy --version` 显示版本号

### 任务 1.4 安装 TailwindCSS
- 步骤：`npm install -D tailwindcss postcss autoprefixer`  
- 初始化：`npx tailwindcss init`
- 完成标志：生成 `tailwind.config.js`

---

## 阶段 2：项目结构搭建
### 任务 2.1 创建 Eleventy 源目录
- 在仓库下新建 `/src/`
- 完成标志：存在 `src/` 文件夹

### 任务 2.2 创建全局数据目录
- 在 `/src/_data/` 下新建 `site.json`
- 初始内容：
  ```json
  {
    "title": "Campus Game Projects",
    "description": "一个校园内的游戏项目聚合门户"
  }
  ```
* 完成标志：`site.json` 被 Eleventy 构建时可访问

### 任务 2.3 创建模板目录

* 在 `/src/_includes/` 下创建 `layout.njk`
* 内容包含 `<html>`, `<head>`, `<body>` 基础结构
* 完成标志：`layout.njk` 能被一个简单页面引用

### 任务 2.4 创建示例首页

* 在 `/src/index.njk` 中添加基础内容
* 使用 `layout.njk` 作为布局
* 完成标志：运行 `npx @11ty/eleventy --serve` 能访问首页

---

## 阶段 3：项目内容结构

### 任务 3.1 定义单个项目文件夹格式

* 在 `/src/projects/sample-project/` 中创建：

  * `index.md` (front matter + 简介)
  * `banner.png`
  * `/screenshots/1.png`
* 完成标志：项目目录完整存在

### 任务 3.2 配置 Eleventy 集合

* 修改 `.eleventy.js`，使其将 `/src/projects/**/index.md` 识别为集合
* 完成标志：能在模板中通过 `collections.projects` 访问项目数据

### 任务 3.3 渲染项目卡片

* 新建 `/src/_includes/card.njk`
* 内容展示：Banner + Title + 摘要
* 完成标志：在首页显示至少一个项目卡片

### 任务 3.4 实现瀑布流布局

* 使用 TailwindCSS 的 grid/flex 实现卡片自适应布局
* 完成标志：首页展示为多列瀑布流效果

### 任务 3.5 创建项目详情页

* 新建 `/src/_includes/project-detail.njk`
* 渲染单个项目的：

  * Banner
  * 正文（Markdown 渲染）
  * 截图画廊
* 完成标志：点击首页卡片可跳转详情页

---

## 阶段 4：UI 主题与样式

### 任务 4.1 配置 Tailwind 暗色主题

* 在 `tailwind.config.js` 中开启暗色模式
* 使用低饱和度配色（灰蓝 / 灰紫）
* 完成标志：首页整体背景为暗色，卡片风格统一

### 任务 4.2 添加响应式支持

* 调整卡片布局在移动端为单列
* 完成标志：在浏览器调试工具中验证响应式

---

## 阶段 5：自动化与部署

### 任务 5.1 添加 NPM 构建脚本

* 在 `package.json` 中添加：

  ```json
  "scripts": {
    "build": "eleventy && tailwindcss -i ./src/_includes/styles/input.css -o ./_site/assets/styles.css",
    "start": "eleventy --serve"
  }
  ```
* 完成标志：运行 `npm run build` 成功输出到 `_site/`

### 任务 5.2 配置 GitHub Actions 部署

* 在 `.github/workflows/build-deploy.yml` 中配置：

  * Node.js 安装
  * `npm ci && npm run build`
  * 部署到 `gh-pages` 分支
* 完成标志：PR 合并后自动部署到 GitHub Pages

---

## 阶段 6：投稿流程验证

### 任务 6.1 提交 PR 测试

* Fork 仓库 → 在 `/src/projects/` 下添加一个新项目目录 → 发 PR
* 完成标志：合并 PR 后，GitHub Pages 自动更新并显示新项目
