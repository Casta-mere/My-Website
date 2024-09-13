/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    "Intro",
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
    "Rules",
    "Resume",
  ],
};

module.exports = sidebars;
