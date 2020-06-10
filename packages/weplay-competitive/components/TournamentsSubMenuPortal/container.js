import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
    isTablet: isTabletWidthSelector,
  }), {
    // actionCreators
  }),
)

export default container
