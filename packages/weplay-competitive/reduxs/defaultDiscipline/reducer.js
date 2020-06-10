import * as R from 'ramda'
import handleActions from 'redux-actions/es/handleActions'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

import { setDefaultDiscipline } from './actions'

const COMPETITIVE_RN = 'COMPETITIVE'

export const DEFAULT_DISCIPLINE_RN = 'DEFAULT_DISCIPLINE'

const persistConfig = {
  key: DEFAULT_DISCIPLINE_RN,
  storage,
}

const defaultState = {
  name: R.pipe(
    R.keys,
    R.head,
  )(DISCIPLINES),
}

export const reducer = handleActions({
  [setDefaultDiscipline]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
}, defaultState)

export default persistReducer(persistConfig, reducer)

export const defaultDisciplineSelector = R.path([COMPETITIVE_RN, DEFAULT_DISCIPLINE_RN])
