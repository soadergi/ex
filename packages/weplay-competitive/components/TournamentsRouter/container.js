import {
  compose, withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { TOURNAMENT_DISCIPLINES } from 'weplay-competitive/config/disciplines'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withDiscipline,
  withProps(() => ({
    tournamentDisciplines: TOURNAMENT_DISCIPLINES,
  })),
)

export default container
