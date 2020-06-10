import * as R from 'ramda'
import {
  compose,
  pure,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isMobileWidth: isMobileWidthSelector,
  }), {
    // actionCreators
  }),

  pure,
  withPropsOnChange([
    'participant',
  ], ({
    participant,
  }) => ({
    withDraws: R.pipe(
      R.prop('score'),
      R.has('draws'),
    )(participant),
  })),
)

export default container
