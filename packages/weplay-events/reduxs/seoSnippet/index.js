import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: SEO_SNIPPETS_RN,
  actions: seoSnippetsActions,
  selectors: seoSnippetsSelectors,
  reducer: seoSnippetsReducer,
} = createCollectionRedux({
  domain: 'seo-snippet',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
  apiVersion: 1,
})
