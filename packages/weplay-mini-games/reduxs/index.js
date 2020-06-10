import { combineReducers } from 'redux'

import { miniGamesReducer, MINI_GAMES_RN } from './miniGames'
import gameLeaders, { GAME_LEADERS_RN } from './gameLeaders/reducer'

export default combineReducers({
  [GAME_LEADERS_RN]: gameLeaders,
  [MINI_GAMES_RN]: miniGamesReducer,
})
