// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const {isDev} = require('@pallad/app-env');
const projects = require('./projects');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Pallad Tools',
    url: 'https://your-docusaurus-test-site.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'pallad-ts', // Usually your GitHub org/user name.
    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                debug: isDev,
                docs: false,
                blog: false,
                pages: false,
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],
    plugins: [
        ...projects.map(x => {
            return [
                '@docusaurus/plugin-content-docs',
                {
                    id: x.name,
                    path: `./projects/${x.name}/docs`,
                    routeBasePath: `${x.name}/docs`,
                }
            ]
        }),
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'My Site',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        href: 'https://github.com/pallad-ts',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },

            footer: {
                style: 'dark',
                copyright: `Copyright © ${new Date().getFullYear()} - Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
