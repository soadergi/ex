import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: MEMBER_GAME_PROFILES_RN,
  actions: memberGameProfileActions,
  selectors: memberGameProfileSelectors,
  reducer: memberGameProfileReducer,
} = createCollectionRedux({
  domain: 'member-game-profile',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
