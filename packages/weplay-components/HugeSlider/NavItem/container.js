import {
  compose,
  withProps,
  pure,
} from 'recompose'

const RADIUS = 32

const container = compose(
  pure,
  withProps({
    circleRadius: RADIUS,
    circleLength: 2 * Math.PI * RADIUS,
  }),
)

export default container
