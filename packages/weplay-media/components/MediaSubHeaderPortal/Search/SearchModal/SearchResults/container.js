import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { getPluralizeStatus } from 'weplay-core/helpers/getPluralizeStatus'
import {
  isSearchResultsLoadingSelector,
  searchResultsIdsSelector,
  searchResultsPaginationSelector,
} from 'weplay-core/reduxs/search/reducer'
import { makeSearch } from 'weplay-core/reduxs/search/actions'

import withPreloader from 'weplay-components/withPreloader'

const container = compose(
  withLocale,
  connect(createStructuredSelector({
    // selectors
    searchResultsIds: searchResultsIdsSelector,
    paginationInfo: searchResultsPaginationSelector,
    isSearchResultsLoading: isSearchResultsLoadingSelector,
  }), {
    // actionCreators
    makeSearch: makeSearch.request,
  }),
  withPropsOnChange([
    'searchResultsIds',
    't',
  ], ({
    searchResultsIds,
    t,
  }) => ({
    searchResultsCount:
        `${searchResultsIds.length}
        ${t(`mediaCore.modals.search.count.${getPluralizeStatus(searchResultsIds.length)}`)}`,
  })),
  withPropsOnChange([
    'searchResultsIds',
    'paginationInfo',
    'searchQuery',
  ], ({
    searchResultsIds,
    paginationInfo,
    searchQuery,
  }) => ({
    hasNoResults: R.isEmpty(searchResultsIds) && !R.isEmpty(searchQuery),
    hasResults: !R.isEmpty(searchResultsIds),
    hasMore: !R.isNil(searchResultsIds) && paginationInfo.count > searchResultsIds.length,
  })),
  withPreloader({
    mapPropsToIsLoading: ({
      isSearchResultsLoading,
      searchResultsIds,
    }) => isSearchResultsLoading && searchResultsIds.length === 0,

  }),
  withHandlers({
    loadMoreResults: props => () => {
      if (!props.isSearchResultsLoading) {
        props.makeSearch({
          params: {
            language: props.locale,
            term: props.searchQuery,
            limit: 10,
            offset: props.searchResultsIds.length,
          },
        })
      }
    },
  }),
)

export default container
