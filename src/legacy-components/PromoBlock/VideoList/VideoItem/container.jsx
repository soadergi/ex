import {
  compose,
  withProps,
} from 'recompose'


const container = compose(
  withProps(({
    isLive: false,
    isTournamentInProgress: false,
  })),
)

export default container
