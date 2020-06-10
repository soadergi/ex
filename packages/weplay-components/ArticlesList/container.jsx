import {
  compose,
  withProps,
} from 'recompose'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


const container = compose(
  connect(createStructuredSelector({
    // selectors
    isMobileWidth: isMobileWidthSelector,
  })),
  withProps(() => ({
    // analytic
    contentType: 'Content',
    contentAction: 'Show all news',
  })),
)

export default container
