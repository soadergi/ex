import {
  compose,
  withHandlers,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { featuresSelectors } from 'weplay-competitive/reduxs/features'

const withFeatureSupport = compose(
  connect(createStructuredSelector({
    features: featuresSelectors.allRecordsSelector,
  }), {
  }),
  withHandlers({
    isFeatureSupported: ({ features }) => name => Boolean(
      R.find(
        R.allPass([
          R.propEq('name', name),
          R.propEq('status', 'ENABLED'),
        ]),
      )(features),
    ),
  }),
)

export default withFeatureSupport
