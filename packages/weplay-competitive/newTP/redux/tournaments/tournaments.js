import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

import { NEW_TOURNAMENT_PLATFORM } from '../reducerName'

export const {
  REDUCER_NAME: NEW_TP_TOURNAMENTS,
  actions: newTPTournamentsActions,
  selectors: newTPTournamentsSelectors,
  reducer: newTPTournamentsReducer,
} = createCollectionRedux({
  domain: 'tournament',
  service: 'tournament-java-service',
  apiVersion: '1',
  pathToRoot: ['COMPETITIVE', NEW_TOURNAMENT_PLATFORM],
})
