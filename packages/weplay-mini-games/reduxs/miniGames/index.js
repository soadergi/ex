import { createSelector } from 'reselect'

import { $propEq } from 'weplay-core/$utils/$propEq'
import { $identity } from 'weplay-core/$utils/$identity'
import config from 'weplay-core/config'
import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

import { MINI_GAMES } from '../reducerName'

export const {
  REDUCER_NAME: MINI_GAMES_RN,
  actions: miniGamesActions,
  selectors: miniGamesSelectors,
  reducer: miniGamesReducer,
} = createCollectionRedux({
  domain: 'game',
  service: config.miniGamesApi.url,
  apiVersion: 1,
  pathToRoot: [MINI_GAMES],
})

export const miniGamesSelector = createSelector(
  [miniGamesSelectors.createRecordsByFilterSelector(() => $propEq('active', true))],
  $identity,
)

export const miniGameBySlugSelector = slug => createSelector(
  [miniGamesSelectors.createRecordsByFilterSelector(() => $propEq('link', slug))],
  games => games[0] ?? {},
)
