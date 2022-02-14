const { description } = require('../../package')

module.exports = {

  title: 'Biscord',

  description: description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nextLinks: false,
    prevLinks: false,
    smoothScroll: true,
    nav: [
      {
        text: 'Biscord',
        items: [
          {
            text: 'About Biscord',
            link: '/'
          },{
            text: 'Npm Package',
            link: 'https://www.npmjs.com/package/biscord'
          }
        ]
      },
      {
        text: 'Documentation',
        link: '/doc/introduction/gettingstarted',
      }
    ],
    sidebar: {
      '/doc/': [
        {
          title: 'Introduction',
          collapsable: false,
          children: [
            '/doc/introduction/gettingstarted',
            '/doc/introduction/changelog.md'
          ]
        },{
          title: 'Classes',
          collapsable: false,
          children: [
            '/doc/classes/biscord.md',
            '/doc/classes/managers.md'
          ]
        },{
          title: 'Managers',
          collapsable: false,
          children: [
            '/doc/managers/commandhandler.md',
            '/doc/managers/eventhandler.md'
          ]
        },{
          title: 'Typedefs',
          collapsable: false,
          children: [
            '/doc/typedefs/path.md',
            '/doc/typedefs/events.md',
            '/doc/typedefs/commandsetup.md',
            '/doc/typedefs/commandsettings.md',
            '/doc/typedefs/eventsetup.md',
            '/doc/typedefs/eventsettings.md'
          ]
        }
      ],
    }
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
