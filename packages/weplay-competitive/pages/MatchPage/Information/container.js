import {
  branch,
  compose,
  renderNothing,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),

  branch(
    ({ matchPlayer1Id, matchPlayer2Id }) => !matchPlayer1Id || !matchPlayer2Id,
    renderNothing,
  ),
)

export default container
