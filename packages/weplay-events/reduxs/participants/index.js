import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: PARTICIPANTS_RN,
  actions: participantsActions,
  selectors: participantsSelectors,
  reducer: participantsReducer,
} = createCollectionRedux({
  domain: 'participant',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
  apiVersion: 1,
})
