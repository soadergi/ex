const en = require('weplay-core/globalNavigationTexts/en')
const { getFooterMenu } = require('weplay-components/Footer/mockedAPI')
const { getGlobalMenu } = require('weplay-core/helpers/mockedMenuAPI')
const { getSocialLinks } = require('weplay-core/consts/socialLinks')

const body = require('./body.ejs')
const head = require('./head.ejs')
const initialHtml = require('./initial-html.min.ejs')

module.exports = isProd => ({
  template: 'src/index.ejs',
  lang: 'en',
  title: 'ᐈ WePlay! – Esports news • All about esports and competitive gaming',
  filename: 'index.html',
  mobile: true,
  meta: [
    {
      description: 'WePlay! ⚡⚡⚡ All about esports and competitive gaming ⚡⚡⚡ Esports news,'
        + ' analytics, reviews on WePlay! (doubl1)',
      'data-react-helmet': true,
    }, {
      keywords: 'esports news (doubl2)',
      'data-react-helmet': true,
    },
  ],
  minify: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
  },

  appMountId: 'app',
  appMountHtmlSnippet: initialHtml({
    i18nTexts: en,
    navigationMenu: getGlobalMenu('en'),

    socialPageLinks: getSocialLinks('en', 'pages'),
    commonMenu: getFooterMenu('en', 'common'),
    mediaMenu: getFooterMenu('en', 'media'),
    eventsMenu: getFooterMenu('en', 'events'),
    tournamentsMenu: getFooterMenu('en', 'tournaments'),
    rulesMenu: getFooterMenu('en', 'rules'),
  }),
  headHtmlSnippet: head({
    isProd,
    locale: 'en',
  }),
  bodyHtmlSnippet: body(),
})
