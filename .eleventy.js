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
  return {
    dir: {
      input: "src"
    }
  };
};
