import { $prop } from 'weplay-core/$utils/$prop'
import { axios } from 'weplay-core/services/axios'
import { camelizeKeys, snakeizeKeys } from 'weplay-core/reduxs/helpers'

const GAME_CENTER_URL = 'game-center-service/v1'

export const getGameGlobalLeadersRequest = params => axios
  .get(`${GAME_CENTER_URL}/ladders/global`, { params: { ...snakeizeKeys(params) } })
  .then($prop('data'))
  .then(camelizeKeys)

export const getGameDailyLeadersRequest = params => axios
  .get(`${GAME_CENTER_URL}/ladders/daily`, { params: { ...snakeizeKeys(params) } })
  .then($prop('data'))
  .then(camelizeKeys)

export const getGameMaxResultRequest = params => axios
  .get(`${GAME_CENTER_URL}/games/results/max`, { params: { ...snakeizeKeys(params) } })
  .then(res => res?.data?.data)
  .then(camelizeKeys)
