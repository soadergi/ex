import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as R from 'ramda'

import { voteItemsSelectors } from 'weplay-competitive/reduxs/voteItems'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    voteItems: voteItemsSelectors.allRecordsSelector,
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'tournament',
    'voteItems',
  ], ({
    tournament,
  }) => ({
    poolIDs: R.pipe(
      R.prop('settings'),
      R.values,
      R.map(R.prop('votePool')),
      R.flatten,
      R.uniq,
    )(tournament),
  })),
)

export default container
