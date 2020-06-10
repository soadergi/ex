import {
  compose,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { NAMES } from 'weplay-core/routes'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withProps(({ tournamentTitle }) => ({
    isLanWinner: tournamentTitle === NAMES.FORGE_OF_MASTERS_LAN
        || tournamentTitle === NAMES.FORGE_OF_MASTERS_LAN_SECOND_SEASON,
  })),
)

export default container
