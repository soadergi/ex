import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  withStateHandlers,
  lifecycle, withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { revertSortParam } from 'weplay-core/helpers/revertSortParam'
import { PROFILE_PATHS } from 'weplay-core/routes/core'
import {
  deleteBookmarkById,
  getBookmarks,
  deleteBookmarks,
} from 'weplay-core/reduxs/bookmarks/actions'
import {
  bookmarksSelector,
  isBookmarksLoadingSelector,
  bookmarksHasMoreSelector,
  bookmarksCountSelector,
  bookmarksPaginationInfoSelector,
  isDeletedBookmarksSelector,
} from 'weplay-core/reduxs/bookmarks/reducer'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'

import { REQUEST_LIMIT } from 'weplay-media/sections/config/myMedia'

import { SORT_OPTIONS } from './consts'

const container = compose(
  withLocale,
  withAnalytics,
  connect(createStructuredSelector({
    bookmarks: bookmarksSelector,
    isBookmarksLoading: isBookmarksLoadingSelector,
    bookmarksCount: bookmarksCountSelector,
    hasMoreBookmarks: bookmarksHasMoreSelector,
    paginationInfo: bookmarksPaginationInfoSelector,
    isDeletedBookmarks: isDeletedBookmarksSelector,
  }), {
    // actionCreators
    getBookmarks: getBookmarks.request,
    deleteBookmarkById: deleteBookmarkById.request,
    deleteBookmarks: deleteBookmarks.request,
  }),

  withPageViewAnalytics({
    subPage: PROFILE_PATHS.BOOKMARKS,
  }),

  withStateHandlers({
    viewOptions: {
      sortType: SORT_OPTIONS.DATE,
      sortDesc: false,
      search: '',
    },
  }, {
    handleViewOptionsChange: () => viewOptions => ({
      viewOptions,
    }),
  }),
  withPropsOnChange([
    'bookmarks',
    'viewOptions',
    'isBookmarksLoading',
  ], ({
    bookmarks,
    viewOptions,
    isBookmarksLoading,
  }) => ({
    isSearchResultEmpty: R.isEmpty(bookmarks) && !R.isEmpty(viewOptions.search),
    isBookmarksEmpty: R.isEmpty(bookmarks) && R.isEmpty(viewOptions.search) && !isBookmarksLoading,
    hasContent: !R.isEmpty(bookmarks),
    fetchParams: {
      sort: viewOptions.sortDesc ? revertSortParam(viewOptions.sortType) : viewOptions.sortType,
      q: viewOptions.search,
    },
  })),
  withHandlers({
    handleDeleteBookmarkById: props => (id) => {
      props.deleteBookmarkById(id).then(() => {
        toaster.showNotification({
          type: TOAST_TYPE.WARNING,
          content: props.t('mediaCore.notifications.success.bookmarkDeleted'),
        })
      })
    },
    fetchBookmarks: props => (offset) => {
      props.getBookmarks({
        language: props.locale,
        limit: REQUEST_LIMIT,
        offset: offset || 0,
        ...props.fetchParams,
      })
    },
  }),
  withHandlers({
    fetchMoreBookmarks: props => () => {
      props.fetchBookmarks(
        props.paginationInfo.offset + props.paginationInfo.limit,
      )
    },
  }),
  withStateHandlers({
    isClearBookmarksPopupVisible: false,
  }, {
    openClearUserArticlesPopup: () => () => ({
      isClearBookmarksPopupVisible: true,
    }),
    closeClearUserArticlesPopup: () => () => ({
      isClearBookmarksPopupVisible: false,
    }),

  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchBookmarks()
    },
    componentDidUpdate(prevProps) {
      if (prevProps.viewOptions !== this.props.viewOptions
        || prevProps.locale !== this.props.locale
      ) {
        this.props.fetchBookmarks()
      }
    },
  }),
)

export default container
