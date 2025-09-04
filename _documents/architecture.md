# architecture.md  
**Eleventy-based Game Project Aggregation Platform**  
目标：在 GitHub Pages 上部署的最小化信息聚合门户，支持 Fork/PR 方式提交项目，首页为瀑布流展示。  

---

## 1. 文件与文件夹结构

```
/ (repo root)
├─ .github/
│ ├─ workflows/
│ │ └─ build-deploy.yml # CI/CD: Eleventy 构建并推送到 gh-pages 分支
│
├─ src/ # Eleventy 源码目录
│ ├─ _data/ # 全局数据目录
│ │ └─ site.json # 站点元数据（标题、副标题、主题配置）
│ │
│ ├─ _includes/ # 模板片段
│ │ ├─ layout.njk # 页面基础布局（header/footer）
│ │ ├─ card.njk # 瀑布流项目卡片组件
│ │ ├─ project-detail.njk # 项目详情页模板
│ │ └─ styles/ # UI 样式（TailwindCSS / 定制 CSS）
│ │
│ ├─ projects/ # 项目内容存放区（由投稿者维护）
│ │ ├─ project-slug-1/
│ │ │ ├─ index.md # 项目元数据 + 简介（front matter）
│ │ │ ├─ banner.png # Banner 头图
│ │ │ └─ screenshots/ # 游戏截图（可多张）
│ │ │ ├─ 1.png
│ │ │ └─ 2.png
│ │ │
│ │ └─ project-slug-2/...
│ │
│ ├─ index.njk # 首页（瀑布流展示所有项目）
│ └─ about.njk # 关于页面（可选）
│
├─ .eleventy.js # Eleventy 配置文件
├─ package.json # NPM 脚本 + 依赖
├─ tailwind.config.js # Tailwind 配置（暗色/低饱和度主题）
├─ README.md # 使用说明
```

---

## 2. 每个部分的作用

- **.github/workflows/**  
  - 负责自动化构建与部署，确保每次合并 PR 后 GitHub Pages 自动更新。
  
- **src/_data/site.json**  
  - 存储全站配置（站点标题、副标题、颜色主题等）。
  
- **src/_includes/**  
  - UI 组件与模板：卡片、详情页、布局统一化。  
  - `layout.njk` → 所有页面的基础框架。  
  - `card.njk` → 瀑布流中的单个项目卡片。  
  - `project-detail.njk` → 单个项目的详情展示。  

- **src/projects/**  
  - 每个项目一个文件夹，按约定结构组织：  
    - `index.md`（YAML front matter + Markdown 内容）  
      ```yaml
      ---
      title: "My Puzzle Game"
      banner: "./banner.png"
      team: "Team Alpha"
      tags: ["Puzzle", "2D"]
      date: 2025-08-01
      ---
      这里是项目简介。
      ```
    - `banner.png` → 用于首页卡片展示。  
    - `/screenshots/` → 存放游戏截图。  

- **src/index.njk**  
  - 首页模板，读取所有 `projects/*/index.md` 元数据，渲染为瀑布流。  

- **src/about.njk**  
  - 可选的「关于本站」页面。  

- **.eleventy.js**  
  - Eleventy 配置文件，负责：  
    - 指定 `src/projects/` 作为集合。  
    - 将 front matter 数据暴露给模板。  
    - 注册自定义过滤器（如日期格式化、标签筛选）。  

- **TailwindCSS**  
  - 用于现代 UI 设计，主题采用暗色背景 + 低饱和度点缀色。  

---

## 3. 状态存储位置

- **项目数据**：  
  - 以 Markdown (`index.md`) + YAML front matter 存储在仓库的 `/src/projects/` 目录。  

- **项目截图 / Banner**：  
  - 存储于每个项目文件夹下，本地引用，直接由 Eleventy 构建输出。  

- **全局配置**：  
  - 存储于 `/src/_data/site.json`。  

- **用户贡献**：  
  - 通过 Fork + Pull Request 流程提交。  
  - 审核后合并，GitHub Pages 自动更新。  

👉 **完全无数据库依赖，所有状态存储在 GitHub Repo**。  

---

## 4. 服务之间如何连接

- **用户提交**  
  - 用户 Fork 仓库 → 按照文件夹结构新建 `/projects/{slug}/` → 填写 `index.md` + 上传资源 → 发起 PR。  

- **维护者审核**  
  - 审核 PR → 合并到主分支。  

- **CI/CD 部署**  
  - GitHub Actions 触发 → 安装依赖（Node.js, Eleventy, Tailwind） → 构建静态网站 → 输出到 `gh-pages` 分支。  

- **GitHub Pages 服务**  
  - 自动从 `gh-pages` 分支托管构建好的 HTML/CSS/JS 站点。  

- **前端渲染**  
  - 由 Eleventy 在构建时解析 Markdown front matter → 渲染模板（Nunjucks + TailwindCSS） → 生成静态 HTML 瀑布流。  

---

## 5. UI 风格

- **主题**：暗色背景，低饱和度点缀色（蓝灰 / 紫灰），符合现代扁平化风格。  
- **布局**：  
  - 首页：瀑布流卡片（项目 Banner + 标题 + 简介）。  
  - 详情页：Banner + Markdown 内容 + 截图画廊。  
- **动态效果**：  
  - 使用 Tailwind + 少量原生 JS 或 Alpine.js，避免过度复杂化。  