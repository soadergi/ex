import {
  compose,
  withHandlers,
  withState,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withState('isOpened', 'setOpen', false),
  withHandlers({
    clickHandler: ({ setOpen, isOpened }) => () => {
      setOpen(!isOpened)
    },
  }),
)

export default container
