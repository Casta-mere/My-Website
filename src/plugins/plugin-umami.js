async function umamiPlugin() {
  return {
    name: "docusaurus-umami-plugin",

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "link",
            attributes: {
              rel: "preconnect",
              href: "http://umami.castamerego.com/",
            },
          },
          {
            tagName: "script",
            attributes: {
              defer: true,
              src: "http://umami.castamerego.com//script.js",
              "data-website-id": "e993a914-0864-4b88-a53c-75e46dc174d7",
            },
          },
        ],
      };
    },
  };
}

module.exports = umamiPlugin;
