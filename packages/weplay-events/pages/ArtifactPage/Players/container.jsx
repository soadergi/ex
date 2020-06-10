import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { tournamentPlayersSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    players: tournamentPlayersSelector,
  })),
)

export default container
