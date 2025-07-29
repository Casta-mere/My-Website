async function docsPluginEnhanced(context, options) {
  return {
    name: "docs-enhance",

    async allContentLoaded({ allContent, actions }) {
      const { setGlobalData } = actions;
      const docsData = allContent["docusaurus-plugin-content-docs"];
      const allDocs = docsData.default?.loadedVersions?.[0]?.docs;

      // 获取 recommended
      const recommended = allDocs
        .filter((doc) => doc.frontMatter?.recommended === true)
        .map((doc) => ({
          id: doc.id,
          title: doc.title,
          permalink: doc.permalink,
          frontMatter: doc.frontMatter,
          description: doc.description,
          date: doc.lastUpdatedAt,
          // otherMetadata: doc,
        }));

      setGlobalData({
        docNum: allDocs.length,
        recommended,
        allDocs: allDocs.map((doc) => ({
          id: doc.id,
          title: doc.title,
          permalink: doc.permalink,
          frontMatter: doc.frontMatter,
          description: doc.description,
        })),
      });
    },
  };
}

module.exports = docsPluginEnhanced;
