// TODO: @Andrew, remove container and use React.memo
import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
)

export default container
