import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'
import config from 'weplay-core/config'

export const {
  REDUCER_NAME: PREDICTIONS_RN,
  actions: predictionActions,
  selectors: predictionSelectors,
  reducer: predictionReducer,
} = createCollectionRedux({
  domain: 'prediction',
  service: config.predictionsApi.url,
  pathToRoot: ['EVENTS'],
  apiVersion: 1,
})
