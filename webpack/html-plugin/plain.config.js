const body = require('./body.ejs')
const head = require('./head.ejs')
const initialHtml = require('./plain-html.min.ejs')

module.exports = isProd => ({
  template: 'src/index.ejs',
  lang: 'en',
  title: 'ᐈ WePlay! – Esports news • All about esports and competitive gaming',
  filename: 'index.plain.html',
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
  appMountHtmlSnippet: initialHtml(),
  headHtmlSnippet: head({
    isProd,
    locale: 'en',
  }),
  bodyHtmlSnippet: body(),
})
