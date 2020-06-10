import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'

import { pluralizeNumber } from 'weplay-core/helpers/pluralizeNumber'
import { localizeWith } from 'weplay-core/reduxs/helpers'
import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { votingOptionsByIdBestCandidateSelector } from 'weplay-core/reduxs/votingOptions/reducer'
import { NAMES } from 'weplay-core/routes'

import {
  TUG_OF_WAR_TOURNAMENT_IDS,
  REGIONS_MAP,
  TUG_OF_WAR_STAGE_NAMES,
} from 'weplay-events/pages/TugOfWarPage/consts'
import {
  ARTIFACT_STAGE_TITLES,
  ARTIFACT_TOURNAMENT_IDS,
  STAGE_STATUS,
} from 'weplay-events/pages/ArtifactPage/consts'
import { MADNESS_TOURNAMENT_ID } from 'weplay-events/pages/WinterMadnessPage/consts'
import { BUKOVEL_MINOR_ID, MAD_MOON_ID } from 'weplay-events/pages/EventPage/constants'

import { getTournament, getTournaments } from './actions'
import { extendParticipant, getExtendGameWithParticipant, makePairs } from './_utils'

export const TOURNAMENT_LEGACY_RN = 'TOURNAMENT'
const EVENTS_RN = 'EVENTS'
const GET_TOURNAMENT_LEGACY_RN = 'GET_TOURNAMENT'
const GET_TOURNAMENTS_RN = 'GET_TOURNAMENTS'

export default combineReducers({
  [GET_TOURNAMENT_LEGACY_RN]: createRequestReducer(getTournament),
  [GET_TOURNAMENTS_RN]: createRequestReducer(getTournaments),
})

export const tournamentDataAsyncSelectors = createRequestSelectors([
  EVENTS_RN,
  TOURNAMENT_LEGACY_RN,
  GET_TOURNAMENT_LEGACY_RN,
])
export const isTournamentLoadingSelector = tournamentDataAsyncSelectors.loadingSelector

export const tournamentStagesSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector, currentLanguageSelector],
  (tournament, currentLanguage) => R.pipe(
    R.propOr([], 'stages'),
    R.map(localizeWith(currentLanguage)),
  )(tournament),
)

const tournamentSettingsSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.prop('settings'),
)

export const tournamentDisciplineSelector = createSelector(
  [tournamentSettingsSelector],
  R.prop('discipline'),
)

export const getTournamentStagesSelector = createSelector(
  [currentLanguageSelector],
  currentLanguage => R.pipe(
    R.propOr([], 'stages'),
    R.map(localizeWith(currentLanguage)),
  ),
)

export const tournamentTitleSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.propOr('', 'title'),
)
export const currentTournamentIdSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.prop('id'),
)

const tournamentBroadcastSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector, currentLanguageSelector],
  (tournamentData, currentLanguage) => R.pipe(
    R.propOr({}, 'broadcast'),
    localizeWith(currentLanguage),
  )(tournamentData),
)

export const tournamentDatesSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.pipe(
    R.defaultTo({}),
    ({
      datetimeFinish,
      datetimeStart,
    }) => ({
      start: datetimeStart,
      end: datetimeFinish,
    }),
  ),
)

export const tournamentPlayoffSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.propOr([], 'playoff'),
)

export const sponsorsSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.propOr([], 'partners'),
)
export const createSponsorsByTypeSelector = partnersType => createSelector(
  [sponsorsSelector],
  R.filter(R.propEq('partnersType', partnersType)),
)
export const tournamentHasSponsorsSelector = createSelector(
  [sponsorsSelector],
  R.complement(R.isEmpty),
)
export const prizePoolSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.propOr({}, 'prizePool'),
)
export const topPlacesPrizePoolSelector = createSelector(
  [prizePoolSelector],
  R.propOr([], 'topPlaces'),
)

export const specialPrizePoolSelector = createSelector(
  [prizePoolSelector],
  R.propOr({}, 'special'),
)

export const prizeSumSelector = createSelector(
  [topPlacesPrizePoolSelector, specialPrizePoolSelector],
  (topPlacesPrizePool, specialPrizePool) => R.toString(
    R.add(R.sum(topPlacesPrizePool), R.sum(R.values(specialPrizePool))),
  ),
)

export const tournamentPlayersSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.propOr([], 'players'),
)

export const tournamentTeamsSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.pipe(
    R.defaultTo({}),
    R.propOr([], 'teams'),
  ),
)
const isTournamentWithTeamsSelector = createSelector(
  [tournamentTeamsSelector],
  teams => teams && !R.isEmpty(teams),
)

export const participantKeySelector = createSelector(
  [isTournamentWithTeamsSelector],
  isTournamentWithTeams => (isTournamentWithTeams ? 'teams' : 'players'),
)

const getTournamentPlayerByIdSelector = createSelector(
  [tournamentPlayersSelector],
  players => playerId => R.pipe(
    R.find(R.propEq('uuid', playerId)),
    R.defaultTo({}),
  )(players),
)
const getTournamentTeamByIdSelector = createSelector(
  [tournamentTeamsSelector],
  teams => teamId => R.pipe(
    R.find(R.propEq('uuid', teamId)),
    R.defaultTo({}),
  )(teams),
)

export const getTournamentParticipantByIdSelector = createSelector(
  [getTournamentPlayerByIdSelector, getTournamentTeamByIdSelector, isTournamentWithTeamsSelector],
  (getTournamentPlayerById, getTournamentTeamById, isTournamentWithTeams) => (
    isTournamentWithTeams
      ? getTournamentTeamById
      : getTournamentPlayerById
  ),
)
const extendGameWithParticipantSelector = createSelector(
  [getTournamentParticipantByIdSelector, participantKeySelector],
  (getParticipantById, participantKey) => getExtendGameWithParticipant(getParticipantById, participantKey),
)

const PLAYOFF_ORDER = ['8', '4', '2', '1']
export const roundsSelector = createSelector(
  [tournamentPlayoffSelector, getTournamentParticipantByIdSelector, participantKeySelector],
  (tournamentPlayoff, getTournamentParticipantById, participantKey) => R.pipe(
    R.toPairs,
    R.reduceRight(([name, games], rounds) => R.concat(rounds, [
      {
        name,
        // TODO: fix makePairs - it doesn't work correctly with winterMadness now
        gamePairs: makePairs(
          getTournamentParticipantById,
          participantKey,
          games,
        ),
      },
    ]), []),
    R.sort((round1, round2) => {
      const order1 = PLAYOFF_ORDER.indexOf(round1.name)
      const order2 = PLAYOFF_ORDER.indexOf(round2.name)
      return order1 - order2
    }),
    (rounds) => {
      let matchNumber = 1
      return rounds.map(round => ({
        ...round,
        gamePairs: round.gamePairs.map(gamePair => gamePair.map(game => ({
          ...game,
          matchNumber: matchNumber++,// eslint-disable-line
        }))),
      }))
    },
  )(tournamentPlayoff),
)

export const prizePoolWithPlacesSelector = createSelector(
  [topPlacesPrizePoolSelector, currentLanguageSelector],
  (prizePool, currentLanguange) => (
    R.map((prize) => {
      const positionStart = R.indexOf(prize)(prizePool)
      const positionEnd = R.lastIndexOf(prize)(prizePool)
      const position = positionStart !== positionEnd
        // eslint-disable-next-line max-len
        ? `${pluralizeNumber(positionStart + 1, currentLanguange)}-${pluralizeNumber(positionEnd + 1, currentLanguange)}`
        : pluralizeNumber(positionStart + 1, currentLanguange)
      return R.toPairs({ [position]: prize })
    })(prizePool)
  ),
)

export const createPlayoffRoundsSelector = playoffKey => createSelector(
  [tournamentDataAsyncSelectors.dataSelector, extendGameWithParticipantSelector],
  (tournamentData, extendGameWithParticipant) => R.pipe(
    R.propOr([], playoffKey),
    R.map(round => R.evolve({
      games: R.map(extendGameWithParticipant),
    })(round)),
    (rounds) => {
      let matchNumber = 1
      return rounds.map(round => ({
        ...round,
        games: round.games.map(game => ({
          ...game,
          matchNumber: matchNumber++,// eslint-disable-line
          id: `${game.startDatetime}-${matchNumber}`,
        })),
      }))
    },
    R.reverse,
  )(tournamentData),
)

const finalistsSelector = createSelector(
  [tournamentPlayoffSelector, getTournamentParticipantByIdSelector, participantKeySelector],
  (tournamentPlayoff, getTournamentParticipantById, participantKey) => R.pipe(
    R.pathOr({}, [0, 'games', 0, participantKey]),
    R.values,
    R.map(participant => ({
      ...participant,
      ...getTournamentParticipantById(participant && participant.uuid),
    })),
  )(tournamentPlayoff),
)

export const winnerSelector = createSelector(
  [finalistsSelector, getTournamentParticipantByIdSelector, topPlacesPrizePoolSelector],
  (finalists, getTournamentParticipantById, topPlacesPrizePool) => R.pipe(
    ([finalistA, finalistB]) => R.maxBy(R.prop('score'), finalistA, finalistB),
    R.prop('uuid'),
    getTournamentParticipantById,
    R.assoc('prize', topPlacesPrizePool[0]),
  )(finalists),
)

const secondPlaceSelector = createSelector(
  [finalistsSelector, winnerSelector],
  (finalists, winner) => R.pipe(
    R.reject((R.propEq('uuid', winner.uuid))),
    R.propOr({}, 0),
  )(finalists),
)

const thirdFourthPlacesSelector = createSelector(
  [finalistsSelector, tournamentPlayoffSelector, participantKeySelector, getTournamentParticipantByIdSelector],
  (finalists, playoff, participantKey, getTournamentParticipantById) => R.pipe(
    R.pathOr([], ['1', 'games']),
    R.map(R.pipe(
      R.prop(participantKey),
      R.values,
      R.map(R.prop('uuid')),
    )),
    R.flatten,
    R.reject(uuid => finalists.map(R.prop('uuid')).includes(uuid)),
    R.map(getTournamentParticipantById),
  )(playoff),
)

const fifthEighthPlacesSelector = createSelector(
  [
    finalistsSelector,
    tournamentPlayoffSelector,
    thirdFourthPlacesSelector,
    participantKeySelector,
    getTournamentParticipantByIdSelector,
  ],
  (finalists, playoff, thirdFourthPlaces, participantKey, getTournamentParticipantById) => R.pipe(
    R.pathOr([], ['2', 'games']),
    R.map(R.pipe(
      R.prop(participantKey),
      R.values,
      R.map(R.prop('uuid')),
    )),
    R.flatten,
    R.reject((participantUuid) => {
      const isFinalist = finalists.map(R.prop('uuid')).includes(participantUuid)
      const isFourthThird = thirdFourthPlaces.map(R.prop('uuid')).includes(participantUuid)
      return isFinalist || isFourthThird
    }),
    R.map(getTournamentParticipantById),
  )(playoff),
)

export const topEightWinnersSelector = createSelector(
  [secondPlaceSelector, thirdFourthPlacesSelector, fifthEighthPlacesSelector,
    topPlacesPrizePoolSelector, prizePoolWithPlacesSelector],
  (secondPlace, thirdFourthPlaces, fifthEighthPlaces, topPlacesPrizePool) => ([
    {
      2: {
        ...secondPlace,
        prize: topPlacesPrizePool[1],
      },
    },
    {
      '3-4': {
        ...thirdFourthPlaces[0],
        prize: topPlacesPrizePool[2],
      },
    },
    {
      '3-4': {
        ...thirdFourthPlaces[1],
        prize: topPlacesPrizePool[3],
      },
    },
    {
      '5-8': {
        ...fifthEighthPlaces[1],
        prize: topPlacesPrizePool[4],
      },
    },
  ]),
)

const tournamentGrandFinalSelecor = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.propOr([], 'grandFinal'),
)

const tournamentGrandFinal2Selector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.propOr([], 'grandFinal2'),
)

const getRoundLoserSelector = createSelector(
  [getTournamentParticipantByIdSelector],
  getTournamentParticipantById => R.pipe(
    R.map(participant => ({
      ...participant,
      ...getTournamentParticipantById(participant && participant.uuid),
    })),
    players => R.minBy(R.prop('score'), players.a, players.b),
  ),
)
const getRoundWinnerSelector = createSelector(
  [getTournamentParticipantByIdSelector],
  getTournamentParticipantById => R.pipe(
    R.map(participant => ({
      ...participant,
      ...getTournamentParticipantById(participant.uuid),
    })),
    players => R.maxBy(R.prop('score'), players.a, players.b),
  ),
)

export const grandFinalWinnerSelector = createSelector(
  [tournamentGrandFinalSelecor, getRoundWinnerSelector, participantKeySelector, topPlacesPrizePoolSelector],
  (grandFinal, getRoundWinner, participantKey, topPlacesPrizePool) => R.pipe(
    R.pathOr([], [0, 'games', 0, participantKey]),
    getRoundWinner,
    R.assoc('prize', topPlacesPrizePool[0]),
  )(grandFinal),
)

export const grandFinal2WinnerSelector = createSelector(
  [tournamentGrandFinal2Selector, getRoundWinnerSelector, participantKeySelector],
  (grandFinal2, getRoundWinner, participantKey) => R.pipe(
    R.pathOr([], [0, 'games', 0, participantKey]),
    getRoundWinner,
  )(grandFinal2),
)

export const grandFinalWinnerByTournamentIdSelector = mapPropsToTournamentId => createSelector(
  [
    grandFinalWinnerSelector,
    grandFinal2WinnerSelector,
    votingOptionsByIdBestCandidateSelector(2),
    votingOptionsByIdBestCandidateSelector(3),
    specialPrizePoolSelector,
    (state, props) => mapPropsToTournamentId(props),
  ],
  (
    grandFinalWinner,
    grandFinalWinner2,
    americasMVP,
    asiaMVP,
    specialPrizePool,
    tournamentId,
  ) => {
    switch (tournamentId) {
      case String(TUG_OF_WAR_TOURNAMENT_IDS.DIRE):
        return [
          grandFinalWinner,
          {
            ...americasMVP,
            picture: R.pathOr('', ['extra', 'avatarUrl'], americasMVP),
            nickname: R.pathOr('', ['extra', 'nickname'], americasMVP),
            prize: specialPrizePool.mvp,
          },
          grandFinalWinner2,
          {
            ...asiaMVP,
            picture: R.pathOr('', ['extra', 'avatarUrl'], asiaMVP),
            nickname: R.pathOr('', ['extra', 'nickname'], asiaMVP),
            prize: specialPrizePool.mvp,
          },
        ]
      case NAMES.VOTING_MWP:
        return [
          {
            ...americasMVP,
            picture: R.pathOr('', ['extra', 'avatarUrl'], americasMVP),
            nickname: R.pathOr('', ['extra', 'nickname'], americasMVP),
          },
          {
            ...asiaMVP,
            picture: R.pathOr('', ['extra', 'avatarUrl'], asiaMVP),
            nickname: R.pathOr('', ['extra', 'nickname'], asiaMVP),
          },
        ]
      default:
        return grandFinalWinner
    }
  },
)

export const thirdFourPlacesSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector, getRoundLoserSelector,
    topPlacesPrizePoolSelector, participantKeySelector],
  (tournamentData, getRoundLoser, topPlacesPrizePool, participantKey) => {
    const playOffLoser = type => R.pipe(
      R.pathOr([], [type, 0, 'games', 0, participantKey]),
      getRoundLoser,
    )(tournamentData)
    const winnerA = playOffLoser('playoff')
    const winnerB = playOffLoser('playoff2')
    return [winnerA, winnerB]
  },
)
export const secondThirdFourPlacesSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector, getRoundLoserSelector,
    topPlacesPrizePoolSelector, participantKeySelector],
  (tournamentData, getRoundLoser, topPlacesPrizePool, participantKey) => {
    const playOffLoser = type => R.pipe(
      R.pathOr([], [type, 0, 'games', 0, participantKey]),
      getRoundLoser,
    )(tournamentData)
    const winnerA = playOffLoser('playoff3')
    const winnerB = playOffLoser('playoff4')
    return [winnerA, winnerB]
  },
)

export const grandFinalSecondPlaceSelector = createSelector(
  [tournamentGrandFinalSelecor, getRoundLoserSelector, participantKeySelector, topPlacesPrizePoolSelector],
  (grandFinal, getRoundLosers, participantKey, topPlacesPrizePool) => R.pipe(
    R.pathOr([], [0, 'games', 0, participantKey]),
    getRoundLosers,
    R.assoc('prize', topPlacesPrizePool[1]),
  )(grandFinal),
)

export const grandFinal2SecondPlaceSelector = createSelector(
  [tournamentGrandFinal2Selector, getRoundLoserSelector, participantKeySelector, topPlacesPrizePoolSelector],
  (grandFinal, getRoundLosers, participantKey, topPlacesPrizePool) => R.pipe(
    R.pathOr([], [0, 'games', 0, participantKey]),
    getRoundLosers,
    R.assoc('prize', topPlacesPrizePool[1]),
  )(grandFinal),
)

export const specularBracketWinnersSelector = mapPropsToTournamentId => createSelector(
  [
    grandFinalSecondPlaceSelector,
    grandFinal2SecondPlaceSelector,
    thirdFourPlacesSelector,
    secondThirdFourPlacesSelector,
    topPlacesPrizePoolSelector,
    (state, props) => mapPropsToTournamentId(props),
  ],
  (
    secondPlace,
    secondSecondPlace,
    thirdFourPlaces,
    secondThirdFourPlaces,
    topPlacesPrizePool,
    tournamentId,
  ) => {
    switch (Number(tournamentId)) {
      case TUG_OF_WAR_TOURNAMENT_IDS.DIRE:
        return [
          {
            2: {
              ...secondPlace,
              prize: topPlacesPrizePool[1],
            },
          },
          {
            2: {
              ...secondSecondPlace,
              prize: topPlacesPrizePool[1],
            },
          },
          {
            '3-4': {
              ...thirdFourPlaces[0],
              prize: topPlacesPrizePool[2],
            },
          },
          {
            '3-4': {
              ...thirdFourPlaces[1],
              prize: topPlacesPrizePool[3],
            },
          },
          {
            '3-4': {
              ...secondThirdFourPlaces[0],
              prize: topPlacesPrizePool[3],
            },
          },
          {
            '3-4': {
              ...secondThirdFourPlaces[1],
              prize: topPlacesPrizePool[3],
            },
          },
        ]
      default:
        return [
          {
            2: {
              ...secondPlace,
              prize: topPlacesPrizePool[1],
            },
          },
          {
            '3-4': {
              ...thirdFourPlaces[0],
              prize: topPlacesPrizePool[2],
            },
          },
          {
            '3-4': {
              ...thirdFourPlaces[1],
              prize: topPlacesPrizePool[3],
            },
          },
        ]
    }
  },
)

export const MVPSelector = createSelector(
  [tournamentPlayersSelector, specialPrizePoolSelector],
  (players, prizePool) => R.pipe(
    R.find(R.propEq('mvp', true)),
    player => ({ ...player, prize: prizePool.mvp }),
  )(players),
)

export const tournamentGroupsSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.pipe(
    R.propOr({}, 'groups'),
    R.values,
  ),
)

export const tournamentPlayersByGroupNamesSelector = groupNames => createSelector(
  [getTournamentPlayerByIdSelector, tournamentGroupsSelector],
  (getTournamentPlayerById, tournamentGroups) => R.map(name => ({
    name,
    players: R.pipe(
      R.find(R.propEq('name', name)),
      R.prop('players'),
      R.map(
        R.pipe(
          R.prop('uuid'),
          getTournamentPlayerById,
        ),
      ),
    )(tournamentGroups),
  }))(groupNames),
)

const tournamentGroupPlayersSelector = createSelector(
  [tournamentGroupsSelector, getTournamentPlayerByIdSelector],
  (tournamentGroups, getTournamentPlayerById) => R.map(
    R.pipe(
      R.prop('players'),
      R.map(
        R.pipe(
          R.prop('uuid'),
          getTournamentPlayerById,
        ),
      ),
    ),
  )(tournamentGroups),
)

const tournamentGroupWinnersSelector = createSelector(
  [tournamentGroupPlayersSelector, topPlacesPrizePoolSelector],
  (tournamentGroupWinners, topPlacesPrizePool) => R.pipe(
    R.last,
    R.defaultTo([]),
    R.slice(0, 4),
    R.addIndex(R.map)(
      (value, index) => ({
        ...value,
        prize: topPlacesPrizePool[index],
      }),
    ),
  )(tournamentGroupWinners),
)

export const tournamentGroupMainWinnerSelector = createSelector(
  [tournamentGroupWinnersSelector],
  R.propOr({}, '0'),
)

export const tournamentOtherWinnersSelector = winnersAmount => createSelector(
  [tournamentGroupWinnersSelector],
  R.takeLast(winnersAmount - 1),
)

export const tournamentGroupNamesSelector = createSelector(
  [tournamentGroupsSelector],
  R.map(R.prop('name')),
)

export const createTournamentGroupGamesByDateSelector = mapPropsToMoment => createSelector(
  [
    tournamentGroupsSelector,
    currentLanguageSelector,
    (state, props) => mapPropsToMoment(props),
  ],
  (tournamentGroups, currentLanguage, moment) => R.map(
    R.pipe(
      R.prop('games'),
      R.map(R.prop('startDatetime')),
      dates => dates.reduce((allDates, date) => {
        // converting date to CEST
        const cestMoment = moment.utc(date).add(2, 'h').locale(currentLanguage)
        const dateKey = cestMoment.format('Do MMMM')

        if (!allDates[dateKey]) {
          allDates[dateKey] = [] // eslint-disable-line
        }

        allDates[dateKey].push(
          cestMoment.format('HH:mm'),
        )

        return allDates
      }, {}),
      data => Object.keys(data).map(i => ({ [i]: data[i].sort() })),
    ),
  )(tournamentGroups),
)

export const tournamentGroupsWithParticipantSelector = createSelector(
  [
    tournamentGroupsSelector, getTournamentParticipantByIdSelector,
    participantKeySelector, extendGameWithParticipantSelector,
  ],
  (groups, getTournamentParticipantById, participantKey, extendGameWithParticipant) => groups.map(group => ({
    ...group,
    [participantKey]: R.pipe(
      R.pathOr([], [participantKey]),
      R.map(extendParticipant(getTournamentParticipantById)),
    )(group),
    games: R.pipe(
      R.pathOr([], ['games']),
      R.map(extendGameWithParticipant),
    )(group),
  })),
)

const createTournamentStatusSelector = mapPropsToId => createSelector(
  [tournamentDataAsyncSelectors.dataSelector, getTournamentStagesSelector, (state, props) => mapPropsToId(props)],
  (tournament, getTournamentStages, id) => R.pipe(
    getTournamentStages,
    R.find(stage => String(stage.id) === String(id)),
    R.propOr(STAGE_STATUS.SCHEDULED, 'status'),
  )(tournament),
)

export const createIsTournamentScheduledSelector = mapPropsToId => createSelector(
  [createTournamentStatusSelector(mapPropsToId)],
  R.equals(STAGE_STATUS.SCHEDULED),
)

export const createIsTournamentInProgressSelector = mapPropsToId => createSelector(
  [createTournamentStatusSelector(mapPropsToId)],
  R.equals(STAGE_STATUS.ACTIVE),
)

export const createIsTournamentFinishedSelector = mapPropsToId => createSelector(
  [createTournamentStatusSelector(mapPropsToId)],
  R.equals(STAGE_STATUS.FINISHED),
)

export const tournamentBroadcastUrlSelector = mapPropsToId => createSelector(
  [tournamentBroadcastSelector, createIsTournamentInProgressSelector(mapPropsToId)],
  (tournamentBroadcast, isTournamentInProgress) => {
    if (R.isEmpty(tournamentBroadcast)) {
      return ''
    }
    return isTournamentInProgress
      ? tournamentBroadcast.twitch
      : tournamentBroadcast.youtube
  },
)

export const getTournamentByIdSelector = mapPropsToId => createSelector(
  [tournamentStagesSelector, (state, props) => mapPropsToId(props)],
  (stages, id) => (
    R.pipe(
      R.find(R.propEq('id', id)),
      R.defaultTo({}),
    )(stages)),
)

const getArtifactRegistration = (tournament, tournamentStages) => {
  if (
    Number(tournament.id) === Number(tournamentStages[0].id)
    || (Number(tournament.id) === Number(tournamentStages[1].id) && tournament.status === STAGE_STATUS.SCHEDULED)
  ) {
    return tournamentStages[1]
  }
  return tournamentStages[2]
}

export const createTournamentRegistrationSelector = mapPropsToId => createSelector(
  [tournamentStagesSelector, getTournamentByIdSelector(mapPropsToId)],
  (tournamentStages, tournament) => {
    if (tournamentStages.length > 0) {
      if (ARTIFACT_TOURNAMENT_IDS.includes(Number(tournament.id))) {
        return getArtifactRegistration(tournament, tournamentStages)
      }
      if (Number(tournament.id) === MADNESS_TOURNAMENT_ID) {
        return tournamentStages[0]
      }
    }
    return {}
  },
)

export const betProviderSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  (tournament) => {
    switch (tournament && tournament.id) {
      case BUKOVEL_MINOR_ID:
      case MAD_MOON_ID:
        return 'pariMatch'
      case ARTIFACT_TOURNAMENT_IDS[0]:
      case ARTIFACT_TOURNAMENT_IDS[2]:
      case TUG_OF_WAR_TOURNAMENT_IDS.RADIANT:
      case TUG_OF_WAR_TOURNAMENT_IDS.DIRE:
        return 'oneXBet'
      case ARTIFACT_TOURNAMENT_IDS[1]:
        return 'egb'
      case MADNESS_TOURNAMENT_ID:
        return 'esBet'
      default:
        return ''
    }
  },
)

export const gameUrlsSelector = mapPropsToId => createSelector(
  [currentLanguageSelector, (state, props) => mapPropsToId(props)],
  (currentLanguage, game) => R.pipe(
    R.propOr({}, 'urls'),
    localizeWith(currentLanguage),
  )(game),
)

const tournamentPopularDataSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.propOr({}, 'popular'),
)

const popularVideosSectionSelector = createSelector(
  [tournamentPopularDataSelector, currentLanguageSelector],
  (popularData, currentLanguage) => R.pipe(
    R.path(['videosSection']),
    localizeWith(currentLanguage),
  )(popularData),
)
const popularTweetsSectionSelector = createSelector(
  [tournamentPopularDataSelector, currentLanguageSelector],
  (popularData, currentLanguage) => R.pipe(
    R.path(['tweetsSection']),
    localizeWith(currentLanguage),
  )(popularData),
)

export const newsSectionSelector = createSelector(
  [tournamentPopularDataSelector, currentLanguageSelector],
  R.pathOr({}, ['newsSection']),
)

export const videoUrlsSelector = createSelector(
  [popularVideosSectionSelector, currentLanguageSelector],
  (VideosSection, currentLanguage) => R.pipe(
    R.prop('items'),
    localizeWith(currentLanguage),
    // TODO: remove after implementation deepLocalizeWith
    R.values,
    R.uniq,
  )(VideosSection),
)
export const allVideosUrlSelector = createSelector(
  [popularVideosSectionSelector, currentLanguageSelector],
  R.propOr({}, 'all'),
)

export const allTweetsUrlSelector = createSelector(
  [popularTweetsSectionSelector, currentLanguageSelector],
  R.propOr({}, 'all'),
)

export const tournamentHotTweetIDsSelector = createSelector(
  [popularTweetsSectionSelector, currentLanguageSelector],
  (TweetsSection, currentLanguage) => R.pipe(
    R.prop('items'),
    localizeWith(currentLanguage),
    R.values,
    R.uniq,
  )(TweetsSection),
)

const tournamentTeamsWithPlayersSelector = createSelector(
  [tournamentTeamsSelector, getTournamentPlayerByIdSelector],
  (invitedTeams, getTournamentParticipantById) => invitedTeams.map(team => ({
    ...team,
    players: team.players.map(getTournamentParticipantById),
  })),
)

const createTournamentInvitedTeamsSelector = invitedStatus => createSelector(
  [tournamentTeamsWithPlayersSelector],
  R.filter(R.propEq('inviteStatus', invitedStatus)),
)

export const createTournamentTeamsByEventNameSelector = mapPropsToTournamentTitle => createSelector(
  [
    tournamentTeamsWithPlayersSelector,
    createTournamentInvitedTeamsSelector(true),
    createTournamentInvitedTeamsSelector(false),
    (state, props) => mapPropsToTournamentTitle(props),
  ],
  (allTeams, invitedTeams, notInvitedTeams, tournamentTitle) => {
    if (tournamentTitle === TUG_OF_WAR_STAGE_NAMES.DIRE) {
      return [
        R.filter(R.propEq('region', REGIONS_MAP.AMERICAS), invitedTeams),
        R.filter(R.propEq('region', REGIONS_MAP.ASIA), invitedTeams),
        R.filter(R.propEq('region', REGIONS_MAP.AMERICAS), notInvitedTeams),
        R.filter(R.propEq('region', REGIONS_MAP.ASIA), notInvitedTeams),
      ]
    }
    return [invitedTeams, notInvitedTeams]
  },
)

export const tournamentWinnerNameWithNickSelector = createSelector(
  [winnerSelector],
  winner => (
    R.pipe(
      R.prop('name'),
      R.defaultTo(''),
      R.split(' '),
      R.insert(1, `"${R.prop('nickname')(winner)}"`),
      R.join(' '),
    )(winner)
  ),
)

export const groupStageSumSelector = createSelector(
  [specialPrizePoolSelector, tournamentTeamsSelector],
  (specialPrizePool, tournamentTeams) => ((tournamentTeams.length * (tournamentTeams.length - 1)) / 2)
    * specialPrizePool.groupWin,
)
export const createIsTournamentParticipantSelector = mapPropsToId => createSelector(
  [currentUserSelector, tournamentStagesSelector, createTournamentRegistrationSelector(mapPropsToId)],
  (currentUser, tournamentStages, registrationStage) => (
    R.propOr(false, `${ARTIFACT_STAGE_TITLES[registrationStage.id]}_participant`)(currentUser)
  ),
)
