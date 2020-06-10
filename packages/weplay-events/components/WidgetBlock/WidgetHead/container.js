import {
  compose,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),

  withStateHandlers({
    isExpanded: false,
  }, {
    toggleExpanded: ({
      isExpanded,
    }) => () => ({
      isExpanded: !isExpanded,
    }),
  }),
)

export default container
