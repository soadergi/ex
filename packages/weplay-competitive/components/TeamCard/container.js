import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { teamMembersActions, teamMembersSelectors } from 'weplay-competitive/reduxs/teamMembers'
import { teamsSelectors } from 'weplay-competitive/reduxs/teams'
import { membersSelectors } from 'weplay-competitive/reduxs/members'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { GA__5X5_TEAM } from 'weplay-competitive/analytics'

const container = compose(
  withAnalytics,
  connect(createStructuredSelector({
    getGameModeById: gameModesSelectors.getRecordByIdSelector,
    getTeamById: teamsSelectors.getRecordByIdSelector,
    getTeamMemberById: teamMembersSelectors.getRecordByIdSelector,
    getMemberById: membersSelectors.getRecordByIdSelector,
    currentMember: currentMemberSelector,
  }), {
    // actionCreators
    queryTeamMembers: teamMembersActions.queryRecords.request,
  }),
  withProps(({
    teamId,
    getTeamById,
  }) => ({
    team: getTeamById(teamId),
  })),
  withStateHandlers({
    isShownInviteMembersModal: false,
  }, {
    showInviteMembers: () => () => ({ isShownInviteMembersModal: true }),
    hideInviteMembers: () => () => ({ isShownInviteMembersModal: false }),
  }),
  withPropsOnChange([
    'team',
    'getGameModeById',
  ], ({
    team,
    getGameModeById,
  }) => ({
    teamSize: R.pipe(
      R.pathOr('', ['relationships', 'gameMode', 'id']),
      getGameModeById,
      R.propOr(0, 'size'),
    )(team),
    gameModeTitle: R.pipe(
      R.pathOr('', ['relationships', 'gameMode', 'id']),
      getGameModeById,
      R.propOr('', 'title'),
    )(team),
  })),
  withStateHandlers({
    totalTeamMembers: 0,
  }, {
    setTotalTeamMembers: () => totalTeamMembers => ({ totalTeamMembers }),
  }),
  withStateHandlers({
    fetchedTeamMemberIds: [],
  }, {
    setTeamMembers: () => teamMembersResponse => ({
      fetchedTeamMemberIds: teamMembersResponse,
    }),
  }),
  withPropsOnChange([
    'fetchedTeamMemberIds',
    'getTeamMemberById',
  ], ({
    fetchedTeamMemberIds,
    getTeamMemberById,
  }) => ({
    teamMembers: R.map(getTeamMemberById)(fetchedTeamMemberIds),
    captainMemberId: R.pipe(
      R.find(R.pipe(
        getTeamMemberById,
        R.propEq('role', 'CAPTAIN'),
      )),
      getTeamMemberById,
      R.path(['relationships', 'member', 'id']),
      R.defaultTo(NaN),
    )(fetchedTeamMemberIds),
  })),
  withPropsOnChange([
    'captainMemberId',
    'currentMember',
  ], ({
    captainMemberId,
    currentMember,
  }) => ({
    isCaptain: captainMemberId === currentMember.id,
  })),
  withPropsOnChange([
    'teamMembers',
    'getMemberById',
  ], ({
    teamMembers,
    getMemberById,
  }) => ({
    members:
      R.map(
        R.pipe(
          R.path(['relationships', 'member', 'id']),
          getMemberById,
        ),
      )(teamMembers),
  })),
  withDiscipline,
  withHandlers({
    handleClickTeamCard: ({
      logAnalytics,
    }) => () => {
      logAnalytics(GA__5X5_TEAM)
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.queryTeamMembers({
        included: 'member,team',
        'filter[team.id]': this.props.teamId,
        'filter[team.status]': 'active',
        'filter[status]': 'active',
        sort: 'role',
        'page[limit]': 5,
      })
        .then((response) => {
          this.props.setTotalTeamMembers(response.meta.pagination.total)
          this.props.setTeamMembers(response.data.map(R.prop('id')))
        })
    },
  }),
)

export default container
