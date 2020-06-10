import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

const container = compose(
  withDiscipline,
  connect(createStructuredSelector({
  }), {
    // actionCreators
  }),
)

export default container
