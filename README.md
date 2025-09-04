# Game Odyssey (Eleventy + Tailwind)

Minimal Eleventy-based game project aggregation portal.

See `_documents/architecture.md` and `_documents/task.md` for architecture and roadmap.

## Development
- Node.js LTS required
- After setup: `npm start` to serve locally

## How to add a project (投稿教程)
1. Fork 本仓库并创建分支（例如 `feat/my-game`）。
2. 在 `src/projects/{your-slug}/` 下新建目录，例如：`src/projects/my-puzzle-game/`。
3. 在该目录创建 `index.md`，并填写以下示例 front matter（YAML）与简介：

```yaml
---
title: "My Puzzle Game"
banner: "./banner.png"
team: "Team Alpha"
tags: ["Puzzle", "2D"]
date: 2025-08-01
screenshots:
  - "./screenshots/1.png"
---
这里是项目简介（支持 Markdown）。
```

4. 放置资源文件：
   - `banner.png`
   - `screenshots/1.png`（可多张）

5. 本地预览（可选）：
   - 运行：`npx @11ty/eleventy --serve`
   - 打开浏览器访问：`http://localhost:8080/`

6. 提交 PR：
   - `git add -A && git commit -m "feat: add my game" && git push`
   - 在 GitHub 发起 Pull Request，等待审核合并

Tips：
- `{your-slug}` 建议使用全小写与短横线，例如 `my-puzzle-game`。
- 资源路径请使用相对路径（以 `./` 开头）。
- 请不要提交 `_site/` 与 `node_modules/`（已在 `.gitignore`）。

## License
MIT
