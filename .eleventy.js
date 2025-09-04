module.exports = function(eleventyConfig) {
  // Markdown filter for Nunjucks: render Markdown strings to HTML
  const markdownIt = require("markdown-it");
  const md = markdownIt({ html: true, linkify: true, typographer: true });
  eleventyConfig.addFilter("markdown", (content) => {
    if (!content) return "";
    return md.render(String(content));
  });
  // JSON stringify filter for embedding data in scripts
  eleventyConfig.addFilter("json", (value) => {
    try { return JSON.stringify(value); } catch (e) { return "{}"; }
  });
  // Read file filter to load localized markdown from arbitrary paths
  const fs = require('fs');
  const path = require('path');
  eleventyConfig.addFilter("read", (filePath) => {
    try { return fs.readFileSync(filePath, 'utf8'); } catch (e) { return ""; }
  });
  // Read JSON from absolute path; returns {} on error
  eleventyConfig.addFilter("readJson", (filePath) => {
    try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch (e) { return {}; }
  });
  // Read JSON using a path relative to a base input path (like page.inputPath)
  eleventyConfig.addFilter("readJsonRel", (baseInputPath, relPath) => {
    try {
      if (!baseInputPath || !relPath) return {};
      const dir = path.dirname(String(baseInputPath));
      const target = path.join(dir, String(relPath));
      return JSON.parse(fs.readFileSync(target, 'utf8'));
    } catch (e) { return {}; }
  });
  // Test if a relative file exists next to a base input path
  eleventyConfig.addFilter("existsRel", (baseInputPath, relPath) => {
    try {
      if (!baseInputPath || !relPath) return false;
      const dir = path.dirname(String(baseInputPath));
      const target = path.join(dir, String(relPath));
      return fs.existsSync(target) && fs.statSync(target).isFile();
    } catch (e) { return false; }
  });
  // Read a file using a path relative to a base input path
  eleventyConfig.addFilter("readRel", (baseInputPath, relPath) => {
    try {
      if (!baseInputPath || !relPath) return "";
      const dir = path.dirname(String(baseInputPath));
      const target = path.join(dir, String(relPath));
      return fs.readFileSync(target, 'utf8');
    } catch (e) { return ""; }
  });

  // Remove the first Markdown title (ATX or Setext) from a Markdown string
  eleventyConfig.addFilter("stripMdTitle", (mdSource) => {
    if (!mdSource) return "";
    const text = String(mdSource);
    const lines = text.split(/\r?\n/);
    // Find first non-empty line
    let i = 0;
    while (i < lines.length && /^\s*$/.test(lines[i])) i++;
    if (i >= lines.length) return text;
    // ATX heading: # ...
    if (/^\s*#{1,6}\s+/.test(lines[i])) {
      lines.splice(i, 1);
      return lines.join("\n");
    }
    // Setext heading: Title then ====/---- underlines
    if (i + 1 < lines.length && /^\s*(?:=+|-+)\s*$/.test(lines[i + 1])) {
      lines.splice(i, 2);
      return lines.join("\n");
    }
    return text;
  });

  // Remove the first <h1>...</h1> block from an HTML string
  eleventyConfig.addFilter("stripFirstH1", (html) => {
    if (!html) return "";
    const src = String(html);
    // Simple non-greedy removal of first h1 (handles attributes)
    return src.replace(/<h1(?:\s+[^>]*)?>[\s\S]*?<\/h1>/i, "");
  });

  eleventyConfig.addCollection("projects", (collectionApi) => {
    // New structure: pages are driven by index.njk; data comes from sibling index.json
    return collectionApi
      .getFilteredByGlob("src/projects/**/index.njk")
      // Exclude the listing page itself to avoid circular templateContent references
      .filter((item) => !/src[\\\/]projects[\\\/]index\.njk$/.test(item.inputPath))
      .sort((a, b) => {
        const ad = a.date ? a.date.getTime() : 0;
        const bd = b.date ? b.date.getTime() : 0;
        return bd - ad;
      });
  });
  // About localized content (markdown partials)
  eleventyConfig.addCollection("about", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/about/*.{md,markdown}");
  });
  // Ensure project image assets are published
  eleventyConfig.addPassthroughCopy("src/projects/**/*.{png,jpg,jpeg,gif,webp,avif,svg}");
  // Ensure built CSS and other static assets are published
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ 'src/sw.js': 'sw.js' });
  eleventyConfig.addWatchTarget("src/_includes/styles/input.css");
  // Ensure CNAME is published to the site root (supports keeping CNAME under src/)
  eleventyConfig.addPassthroughCopy({ 'src/CNAME': 'CNAME' });

  const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";
  return {
    dir: {
      input: "src"
    },
    pathPrefix
  };
};
