import * as R from 'ramda'
import { createSelector } from 'reselect'

import { membersSelectors } from 'weplay-competitive/reduxs/members'
import { teamsSelectors } from 'weplay-competitive/reduxs/teams'
import { nodesSelectors } from 'weplay-competitive/reduxs/nodes'
import { matchesSelectors } from 'weplay-competitive/reduxs/matches'
import { stageSelectors } from 'weplay-competitive/reduxs/stages'
import { createTournamentGameModeSelector } from 'weplay-competitive/reduxs/commonSelectors/gameModes'
import {
  createTournamentStageIdSelector,
} from 'weplay-competitive/reduxs/tournaments/selectors'
import { createTournamentParticipantsSelector } from 'weplay-competitive/reduxs/commonSelectors/tournamentMembers'
import { createMatchesByTournamentIdSelector } from 'weplay-competitive/reduxs/matches/selectors'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'
import { ROUND_LABELS } from 'weplay-competitive/constants/roundLabels'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'
import { TOURNAMENT_STATUSES } from 'weplay-competitive/constants/tournamentStatuses'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

const sortByRoundAndLeftKey = R.sortWith([
  R.ascend(R.prop('round')),
  R.ascend(R.prop('leftKey')),
])

export const createTournamentGroupBracketSelector = mapPropsToId => createSelector([
  createTournamentParticipantsSelector(mapPropsToId),
  createMatchesByTournamentIdSelector(mapPropsToId),
  tournamentsSelectors.createRecordByIdSelector(mapPropsToId),
  tournamentMembersSelectors.getRecordByIdSelector,
  createTournamentGameModeSelector(mapPropsToId),
], (
  members,
  matches,
  tournament,
  getTournamentMemberById,
  gameMode,
) => {
  if (!members.length || !matches || !tournament || !gameMode) return null

  const tournamentMembersIds = gameMode.gameModeType !== GAME_MODE_TYPES.TEAM
    ? R.pipe(
      R.path(['relationships', 'tournamentMembers']),
      R.map(R.prop('id')),
      R.values,
    )(tournament)
    : R.pipe(
      R.map(R.prop('id')),
      R.values,
    )(members)

  const size = tournamentMembersIds.length
  const matrix = Array.from(Array(size), () => new Array(size))

  // TODO: clear up when backend will be ready for group brackets score
  const scoreArray = Array(size)
  for (let i = 0; i <= size; i += 1) {
    scoreArray[i] = 0
  }

  R.forEach((match) => {
    const player1Id = R.path(['relationships', 'player1', 'id'], match)
    const player2Id = R.path(['relationships', 'player2', 'id'], match)
    let rowIndex = -1
    let columnIndex = -1

    if (gameMode.gameModeType === GAME_MODE_TYPES.SINGLE) {
      rowIndex = tournamentMembersIds.indexOf(player1Id)
      columnIndex = tournamentMembersIds.indexOf(player2Id)
    } else {
      const team1Id = R.pipe(
        getTournamentMemberById,
        R.pathOr('', ['relationships', 'team', 'id']),
      )(player1Id)
      const team2Id = R.pipe(
        getTournamentMemberById,
        R.pathOr('', ['relationships', 'team', 'id']),
      )(player2Id)
      rowIndex = tournamentMembersIds.indexOf(team1Id)
      columnIndex = tournamentMembersIds.indexOf(team2Id)
    }

    if (rowIndex !== -1 && columnIndex !== -1) {
      matrix[rowIndex][rowIndex] = { withHimself: true }
      matrix[columnIndex][columnIndex] = { withHimself: true }
      matrix[rowIndex][columnIndex] = match
      matrix[columnIndex][rowIndex] = match
    }

    // TODO: clear up when backend will be ready for group brackets score
    const winnerId = R.pathOr('', ['relationships', 'winner', 'id'], match)
    const winnerIndex = tournamentMembersIds.indexOf(winnerId)
    if (winnerIndex !== -1) {
      scoreArray[winnerIndex] += 3
    }
  }, matches)

  return {
    tournamentMembersIds,
    bracketMatrix: matrix,
    groupMatches: matches,
    scoreArray,
  }
})

export const createTournamentNodesSelector = mapPropsToId => createSelector(
  [
    tournamentsSelectors.createRecordByIdSelector(mapPropsToId),
    createTournamentStageIdSelector(mapPropsToId),
    createTournamentGameModeSelector(mapPropsToId),
    nodesSelectors.allRecordsSelector,
    matchesSelectors.getRecordByIdSelector,
    tournamentMembersSelectors.getRecordByIdSelector,
    membersSelectors.getRecordByIdSelector,
    teamsSelectors.getRecordByIdSelector,
  ],
  (
    tournament,
    tournamentStageId,
    tournamentGameMode,
    allNodes,
    getMatchById,
    getTournamentMemberById,
    getMemberById,
    getTeamById,
  ) => R.pipe(
    R.filter(R.pathEq(['relationships', 'stage', 'id'], tournamentStageId)),
    sortByRoundAndLeftKey,
    R.map((node) => {
      const extendedNode = {
        ...node,
        match: getMatchById(node.relationships.matches[0].id),
      }

      const tournamentMember1Path = ['match', 'relationships', 'player1', 'id']
      const tournamentMember2Path = ['match', 'relationships', 'player2', 'id']

      extendedNode.match.player1 = {
        ...extendedNode.match.player1,
        tournamentMember: getTournamentMemberById(R.pathOr(NaN, tournamentMember1Path, extendedNode)),
      }

      extendedNode.match.player2 = {
        ...extendedNode.match.player2,
        tournamentMember: getTournamentMemberById(R.pathOr(NaN, tournamentMember2Path, extendedNode)),
      }

      if (tournamentGameMode.gameModeType === GAME_MODE_TYPES.SINGLE) {
        const memberIdPath = ['relationships', 'member', 'id']

        extendedNode.match.player1.tournamentMember = {
          ...extendedNode.match.player1.tournamentMember,
          participant: getMemberById(R.pathOr(NaN, memberIdPath, extendedNode.match.player1.tournamentMember)),
        }

        extendedNode.match.player2.tournamentMember = {
          ...extendedNode.match.player2.tournamentMember,
          participant: getMemberById(R.pathOr(NaN, memberIdPath, extendedNode.match.player2.tournamentMember)),
        }
      } else {
        const teamIdPath = ['relationships', 'team', 'id']

        extendedNode.match.player1.tournamentMember = {
          ...extendedNode.match.player1.tournamentMember,
          participant: getTeamById(R.pathOr(NaN, teamIdPath, extendedNode.match.player1.tournamentMember)),
        }

        extendedNode.match.player2.tournamentMember = {
          ...extendedNode.match.player2.tournamentMember,
          participant: getTeamById(R.pathOr(NaN, teamIdPath, extendedNode.match.player2.tournamentMember)),
        }
      }

      return extendedNode
    }),
    R.groupBy(R.prop('round')),
    R.values,
    rounds => rounds.map((round, index) => {
      let label
      let roundType = 'qualification'
      switch (index) {
        case 0:
          label = ROUND_LABELS.FINAL
          roundType = ROUND_LABELS.FINAL.toLowerCase()
          break
        case 1:
          label = ROUND_LABELS.SEMIFINAL
          roundType = ROUND_LABELS.SEMIFINAL.toLowerCase()
          break
        default:
          label = `1/${2 ** index}`
          roundType = `round_of_${2 ** index}`
          break
      }

      const makePath = (player, destination) => {
        if (tournamentGameMode.gameModeType === GAME_MODE_TYPES.SINGLE) {
          return ['match', player, 'tournamentMember', 'participant', 'user', destination === 'name'
            ? 'nickname'
            : destination]
        }
        return ['match', player, 'tournamentMember', 'participant', destination]
      }

      const type = tournamentGameMode.gameModeType === GAME_MODE_TYPES.SINGLE ? 'member' : 'team'
      const discipline = R.pipe(
        R.filter(R.propEq('id', R.path(['relationships', 'game', 'id'])(tournamentGameMode))),
        R.keys,
        R.head,
      )(DISCIPLINES)

      let participantsKey
      if (tournamentGameMode.gameModeType === GAME_MODE_TYPES.SINGLE) {
        participantsKey = 'players'
      } else {
        participantsKey = 'teams'
      }

      return {
        games: R.pipe(
          R.map(node => ({
            // ...match,
            startDatetime: R.pathOr('', ['match', 'startDatetime'], node),
            discipline,
            isLobbyReady: tournament.status !== TOURNAMENT_STATUSES.UPCOMING
              && R.pipe(
                R.path(['match', 'relationships', 'lobby']),
                R.complement(R.isNil),
              )(node),
            status: R.pathOr('', ['match', 'status'], node),
            id: node.id,
            matchId: R.pathOr(-1, ['match', 'id'], node),
            tournamentId: tournament.id,
            tournamentName: tournament.name,
            isThirdPlaceMatch: Boolean(tournament.thirdPlaceMatch)
              && R.pathOr([], ['relationships', 'children'], node).length === 0
              && label === ROUND_LABELS.FINAL
              && round.length > 1,
            [participantsKey]: {
              a: {
                picture: R.pathOr('', makePath('player1', 'avatar'), node),
                nickname: R.pathOr('', makePath('player1', 'name'), node),
                id: R.pathOr('', ['match', 'player1', 'tournamentMember', 'participant', 'id'], node),
                score: R.pathOr(0, ['match', 'score1'], node),
                inviteStatus: false,
                isPremiumAccount: R.pathOr(false, makePath('player1', 'isPremiumAccount'), node),
                type,
              },
              b: {
                picture: R.pathOr('', makePath('player2', 'avatar'), node),
                nickname: R.pathOr('', makePath('player2', 'name'), node),
                id: R.pathOr('', ['match', 'player2', 'tournamentMember', 'participant', 'id'], node),
                score: R.pathOr(0, ['match', 'score2'], node),
                inviteStatus: false,
                isPremiumAccount: R.pathOr(false, makePath('player2', 'isPremiumAccount'), node),
                type,
              },
            },
          })),
        )(round),
        roundType,
        label,
      }
    }),
    R.reverse,
  )(allNodes),
)

export const createTournamentWinnerSelector = mapPropsToId => createSelector(
  [
    tournamentsSelectors.createRecordByIdSelector(mapPropsToId),
    stageSelectors.getRecordByIdSelector,
    nodesSelectors.allRecordsSelector,
    matchesSelectors.getRecordByIdSelector,
    tournamentMembersSelectors.getRecordByIdSelector,
    createTournamentGameModeSelector(mapPropsToId),
    membersSelectors.getRecordByIdSelector,
    teamsSelectors.getRecordByIdSelector,
  ],
  (
    tournament,
    getStageById,
    nodes,
    getMatchById,
    getTournamentMemberById,
    gameMode,
    getMemberById,
    getTeamById,
  ) => R.pipe(
    R.path(['relationships', 'stages']),
    R.last,
    R.prop('id'),
    getStageById,
    R.prop('id'),
    stageId => R.find(R.allPass([
      R.pathEq(['relationships', 'stage', 'id'], stageId),
      R.pathEq(['round'], 0),
    ]))(nodes),
    R.pathOr([], ['relationships', 'matches']),
    R.last,
    R.prop('id'),
    getMatchById,
    R.pathOr(null, ['relationships', 'winner']),
    R.prop('id'),
    getTournamentMemberById,
    (tournamentMember) => {
      if (gameMode.gameModeType === GAME_MODE_TYPES.SINGLE) {
        return getMemberById(R.path(['relationships', 'member', 'id'], tournamentMember))
      }
      return getTeamById(R.path(['relationships', 'team', 'id'], tournamentMember))
    },
  )(tournament),
)
