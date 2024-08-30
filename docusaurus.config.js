// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const ICP = '<a href="https://beian.miit.gov.cn/"  style="color:white" target="_blank">浙ICP备2022034316号-1</a>';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Castamere',
  tagline: 'Come watch TV',
  // tagline: "There's nothing noble in being superior to your fellow man. True nobility is be superior to your former self",
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'http://dino.castamerego.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Casta-mere', // Usually your GitHub org/user name.
  projectName: 'My-Website', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
    // locales: ['zh-Hans', 'en'],
    // TODO add English
  },
  themes: ['@docusaurus/theme-live-codeblock'],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Casta-mere/My-Website/tree/master/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          onInlineTags: "throw",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          onInlineTags: "throw",
          blogSidebarCount: 10,
          editUrl:
            'https://github.com/Casta-mere/My-Website/tree/master/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Castamere',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left'
          },
          {
            href: 'https://github.com/Casta-mere/My-Website',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'LaTeX',
                to: '/docs/category/latex',
              },
              {
                label: 'Next.js',
                to: '/docs/category/nextjs',
              },
              {
                label: '服务器搭建',
                to: '/docs/category/server',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/Casta-mere',
              },
              {
                label: 'Meta',
                href: 'https://www.facebook.com/profile.php?id=100064520177692',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Mind-Scout',
                href: 'http://mindscout.castamerego.com',
              },
              {
                label: 'Read-Book',
                href: 'http://readbook.castamerego.com',
              },
              {
                label: '今天也想rua红崽',
                href: 'http://todayred.castamerego.com',
              },
            ],
          },
        ],
        copyright: `Copyright © 2022-${new Date().getFullYear()} Castamere <Br/>`,
      },
      prism: {
        theme: prismThemes.vsDark,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ['bash', 'latex', 'json', 'markdown', 'python'],
        magicComments: [
          // Remember to extend the default highlight class name as well!
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'code-block-error-line',
            line: 'This will error',
            block: { start: 'error-start', end: 'error-end' },
          },
          {
            className: 'code-block-remove-line',
            line: 'git-remove-next-line',
            block: { start: 'git-delete-start', end: 'git-delete-end' },
          },
          {
            className: 'code-block-add-line',
            line: 'git-add-next-line',
            block: { start: 'git-add-start', end: 'git-add-end' },
          },
        ],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true
        }
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'J5JS5XK4T9',
  
        // Public API key: it is safe to commit it
        apiKey: '087ae7498ca9ff18655fffab27b9186a',
  
        indexName: 'dino-castamerego',
  
        // Optional: see doc section below
        contextualSearch: true,
  
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',
  
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
  
        // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
        insights: false,
  
      },
      giscus: {
        repo: 'Casta-mere/My-Website',
        repoId: 'R_kgDOKWf4jA',
        category: 'Announcements',
        categoryId: 'DIC_kwDOKWf4jM4Chy8X',
      },
    }),
};

export default config;
