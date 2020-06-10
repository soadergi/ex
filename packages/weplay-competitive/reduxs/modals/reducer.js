import * as R from 'ramda'
import handleActions from 'redux-actions/es/handleActions'
import { createSelector } from 'reselect'

import { triggerModal } from 'weplay-competitive/reduxs/modals/actions'

export const COMPETITIVE_RN = 'COMPETITIVE'
export const MODALS_RN = 'MODALS'

export const modalsReducer = handleActions({
  [triggerModal]: (state, action) => action.payload,
}, null)

export const modalsSelector = createSelector(
  [R.path([COMPETITIVE_RN, MODALS_RN])],
  R.identity,
)
