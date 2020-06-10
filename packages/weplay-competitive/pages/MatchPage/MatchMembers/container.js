import * as R from 'ramda'
import {
  compose, withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    getTournamentMemberById: tournamentMembersSelectors.getRecordByIdSelector,
  }), {
    // matchMemberIds
  }),
  withPropsOnChange([
    'matchMembers',
    'getTournamentMemberById',
  ], ({
    matchMembers,
    getTournamentMemberById,
  }) => {
    const tournamentMembers = R.pipe(
      R.map(R.pipe(
        R.path(['relationships', 'tournamentMember', 'id']),
        getTournamentMemberById,
      )),
      R.sortWith([R.ascend(R.prop('role'))]),
    )(matchMembers)
    return ({
      tournamentMembers,
    })
  }),
)

export default container
