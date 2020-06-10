import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: MEDIA_TAG_RN,
  actions: mediaTagActions,
  selectors: mediaTagSelectors,
  reducer: mediaTagReducer,
} = createCollectionRedux({
  domain: 'media-tag',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
  apiVersion: 1,
})
