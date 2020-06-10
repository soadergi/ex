import { combineReducers } from 'redux'

import { NEW_TP_TOURNAMENTS, newTPTournamentsReducer } from './tournaments/tournaments'

export const newTPRootReducer = combineReducers({
  [NEW_TP_TOURNAMENTS]: newTPTournamentsReducer,
})
