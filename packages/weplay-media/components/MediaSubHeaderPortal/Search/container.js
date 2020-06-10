import {
  compose,
  branch,
  renderNothing,
  withStateHandlers,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { makeSearch } from 'weplay-core/reduxs/search/actions'
import { PROJECT_PREFIXS } from 'weplay-core/routes'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { addBodyOverflow, removeBodyOverflow } from 'weplay-core/helpers/toggleBodyOverflow'

const container = compose(
  withRouteInfo,
  branch(
    ({ routeInfo }) => routeInfo.project !== PROJECT_PREFIXS.MEDIA_PROJECT_PREFIX,
    renderNothing,
  ),

  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
    clearSearchResults: makeSearch.clear,
  }),

  withStateHandlers({
    isSearchModalVisible: false,
  }, {

    openSearchModal: () => () => ({
      isSearchModalVisible: true,
    }),
    closeSearchModal: () => () => ({
      isSearchModalVisible: false,
    }),
  }),

  withHandlers({
    handleSearchModalOpen: props => () => {
      props.openSearchModal()
      addBodyOverflow()
    },
    handleClose: props => () => {
      props.clearSearchResults()
      props.closeSearchModal()
      removeBodyOverflow()
    },
  }),
)

export default container
