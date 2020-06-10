import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import queryString from 'query-string'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { NAMES, goTo } from 'weplay-core/routes'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import transliterate from 'weplay-core/helpers/translit'
import {
  currentUserSelector,
  isLoggedInSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'

import withCurrentLocation from 'weplay-components/withCurrentLocation'

import { teamsSelectors } from 'weplay-competitive/reduxs/teams'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { isCaptainSelector } from 'weplay-competitive/reduxs/commonSelectors/teamMembers'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { teamMembersSelectors } from 'weplay-competitive/reduxs/teamMembers'
import { teamStatisticSelector } from 'weplay-competitive/reduxs/statistic/reducer'
import { addMemberToTeam } from 'weplay-competitive/reduxs/invites/actions'
import { membersActions } from 'weplay-competitive/reduxs/members'
import withDisciplineAccessPage from 'weplay-competitive/HOCs/withDisciplineAccessPage'
import { queryTeamAllInfo } from 'weplay-competitive/pages/TeamPage/actionChains'
import withHotjar from 'weplay-competitive/HOCs/hotjar/withHotjar'
import { INVITE_TO_TEAM_ERRORS } from 'weplay-competitive/constants/inviteToTeamErrors'

const mapPropsToTeamId = R.pipe(
  R.path([
    'match', 'params', 'teamId',
  ]),
  Number,
)

const container = compose(
  withCurrentLocation,
  withDisciplineAccessPage,
  withLocale,
  connect(createStructuredSelector({
    team: teamsSelectors.createRecordByIdSelector(mapPropsToTeamId),
    currentUser: currentUserSelector,
    currentMember: currentMemberSelector,
    isLoggedIn: isLoggedInSelector,
    getTournamentById: tournamentsSelectors.getRecordByIdSelector,
    isCaptain: isCaptainSelector(mapPropsToTeamId),
    getTeamMemberById: teamMembersSelectors.getRecordByIdSelector,
    statistic: teamStatisticSelector,
  }), {
    queryTeamAllInfo,
    addMemberToTeam: addMemberToTeam.request,
    openLoginModal,
    createMember: membersActions.createRecord.request,
  }),
  withPageViewAnalytics(),
  withHotjar,
  withStateHandlers({
    isShownCreateTeamModal: false,
  }, {
    showCreateTeamModal: () => () => ({ isShownCreateTeamModal: true }),
    hideCreateTeamModal: () => () => ({ isShownCreateTeamModal: false }),
  }),
  withProps(({ team }) => ({
    seoParams: {
      teamName: R.pathOr('', ['name'], team),
    },
    teamName: transliterate(R.pathOr('', ['name'], team)),
  })),

  withStateHandlers({
    teamTournaments: [],
  }, {
    setTeamTournaments: (state, props) => teamTournamentsResponse => ({
      teamTournaments: teamTournamentsResponse.map(props.getTournamentById),
    }),
  }),

  withStateHandlers({
    fetchedTeamMembersIds: [],
  }, {
    setTeamMembers: () => teamMembersResponse => ({
      fetchedTeamMembersIds: teamMembersResponse,
    }),
  }),

  withStateHandlers({
    amountTournaments: 0,
  }, {
    setTotalTournaments: () => amountTournaments => ({ amountTournaments }),
  }),

  withStateHandlers({
    totalTeamMembers: 0,
  }, {
    setTotalTeamMembers: () => totalTeamMembers => ({ totalTeamMembers }),
  }),

  withStateHandlers({
    isShownInviteMembersModal: false,
    isShownLeaveTeamModal: false,
    isShownRemoveMemberModal: false,
  }, {
    showInviteMembers: () => () => ({ isShownInviteMembersModal: true }),
    hideInviteMembers: () => () => ({ isShownInviteMembersModal: false }),
    showLeaveTeam: () => () => ({ isShownLeaveTeamModal: true }),
    hideLeaveTeam: () => () => ({ isShownLeaveTeamModal: false }),
    showRemoveMember: () => () => ({ isShownRemoveMemberModal: true }),
    hideRemoveMember: () => () => ({ isShownRemoveMemberModal: false }),
  }),
  withStateHandlers({
    activeAlertModalType: '',
  }, {
    showAlertOnlyOneTeam: () => () => ({
      activeAlertModalType: 'alertOnlyOneTeam',
    }),
    showAlertBannedMember: () => () => ({
      activeAlertModalType: 'alertBannedMember',
    }),
    showAlertExpiredLink: () => () => ({
      activeAlertModalType: 'alertExpiredLink',
    }),
    showAlertOtherErrors: () => () => ({
      activeAlertModalType: 'alertOtherErrors',
    }),
    hideAlertModal: () => () => ({
      activeAlertModalType: '',
    }),
  }),

  withStateHandlers({
    activeConfirmModalType: '',
  }, {
    showConfirmJoinMemberToTeam: () => () => ({
      activeConfirmModalType: 'confirmJoinMemberToTeam',
    }),
    hideConfirmModal: () => () => ({
      activeConfirmModalType: '',
    }),
  }),

  withHandlers({
    removeSearchParams: ({ history, location }) => () => {
      history.replace(location.pathname)
    },
  }),

  /* eslint-disable no-shadow */
  withHandlers({
    inviteToTeam: ({
      addMemberToTeam,
      history,
      location,
      hideConfirmModal,
      queryTeamAllInfo,
      team,
      showAlertExpiredLink,
      removeSearchParams,
      showAlertOnlyOneTeam,
      showAlertBannedMember,
      showAlertOtherErrors,
      setTeamMembers,
      setTotalTeamMembers,
    }) => () => {
      addMemberToTeam(queryString.parse(location.search).key)
        .then(() => {
          queryTeamAllInfo(team.id, history)
            .then(([teamMembersResponse]) => {
              setTeamMembers(teamMembersResponse.data.map(R.prop('id')))
              setTotalTeamMembers(teamMembersResponse.meta.pagination.total)
            })
        })
        .catch((error) => {
          const errorCode = R.path(['response', 'data', 'error', 'code'])(error)
          switch (errorCode) {
            case INVITE_TO_TEAM_ERRORS.EXPIRED_LINK:
              showAlertExpiredLink()
              break
            case INVITE_TO_TEAM_ERRORS.ONLY_ONE_TEAM:
              showAlertOnlyOneTeam()
              break
            case INVITE_TO_TEAM_ERRORS.BANNED_MEMBER:
              showAlertBannedMember()
              break
            default:
              showAlertOtherErrors()
              break
          }
        })
        .finally(() => {
          hideConfirmModal()
          removeSearchParams()
        })
    },
  }),

  withHandlers({
    handleClickMoreTournaments: ({
      history,
      team,
      discipline,
    }) => () => goTo({
      name: NAMES.TEAM_TOURNAMENTS,
      history,
      params: {
        teamId: team.id,
        teamName: transliterate(team.name),
        discipline,
      },
    }),
    handleClickAllMembers: ({
      history,
      team,
      discipline,
    }) => () => goTo({
      name: NAMES.TEAM_MEMBERS,
      history,
      params: {
        teamId: team.id,
        teamName: transliterate(team.name),
        discipline,
      },
    }),
    handleInviteToTeam: ({
      inviteToTeam,
      isLoggedIn,
      openLoginModal,
      currentMember,
      createMember,
    }) => () => {
      if (!isLoggedIn) {
        openLoginModal()
      }
      if (!currentMember || !currentMember.isFetched) {
        createMember()
          .then(inviteToTeam)
      } else {
        inviteToTeam()
      }
    },
  }),
  /* eslint-enable no-shadow */

  lifecycle({
    componentDidMount() {
      /* eslint-disable no-shadow */
      const {
        location,
        history,
        queryTeamAllInfo,
        match,
        showConfirmJoinMemberToTeam,
        setTeamTournaments,
        setTotalTournaments,
        setTeamMembers,
        setTotalTeamMembers,
      } = this.props
      const id = match.params.teamId
      queryTeamAllInfo(id, history)
        .then(([teamMembersResponse, tournamentResponse]) => {
          setTeamTournaments(tournamentResponse.data.map(R.prop('id')))
          setTotalTournaments(tournamentResponse.meta.pagination.total)
          setTeamMembers(teamMembersResponse.data.map(R.prop('id')))
          setTotalTeamMembers(teamMembersResponse.meta.pagination.total)
        })

      if (queryString.parse(location.search).key) {
        showConfirmJoinMemberToTeam()
      }
    },
    componentDidUpdate(prevProps) {
      const {
        setTeamTournaments,
        setTotalTournaments,
        setTeamMembers,
        setTotalTeamMembers,
        queryTeamAllInfo,
        locale,
      } = this.props
      const teamId = this.props.match.params.teamId
      if (prevProps.match.params.teamId !== teamId) {
        queryTeamAllInfo(teamId, this.props.history)
          .then(([teamMembersResponse, tournamentResponse]) => {
            setTeamTournaments(tournamentResponse.data.map(R.prop('id')))
            setTotalTournaments(tournamentResponse.meta.pagination.total)
            setTotalTeamMembers(teamMembersResponse.meta.pagination.total)
            setTeamMembers(teamMembersResponse.data.map(R.prop('id')))
          })
      }
      if (prevProps.locale !== locale) {
        queryTeamAllInfo(teamId, this.props.history)
          .then(([teamMembersResponse, tournamentResponse]) => {
            setTeamTournaments(tournamentResponse.data.map(R.prop('id')))
            setTotalTournaments(tournamentResponse.meta.pagination.total)
            setTotalTeamMembers(teamMembersResponse.meta.pagination.total)
            setTeamMembers(teamMembersResponse.data.map(R.prop('id')))
          })
      }
    },
    /* eslint-enable no-shadow */
  }),
)

export default container
