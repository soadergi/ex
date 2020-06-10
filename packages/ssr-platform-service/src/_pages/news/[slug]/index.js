import React from 'react'
import ArticlePage from 'weplay-media/pages/ArticlePage/ArticlePage'
import { getInitialData } from 'weplay-media/pages/ArticlePage/actionChains'

const ArticlePageSSR = () => (
  <ArticlePage renderedOnServer />
)
ArticlePageSSR.getInitialProps = async ({
  ctx,
  // initialLocale,
  router,
}) => getInitialData({
  history: router,
  articleId: router.query.slug.split('-').slice(-1)[0],
})(ctx.store.dispatch, ctx.store.getState)

export default ArticlePageSSR
