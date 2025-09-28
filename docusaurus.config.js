// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const ICP = '<a href="https://beian.miit.gov.cn/"  style="color:gray" target="_blank">浙ICP备2022034316号-1</a>';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Castamere',
  tagline: 'Come watch TV',
  // tagline: "There's nothing noble in being superior to your fellow man. True nobility is be superior to your former self",
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'http://www.castamerego.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Casta-mere', // Usually your GitHub org/user name.
  projectName: 'My-Website', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
  },
  markdown: {
    mermaid: true,
    hooks:{
      onBrokenMarkdownLinks: "throw",
    }
  },
  themes: ['@docusaurus/theme-live-codeblock','@docusaurus/theme-mermaid'],
  plugins: [
    require.resolve("docusaurus-plugin-image-zoom"),
    "./src/plugins/plugin-tailwind",
    "./src/plugins/plugin-umami",
    [
      "./src/plugins/plugin-blog-enhance.js",
      {
        showReadingTime: true,
        onInlineTags: "throw",
        blogSidebarCount: 100,
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        editUrl: 'https://github.com/Casta-mere/My-Website/tree/master/',
        postsPerPage: 10,
        feedOptions: {
          type: 'all',
          copyright: `Copyright © 2022-${new Date().getFullYear()} Castamere`,
          title: 'Castamere',
          description: 'Castamere',
          limit: null,
          createFeedItems: async (params) => {
            const { blogPosts, defaultCreateFeedItems, ...rest } = params;
            return defaultCreateFeedItems({
              blogPosts: blogPosts,
              ...rest,
            });
          },
        }
      }
    ],
    "./src/plugins/plugin-docs-enhance.js",
    process.env.RSDOCTOR === 'true' && 'rsdoctor'
  ],
  future: {
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: true,
      mdxCrossCompilerCache: true,
    },
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/Casta-mere/My-Website/tree/master/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          onInlineTags: "throw",
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        }, sitemap: {
          lastmod: 'date',
          changefreq: 'monthly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
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
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '系列文章',
          },
          {
            type: 'docSidebar',
            sidebarId: 'snippetsSidebar',
            position: 'left',
            label: '代码片段',
          },
          {
            to: '/blog',
            label: '博文',
            position: 'left'
          },
          {
            type: "localeDropdown",
            position: "right",
          },
          {
            type: "dropdown",
            position: "right",
            label: "关于",
            items: [
              {
                label: "关于本站",
                to: "/about", 
              },
              {
                label: "友链",
                to: "/friends",
                'data-umami-event': 'friends',
              },
              {
                label: "更新日志",
                to: "/release",
              }
            ]
          },
          {
            href: 'https://github.com/Casta-mere/My-Website',
            label: 'GitHub',
            position: 'right',
            'data-umami-event': 'Github',
          },
        ],
        hideOnScroll: true,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '系列文章',
            items: [
              {
                label: 'LaTeX',
                to: '/docs/Latex',
              },
              {
                label: 'Next.js',
                to: '/docs/React/Next',
              },
              {
                label: '服务器搭建',
                to: '/docs/Server',
              },
            ],
          },
          {
            title: '社交媒体',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/Casta-mere',
                'data-umami-event': 'Github',
              },
              {
                label: 'Meta',
                href: 'https://www.facebook.com/profile.php?id=100064520177692',
              },
              {
                label: 'Blogs.cn',
                href: 'https://blogscn.fun',
              },
              {
                label: 'CSDN',
                href: 'https://blog.csdn.net/qq_54869075',
              },
            ],
          },
          {
            title: "数据统计",
            items: [
              {
                label: 'RSS',
                href: 'https://www.castamerego.com/blog/rss.xml',
                'data-umami-event': 'rss',
              },
              {
                label: '数据统计',
                href: 'https://umami.castamerego.com/share/EplxZVQRe6OkyBt3/castamerego.com',
                'data-umami-event': 'data-analytics',
              },
              {
                label: '网站状态',
                href: 'https://stats.uptimerobot.com/p2lVhjnriB',
                'data-umami-event': 'uptimerobot-stats',
              },
            ]
          },
          {
            title: '更多',
            items: [
              {
                label: '友链',
                href: '/friends',
                'data-umami-event': 'friends',
              },
              {
                label: '开往',
                href: 'https://www.travellings.cn/go.html',
                'data-umami-event': 'travelling',
              },
              {
                label: 'Mind-Scout',
                href: 'http://mindscout.castamerego.com',
                'data-umami-event': 'Mind-Scout',
              },
              {
                label: 'Read-Book',
                href: 'http://readbook.castamerego.com',
                'data-umami-event': 'Read-Book',
              },
            ],
          },
        ],
        copyright: `Copyright © 2022-${new Date().getFullYear()} Castamere <Br/> ${ICP}`
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
      zoom: {
        selector: '.markdown :not(em) > img',
        config: {
          margin:0,
          background: {
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(50, 50, 50)'
          }
        }
      }
    }),
};

export default config;
