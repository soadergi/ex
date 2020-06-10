import { combineReducers } from 'redux'
import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'

import { getServicePage } from './actions'

export const SERVICE_PAGE_RN = 'SERVICE_PAGE'
const GET_SERVICE_PAGE_RN = 'GET_SERVICE_PAGE'

export default combineReducers({
  [GET_SERVICE_PAGE_RN]: createRequestReducer(getServicePage),
})

const servicePageSelector = createRequestSelectors([SERVICE_PAGE_RN, GET_SERVICE_PAGE_RN])

export const isServicePageLoadingSelector = servicePageSelector.loadingSelector
export const isServicePageLoadingErrorSelector = servicePageSelector.errorSelector

export const servicePageDataSelector = servicePageSelector.dataSelector
