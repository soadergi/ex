import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withHandlers,
  withStateHandlers,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { isSingular } from 'weplay-core/helpers/isSingular'

import withPreloader from 'weplay-components/withPreloader'

import {
  membersActions,
  membersSelectors,
} from 'weplay-competitive/reduxs/members'
import { matchesSelectors } from 'weplay-competitive/reduxs/matches'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import { queryMatchesAllInfo } from 'weplay-competitive/pages/AllMatchesPage/actionChains'

const container = compose(
  withRouteInfo,
  withDiscipline,
  withLocale,
  connect(createStructuredSelector({
    // selectors
    getMatchById: matchesSelectors.getRecordByIdSelector,
    getMemberById: membersSelectors.getRecordByIdSelector,
    currentMember: currentMemberSelector,
  }), {
    // actionCreators
    queryMatchesAllInfo,
    queryMember: membersActions.findRecord.request,
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
    updateFetchedRecords: (state, props) => (paginatedFilteredMatchIds, pagination) => ({
      fetchedRecords: R.pipe(
        R.map(props.getMatchById),
      )(paginatedFilteredMatchIds),
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
    itemName: t(`competitive.pagination.type.matches.${isSingular(total) ? 'singular' : 'plural'}`),
  })),
  withProps(({ match, getMemberById }) => {
    const member = R.pipe(
      R.pathOr('', ['params', 'memberId']),
      getMemberById,
    )(match)
    return ({
      seoParams: {
        memberName: R.pathOr('', ['user', 'nickname'], member),
      },
      member,
    })
  }),
  /* eslint-disable no-shadow */
  withHandlers({
    fetchByFiltersAndPagination: ({
      // filters,
      updateFetchedRecords,
      pagination: prevPagination,
      match,
      history,
      queryMatchesAllInfo,
      gameId,
    }) => (pagination = {}) => queryMatchesAllInfo(match.params.memberId, gameId, history, pagination, prevPagination)
      .then(([matchesResponse, paginationMatches]) => updateFetchedRecords(
        matchesResponse.map(R.prop('id')),
        paginationMatches,
      ))
      .catch(err => console.log('Error', err)),
  }),
  /* eslint-enable no-shadow */
  lifecycle({
    componentDidMount() {
      if (this.props.member.isFetched) {
        this.props.fetchByFiltersAndPagination()
      } else {
        this.props.queryMember({ id: this.props.match.params.memberId })
      }
    },
    componentDidUpdate(prevProps) {
      if ((prevProps.filters !== this.props.filters)
      || (prevProps.member.isFetched !== this.props.member.isFetched && this.props.member.isFetched)) {
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
