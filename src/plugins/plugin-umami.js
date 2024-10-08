async function umamiPlugin() {
  const isDevelopment = "development" === process.env.NODE_ENV;

  return {
    name: "docusaurus-umami-plugin",

    injectHtmlTags() {
      if (isDevelopment) return;
      return {
        headTags: [
          {
            tagName: "link",
            attributes: {
              rel: "preconnect",
              href: "https://umami.castamerego.com/",
            },
          },
          {
            tagName: "script",
            attributes: {
              defer: true,
              src: "https://umami.castamerego.com/script.js",
              "data-website-id": "e993a914-0864-4b88-a53c-75e46dc174d7",
            },
          },
        ],
      };
    },
  };
}

module.exports = umamiPlugin;
