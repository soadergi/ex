import {
  compose,
  withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const container = compose(
  connect(createStructuredSelector({
    //
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'teams',
  ], ({
    teams,
  }) => ({
    serverPick: R.pipe(
      R.filter(R.propEq('pick', true)),
      R.isEmpty,
    )(teams),
  })),

)

export default container
