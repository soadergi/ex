import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { voteItemsSelectors } from 'weplay-competitive/reduxs/voteItems'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    getVoteItemById: voteItemsSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'poolIds',
    'getVoteItemById',
  ], ({
    poolIds,
    getVoteItemById,
  }) => {
    if (poolIds[0] === 'all') {
      return ({
        isAllPool: true,
        poolItems: [],
      })
    }
    return ({
      isAllPool: false,
      poolItems: poolIds.map(getVoteItemById),
    })
  }),
)

export default container
