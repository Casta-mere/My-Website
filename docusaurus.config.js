// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

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
    defaultLocale: 'en',
    locales: ['en','cn'],
  },

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
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Casta-mere/My-Website/tree/master/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
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
                label: 'React',
                to: '/docs/category/react',
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
                label: 'Blog',
                to: '/blog',
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
        copyright: `Copyright © ${new Date().getFullYear()} Castamere`,
      },
      prism: {
        theme: prismThemes.vsDark,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ['bash','latex','json','markdown','python'],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
      },
    }),
};

export default config;
