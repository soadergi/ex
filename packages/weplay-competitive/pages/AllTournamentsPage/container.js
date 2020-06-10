import * as R from 'ramda'
import { createStructuredSelector } from 'reselect'
import {
  compose,
  lifecycle,
  withHandlers,
  withStateHandlers,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { isSingular } from 'weplay-core/helpers/isSingular'
import transliterate from 'weplay-core/helpers/translit'
import { NAMES } from 'weplay-core/routes/competitive'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import {
  tournamentsActions,
  tournamentsSelectors,
} from 'weplay-competitive/reduxs/tournaments'
import {
  teamsActions,
  teamsSelectors,
} from 'weplay-competitive/reduxs/teams'
import {
  membersActions,
  membersSelectors,
} from 'weplay-competitive/reduxs/members'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import withDisciplineAccessPage from 'weplay-competitive/HOCs/withDisciplineAccessPage'

const container = compose(
  withRouteInfo,
  withDisciplineAccessPage,
  withLocale,
  connect(createStructuredSelector({
    // selectors
    getTournamentById: tournamentsSelectors.getRecordByIdSelector,
    getTeamById: teamsSelectors.getRecordByIdSelector,
    getMemberById: membersSelectors.getRecordByIdSelector,
    currentLanguage: currentLanguageSelector,
  }), {
    // actionCreators
    queryTournaments: tournamentsActions.queryRecords.request,
    queryMember: membersActions.findRecord.request,
    queryTeam: teamsActions.findRecord.request,
  }),
  withPageViewAnalytics(),
  withProps(({ discipline }) => ({
    gameId: DISCIPLINES[discipline].id,
  })),
  withStateHandlers({
    fetchedRecords: [],
    isDataLoaded: false,
    pagination: {
      offset: 0,
      limit: 10,
      total: 0,
    },
  }, {
    updateFetchedRecords: (state, props) => (paginatedFilteredTournamentIds, pagination) => ({
      fetchedRecords: R.pipe(
        R.map(props.getTournamentById),
      )(paginatedFilteredTournamentIds),
      pagination,
      isDataLoaded: true,
    }),
  }),
  withProps(({
    match, getMemberById, getTeamById, discipline,
  }) => {
    const team = R.pipe(
      R.pathOr(NaN, ['params', 'teamId']),
      getTeamById,
    )(match)
    const member = R.pipe(
      R.pathOr(NaN, ['params', 'memberId']),
      getMemberById,
    )(match)
    return ({
      seoParams: {
        teamName: R.pathOr('', ['name'])(team),
        memberName: transliterate(R.pathOr('', ['user', 'nickname'])(member)),
        discipline: DISCIPLINES[discipline].name,
      },
      team,
      member,
    })
  }),
  withProps(({
    t,
    pagination: {
      total,
    },
  }) => ({
    // TODO: Make logic to handle singular or plural (depends on total) for Russian
    itemName: t(`competitive.pagination.type.tournaments.${isSingular(total) ? 'singular' : 'plural'}`),
  })),
  withHandlers({
    fetchByFiltersAndPagination: ({
      // filters,
      queryTournaments,
      updateFetchedRecords,
      pagination: prevPagination,
      match,
      routeInfo,
      team,
      member,
      queryMember,
      queryTeam,
      gameId,
    }) => (pagination = {}) => {
      let filerBy = {}
      switch (routeInfo.name) {
        case NAMES.MEMBER_TOURNAMENTS:
          if (!member.isFetched) {
            queryMember({ id: match.params.memberId })
          }
          filerBy = { 'filter[tournament_members.member]': match.params.memberId }
          break
        case NAMES.TEAM_TOURNAMENTS:
          if (!team.isFetched) {
            queryTeam({ id: match.params.teamId })
          }
          filerBy = { 'filter[tournament_members.team]': match.params.teamId }
          break
        default: {
          filerBy = {}
          break
        }
      }
      return queryTournaments({
        included: 'organizer,game_mode',
        ...filerBy,
        'filter[game]': gameId,
        'page[offset]': pagination.offset,
        'page[limit]': pagination.limit || prevPagination.limit,
      }).then((response) => {
        const paginatedFilteredTournamentIds = response.data.map(R.prop('id'))
        updateFetchedRecords(paginatedFilteredTournamentIds, response.meta.pagination)
      })
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchByFiltersAndPagination()
    },
    componentDidUpdate(prevProps) {
      if (prevProps.filters !== this.props.filters) {
        this.props.fetchByFiltersAndPagination()
      }
      if (this.props.currentLanguage !== prevProps.currentLanguage) {
        this.props.fetchByFiltersAndPagination()
      }
    },
  }),
)

export default container
