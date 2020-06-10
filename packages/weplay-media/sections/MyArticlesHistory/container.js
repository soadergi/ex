import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  withStateHandlers,
  withHandlers,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { deleteUserHistory, getUserHistory, deleteHistoryById } from 'weplay-core/reduxs/userHistory/actions'
import { revertSortParam } from 'weplay-core/helpers/revertSortParam'
import { PROFILE_PATHS } from 'weplay-core/routes/core'
import {
  isUserHistoryLoadingSelector,
  userHistoryHasMoreSelector,
  userHistoryPaginationInfoSelector,
  userHistorySelector,
  userHistoryCountSelector,
  isDeletedUserArticleSelector,
} from 'weplay-core/reduxs/userHistory/reducer'

import { REQUEST_LIMIT } from 'weplay-media/sections/config/myMedia'

import { SORT_OPTIONS } from './consts'

const container = compose(
  withLocale,
  withAnalytics,
  connect(createStructuredSelector({
    isUserHistoryLoading: isUserHistoryLoadingSelector,
    userHistory: userHistorySelector,
    userHistoryHasMore: userHistoryHasMoreSelector,
    paginationInfo: userHistoryPaginationInfoSelector,
    userHistoryCount: userHistoryCountSelector,
    isDeletedBrowsingHistory: isDeletedUserArticleSelector,
  }), {
    // actionCreators
    getUserHistory: getUserHistory.request,
    clearDeleteStatus: deleteUserHistory.clear,
    deleteUserHistory: deleteUserHistory.request,
    deleteHistoryById: deleteHistoryById.request,
  }),

  withPageViewAnalytics({
    subPage: PROFILE_PATHS.ARTICLES,
  }),

  withStateHandlers({
    isClearHistoryPopupVisible: false,
    viewOptions: {
      sortType: SORT_OPTIONS.DATE,
      sortDesc: false,
      search: '',
    },
  }, {
    openMyMediaClearHistoryPopup: () => () => ({
      isClearHistoryPopupVisible: true,
    }),
    closeMyMediaClearHistoryPopup: () => () => ({
      isClearHistoryPopupVisible: false,
    }),
    handleViewOptionsChange: () => viewOptions => ({
      viewOptions,
    }),
  }),

  withPropsOnChange([
    'userHistory',
    'viewOptions',
    'isUserHistoryLoading',
  ], ({
    userHistory,
    viewOptions,
    isUserHistoryLoading,
  }) => ({
    isSearchResultEmpty: R.isEmpty(userHistory) && !R.isEmpty(viewOptions.search),
    isUserHistoryEmpty: R.isEmpty(userHistory) && R.isEmpty(viewOptions.search) && !isUserHistoryLoading,
    hasContent: !R.isEmpty(userHistory),
    fetchParams: {
      sort: viewOptions.sortDesc ? revertSortParam(viewOptions.sortType) : viewOptions.sortType,
      q: viewOptions.search,
    },
  })),

  withHandlers({
    createAnalyticsWithAction: ({
      logAnalytics,
    }) => eventAction => (eventLabel) => {
      logAnalytics({
        eventCategory: 'My Media Landing click',
        eventAction,
        eventLabel,
      })
    },
  }),

  withHandlers({
    /* eslint-disable no-shadow */
    fetchUserHistory: ({
      getUserHistory,
      locale,
      fetchParams,
      createAnalyticsWithAction,
    }) => (offset) => {
      getUserHistory({
        language: locale,
        limit: REQUEST_LIMIT,
        offset: offset || 0,
        ...fetchParams,
      }).then((response) => {
        if (!fetchParams.q) return
        const logFilterChange = createAnalyticsWithAction('Searching')
        logFilterChange(R.isEmpty(response.data) ? 'No results' : 'With results')
      })
    },
  }),
  withHandlers({
    fetchMoreUserHistory: props => () => {
      props.fetchUserHistory(
        props.paginationInfo.offset + props.paginationInfo.limit,
      )
    },
  }),

  lifecycle({
    componentDidMount() {
      this.props.fetchUserHistory()
      this.props.clearDeleteStatus()
    },

    componentDidUpdate(prevProps) {
      if (prevProps.locale !== this.props.locale) {
        this.props.handleViewOptionsChange({
          ...this.props.viewOptions,
          search: '',
        })
      }
      if (prevProps.viewOptions !== this.props.viewOptions) {
        this.props.fetchUserHistory()
      }
    },
  }),
)

export default container
