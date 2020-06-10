// TODO: DANGER. LEGACY CODE. It doesn't work, not connected with redux and there're no any usages of it.
// Decided to keep it here in case of come back of some previous betting companies.
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'
import handleActions from 'redux-actions/es/handleActions'

import { localizeWith } from 'weplay-core/reduxs/helpers'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'

import { betProviderSelector } from 'weplay-events/reduxs/tournaments/reducer'
import { betProviders } from 'weplay-events/constants/betProvidersData'

import {
  getOfflineBets,
  getOnlineBets,
  getEsBets,
  getEGBBets,
  getLootBetsAction,
} from './actions'

const EVENTS_RN = 'EVENTS'
export const BETS_RN = 'BETS'
const GET_ONE_X_BET_ONLINE_BETS_RN = 'GET_ONLINE_BETS'
const GET_ONE_X_BET_OFFLINE_BETS_RN = 'GET_OFFLINE_BETS'
const GET_ES_BETS_RN = 'GET_ES_BETS'
const GET_EGB_BETS_RN = 'GET_EGB_BETS'
const GET_LOOT_BETS_RN = 'GET_LOOT_BETS'
export default combineReducers({
  [GET_ONE_X_BET_ONLINE_BETS_RN]: createRequestReducer(getOnlineBets),
  [GET_ONE_X_BET_OFFLINE_BETS_RN]: createRequestReducer(getOfflineBets),
  [GET_ES_BETS_RN]: createRequestReducer(getEsBets),
  [GET_EGB_BETS_RN]: createRequestReducer(getEGBBets),
  [GET_LOOT_BETS_RN]: handleActions({
    [getLootBetsAction]: (byId, { payload }) => payload,
  }, []),
})

const offlineBetsSelectors = createRequestSelectors([EVENTS_RN, BETS_RN, GET_ONE_X_BET_OFFLINE_BETS_RN])
const onlineBetsSelectors = createRequestSelectors([EVENTS_RN, BETS_RN, GET_ONE_X_BET_ONLINE_BETS_RN])
const esBetsSelectors = createRequestSelectors([EVENTS_RN, BETS_RN, GET_ES_BETS_RN])
const EGBBetsSelectors = createRequestSelectors([EVENTS_RN, BETS_RN, GET_EGB_BETS_RN])
const TEAM_A = 1
const TEAM_B = 3
// TODO: this selecotr calculated a lot of times, becuase all components share the same selector
const oneXBetMatchDataSelector = mapPropsToId => createSelector(
  [offlineBetsSelectors.dataSelector, onlineBetsSelectors.dataSelector, (state, props) => mapPropsToId(props)],
  (offlineBets, onlineBets, game) => {
    // TODO: add logic for another bet provider here
    if (offlineBets && onlineBets && game) {
      const { betsMatchId, betsMatchIdLive } = game
      const isGameInProgress = game.status === 'ACTIVE'
      const gameBetsMatchId = isGameInProgress ? betsMatchIdLive : betsMatchId
      const bets = isGameInProgress ? onlineBets : offlineBets
      const aBetsTitle = R.path(['teams', 'a', 'betsTitle'])(game)
      const bBetsTitle = R.path(['teams', 'b', 'betsTitle'])(game)
      // TODO: rewrite after artifact release
      const gameBet = R.find(R.propEq('I', Number(gameBetsMatchId)), bets)
          || R.find(R.propEq('i', Number(gameBetsMatchId)), bets)
      if (gameBet && !R.isEmpty(gameBet)) {
        if (gameBet.a === aBetsTitle && gameBet.h === bBetsTitle) {
          return {
            a: R.find(R.propEq('t', TEAM_B))(gameBet.ee).c || R.find(R.propEq('T', TEAM_B))(gameBet.EE).C,
            b: R.find(R.propEq('t', TEAM_A))(gameBet.ee).c || R.find(R.propEq('T', TEAM_A))(gameBet.EE).C,
            gameUrl: 'http://cutter.li/cU1cj5', // TODO add proper link to games
          }
        }
        return {
          a: R.find(R.propEq('t', TEAM_A))(gameBet.ee).c || R.find(R.propEq('T', TEAM_A))(gameBet.EE).C,
          b: R.find(R.propEq('t', TEAM_B))(gameBet.ee).c || R.find(R.propEq('T', TEAM_B))(gameBet.EE).C,
          gameUrl: 'http://cutter.li/cU1cj5', // TODO add proper link to games
        }
      }
    }

    return {
      a: null,
      b: null,
      gameUrl: 'https://ua1xbet.com/',
    }
  },
)

const esBetMatchDataSelector = mapPropsToGame => createSelector(
  [esBetsSelectors.dataSelector, (state, props) => mapPropsToGame(props)],
  (esBets, game) => {
    const esBetparticipantsBets = R.pathOr([], ['events', game.betsMatchId])(esBets)
    const outcomes = R.pathOr([], ['mainMarket', 'outcomes'])(esBetparticipantsBets)
    const aBetsTitle = R.path(['teams', 'a', 'betsTitle'])(game)
    const bBetsTitle = R.path(['teams', 'b', 'betsTitle'])(game)
    return {
      a: R.pipe(
        R.find(R.propEq('name', aBetsTitle)),
        R.prop('price'),
      )(outcomes),
      b: R.pipe(
        R.find(R.propEq('name', bBetsTitle)),
        R.prop('price'),
      )(outcomes),
      gameUrl: esBetparticipantsBets.url,
    }
  },
)

const EGBBetMatchDataSelector = mapPropsToGame => createSelector(
  [EGBBetsSelectors.dataSelector, (state, props) => mapPropsToGame(props)],
  (EGBBets, game) => {
    const EGBParticipantsBets = R.pipe(
      R.defaultTo([]),
      R.find(R.propEq('id', Number(game.betsMatchId))),
      R.defaultTo({}),
    )(EGBBets)
    const aBetsTitle = R.path(['players', 'a', 'betsTitle'])(game)
    const bBetsTitle = R.path(['players', 'b', 'betsTitle'])(game)
    if (EGBParticipantsBets.gamerNick1 === aBetsTitle
        && EGBParticipantsBets.gamerNick2 === bBetsTitle) {
      return {
        a: R.prop('coef1')(EGBParticipantsBets),
        b: R.prop('coef2')(EGBParticipantsBets),
        gameUrl: `https://${EGBParticipantsBets.url}`,
      }
    }
    return {
      a: R.prop('coef2')(EGBParticipantsBets),
      b: R.prop('coef1')(EGBParticipantsBets),
      gameUrl: `https://${EGBParticipantsBets.url}`,
    }
  },
)

const LootBetMatchDataSelector = mapPropsToGame => createSelector(
  [R.path([BETS_RN, GET_LOOT_BETS_RN]), (state, props) => mapPropsToGame(props), currentLanguageSelector],
  (matchesBets, game, currentLanguage) => {
    const aBetsTitle = R.path(['teams', 'a', 'betsTitle'])(game)
    const bBetsTitle = R.path(['teams', 'b', 'betsTitle'])(game)
    const lootBetGameUrl = R.pipe(
      R.prop('lootBet'),
      localizeWith(currentLanguage),
      R.prop('url'),
    )(betProviders)
    if (matchesBets && !R.isEmpty(matchesBets)) {
      const matchData = matchesBets.filter(R.pathEq(['$', 'ID'], game.betsMatchIdLive))

      if (!R.isEmpty(matchData)) {
        const matchBetsData = matchData[0] && matchData[0].Bet[0].Odd

        const gamerOneName = matchBetsData && matchBetsData[0].$.Name
        const gamerTwoName = matchBetsData && matchBetsData[1].$.Name
        const coef1 = matchBetsData[0].$.Value
        const coef2 = matchBetsData[1].$.Value
        if (matchData[0].$.ID === game.betsMatchIdLive) {
          if (gamerOneName === aBetsTitle && gamerTwoName === bBetsTitle) {
            return {
              a: Number(coef1),
              b: Number(coef2),
              gameUrl: lootBetGameUrl,
            }
          }
          return {
            a: Number(coef2),
            b: Number(coef1),
            gameUrl: lootBetGameUrl,
          }
        }
      }
    }
    return {
      a: null,
      b: null,
      gameUrl: lootBetGameUrl,
    }
  },
)

const extendWithPariMatch = (matchData, currentLanguage) => ({
  ...matchData,
  gameUrl: betProviders.pariMatch.url[currentLanguage],
})

export const matchBetsDataSelector = mapPropsToGame => createSelector(
  [
    esBetMatchDataSelector(mapPropsToGame),
    oneXBetMatchDataSelector(mapPropsToGame),
    EGBBetMatchDataSelector(mapPropsToGame),
    LootBetMatchDataSelector(mapPropsToGame),
    betProviderSelector,
    currentLanguageSelector,
  ],
  (esBetMatchData, oneXBetMatchData, EGBbetsMathcData, lootBetMatchData, betProvider, currentLanguage) => {
    switch (betProvider) {
      case 'esBet':
        return esBetMatchData
      case 'oneXBet':
        return oneXBetMatchData
      case 'egb':
        return EGBbetsMathcData
      case 'lootBet':
        return lootBetMatchData
      case 'pariMatch':
      default:
        return extendWithPariMatch(esBetMatchData, currentLanguage)
    }
  },
)
