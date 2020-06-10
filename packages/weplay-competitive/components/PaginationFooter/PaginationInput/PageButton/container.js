import {
  compose, withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withHandlers({
    handleClick: ({
      onClick,
      page,
    }) => () => onClick(page),
  }),
)

export default container
