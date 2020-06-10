import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { getPremiums } from 'weplay-core/reduxs/premiums/actions'

export const COMPETITIVE_RN = 'COMPETITIVE'
export const PREMIUMS_RN = 'PREMIUMS'

export default createRequestReducer(getPremiums)

const getPremiumsSelectors = createRequestSelectors([COMPETITIVE_RN, PREMIUMS_RN])

export const premiumsSelector = getPremiumsSelectors.dataSelector
