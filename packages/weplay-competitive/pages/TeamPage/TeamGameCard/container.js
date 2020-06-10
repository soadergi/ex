import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { teamStatisticSelector } from 'weplay-competitive/reduxs/statistic/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    statistic: teamStatisticSelector,
  }), {
    // actionCreators
  }),
)

export default container
