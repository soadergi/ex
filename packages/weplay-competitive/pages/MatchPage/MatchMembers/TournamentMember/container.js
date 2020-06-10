import {
  compose, withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as R from 'ramda'

import { matchMembersSelectors } from 'weplay-competitive/reduxs/matchMembers'
import { MATCH_MEMBER_STATUSES } from 'weplay-competitive/constants/matchMemberStatuses'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    allMatchMembers: matchMembersSelectors.allRecordsSelector,
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'allMatchMembers',
    'tournamentMember',
    'matchId',
  ], ({
    allMatchMembers,
    tournamentMember,
    matchId,
  }) => ({
    isActive: R.pipe(
      R.find(R.allPass([
        R.pathEq(['relationships', 'match', 'id'], matchId),
        R.pathEq(['relationships', 'tournamentMember', 'id'], tournamentMember.id),
      ])),
      R.defaultTo({}),
      R.anyPass([
        R.propEq('status', MATCH_MEMBER_STATUSES.ONLINE),
        R.propEq('status', MATCH_MEMBER_STATUSES.READY),
      ]),
    )(allMatchMembers),
  })),
)

export default container
