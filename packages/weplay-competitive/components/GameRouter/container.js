import * as R from 'ramda'
import {
  compose,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { createMemberByIdSelector } from 'weplay-competitive/reduxs/members/selectors'
import { TOURNAMENT_DISCIPLINES } from 'weplay-competitive/config/disciplines'

const mapPropsToId = R.path([
  'match', 'params', 'memberId',
])

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    member: createMemberByIdSelector(mapPropsToId),
    // selectors
  }), {
    // actionCreators
  }),
  withProps(() => ({
    tournamentDisciplines: TOURNAMENT_DISCIPLINES,
  })),
)

export default container
