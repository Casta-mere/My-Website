// eslint-disable-next-line @typescript-eslint/no-require-imports
const blogPluginExports = require("@docusaurus/plugin-content-blog");
const { default: blogPlugin } = blogPluginExports;

async function blogPluginEnhanced(context, options) {
  const blogPluginInstance = await blogPlugin(context, options);

  return {
    ...blogPluginInstance,
    async contentLoaded({ content, allContent, actions }) {
      await blogPluginInstance.contentLoaded({ content, allContent, actions });
      const { setGlobalData } = actions;

      // 获取 recommended 文章（frontMatter.recommended 为 true）
      const recommended = content.blogPosts
        .filter((post) => post.metadata.frontMatter.recommended === true)
        .map(({ id, metadata }) => ({ id, metadata }));

      // 获取按时间排序的最新 5 篇文章
      const latest = [...content.blogPosts]
        .sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date))
        .slice(0, 5)
        .map(({ id, metadata }) => ({ id, metadata }));

      setGlobalData({
        postNum: content.blogPosts.length,
        recommended,
        latest,
      });
    },
  };
}

module.exports = Object.assign({}, blogPluginExports, {
  default: blogPluginEnhanced,
});
