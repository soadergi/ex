import config from 'weplay-core/config'
import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

import { MEDIA } from '../reducerName'

export const {
  REDUCER_NAME: AUTHORS_RN,
  actions: authorActions,
  selectors: authorSelectors,
  reducer: authorReducer,
} = createCollectionRedux({
  domain: 'author',
  service: config.authorsApi.url,
  pathToRoot: [MEDIA],
  isJsonApi: false,
})
