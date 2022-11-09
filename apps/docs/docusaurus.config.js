// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Chaos Reactor',
  tagline: 'Chaos Reactor is an open source, community-led platform where everyone can harness the power of AI.',
  url: 'https://docs.chaosre.actor',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'chaosreactor', // Usually your GitHub org/user name.
  projectName: 'chaosreactor', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/chaosreactor/all/apps/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/chaosreactor/all',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Chaos Reactor',
        logo: {
          alt: 'Chaos Reactor Logo (Noto Test Tube Emoji)',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'support/getting-started',
            position: 'left',
            label: 'Support',
          },
          {
            type: 'doc',
            docId: 'devs/getting-started',
            position: 'left',
            label: 'Developer Docs',
          },
          {
            type: 'doc',
            docId: 'chaos-design-system/README',
            position: 'left',
            label: 'Chaos Design System',
          },
        /** { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/chaosreactor',
            label: 'GitHub',
            position: 'right',
          },
        */
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Support',
                to: '/docs/support/getting-started',
              },
              {
                label: 'Developer Docs',
                to: '/docs/devs/getting-started',
              },
              {
                label: 'Design Docs',
                to: '/docs/design/README',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/xQay8BEUyt',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/chaosreactor',
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
                label: 'GitHub',
                href: 'https://github.com/chaosreactor',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Chaos Reactor. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
