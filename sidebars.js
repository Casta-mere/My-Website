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
