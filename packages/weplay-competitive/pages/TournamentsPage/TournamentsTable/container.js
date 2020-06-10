/* eslint-disable max-lines */
import {
  compose,
  lifecycle,
  withHandlers,
  withPropsOnChange,
  withStateHandlers,
  withProps,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { isSingular } from 'weplay-core/helpers/isSingular'

import withPreloader from 'weplay-components/withPreloader'

import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import { gamesActions } from 'weplay-competitive/reduxs/games'
import { tournamentsActions, tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import {
  getInitialFilters,
  getFilterConfigs,
  getTabs,
  mapFiltersToQueryParams,
  TABS_IDS,
  DEFAULT_QUERY_VALUES,
} from 'weplay-competitive/pages/TournamentsPage/TournamentsTable/tableConfig'

const container = compose(
  withLocale,
  withRouter,
  connect(createStructuredSelector({
    // selectors
    getTournamentById: tournamentsSelectors.getRecordByIdSelector,
  }), {
    queryTournaments: tournamentsActions.queryRecords.request,
    findGames: gamesActions.findRecord.request,
    // actionCreators
  }),

  withHandlers({
    updateQuery: ({
      history,
    }) => (query) => {
      history.push({
        search: queryString.stringify(query),
      })
    },
  }),

  withPropsOnChange([
    't',
  ], ({ t }) => ({
    tabs: getTabs(t),
  })),

  withPropsOnChange([
    'location',
    'tabs',
  ], ({
    location,
    tabs,
  }) => {
    const query = queryString.parse(location.search)
    const { timeline } = query
    const pageOffset = query['page-offset'] || DEFAULT_QUERY_VALUES.OFFSET
    const pageLimit = query['page-limit'] || DEFAULT_QUERY_VALUES.LIMIT
    let activeTab = tabs.find(tab => tab.id === TABS_IDS.ACTIVE)
    if (timeline) {
      activeTab = tabs.find(tab => tab.id === TABS_IDS.PAST)
    }
    return {
      activeTab,
      pageOffset,
      pageLimit,
    }
  }),

  withPropsOnChange([
    't',
    'gameModes',
    'activeTab',
  ], props => ({
    filterConfigs: getFilterConfigs(props),
  })),

  withProps(props => ({
    filters: getInitialFilters(props),
    defaultFilters: getInitialFilters(props),
    pagination: {
      offset: props.pageOffset,
      limit: props.pageLimit,
      total: 0,
    },
  })),

  withStateHandlers({
    fetchedRecords: [],
    isDataLoaded: false,
  }, {
    updateFetchedRecords: (state, props) => (paginatedFilteredTournamentIds, pagination) => ({
      fetchedRecords: R.pipe(
        R.map(props.getTournamentById),
      )(paginatedFilteredTournamentIds),
      pagination,
      isDataLoaded: true,
    }),
  }),

  withPropsOnChange([
    'location',
    'defaultFilters',
    'filterConfigs',
  ], ({
    location,
    defaultFilters,
    filterConfigs,
  }) => {
    const query = queryString.parse(location.search)
    if (!Object.entries(query).length) {
      return {
        filters: defaultFilters,
      }
    }
    const updatedFilters = defaultFilters

    Object.keys(query).forEach((label) => {
      const url = query[label]
      const currentConfigItem = filterConfigs.find(item => item.fieldLabel === label)
      updatedFilters[label] = currentConfigItem?.options.find(
          option => option.url === url)?.value ?? DEFAULT_QUERY_VALUES.FILTERS
    })
    return {
      filters: updatedFilters,
    }
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
    handleTabClick: ({
      location,
      updateQuery,
    }) => (tab) => {
      const query = queryString.parse(location.search)
      if (tab.query) {
        if (!query.timeline) {
          query.timeline = tab.query
        }
      } else {
        delete query.timeline
      }
      if (query['page-offset']) {
        delete query['page-offset']
      }
      updateQuery(query)
    },
  }),

  withHandlers({
    fetchByFiltersAndPagination: ({
      filters,
      queryTournaments,
      updateFetchedRecords,
      discipline,
      activeTab,
      pageOffset,
      pageLimit,
    }) => () => queryTournaments({
      included: 'organizer,game_mode',
      ...mapFiltersToQueryParams(filters),
      'page[offset]': pageOffset,
      'page[limit]': pageLimit,
      'filter[game_mode.game]': DISCIPLINES[discipline].id,
      'filter[status]': filters.status !== DEFAULT_QUERY_VALUES.FILTERS ? filters.status : activeTab.filter,
      sort: `${activeTab.id === TABS_IDS.PAST ? '-' : ''}start_datetime`,
    }).then((response) => {
      const paginatedFilteredTournamentIds = response.data.map(R.prop('id'))
      updateFetchedRecords(paginatedFilteredTournamentIds, response.meta.pagination)
    }),
  }),

  withHandlers({
    handlePaginationChange: ({
      location,
      updateQuery,
    }) => (pagination) => {
      const query = queryString.parse(location.search)
      const { offset: pageOffset, limit: pageLimit } = pagination

      if (pageOffset) {
        if (!query['page-offset'] || query['page-offset'] !== pageOffset) {
          query['page-offset'] = pageOffset
        }
      } else {
        delete query['page-offset']
      }

      if (pageLimit !== DEFAULT_QUERY_VALUES.LIMIT) {
        if (!query['page-limit'] || query['page-limit'] !== pageLimit) {
          query['page-limit'] = pageLimit
        }
      } else {
        delete query['page-limit']
      }
      updateQuery(query)
    },
  }),

  lifecycle({
    componentDidMount() {
      this.props.fetchByFiltersAndPagination()
    },
    componentDidUpdate(prevProps) {
      if (prevProps.location !== this.props.location
          || prevProps.filters.gameMode !== this.props.filters.gameMode) {
        this.props.fetchByFiltersAndPagination()
      }
    },
  }),
  withPreloader({
    mapPropsToIsLoading: R.pipe(
      R.path(['isDataLoaded']),
      isDataLoaded => !isDataLoaded,
    ),
    skeletonProps: {
      count: 8,
      height: '100px',
    },
  }),
)

export default container
