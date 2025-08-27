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
        {
          type: "category",
          label: "Issue Tracker",
          link: {
            type: "doc",
            id: "React/Issue/README",
          },
          items: [
            "React/Issue/Preface",
            "React/Issue/Setup",
            "React/Issue/Create",
            "React/Issue/View",
            "React/Issue/Update",
            "React/Issue/Delete",
            "React/Issue/Authentication",
            "React/Issue/Assign",
            "React/Issue/Filtering",
            "React/Issue/Dashboard",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "服务器搭建",
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
        "Server/Docusaurus-Theme",
        "Server/Docusaurus-Plugins",
        "Server/Docusaurus-Algolia",
        "Server/Docusaurus-Gisus",
        "Server/Docusaurus-Umami",
        "Server/Docusaurus-FAQ",
      ],
    },
    {
      type: "category",
      label: "Docker",
      link: {
        type: "doc",
        id: "Docker/README",
      },
      items: ["Docker/Basic", "Docker/Command", "Docker/Build", "Docker/Cases"],
    },
    {
      type: "category",
      label: "Python",
      link: {
        type: "doc",
        id: "Python/README",
      },
      items: ["Python/Basic", "Python/Unittest"],
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
      label: "总结与计划",
      link: {
        type: "doc",
        id: "Plans/README",
      },
      items: ["Plans/2023", "Plans/2024", "Plans/2025"],
    },
    "Rules",
    "Resume",
  ],
  snippetsSidebar: [
    "Snippets/Intro",
    {
      type: "category",
      label: "小组件",
      link: {
        type: "doc",
        id: "Snippets/Components/README",
      },
      items: [
        "Snippets/Components/TypeWriter",
        "Snippets/Components/cmdTerminal",
        "Snippets/Components/Link",
      ],
    },
    {
      type: "category",
      label: "Python 代码段",
      link: {
        type: "doc",
        id: "Snippets/Python/README",
      },
      items: [
        "Snippets/Python/Timer",
        "Snippets/Python/TraceMalloc",
        "Snippets/Python/Flatten",
        "Snippets/Python/IterToList",
      ],
    },
  ],
};

module.exports = sidebars;
