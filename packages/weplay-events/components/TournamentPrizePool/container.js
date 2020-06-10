import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { prizeSumSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    prizeSum: prizeSumSelector,
  }), {
    // actionCreators
  }),
)

export default container
