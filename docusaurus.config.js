// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {isDev} = require('@pallad/app-env');
const projects = require('./projects');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Pallad',
    url: 'https://pallad.dev',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'images/logo_auto.svg',
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
        ...projects.filter(x => x.hasDocs)
            .map(x => {
                return [
                    '@docusaurus/plugin-content-docs',
                    {
                        id: x.name,
                        path: `./projects/${x.name}/docs`,
                        routeBasePath: `${x.name}`,
                        remarkPlugins: [
                            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
                        ],
                    }
                ]
            }),
        [
            '@docusaurus/plugin-content-pages',
            {
                path: 'src/pages'
            }
        ]
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'Pallad',
                logo: {
                    alt: 'Pallad',
                    src: 'images/logo.svg',
                    srcDark: 'images/logo_white.svg',
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
                theme: require('prism-react-renderer/themes/github'),
                darkTheme: require('prism-react-renderer/themes/dracula'),
            },
        }),
};

module.exports = config;
