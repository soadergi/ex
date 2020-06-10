import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: EVENT_LOCALIZATIONS_RN,
  actions: eventLocalizationsActions,
  selectors: eventLocalizationsSelectors,
  reducer: eventLocalizationsReducer,
} = createCollectionRedux({
  domain: 'event-localizations',
  service: 'b2b-events-service',
  pathToRoot: ['B2B'],
  apiVersion: 1,
})
