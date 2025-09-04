module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection("projects", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/projects/**/index.md")
      .sort((a, b) => {
        const ad = a.date ? a.date.getTime() : 0;
        const bd = b.date ? b.date.getTime() : 0;
        return bd - ad;
      });
  });
  // Ensure project image assets are published
  eleventyConfig.addPassthroughCopy("src/projects/**/*.{png,jpg,jpeg,gif,webp,avif,svg}");
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
