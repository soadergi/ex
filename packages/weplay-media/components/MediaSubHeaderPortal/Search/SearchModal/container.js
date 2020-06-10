import {
  compose,
  lifecycle,
  withStateHandlers,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import {
  searchResultsIdsSelector,
  isSearchResultsLoadingSelector,
} from 'weplay-core/reduxs/search/reducer'
import { makeSearch } from 'weplay-core/reduxs/search/actions'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'

const container = compose(
  withAnalytics,
  withLocale,
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,

    searchResultsIds: searchResultsIdsSelector,
    isSearchResultsLoading: isSearchResultsLoadingSelector,
  }), {
    // actionCreators
    makeSearch: makeSearch.request,
    clearResults: makeSearch.clear,
  }),
  withHandlers({
    handleKeyDown: props => (event) => {
      if (props.isSearchModalVisible) {
        if (event.code === 'Escape') {
          props.closeSearchModal()
        }
      }
    },
  }),
  withStateHandlers({
    searchQuery: '',
  }, {
    handleChange: () => value => ({
      searchQuery: value,
    }),
    resetSearchQuery: () => () => ({
      searchQuery: '',
    }),
  }),
  withHandlers({
    handleClose: props => () => {
      props.closeSearchModal()
      props.resetSearchQuery()
    },
    handleSearchQueryReset: props => () => {
      props.clearResults()
      props.resetSearchQuery()
    },
    handleSearchInput: props => (event) => {
      props.handleChange(event.target.value)
      props.logAnalytics({
        eventAction: 'search',
        eventLabel: event.target.value,
      })
      props.clearResults()
      if (event.target.value) {
        props.makeSearch({
          params: {
            language: props.locale,
            term: event.target.value,
            limit: 10,
            offset: 0,
          },
        })
      }
    },
  }),
  withHandlers(() => {
    let input
    return {
      handleInputRef: () => (ref) => {
        input = ref
      },
      focusInput: () => () => {
        if (input) {
          input.focus()
        }
      },
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.globalScope.addEventListener('keydown', this.props.handleKeyDown)
    },
    componentDidUpdate(prevProps) {
      if (this.props.isSearchModalVisible && !prevProps.isSearchModalVisible) {
        this.props.focusInput()
      }
    },
    componentWillUnmount() {
      this.props.globalScope.removeEventListener('keydown', this.props.handleKeyDown)
    },
  }),
)

export default container
