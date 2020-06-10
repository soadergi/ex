import {
  compose,
  withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect/lib/index'

import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withDiscipline,
  withPropsOnChange([
    'activeGameModeFilter',
  ], ({
    activeGameModeFilter,
  }) => ({
    isAll: R.isEmpty(activeGameModeFilter),
    is1v1: R.propEq('title', '1v1', activeGameModeFilter),
    is2v2: R.propEq('title', '2v2', activeGameModeFilter),
    is5v5: R.propEq('title', '5v5', activeGameModeFilter),
  })),
)

export default container
