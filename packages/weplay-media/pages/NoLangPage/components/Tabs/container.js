import {
  compose, withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withProps({
    tabs: ['top', 'popular', 'latest'],
  }),
)

export default container
