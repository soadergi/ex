import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { groupStageSumSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    groupStageSum: groupStageSumSelector,
  }), {
    // actionCreators
  }),
)

export default container
