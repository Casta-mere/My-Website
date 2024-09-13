/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    "Intro",
    {
      type: "category",
      label: "React",
      link: {
        type: "doc",
        id: "React/README",
      },
      items: [
        "React/React",
        "React/Rendering",
        {
          type: "category",
          label: "Next.js",
          link: {
            type: "doc",
            id: "React/Next/README",
          },
          items: [
            "React/Next/Preface",
            "React/Next/Fundamentals",
            "React/Next/Styling",
            "React/Next/Routing",
            "React/Next/BuildAPI",
            "React/Next/Database",
            "React/Next/Uploading",
            "React/Next/Authentication",
            "React/Next/Email",
            "React/Next/Optimization",
            "React/Next/Deploy",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Server",
      link: {
        type: "doc",
        id: "Server/README",
      },
      items: [
        "Server/Server101",
        "Server/SSL",
        "Server/NginxReverseProxy",
        "Server/Screen",
        "Server/CodeBlocks",
        "Server/Docusaurus-Plugins",
        "Server/Docusaurus-Algolia",
        "Server/Docusaurus-Gisus",
      ],
    },
    {
      type: "category",
      label: "Latex",
      link: {
        type: "doc",
        id: "Latex/README",
      },
      items: [
        "Latex/Latex",
        "Latex/Reference",
        "Latex/Numbering",
        "Latex/Style",
      ],
    },
    {
      type: "category",
      label: "Plans",
      link: {
        type: "doc",
        id: "Plans/README",
      },
      items: ["Plans/2023", "Plans/2024"],
    },
    "Rules",
    "Resume",
  ],
};

module.exports = sidebars;
