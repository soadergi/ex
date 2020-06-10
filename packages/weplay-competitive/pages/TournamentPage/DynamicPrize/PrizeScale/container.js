import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'totalSlots',
    'emptySlots',
  ], ({
    totalSlots,
    emptySlots,
  }) => ({
    progress: (totalSlots - emptySlots) / totalSlots * 100,
    countParticipants: totalSlots - emptySlots,
  })),
)

export default container
