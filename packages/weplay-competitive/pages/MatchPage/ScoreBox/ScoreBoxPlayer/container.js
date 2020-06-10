import {
  compose,
  withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { membersSelectors } from 'weplay-competitive/reduxs/members'

const container = compose(
  connect(createStructuredSelector({
    getMemberById: membersSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
  }),
  withDiscipline,
  withPropsOnChange([
    'player',
    'getMemberById',
  ], ({ player, getMemberById }) => {
    const member = R.pipe(
      R.prop('memberId'),
      getMemberById,
    )(player)
    const isDataPresent = R.pipe(
      R.values,
      R.any(Boolean),
    )(player)
    const { isFetched } = member
    return {
      avatar: R.pathOr('', ['user', 'avatar'], member),
      name: R.pathOr('', ['user', 'nickname'], member),
      memberId: member.id,
      couldBeRendered: isFetched && isDataPresent,
      isPremiumAccount: R.pathOr(false, ['user', 'isPremiumAccount'], member),
    }
  }),
)

export default container
