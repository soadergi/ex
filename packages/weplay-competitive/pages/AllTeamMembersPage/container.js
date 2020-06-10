import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
  withStateHandlers,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { isSingular } from 'weplay-core/helpers/isSingular'
import transliterate from 'weplay-core/helpers/translit'

import withPreloader from 'weplay-components/withPreloader'

import { isCaptainSelector } from 'weplay-competitive/reduxs/commonSelectors/teamMembers'
import { membersSelectors } from 'weplay-competitive/reduxs/members'
import { TEAM_MEMBER_STATUSES } from 'weplay-competitive/constants/teamMemberStatuses'
import { teamsSelectors } from 'weplay-competitive/reduxs/teams'
import { gamesActions } from 'weplay-competitive/reduxs/games'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { teamMembersActions, teamMembersSelectors } from 'weplay-competitive/reduxs/teamMembers'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import withDisciplineAccessPage from 'weplay-competitive/HOCs/withDisciplineAccessPage'

const mapPropsToTeamId = R.pipe(
  R.path([
    'match', 'params', 'teamId',
  ]),
  Number,
)

const container = compose(
  withDisciplineAccessPage,
  withLocale,
  connect(createStructuredSelector({
    // selectors
    getTeamMemberById: teamMembersSelectors.getRecordByIdSelector,
    getMemberById: membersSelectors.getRecordByIdSelector,
    getTeamById: teamsSelectors.getRecordByIdSelector,
    isCaptain: isCaptainSelector(mapPropsToTeamId),
    getGameModeById: gameModesSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
    queryTeamMembers: teamMembersActions.queryRecords.request,
    queryGames: gamesActions.findRecord.request,
  }),
  withPageViewAnalytics(),
  withStateHandlers({
    fetchedTeamMembersIds: [],
    isDataLoaded: false,
    pagination: {
      offset: 0,
      limit: 10,
      total: 0,
    },
  }, {
    updateFetchedRecords: () => (paginatedTeamMemberIds, pagination) => ({
      fetchedTeamMembersIds: paginatedTeamMemberIds,
      pagination,
      isDataLoaded: true,
    }),
    deleteFetchedTeamMember: state => id => ({
      fetchedTeamMembersIds: R.without([id], state.fetchedTeamMembersIds),
    }),
  }),

  withProps(({
    match,
  }) => ({
    teamId: Number(match.params.teamId),
  })),

  withProps(({ teamId, getTeamById, getGameModeById }) => ({
    teamName: R.pipe(
      getTeamById,
      R.pathOr('', ['name']),
      transliterate,
    )(teamId),
    gameModeSize: R.pipe(
      getTeamById,
      R.pathOr('', ['relationships', 'gameMode', 'id']),
      getGameModeById,
      R.propOr(NaN, 'size'),
    )(teamId),
  })),

  withProps(({ teamName }) => ({
    seoParams: {
      teamName,
    },
  })),

  withStateHandlers({
    isShownInviteMembersModal: false,
  }, {
    showInviteMembers: () => () => ({ isShownInviteMembersModal: true }),
    hideInviteMembers: () => () => ({ isShownInviteMembersModal: false }),
  }),
  withProps(({
    t,
    pagination: {
      total,
    },
  }) => ({
    // TODO: Make logic to handle singular or plural (depends on total) for Russian
    itemName: t(`competitive.pagination.type.participants.${isSingular(total) ? 'singular' : 'plural'}`),
  })),
  withHandlers({
    fetchByFiltersAndPagination: ({
      queryTeamMembers,
      queryGames,
      updateFetchedRecords,
      pagination: prevPagination,
      match,
      discipline,
    }) => (pagination = {}) => {
      const teamId = match.params.teamId
      return queryTeamMembers({
        included: 'member,team',
        'filter[team.id]': teamId,
        'filter[status]': `${TEAM_MEMBER_STATUSES.ACTIVE}`,
        'page[offset]': pagination.offset,
        'page[limit]': pagination.limit || prevPagination.limit,
      }).then((response) => {
        const paginatedTeamMemberIds = response.data.map(R.prop('id'))
        updateFetchedRecords(paginatedTeamMemberIds, response.meta.pagination)
        queryGames({
          id: DISCIPLINES[discipline].id,
          included: 'game_modes',
        })
      })
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchByFiltersAndPagination()
    },
    componentDidUpdate(prevProps) {
      const teamId = this.props.match.params.teamId

      if (prevProps.match.params.teamId !== teamId) {
        this.props.fetchByFiltersAndPagination()
      }
    },
  }),
  withPreloader({
    mapPropsToIsLoading: R.pipe(
      R.path(['isDataLoaded']),
      isDataLoaded => !isDataLoaded,
    ),
    isFullScreen: true,
  }),
)

export default container
