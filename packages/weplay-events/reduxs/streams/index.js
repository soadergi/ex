import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: TOURNAMENT_STREAMS_RN,
  actions: tournamentStreamsActions,
  selectors: tournamentStreamsSelectors,
  reducer: tournamentStreamsReducer,
} = createCollectionRedux({
  domain: 'stream',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
})
