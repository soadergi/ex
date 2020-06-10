import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as R from 'ramda'

import { membersSelectors } from 'weplay-competitive/reduxs/members'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

const container = compose(
  withDiscipline,
  connect(createStructuredSelector({
    // selectors
    member: membersSelectors.createRecordByIdSelector(R.pathOr(NaN, [
      'memberId',
    ])),
  }), {
    // actionCreators
  }),

)

export default container
