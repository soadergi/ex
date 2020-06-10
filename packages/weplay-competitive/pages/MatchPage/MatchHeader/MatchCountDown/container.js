import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withCountDown from 'weplay-components/withCountDown'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withCountDown({
    countdownTimePath: ['votingStartDatetime'],
  }),
)

export default container
