import * as R from 'ramda'
import { createSelector } from 'reselect'

import {
  getTournamentParticipantByIdSelector,
  tournamentPlayoffSelector,
  topPlacesPrizePoolSelector,
  tournamentGroupsSelector,
  tournamentGroupsWithParticipantSelector,
  createPlayoffRoundsSelector,
} from './reducer'

const getGameLoserAndComplementSelector = createSelector(
  [getTournamentParticipantByIdSelector],
  getTournamentParticipantById => R.pipe(
    R.values,
    ([finalistA, finalistB]) => R.minBy(R.prop('score'), finalistA, finalistB),
    R.prop('uuid'),
    getTournamentParticipantById,
    R.dissoc('region'),
  ),
)

const playoffSecondPlaceWinnerSelector = createSelector(
  [
    tournamentPlayoffSelector,
    topPlacesPrizePoolSelector,
    getGameLoserAndComplementSelector,
  ],
  (
    playoff,
    topPlacesPrizePool,
    getGameLoserAndComplement,
  ) => R.pipe(
    R.path([1, 'games', 0, 'teams']),
    getGameLoserAndComplement,
    R.assoc('prize', topPlacesPrizePool[1]),
    winner => ({ 2: winner }),
  )(playoff),
)

const playoffThirdFourthPlaceWinnersSelector = createSelector(
  [
    tournamentPlayoffSelector,
    topPlacesPrizePoolSelector,
    getGameLoserAndComplementSelector,
  ],
  (
    playoff,
    topPlacesPrizePool,
    getGameLoserAndComplement,
  ) => R.pipe(
    R.pathOr([], [2, 'games']),
    R.map(
      R.pipe(
        R.prop('teams'),
        getGameLoserAndComplement,
        R.assoc('prize', topPlacesPrizePool[2]),
        team => ({ '3-4': team }),
      ),
    ),
  )(playoff),
)

const groupsFifthEighthWinnersSelector = createSelector(
  [tournamentGroupsSelector, getTournamentParticipantByIdSelector],
  (groups, getTournamentParticipantById) => R.map(
    R.pipe(
      R.propOr([], 'teams'),
      R.takeLast(2),
      R.map(
        R.pipe(
          R.prop('uuid'),
          getTournamentParticipantById,
          R.dissoc('region'),
        ),
      ),
    ),
  )(groups),
)

const groupsFifthSixthWinnersSelector = createSelector(
  [
    groupsFifthEighthWinnersSelector,
    topPlacesPrizePoolSelector,
  ],
  (
    fifthEighthWinners,
    topPlacesPrizePool,
  ) => R.map(
    R.pipe(
      R.head,
      R.assoc('prize', topPlacesPrizePool[4]),
      team => ({ '5-6': team }),
    ),
  )(fifthEighthWinners),
)

const groupsSeventhEighthWinnersSelector = createSelector(
  [
    groupsFifthEighthWinnersSelector,
    topPlacesPrizePoolSelector,
  ],
  (
    fifthEighthWinners,
    topPlacesPrizePool,
  ) => R.map(
    R.pipe(
      R.last,
      R.assoc('prize', topPlacesPrizePool[6]),
      team => ({ '7-8': team }),
    ),
  )(fifthEighthWinners),
)

export const topEightWinnersFOMS2LANSelector = createSelector(
  [
    playoffSecondPlaceWinnerSelector,
    playoffThirdFourthPlaceWinnersSelector,
    groupsFifthSixthWinnersSelector,
    groupsSeventhEighthWinnersSelector,
  ],
  (
    playoffSecondPlaceWinner,
    playoffThirdFourthPlaceWinners,
    groupsFifthSixthWinners,
    groupsSeventhEighthWinners,
  ) => R.flatten([
    playoffSecondPlaceWinner,
    playoffThirdFourthPlaceWinners,
    groupsFifthSixthWinners,
    groupsSeventhEighthWinners,
  ]),
)

export const tournamentGroupsFOM2019Selector = createSelector(
  [tournamentGroupsWithParticipantSelector],
  groups => [
    R.filter(R.propEq('region', 0), groups),
    R.filter(R.propEq('region', 1), groups),
    R.filter(R.propEq('region', 2), groups),
  ],
)

export const tournamentWinnersFOM2019Selector = createSelector(
  [tournamentGroupsFOM2019Selector, createPlayoffRoundsSelector('playoff2')],
  (groups, playOff2) => ({
    cisRegionWinner: R.pipe(
      R.prop('0'),
      R.map(
        R.path(['teams', '0']),
      ),
    )(groups),
    euRegionWinner: R.pipe(
      R.prop('1'),
      R.map(
        R.path(['teams', '0']),
      ),
    )(groups),
    thirdStageWinner: R.pipe(
      R.pathOr([], ['2', 'games']),
      R.map(
        R.path(['teams', 'a']),
      ),
    )(playOff2),
  }),
)
