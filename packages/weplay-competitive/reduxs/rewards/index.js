import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: REWARDS_RN,
  actions: rewardsActions,
  selectors: rewardsSelectors,
  reducer: rewardsReducer,
} = createCollectionRedux({
  domain: 'rewards',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
