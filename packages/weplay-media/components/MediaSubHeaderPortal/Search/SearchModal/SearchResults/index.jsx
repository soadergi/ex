import React from 'react'
import PropTypes from 'prop-types'

import NoResults from './NoResults/NoResults'
import ResultList from './ResultsList/ResultsList'
import container from './container'

const SearchResults = ({
  searchQuery,
  hasMore,
  isSearchResultsLoading,
  loadMoreResults,
  hasNoResults,
  hasResults,
  searchResultsIds,
  handleClose,
}) => (
  <>
    {hasNoResults && (
    <NoResults closeSearchModal={handleClose} />
    )}
    {hasResults && (
      <ResultList
        searchResultsIds={searchResultsIds}
        hasMore={hasMore}
        isSearchResultsLoading={isSearchResultsLoading}
        loadMoreResults={loadMoreResults}
        searchQuery={searchQuery}
        closeSearchModal={handleClose}
      />
    )}
  </>
)

SearchResults.propTypes = {
  searchResultsIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  hasMore: PropTypes.bool.isRequired,
  isSearchResultsLoading: PropTypes.bool.isRequired,
  loadMoreResults: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  hasNoResults: PropTypes.bool.isRequired,
  hasResults: PropTypes.bool.isRequired,
}

export default container(SearchResults)
