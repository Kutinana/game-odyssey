# Gaming Odyssey Official Site

## Development
- Node.js LTS required
- After setup: `npm start` to serve locally

## Tutorial for submission
1. Fork this repo and create a branch.
2. Make new directory under `src/projects/` with your slug, e.g.: `src/projects/my-game/`.
3. Create (or copy) `index.json`, using the following format:

```json
{
  "en_title": "English title of your game",
  "cn_title": "您游戏的中文名",
  "banner": "./banner.webp",
  "en_team": "Your team's english name",
  "cn_team": "中文团队名",
  "tags": ["sample tag"],
  "date": "YYYY-MM-DD",
  "is_recruit": true,
  "screenshots": [
    "./screenshots/1.webp",
    "./screenshots/2.webp"
  ],
  "cn_markdown": "./contents/cn.md",
  "en_markdown": "./contents/en.md"
}
```

4. Put assets correspondingly:
   - `banner.webp`
   - `screenshots/`
   - `contents/`

5. Preview in local (Optional):
   - To run the project: `npm start`
   - Visit `http://localhost:8080/` for your preview.

6. Submit Pull Request：
   - `git add -A && git commit -m "feat: add my game" && git push`
   - Start a Pull Request in Github, and wait for our verification.

Tips：
- It's better to use hyphen and lower letters in `{your-slug}`.
- Use relative path for assets (start with `./`).
- Only submit your folder as changes.
- We encourage you to use `.webp` images instead of `.png`.
