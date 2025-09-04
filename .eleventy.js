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
  eleventyConfig.addFilter("read", (filePath) => {
    try { return fs.readFileSync(filePath, 'utf8'); } catch (e) { return ""; }
  });

  eleventyConfig.addCollection("projects", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/projects/**/index.md")
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
