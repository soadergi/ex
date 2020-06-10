import * as R from 'ramda'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {
  compose,
  lifecycle,
  withHandlers,
  withStateHandlers,
  withProps,
} from 'recompose'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { isSingular } from 'weplay-core/helpers/isSingular'

import withPreloader from 'weplay-components/withPreloader'

import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { membersSelectors } from 'weplay-competitive/reduxs/members'
import { teamsSelectors } from 'weplay-competitive/reduxs/teams'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { queryParticipantsAllInfo } from 'weplay-competitive/pages/AllParticipantsPage/actionChains'
import withDisciplineAccessPage from 'weplay-competitive/HOCs/withDisciplineAccessPage'

const container = compose(
  withRouteInfo,
  withDiscipline,
  withDisciplineAccessPage,
  withLocale,
  connect(createStructuredSelector({
    // selectors
    getMemberById: membersSelectors.getRecordByIdSelector,
    getTeamById: teamsSelectors.getRecordByIdSelector,
    getTournamentById: tournamentsSelectors.getRecordByIdSelector,
    getGameModeById: gameModesSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
    queryParticipantsAllInfo,
  }),
  withPageViewAnalytics(),
  withProps(({ match, getTournamentById }) => {
    const tournament = R.pipe(
      R.pathOr(NaN, ['params', 'tournamentId']),
      getTournamentById,
    )(match)
    return ({
      seoParams: {
        tournamentName: tournament.name,
      },
      tournament,
    })
  }),
  withStateHandlers({
    fetchedRecords: [],
    isDataLoaded: false,
    pagination: {
      offset: 0,
      limit: 10,
      total: 0,
    },
  }, {
    updateFetchedRecords: (state, props) => (paginatedFilteredParticipantIds, pagination, isTeams) => ({
      fetchedRecords: paginatedFilteredParticipantIds.map(isTeams ? props.getTeamById : props.getMemberById),
      pagination,
      isDataLoaded: true,
    }),
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
  /* eslint-disable no-shadow */
  withHandlers({
    fetchByFiltersAndPagination: ({
      // filters,
      updateFetchedRecords,
      pagination: prevPagination,
      match,
      history,
      queryParticipantsAllInfo,
    }) => (pagination = {}) => queryParticipantsAllInfo(
      match.params.tournamentId || match.params.teamId, history, pagination, prevPagination,
    )
      .then((participantsResponse) => {
        updateFetchedRecords(
          participantsResponse.data.map(R.prop('id')),
          participantsResponse.meta.pagination,
          participantsResponse.data[0].type === 'Team',
        )
      }),
  }),
  /* eslint-enable no-shadow */
  lifecycle({
    componentDidMount() {
      this.props.fetchByFiltersAndPagination()
    },
    componentDidUpdate(prevProps) {
      if (prevProps.filters !== this.props.filters) {
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
