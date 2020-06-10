import * as R from 'ramda'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { createSelector } from 'reselect'

import { SET_TOOLTIP_VIEWED } from './actions'

export const TOOLTIPS_RN = 'TOOLTIPS'

const persistConfig = {
  key: TOOLTIPS_RN,
  storage,
}

const initialState = {
  viewed: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOOLTIP_VIEWED:
      return {
        ...state,
        viewed: {
          ...state.viewed,
          [action.data.path]: true,
        },
      }
    default:
      return state
  }
}

export default persistReducer(persistConfig, reducer)

const tooltipSelector = state => R.path([TOOLTIPS_RN], state)
const tooltipViewedSelector = createSelector(
  [tooltipSelector],
  R.prop('viewed'),
)
export const isTooltipViewedSelector = mapPropsToPath => createSelector(
  [(state, props) => mapPropsToPath(props), tooltipViewedSelector],
  R.propOr(false),
)
