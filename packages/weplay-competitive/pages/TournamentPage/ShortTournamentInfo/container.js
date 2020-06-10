/* eslint-disable max-lines */
import * as R from 'ramda'
import { connect } from 'react-redux'
import {
  compose,
  withPropsOnChange,
  withHandlers,
  withStateHandlers,
  withState,
} from 'recompose'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withMoment from 'weplay-core/HOCs/withMoment'
import {
  currentUserSelector,
  userIdSelector,
  isLoggedInSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'
import transliterate from 'weplay-core/helpers/translit'
import { isSmallLaptopTournamentSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { goTo, NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import { originSelector } from 'weplay-core/reduxs/common/selectors'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import { BUTTON_COLOR } from 'weplay-components/Button'

import {
  createCurrentTeamMemberSelectors,
  createActiveTeamMembersSelectors,
  createCoreTeamMembersSelectors,
  createStandInMembersSelectors,
  createIsEmptySteamInTeamMembers,
} from 'weplay-competitive/reduxs/commonSelectors/teamMembers'
import { createTournamentGameSelector } from 'weplay-competitive/reduxs/commonSelectors/tournamets'
import {
  tournamentMembersActions,
  tournamentMembersSelectors,
} from 'weplay-competitive/reduxs/tournamentMembers'
import { teamMembersSelectors } from 'weplay-competitive/reduxs/teamMembers'
import { createTournamentWinnerSelector } from 'weplay-competitive/reduxs/commonSelectors/tournaments'
import { ROLES } from 'weplay-competitive/constants/roles'
import { TOURNAMENT_STATUSES } from 'weplay-competitive/constants/tournamentStatuses'
import { TEAM_MEMBER_STATUSES } from 'weplay-competitive/constants/teamMemberStatuses'
import { TOURNAMENT_MEMBER_STATUSES } from 'weplay-competitive/constants/tournamentMemberStatuses'
import { MEMBER_STATUSES } from 'weplay-competitive/constants/memberStatuses'
import {
  GA__JOIN_TEAM,
  GA__CONNECT_STEAM_ON_CARD,
  GA__CREATE_MEMBER_JOIN,
  GA__JOIN_SINGLE_TOURNAMENT,
  GA__SHOW_CONFIRM_ON_CARD,
  GA__CREATE_MEMBER_NO_TEAM,
  GA__INVITE_MORE_MEMBERS,
  GA__LESS_CORE_MEMBERS,
  GA__PICK_STAND_IN,
  GA__TEAM_MEMBER_EMPTY_GAME,
} from 'weplay-competitive/analytics'
import {
  AT__TOURNAMENTS_DETAILS_JOIN,
  AT__TOURNAMENTS_DETAILS_JOIN_SUCCESS,
} from 'weplay-competitive/analytics/amplitude'
import { ACCESS_TYPES } from 'weplay-competitive/constants/accessTypes'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { queryTournamentAllInfo } from 'weplay-competitive/pages/TournamentPage/actionChains'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { membersActions, membersSelectors } from 'weplay-competitive/reduxs/members'
import { teamsSelectors } from 'weplay-competitive/reduxs/teams'
import {
  currentMemberSelector,
  isPremiumAccountSelector,
} from 'weplay-competitive/reduxs/members/selectors'

/* eslint-disable max-len */
const disciplineImg = 'https://static-prod.weplay.tv/2020-03-16/f8e528881f621e49c623c32654e0993b.050D2C-B6BBC3-747484.png'
const steam = 'https://static-prod.weplay.tv/2020-03-16/f1ed4e00ee538834e0919b7b946c3c1f.060E2D-B7BBC2-747484.png'
/* eslint-enable max-len */

const mapPropsToTournamentId = R.pipe(
  R.path([
    'match', 'params', 'tournamentId',
  ]),
  Number,
)

const blueConfirmModifier = { confirmButton: [BUTTON_COLOR.BASIC] }
const pinkConfirmModifier = { confirmButton: [BUTTON_COLOR.CTA] }
const successConfirmModifier = { confirmButton: [BUTTON_COLOR.SUCCESS] }

const container = compose(
  withRouter,
  withDiscipline,
  withAnalytics,
  withLocale,
  connect(createStructuredSelector({
    isLoggedIn: isLoggedInSelector,
    currentUser: currentUserSelector,
    currentUserId: userIdSelector,
    currentMember: currentMemberSelector,
    currentTeamMember: createCurrentTeamMemberSelectors(mapPropsToTournamentId),
    getGameModeById: gameModesSelectors.getRecordByIdSelector,
    getTeamMemberById: teamMembersSelectors.getRecordByIdSelector,
    getTeamById: teamsSelectors.getRecordByIdSelector,
    getMemberById: membersSelectors.getRecordByIdSelector,
    teamMembers: createActiveTeamMembersSelectors(mapPropsToTournamentId),
    coreTeamMembers: createCoreTeamMembersSelectors(mapPropsToTournamentId),
    standInMembers: createStandInMembersSelectors(mapPropsToTournamentId),
    tournamentGame: createTournamentGameSelector(mapPropsToTournamentId),
    isEmptySteamInTeam: createIsEmptySteamInTeamMembers(mapPropsToTournamentId),
    allTournamentMembers: tournamentMembersSelectors.allRecordsSelector,
    winner: createTournamentWinnerSelector(mapPropsToTournamentId),
    origin: originSelector,
    isSmallLaptopTournamentWidth: isSmallLaptopTournamentSelector,
    isPremiumAccount: isPremiumAccountSelector,
  }), {
    // actionCreators
    createMember: membersActions.createRecord.request,
    joinTournament: tournamentMembersActions.createRecord.request,
    leaveTournament: tournamentMembersActions.deleteRecord.request,
    queryTournamentAllInfo,
  }),

  withState('confirmModalModifiers', 'setConfirmModalModifiers', blueConfirmModifier),
  withState('hasTip', 'setHasTip', false),

  withPropsOnChange([
    'currentMember',
    'currentTournament',
    'allTournamentMembers',
  ], ({
    currentMember,
    currentTournament,
    allTournamentMembers,
  }) => ({
    currentTournamentMember:
      R.find(
        R.allPass([
          R.pathEq(['relationships', 'member', 'id'], currentMember.id),
          R.pathEq(['relationships', 'tournament', 'id'], currentTournament.id),
          R.propEq('status', TOURNAMENT_MEMBER_STATUSES.ACTIVE),
        ]),
      )(allTournamentMembers),
    deletedCount:
      R.pipe(
        R.filter(
          R.allPass([
            R.pathEq(['relationships', 'member', 'id'], currentMember.id),
            R.pathEq(['relationships', 'tournament', 'id'], currentTournament.id),
            R.propEq('status', TOURNAMENT_MEMBER_STATUSES.DELETED),
          ]),
        ),
        R.length,
      )(allTournamentMembers),
    isDynamicPrize: Boolean(currentTournament.relationships.rewardMap),
  })),

  /* eslint no-magic-numbers: ["error", { "ignore": [1, 0] }] */
  withPropsOnChange([
    'currentTournamentMember',
  ], ({
    currentTournamentMember,
  }) => ({
    isCurrentMemberInTournament: !R.isNil(currentTournamentMember),
  })),

  withPropsOnChange([
    'deletedCount',
  ], ({
    deletedCount,
  }) => ({
    isLastDeleteLeft: deletedCount === 1,
    isRejectedByDeleteCount: deletedCount > 1,
  })),

  withPropsOnChange([
    'currentTournament',
    'isPremiumAccount',
  ], ({
    currentTournament,
    isPremiumAccount,
  }) => {
    switch (currentTournament.accessType) {
      case ACCESS_TYPES.ACCESS_BY_NAME:
        return {
          accessIcon: 'profile',
          tipAccessType: 'tipAccessByName',
        }
      case ACCESS_TYPES.ACCESS_BY_LINK:
        return {
          accessIcon: 'invite',
          tipAccessType: 'tipAccessByLink',
        }
      case ACCESS_TYPES.ACCESS_PUBLIC:
        return {
          accessIcon: 'unlock',
          tipAccessType: '',
        }
      case ACCESS_TYPES.ACCESS_BY_PREMIUM:
        return {
          accessIcon: 'premium',
          tipAccessType: isPremiumAccount
            ? 'tipPremiumWillExpire'
            : 'tipAccessByPremium',
        }
      default:
        return {
          accessIcon: '',
          tipAccessType: '',
        }
    }
  }),

  withPropsOnChange([
    'origin',
    'currentTournament',
    'discipline',
  ], ({
    origin,
    currentTournament,
    discipline,
  }) => {
    const pathWithParams = pathWithParamsByRoute(NAMES.TOURNAMENT, {
      tournamentId: currentTournament.id,
      tournamentName: transliterate(currentTournament.name),
      discipline,
    })
    return ({
      inviteLink: `${origin}${pathWithParams}`,
    })
  }),

  withPropsOnChange([
    'currentTournament',
    'getGameModeById',
  ], ({
    currentTournament,
    getGameModeById,
  }) => ({
    gameMode: getGameModeById(currentTournament.relationships.gameMode.id),
  })),

  withPropsOnChange([
    'currentTeamMember',
    'getTeamById',
  ], ({
    currentTeamMember,
    getTeamById,
  }) => ({
    currentTeamId: R.pathOr(NaN, ['relationships', 'team', 'id'])(currentTeamMember),
    currentTeamName: R.pipe(
      R.pathOr(NaN, ['relationships', 'team', 'id']),
      getTeamById,
      R.pathOr('', ['name']),
      transliterate,
    )(currentTeamMember),
  })),
  withPropsOnChange([
    'currentUser',
  ], ({
    currentUser,
  }) => ({
    hasSteam: !R.isEmpty(
      R.pathOr('', ['steam_id'])(currentUser),
    ),
  })),

  withMoment,
  withPropsOnChange([
    'currentMember',
    'gameMode',
    'isLoggedIn',
    'teamMembers',
    'currentTournament',
    'coreTeamMembers',
    'currentTeamMember',
    'hasSteam',
    'isCurrentMemberHasAccessToTournament',
    'tipAccessType',
    'moment',
    'isEmptySteamInTeam',
  ], ({
    currentMember,
    gameMode,
    isLoggedIn,
    teamMembers,
    currentTournament,
    coreTeamMembers,
    currentTeamMember,
    hasSteam,
    isCurrentMemberHasAccessToTournament,
    tipAccessType,
    moment,
    isLastDeleteLeft,
    isRejectedByDeleteCount,
    isCurrentMemberInTournament,
    isEmptySteamInTeam,
  }) => {
    /* ---- NOT LOGGED IN USER ---- */
    if (!isLoggedIn) {
      if (currentTournament.status === TOURNAMENT_STATUSES.ONGOING) {
        return {
          joinTournamentActionType: '',
          disableJoinBtn: false,
          tipType: '',
        }
      }
      if (currentTournament.status === TOURNAMENT_STATUSES.ENDED) {
        return {
          joinTournamentActionType: '',
          disableJoinBtn: false,
          tipType: '',
        }
      }

      return {
        joinTournamentActionType: '',
        disableJoinBtn: true,
        tipType: 'notLoggedIn',
      }
    }
    if (!isCurrentMemberHasAccessToTournament) {
      return {
        joinTournamentActionType: '',
        disableJoinBtn: true,
        tipType: tipAccessType,
      }
    }

    if (isRejectedByDeleteCount) {
      return {
        joinTournamentActionType: '',
        disableJoinBtn: true,
        tipType: 'limitEnded',
      }
    }

    /* ---- BANNED USER ---- */
    if (R.pathEq(['status'], MEMBER_STATUSES.BANNED)(currentMember)) {
      if (currentTournament.status === TOURNAMENT_STATUSES.ENDED) {
        return {
          joinTournamentActionType: '',
          disableJoinBtn: false,
          tipType: '',
        }
      }
      if (currentTournament.status === TOURNAMENT_STATUSES.ONGOING) {
        return {
          joinTournamentActionType: '',
          disableJoinBtn: false,
          tipType: '',
        }
      }

      return {
        joinTournamentActionType: '',
        disableJoinBtn: true,
        tipType: 'memberBanned',
      }
    }

    /* ---- EMPTY SLOTS CASE ---- */
    if (!isCurrentMemberInTournament
      && currentTournament.emptySlots === 0
      && currentTournament.status === TOURNAMENT_STATUSES.UPCOMING) {
      return {
        joinTournamentActionType: '',
        disableJoinBtn: true,
        tipType: 'noSlots',
      }
    }

    /* ---- DATE CASES ---- */
    if (moment().isAfter(currentTournament.closeRegistrationDatetime)
      && currentTournament.status === TOURNAMENT_STATUSES.UPCOMING) {
      return {
        joinTournamentActionType: '',
        disableJoinBtn: true,
        tipType: 'regIsClosed',
      }
    }
    if (moment().isBefore(currentTournament.openRegistrationDatetime)) {
      return {
        joinTournamentActionType: '',
        disableJoinBtn: true,
        tipType: 'regWillBeOpened',
      }
    }
    /* ---- GAME MODE TYPE CASES ---- */
    switch (R.path(['gameModeType'], gameMode)) {
      case GAME_MODE_TYPES.SINGLE:
        if (isCurrentMemberInTournament) {
          if (isLastDeleteLeft) {
            return {
              joinTournamentActionType: 'ConfirmLastLeaveTournament',
              confirmModalModifiers: pinkConfirmModifier,
              disableJoinBtn: false,
              tipType: 'lastDelete',
            }
          }
          return {
            joinTournamentActionType: 'ConfirmLeaveTournament',
            confirmModalModifiers: pinkConfirmModifier,
            disableJoinBtn: false,
            tipType: '',
          }
        }
        if (!currentMember || !currentMember.isFetched) {
          return {
            joinTournamentActionType: 'CreateMemberAndShowConnectGameAndSteamModal',
            disableJoinBtn: false,
            tipType: '',
          }
        }
        if (!hasSteam) {
          return {
            joinTournamentActionType: 'ShowConnectGameAndSteamModal',
            disableJoinBtn: false,
            tipType: '',
            amplitudeFailureReason: 'Steam',
            amplitudeJoinedAttempt: 'Failure',
          }
        }
        if (isLastDeleteLeft) {
          return {
            joinTournamentActionType: 'ShowConfirmJoinLastChance',
            confirmModalModifiers: successConfirmModifier,
            disableJoinBtn: false,
            tipType: '',
            amplitudeJoinedAttempt: 'Success',
          }
        }
        return {
          joinTournamentActionType: 'ShowConfirmJoinTournament',
          confirmModalModifiers: successConfirmModifier,
          disableJoinBtn: false,
          tipType: '',
          amplitudeJoinedAttempt: 'Success',
        }
      case GAME_MODE_TYPES.TEAM:
        if (!currentMember || !currentMember.isFetched) {
          return {
            joinTournamentActionType: 'CreateMemberAndShowConfirmNoSteamNoTeam',
            disableJoinBtn: false,
            tipType: '',
            amplitudeFailureReason: 'Team',
            amplitudeJoinedAttempt: 'Failure',
          }
        }
        if (!currentTeamMember || currentTeamMember.status === TEAM_MEMBER_STATUSES.DISBANDED) {
          return {
            joinTournamentActionType: 'ShowConfirmHowToStart',
            disableJoinBtn: false,
            tipType: '',
            amplitudeFailureReason: 'Team members',
            amplitudeJoinedAttempt: 'Failure',
          }
        }
        if (currentTeamMember.role !== ROLES.CAPTAIN) {
          if (isCurrentMemberInTournament) {
            return {
              joinTournamentActionType: '',
              disableJoinBtn: true,
              tipType: 'onlyCaptainCanLeaveTeam',
            }
          }
          return {
            joinTournamentActionType: '',
            disableJoinBtn: true,
            tipType: 'onlyCaptainCanJoinTeam',
          }
        }
        if (isCurrentMemberInTournament && currentTeamMember.role === ROLES.CAPTAIN) {
          if (isLastDeleteLeft) {
            return {
              joinTournamentActionType: 'ConfirmLastLeaveTournament',
              confirmModalModifiers: pinkConfirmModifier,
              disableJoinBtn: false,
              tipType: 'lastDelete',
            }
          }
          return {
            joinTournamentActionType: 'ConfirmLeaveTournament',
            confirmModalModifiers: pinkConfirmModifier,
            disableJoinBtn: false,
            tipType: '',
          }
        }
        if (!hasSteam) {
          return {
            joinTournamentActionType: 'ShowConnectGameAndSteamModal',
            disableJoinBtn: false,
            tipType: '',
            amplitudeFailureReason: 'Steam',
            amplitudeJoinedAttempt: 'Failure',
          }
        }
        if (teamMembers.length < gameMode.size) {
          return {
            joinTournamentActionType: 'InviteMoreMembers',
            disableJoinBtn: false,
            tipType: '',
          }
        }
        if (isEmptySteamInTeam) {
          return {
            joinTournamentActionType: 'TeamMemberEmptyGame',
            disableJoinBtn: false,
            tipType: '',
          }
        }
        // coreTeamMembers and Captain
        if (coreTeamMembers.length + 1 < gameMode.size) {
          return {
            joinTournamentActionType: 'LessCoreMembers',
            disableJoinBtn: false,
            tipType: '',
          }
        }
        if (currentTournament.reservedSize === 0
          && teamMembers.length > gameMode.size) {
          if (isLastDeleteLeft) {
            return {
              joinTournamentActionType: 'ShowConfirmJoinCoreTeamTournamentLastChance',
              confirmModalModifiers: successConfirmModifier,
              disableJoinBtn: false,
              tipType: '',
            }
          }
          return {
            joinTournamentActionType: 'ShowConfirmJoinCoreTeamTournament',
            confirmModalModifiers: successConfirmModifier,
            disableJoinBtn: false,
            tipType: '',
            amplitudeJoinedAttempt: 'Success',
          }
        }
        if (currentTournament.reservedSize > 0
            && teamMembers.length > gameMode.size + currentTournament.reservedSize) {
          return {
            joinTournamentActionType: 'PickStandInMembers',
            disableJoinBtn: false,
            tipType: '',
          }
        }
        if (isLastDeleteLeft) {
          return {
            joinTournamentActionType: 'ShowConfirmJoinTeamLastChanceTournament',
            confirmModalModifiers: successConfirmModifier,
            disableJoinBtn: false,
            tipType: '',
            amplitudeJoinedAttempt: 'Success',
          }
        }
        return {
          joinTournamentActionType: 'ShowConfirmJoinTeamTournament',
          confirmModalModifiers: successConfirmModifier,
          disableJoinBtn: false,
          tipType: '',
          amplitudeJoinedAttempt: 'Success',
        }
      default:
        return {
          joinTournamentActionType: '',
          disableJoinBtn: true,
          tipType: '',
        }
    }
  }),

  withStateHandlers({
    activeAlertModalType: '',
    previewImage: '',
  }, {
    showAlertEmptyCsGameModal: () => () => ({
      activeAlertModalType: 'alertEmptyCsGame',
      previewImage: disciplineImg,
    }),
    showAlertEmptySteamModal: () => () => ({
      activeAlertModalType: 'alertEmptySteam',
      previewImage: steam,
    }),
    hideAlertModal: () => () => ({
      activeAlertModalType: '',
    }),
  }),

  withStateHandlers({
    activeConfirmModalType: '',
  }, {
    showConfirmModal: () => activeConfirmModalType => ({
      activeConfirmModalType,
    }),
    hideConfirmModal: () => () => ({
      activeConfirmModalType: '',
    }),
  }),

  withStateHandlers({
    activeInviteMembersModal: false,
  }, {
    showInviteMembersModal: () => () => ({
      activeInviteMembersModal: true,
    }),
    hideInviteMembersModal: () => () => ({
      activeInviteMembersModal: false,
    }),
  }),

  withStateHandlers({
    activePickStandInMembersModal: false,
  }, {
    showPickStandInMembersModal: () => () => ({
      activePickStandInMembersModal: true,
    }),
    hidePickStandInMembersModal: () => () => ({
      activePickStandInMembersModal: false,
    }),
  }),

  withHandlers({
    goToMemberProfile: ({ currentUser, history, discipline }) => () => {
      goTo({
        name: NAMES.MEMBER,
        history,
        params: {
          memberId: currentUser.id,
          memberName: transliterate(currentUser.nickname),
          discipline,
        },
      })
    },
  }),
  /* eslint-disable no-shadow */
  withHandlers({
    onLeaveTournamentRequest: ({
      leaveTournament,
      hideConfirmModal,
      currentTournamentMember,
      currentTournament,
      queryTournamentAllInfo,
    }) => () => {
      hideConfirmModal()
      leaveTournament({ id: currentTournamentMember.id })
        .then(() => queryTournamentAllInfo(currentTournament.id))
    },
    joinTournamentRequest: ({ joinTournament, currentTournament }) => teamMembers => (
      joinTournament({
        data: teamMembers.map(teamMember => ({
          type: 'TournamentMember',
          relationships: {
            tournament: {
              data: {
                id: currentTournament.id,
                type: 'Tournament',
              },
            },
            team: {
              data: {
                id: teamMember.relationships.team.id,
                type: 'Team',
              },
            },
            member: {
              data: {
                id: teamMember.relationships.member.id,
                type: 'Member',
              },
            },
          },
        })),
      })
    ),
  }),
  withHandlers({
    goToManageTeam: ({
      currentTeamMember, history, getTeamById, discipline,
    }) => () => {
      goTo({
        name: NAMES.TEAM_MEMBERS,
        history,
        params: {
          teamId: R.pathOr('', ['relationships', 'team', 'id'], currentTeamMember),
          teamName: transliterate(
            R.pipe(
              R.pathOr('', ['relationships', 'team', 'id']),
              getTeamById,
              R.pathOr('', ['name']),
            )(currentTeamMember),
          ),
          discipline,
        },
      })
    },
    onJoinSingleTournament: ({
      currentTournament,
      joinTournament,
      hideConfirmModal,
      queryTournamentAllInfo,
      logAmplitude,
      discipline,
    }) => () => {
      hideConfirmModal()
      logAmplitude(AT__TOURNAMENTS_DETAILS_JOIN_SUCCESS, { Discipline: discipline })
      joinTournament({
        data: {
          type: 'TournamentMember',
          relationships: {
            tournament: {
              data: {
                id: currentTournament.id,
                type: 'Tournament',
              },
            },
          },
        },
      })
        .then(() => queryTournamentAllInfo(currentTournament.id))
    },
    onJoinTournament: ({
      teamMembers,
      currentTournament,
      hideConfirmModal,
      queryTournamentAllInfo,
      joinTournamentRequest,
      logAmplitude,
      discipline,
    }) => () => {
      hideConfirmModal()
      logAmplitude(AT__TOURNAMENTS_DETAILS_JOIN_SUCCESS, {
        Discipline: discipline,
      })
      joinTournamentRequest(teamMembers)
        .then(() => queryTournamentAllInfo(currentTournament.id))
    },
    onJoinCoreTeamTournament: ({
      coreTeamMembers,
      hidePickStandInMembersModal,
      currentTournament,
      joinTournamentRequest,
      currentTeamMember,
      queryTournamentAllInfo,
      hideConfirmModal,
    }) => () => {
      const joinTeamMembers = coreTeamMembers.concat(currentTeamMember)
      hidePickStandInMembersModal()
      hideConfirmModal()
      joinTournamentRequest(joinTeamMembers)
        .then(() => queryTournamentAllInfo(currentTournament.id))
    },
    onJoinTournamentWithStandIn: ({
      coreTeamMembers,
      hidePickStandInMembersModal,
      currentTournament,
      joinTournamentRequest,
      teamMembers,
      currentTeamMember,
      queryTournamentAllInfo,
    }) => (memberIds) => {
      hidePickStandInMembersModal()
      const standInTeamMembers = teamMembers.filter(
        teamMember => memberIds.includes(R.path(['relationships', 'member', 'id'])(teamMember)),
      )
      const joinTeamMembers = coreTeamMembers.concat(currentTeamMember, standInTeamMembers)
      joinTournamentRequest(joinTeamMembers)
        .then(() => queryTournamentAllInfo(currentTournament.id))
    },
  }),
  /* eslint-enable no-shadow */

  withHandlers({
    handleConfirm: ({
      activeConfirmModalType,
      hideConfirmModal,
      goToMemberProfile,
      goToManageTeam,
      onJoinTournament,
      onJoinSingleTournament,
      onLeaveTournamentRequest,
      onJoinCoreTeamTournament,
    }) => () => {
      switch (activeConfirmModalType) {
        case 'confirmHowToStart':
          return goToMemberProfile()
        case 'teamMemberEmptyGame':
          return goToManageTeam()
        case 'lessCoreMembers':
          return goToManageTeam()
        case 'confirmJoinTournament':
        case 'confirmJoinLastChance':
          return onJoinSingleTournament()
        case 'confirmLastLeaveTournament':
        case 'confirmLeaveTournament':
          return onLeaveTournamentRequest()
        case 'confirmJoinTeamToTournament':
        case 'confirmJoinTeamToTournamentLastChance':
          return onJoinTournament()
        case 'confirmJoinCoreTeamTournament':
        case 'confirmJoinCoreTeamTournamentLastChance':
          return onJoinCoreTeamTournament()
        default:
          return hideConfirmModal()
      }
    },
  }),
  withState('isShownConnectGameAndSteamModal', 'toggleConnectGameAndSteamModal', false),
  withHandlers({
    openConnectGameAndSteamModal: ({ toggleConnectGameAndSteamModal }) => () => {
      toggleConnectGameAndSteamModal(true)
    },
    hideConnectGameAndSteamModal: ({ toggleConnectGameAndSteamModal }) => () => {
      toggleConnectGameAndSteamModal(false)
    },
  }),

  withHandlers({
    handleSendAnalytics: ({
      logAnalytics,
      logAmplitude,
      discipline,
      amplitudeFailureReason,
      amplitudeJoinedAttempt,
    }) => (gaEvent) => {
      if (gaEvent) {
        logAnalytics(gaEvent)
      }
      if (amplitudeFailureReason || amplitudeJoinedAttempt) {
        const apmlitudeProps = { Discipline: discipline }
        if (amplitudeJoinedAttempt) {
          apmlitudeProps['Joined attempt'] = amplitudeJoinedAttempt
        }
        if (amplitudeFailureReason) {
          apmlitudeProps['Faulure reason'] = amplitudeFailureReason
        }
        logAmplitude(AT__TOURNAMENTS_DETAILS_JOIN, apmlitudeProps)
      }
    },
  }),

  withHandlers({
    handlerJoinTournament: ({
      joinTournamentActionType,
      openConnectGameAndSteamModal,
      showConfirmModal,
      showInviteMembersModal,
      showPickStandInMembersModal,
      handleSendAnalytics,
      createMember,
      setHasTip,
    }) => () => {
      switch (joinTournamentActionType) {
        case 'ShowConnectGameAndSteamModal':
          openConnectGameAndSteamModal()
          handleSendAnalytics(GA__CONNECT_STEAM_ON_CARD)
          break
        case 'CreateMemberAndShowConnectGameAndSteamModal':
          createMember().then(openConnectGameAndSteamModal)
          handleSendAnalytics(GA__CREATE_MEMBER_JOIN)
          break
        case 'ShowConfirmHowToStart':
          showConfirmModal('confirmHowToStart')
          handleSendAnalytics(GA__SHOW_CONFIRM_ON_CARD)
          break
        case 'CreateMemberAndShowConfirmNoSteamNoTeam':
          createMember().then(openConnectGameAndSteamModal)
          handleSendAnalytics(GA__CREATE_MEMBER_NO_TEAM)
          break
        case 'InviteMoreMembers':
          showInviteMembersModal()
          handleSendAnalytics(GA__INVITE_MORE_MEMBERS)
          break
        case 'LessCoreMembers':
          showConfirmModal('lessCoreMembers')
          handleSendAnalytics(GA__LESS_CORE_MEMBERS)
          break
        case 'PickStandInMembers':
          showPickStandInMembersModal()
          handleSendAnalytics(GA__PICK_STAND_IN)
          break
        case 'TeamMemberEmptyGame':
          showConfirmModal('teamMemberEmptyGame')
          handleSendAnalytics(GA__TEAM_MEMBER_EMPTY_GAME)
          break
        case 'ShowConfirmJoinCoreTeamTournament':
          showConfirmModal('confirmJoinCoreTeamTournament')
          handleSendAnalytics(GA__JOIN_TEAM)
          break
        case 'ShowConfirmJoinCoreTeamTournamentLastChance':
          showConfirmModal('confirmJoinCoreTeamTournamentLastChance')
          setHasTip(true)
          handleSendAnalytics(GA__JOIN_TEAM)
          break
        case 'ConfirmLeaveTournament':
          showConfirmModal('confirmLeaveTournament')
          break
        case 'ConfirmLastLeaveTournament':
          showConfirmModal('confirmLastLeaveTournament')
          setHasTip(true)
          break
        case 'ShowConfirmJoinLastChance':
          showConfirmModal('confirmJoinLastChance')
          setHasTip(true)
          handleSendAnalytics(GA__JOIN_SINGLE_TOURNAMENT)
          break
        case 'ShowConfirmJoinTournament':
          showConfirmModal('confirmJoinTournament')
          handleSendAnalytics(GA__JOIN_SINGLE_TOURNAMENT)
          break
        case 'ShowConfirmJoinTeamLastChanceTournament':
          showConfirmModal('confirmJoinTeamToTournamentLastChance')
          setHasTip(true)
          handleSendAnalytics(GA__JOIN_TEAM)
          break
        case 'ShowConfirmJoinTeamTournament':
          showConfirmModal('confirmJoinTeamToTournament')
          handleSendAnalytics(GA__JOIN_TEAM)
          break
        default:
          break
      }
    },
  }),
  withHandlers({
    handlerFinishAndJoinTournament: ({
      gameMode,
      handlerJoinTournament,
      onJoinSingleTournament,
    }) => () => {
      switch (R.path(['gameModeType'], gameMode)) {
        case GAME_MODE_TYPES.SINGLE:
          onJoinSingleTournament()
          break
        case GAME_MODE_TYPES.TEAM:
          handlerJoinTournament()
          break
        default:
          break
      }
    },
  }),
)

export default container
