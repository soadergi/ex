import { connect } from 'react-redux'
import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  withProps,
} from 'recompose'
import { createStructuredSelector } from 'reselect'

import {
  currentUserSelector,
  isLoggedInSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import { TEAM_MEMBER_STATUSES } from 'weplay-competitive/constants/teamMemberStatuses'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'
import { membersActions } from 'weplay-competitive/reduxs/members'
import { createMemberByIdSelector } from 'weplay-competitive/reduxs/members/selectors'
import { createMemberTeamsSelector } from 'weplay-competitive/reduxs/commonSelectors/members'
import { teamMembersSelectors } from 'weplay-competitive/reduxs/teamMembers'
import { matchesSelectors } from 'weplay-competitive/reduxs/matches'
import { teamsSelectors } from 'weplay-competitive/reduxs/teams'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { gamesSelectors } from 'weplay-competitive/reduxs/games'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import withHotjar from 'weplay-competitive/HOCs/hotjar/withHotjar'
import withDisciplineAccessPage from 'weplay-competitive/HOCs/withDisciplineAccessPage'

const mapPropsToId = R.path([
  'match', 'params', 'memberId',
])

const container = compose(
  withAnalytics,
  withDisciplineAccessPage,
  connect(createStructuredSelector({
    member: createMemberByIdSelector(mapPropsToId),
    memberTeams: createMemberTeamsSelector(mapPropsToId),
    currentUser: currentUserSelector,
    isLoggedIn: isLoggedInSelector,
    getMatchById: matchesSelectors.getRecordByIdSelector,
    getTeamById: teamsSelectors.getRecordByIdSelector,
    getTournamentById: tournamentsSelectors.getRecordByIdSelector,
    getGameModeById: gameModesSelectors.getRecordByIdSelector,
    currentLanguage: currentLanguageSelector,
    getTeamMemberById: teamMembersSelectors.getRecordByIdSelector,
    allGames: gamesSelectors.allRecordsSelector,
  }), {
    queryMember: membersActions.findRecord.request,
  }),
  withPageViewAnalytics(),
  withHotjar,
  withProps(({ discipline }) => ({
    gameId: DISCIPLINES[discipline].id,
  })),
  withProps(({ member }) => ({
    seoParams: {
      memberName: R.pathOr('', ['name'], member),
    },
  })),
  withPropsOnChange([
    'gameId',
    'getGameModeById',
    'allGames',
  ], (({
    gameId,
    getGameModeById,
    allGames,
  }) => {
    if (allGames.length < 1) {
      return ({
        allTeamGameModes: [],
      })
    }
    return ({
      allTeamGameModes: R.pipe(
        R.find(R.propEq('id', gameId)),
        R.path(['relationships', 'gameModes']),
        R.defaultTo([]),
        R.map(
          R.pipe(
            R.prop('id'),
            getGameModeById,
          ),
        ),
        R.filter(R.propEq('gameModeType', GAME_MODE_TYPES.TEAM)),
        R.defaultTo([]),
      )(allGames),
    })
  })),
  withPropsOnChange([
    'allTeamGameModes',
  ], (({
    allTeamGameModes,
  }) => ({
    allTeamGameModesIds: R.map(R.prop('id'))(allTeamGameModes),
  }))),
  withPropsOnChange([
    'memberTeams',
    'gameId',
  ], (({
    memberTeams,
    gameId,
  }) => ({
    bookedGameModeIds: R.pipe(
      R.filter(R.pathEq(['relationships', 'game', 'id'], gameId)),
      R.map(R.path(['relationships', 'gameMode', 'id'])),
      R.uniq,
    )(memberTeams),
  }))),
  withPropsOnChange([
    'allTeamGameModesIds',
    'bookedGameModeIds',
  ], (({
    allTeamGameModesIds,
    bookedGameModeIds,
  }) => ({
    freeGameModeIDs: R.difference(allTeamGameModesIds, bookedGameModeIds),
  }))),
  withPropsOnChange([
    'freeGameModeIDs',
    'getGameModeById',
  ], (({
    freeGameModeIDs,
    getGameModeById,
  }) => ({
    freeTeamsGameModes: R.map(getGameModeById)(freeGameModeIDs),
  }))),
  withPropsOnChange([
    'currentUser',
    'match',
    'isLoggedIn',
  ], (({
    currentUser,
    match,
    isLoggedIn,
  }) => ({
    isOwner: isLoggedIn && currentUser.id === Number(match.params.memberId),
  }))),
  withPropsOnChange([
    'member',
    'getTeamMemberById',
    'getTeamById',
    'discipline',
  ], ({
    member,
    getTeamMemberById,
    getTeamById,
    discipline,
  }) => {
    if (!member.isFetched) {
      return null
    }
    return ({
      memberTeamIds: R.pipe(
        R.pathOr([], ['relationships', 'teamMembers']),
        R.map(R.prop('id')),
        R.map(getTeamMemberById),
        R.filter(R.propEq('status', TEAM_MEMBER_STATUSES.ACTIVE)),
        R.map(R.path(['relationships', 'team', 'id'])),
        R.uniq,
        R.defaultTo([]),
        R.map(getTeamById),
        R.filter(R.pathEq(['relationships', 'game', 'id'], DISCIPLINES[discipline].id)),
        R.defaultTo([]),
        R.map(R.prop('id')),
        R.uniq,
      )(member),
    })
  }),

  withPropsOnChange([
    'isOwner',
    'allTeamGameModes',
  ], ({
    isOwner,
    allTeamGameModes,
  }) => ({
    showSoonLabel: isOwner && allTeamGameModes.length === 0,
  })),

)

export default container
