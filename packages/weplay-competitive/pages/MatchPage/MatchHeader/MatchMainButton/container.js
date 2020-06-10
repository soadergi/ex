import * as R from 'ramda'
import {
  compose, withPropsOnChange, withHandlers,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'
import { userIdSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'
import { MATCH_MEMBER_STATUSES } from 'weplay-competitive/constants/matchMemberStatuses'
import { LOBBY_STATUSES } from 'weplay-competitive/constants/lobbyStatuses'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'
import { ROLES } from 'weplay-competitive/constants/roles'
import { MATCH_MEMBER_PARTICIPATION_TYPES } from 'weplay-competitive/constants/matchMemberParticipationTypes'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import lobbySocket from 'weplay-competitive/services/lobbySocket'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import {
  createIsCurrentParticipantReadySelector,
  createParticipantActiveSelector,
} from 'weplay-competitive/reduxs/commonSelectors/matchMembers'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

const mapPropsToMatchId = R.path([
  'match', 'id',
])

const container = compose(
  withRouter,
  withLocale,
  connect(createStructuredSelector({
    // selectors
    getTournamentById: tournamentsSelectors.getRecordByIdSelector,
    getGameModeById: gameModesSelectors.getRecordByIdSelector,
    currentUserId: userIdSelector,
    currentMember: currentMemberSelector,
    getTournamentMemberById: tournamentMembersSelectors.getRecordByIdSelector,
    isCurrentParticipantReady: createIsCurrentParticipantReadySelector(mapPropsToMatchId),
    isHomeParticipantActive: createParticipantActiveSelector(mapPropsToMatchId, MATCH_MEMBER_PARTICIPATION_TYPES.HOME),
    isAwayParticipantActive: createParticipantActiveSelector(mapPropsToMatchId, MATCH_MEMBER_PARTICIPATION_TYPES.AWAY),
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'currentMember',
    'matchMembers',
    'getTournamentMemberById',
  ], ({
    currentMember,
    matchMembers,
    getTournamentMemberById,
  }) => ({
    currentMatchMemberId: R.pipe(
      R.find(R.pipe(
        R.path(['relationships', 'tournamentMember', 'id']),
        getTournamentMemberById,
        R.pathEq(['relationships', 'member', 'id'], currentMember.id),
      )),
      R.prop('id'),
    )(matchMembers),
    isCaptain: R.pipe(
      R.find(R.pipe(
        R.path(['relationships', 'tournamentMember', 'id']),
        getTournamentMemberById,
        R.pathEq(['relationships', 'member', 'id'], currentMember.id),
      )),
      R.path(['relationships', 'tournamentMember', 'id']),
      getTournamentMemberById,
      R.propEq('role', ROLES.CAPTAIN),
    )(matchMembers),
  })),
  withHandlers({
    handleReadyBtnClick: ({
      currentUserId,
      lobby,
      currentMatchMemberId,
    }) => () => lobbySocket.sendMemberStatusEvent({
      userId: currentUserId,
      lobbyId: lobby.id,
      currentMatchMemberId,
      status: MATCH_MEMBER_STATUSES.READY,
    }),
  }),
  withPropsOnChange([
    'tournamentId',
    'getTournamentById',
  ], ({
    tournamentId,
    getTournamentById,
  }) => ({
    tournament: getTournamentById(tournamentId),
  })),
  withPropsOnChange([
    'tournament',
    'getGameModeById',
  ], ({
    tournament,
    getGameModeById,
  }) => ({
    gameModeType: R.pipe(
      R.path(['relationships', 'gameMode', 'id']),
      getGameModeById,
      R.path(['gameModeType']),
    )(tournament),
  })),
  withPropsOnChange([
    'lobby',
    'matchStatus',
    'isCaptain',
    'gameModeType',
    'isHomeParticipantActive',
    'isAwayParticipantActive',
    'isCurrentParticipantReady',
    'isCurrentMemberInMatch',
  ], ({
    lobby,
    matchStatus,
    isCaptain,
    gameModeType,
    isHomeParticipantActive,
    isAwayParticipantActive,
    isCurrentParticipantReady,
    t,
    isCurrentMemberInMatch,
  }) => ({
    readyBtnText: isCurrentParticipantReady
      ? t('competitive.match.mainButton.waitCompetitor')
      : t('competitive.match.mainButton.ready'),
    showReadyBtn:
        isCurrentMemberInMatch
        && lobby.status === LOBBY_STATUSES.UPCOMING
        && matchStatus === MATCH_STATUSES.UPCOMING
        && isHomeParticipantActive
        && isAwayParticipantActive
        && (gameModeType === GAME_MODE_TYPES.SINGLE || (gameModeType === GAME_MODE_TYPES.TEAM && isCaptain)),
  })),
  withPropsOnChange([
    'matchStatus',
    'isCurrentMemberInMatch',
    'joinMatchLink',
    'tournamentId',
    'getTournamentById',
    'discipline',
    'isCurrentMemberTournamentSpectator',
  ], ({
    matchStatus,
    isCurrentMemberInMatch,
    joinMatchLink,
    tournamentId,
    getTournamentById,
    discipline,
    isCurrentMemberTournamentSpectator,
  }) => {
    const defaultConfig = {
      buttonLinkTo: pathWithParamsByRoute(NAMES.TOURNAMENT, {
        tournamentId,
        tournamentName: transliterate(R.pathOr('', ['name'])(getTournamentById(tournamentId))),
        discipline,
      }),
      buttonTextKey: 'backToTournament',
    }
    if (!isCurrentMemberInMatch && !isCurrentMemberTournamentSpectator) {
      return defaultConfig
    }
    switch (matchStatus) {
      case MATCH_STATUSES.UPCOMING:
      case MATCH_STATUSES.VOTING:
        return {
          buttonLinkTo: '',
          buttonTextKey: 'play',
        }
      case MATCH_STATUSES.SETUP_SERVER:
        return {
          buttonLinkTo: '',
          buttonTextKey: 'settingUp',
        }
      case MATCH_STATUSES.ONGOING:
        return {
          buttonLinkTo: `${DISCIPLINES[discipline].runCommand}${joinMatchLink || ''}`,
          buttonTextKey: isCurrentMemberTournamentSpectator ? 'watch' : 'play',
        }
      default:
        return defaultConfig
    }
  }),
)

export default container
